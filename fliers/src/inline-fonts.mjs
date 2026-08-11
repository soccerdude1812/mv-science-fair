/**
 * Turn the Google Fonts CSS into a self-contained @font-face block with the
 * latin subset embedded as base64 data URIs. The flier has to render
 * identically in Playwright, in a PDF, and on any machine that opens the HTML,
 * so nothing may depend on the network at render time.
 */
import { readFile, writeFile } from "node:fs/promises";

const css = await readFile(new URL("./fonts/gf.css", import.meta.url), "utf8");

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
