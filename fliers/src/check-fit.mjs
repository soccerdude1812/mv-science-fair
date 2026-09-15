/**
 * Does the sheet actually fit on the sheet?
 *
 * A fixed 816x1056 page silently clips anything taller than it: Chrome renders
 * the first 11 inches and throws the rest away, so a PDF whose footer fell off
 * the bottom looks fine until it is on a wall. Three of the four booth sheets
 * shipped that way on the first render.
 *
 * So render each page into a window TALLER than the page and look for ink below
 * the fold. The dotted ground stops at y=1056, so any pixel darker than the
 * paper below that line is content that would have been cut. Cheap, offline,
 * and it fails loudly.
 *
 * Usage: node check-fit.mjs out/tall/*.png
 */
import { readFile } from "node:fs/promises";
import { PNG } from "pngjs";

/** The page is 816x1056 CSS px, rendered at 2x. */
const FOLD = 1056 * 2;
/* Paper is #F7F5EF (luma ~245) and the dots are 6.6% ink (luma ~231). Real
   content is ink, pigment or white card, all far from that band. */
const DARK = 210;

let failures = 0;

for (const file of process.argv.slice(2)) {
  const png = PNG.sync.read(await readFile(file));
  if (png.height <= FOLD) {
    console.log(`${file}: FAIL, rendered ${png.height}px tall, needs > ${FOLD} to see past the fold`);
    failures++;
    continue;
  }
  let worst = 0;
  let count = 0;
  for (let y = FOLD; y < png.height; y++) {
    for (let x = 0; x < png.width; x++) {
      const i = (y * png.width + x) * 4;
      const luma = 0.299 * png.data[i] + 0.587 * png.data[i + 1] + 0.114 * png.data[i + 2];
      if (luma < DARK) {
        count++;
        worst = y;
      }
    }
  }
  const over = worst ? ((worst - FOLD) / 2).toFixed(0) : 0;
  if (count) {
    console.log(`${file}: FAIL, ${count} ink pixels below the fold, overflowing by ~${over}px`);
    failures++;
  } else {
    console.log(`${file}: fits`);
  }
}

console.log(failures === 0 ? "\nALL SHEETS FIT" : `\n${failures} SHEET(S) OVERFLOW`);
process.exit(failures === 0 ? 0 : 1);
