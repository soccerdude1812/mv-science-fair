/**
 * Turn the Google Fonts CSS into a self-contained @font-face block with the
 * latin subset embedded as base64 data URIs. The flier has to render
 * identically in Playwright, in a PDF, and on any machine that opens the HTML,
 * so nothing may depend on the network at render time.
 */
import { mkdir, writeFile } from "node:fs/promises";

/* The stylesheet is fetched rather than read off disk. It used to be read from
   ./fonts/gf.css, which is inside the gitignored fonts/ directory and which
   nothing ever wrote, so this script and the render that depends on it both
   failed on a clean checkout.

   Google Fonts serves woff2 only to a user agent it believes supports it, so
   the request carries a modern UA; without one it answers with truetype and
   the inlined data URIs below would be several times larger. The families and
   weights are the ones build-flier.mjs actually sets. */

const FAMILIES = [
  "family=Outfit:wght@400;500;600;700",
  "family=Source+Serif+4:ital,wght@0,500;0,600;1,500;1,600",
  "family=JetBrains+Mono:wght@400;500",
].join("&");

const res = await fetch(`https://fonts.googleapis.com/css2?${FAMILIES}&display=swap`, {
  headers: {
    "user-agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
      "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  },
});
if (!res.ok) throw new Error(`${res.status} fetching the Google Fonts stylesheet`);
const css = await res.text();
await mkdir(new URL("./fonts/", import.meta.url), { recursive: true });

// Split on @font-face; keep only the latin subset (the block whose
// unicode-range covers basic latin U+0000-00FF and is not latin-ext).
const blocks = css.split("@font-face").slice(1).map((b) => "@font-face" + b.slice(0, b.indexOf("}") + 1));

const wanted = blocks.filter((b) => {
  const range = /unicode-range:\s*([^;]+);/.exec(b)?.[1] ?? "";
  // latin block always starts at U+0000 (or U+0-00FF); latin-ext starts U+0100.
  return /U\+0{0,3}0?-0?0?FF/i.test(range) || /U\+0000-00FF/i.test(range);
});

console.error(`blocks: ${blocks.length} total, ${wanted.length} latin`);

const out = [];
for (const block of wanted) {
  const url = /url\((https:\/\/fonts\.gstatic\.com[^)]+)\)/.exec(block)?.[1];
  if (!url) continue;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const family = /font-family:\s*'([^']+)'/.exec(block)?.[1];
  const weight = /font-weight:\s*([^;]+);/.exec(block)?.[1]?.trim();
  const style = /font-style:\s*([^;]+);/.exec(block)?.[1]?.trim();
  console.error(`  ${family} ${style} ${weight}  ${(buf.length / 1024).toFixed(0)}KB`);
  out.push(
    block
      .replace(/url\(https:\/\/[^)]+\)/, `url(data:font/woff2;base64,${buf.toString("base64")})`)
      .replace(/\s*unicode-range:[^;]+;/, ""),
  );
}

await writeFile(new URL("./fonts/inlined.css", import.meta.url), out.join("\n"));
console.error(`wrote ${out.length} faces`);
