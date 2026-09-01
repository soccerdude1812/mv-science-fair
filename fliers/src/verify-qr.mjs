/**
 * Decode the QR codes out of the FINAL rendered artefacts. Checking the source
 * SVG proves nothing about what a phone sees after layout, scaling and
 * rasterisation, and a flier whose codes do not scan is a dead flier.
 *
 * jsQR finds one code per pass, so each hit is painted out and the scan is
 * repeated until nothing is left. Every decoded URL is then fetched to confirm
 * it still resolves to the form it claims to be.
 */
import { readFile } from "node:fs/promises";
import { PNG } from "pngjs";
import jsQR from "jsqr";

const EXPECTED = {
  "https://docs.google.com/forms/d/1iuy7stpEJE6Espci9gCiEdNe06Cx0DR8I73fKNuyCbg/viewform":
    "MV Science Fair - Event-Day Volunteering Form",
  "https://docs.google.com/forms/d/1Go59zVliqQohI9kTUKptz8PFpYWdTSJbQ5qzyY6b2yY/viewform":
    "MV Science Fair - Mentor Volunteer Interest Form",
};

const UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";

let failures = 0;

for (const file of process.argv.slice(2)) {
  const png = PNG.sync.read(await readFile(file));
  const data = new Uint8ClampedArray(png.data);
  console.log(`\n${file}  ${png.width}x${png.height}`);

  /** Copy a sub-rectangle out as its own RGBA buffer. */
  const crop = (x0, y0, w, h) => {
    const out = new Uint8ClampedArray(w * h * 4);
    for (let y = 0; y < h; y++) {
      const src = ((y0 + y) * png.width + x0) * 4;
      out.set(data.subarray(src, src + w * 4), y * w * 4);
    }
    return out;
  };

  /* jsQR binarizes the whole frame at once, so a code that occupies a small
     share of a full-page render goes undetected even though a phone camera
     pointed at that code would read it fine. Sweep tiles instead: several
     window sizes, half-window stride, dedupe by decoded payload. */
  const found = new Set();
  for (const win of [256, 384, 512, 704]) {
    const stride = Math.round(win / 2);
    for (let y = 0; y + 1 < png.height; y += stride) {
      for (let x = 0; x + 1 < png.width; x += stride) {
        const w = Math.min(win, png.width - x);
        const h = Math.min(win, png.height - y);
        if (w < 80 || h < 80) continue;
        const hit = jsQR(crop(x, y, w, h), w, h);
        if (hit) found.add(hit.data);
      }
    }
    if (found.size >= 2) break;
  }
  for (const url of found) console.log(`  decoded: ${url}`);

  if (found.size !== 2) {
    console.log(`  FAIL: expected 2 codes, decoded ${found.size}`);
    failures++;
  }
  for (const url of found) {
    if (!(url in EXPECTED)) {
      console.log(`  FAIL: unexpected URL ${url}`);
      failures++;
      continue;
    }
    const res = await fetch(url, { headers: { "user-agent": UA }, redirect: "follow" });
    const html = await res.text();
    const title = /<title>([^<]*)<\/title>/.exec(html)?.[1] ?? "(no title)";
    const ok = res.status === 200 && title === EXPECTED[url];
    if (!ok) failures++;
    console.log(`  ${ok ? "OK  " : "FAIL"} ${res.status} "${title}"`);
  }
}

console.log(failures === 0 ? "\nALL QR CHECKS PASSED" : `\n${failures} QR CHECK FAILURE(S)`);
process.exit(failures === 0 ? 0 : 1);
