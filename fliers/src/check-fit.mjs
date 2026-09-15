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
 * Two things this file refuses to assume, because both have a way of drifting
 * out of step with render-booth.sh:
 *
 *   - the device scale. Derived from the image width against the 816px page,
 *     not hardcoded, so changing --force-device-scale-factor cannot quietly
 *     move the fold.
 *   - that the tall window was tall enough. Chrome's --screenshot captures the
 *     viewport, not the full scroll height, so a sheet overflowing by more than
 *     the window's slack would have its overflow cropped out of the very image
 *     meant to reveal it: a silent pass, which is the exact bug this file
 *     exists to catch. Ink in the bottom rows means the capture ran out before
 *     the content did, and that is a failure too, not a pass.
 *
 * What this does NOT catch: content that is too big for the MIDDLE of the
 * sheet. That row is `1fr` with its contents centred, so oversized content
 * there spills symmetrically inside the page and overlaps its neighbours
 * rather than falling off the bottom. Verified by inflating the task list
 * until it was three times too tall: not one pixel landed below the fold.
 * Overlap is a job for the eye, on the render. This file answers one question,
 * which is whether anything was thrown away.
 *
 * Usage: node check-fit.mjs out/tall/*.png
 */
import { readFile } from "node:fs/promises";
import { PNG } from "pngjs";

/** The page these sheets are cut to, in CSS px. */
const PAGE_W = 816;
const PAGE_H = 1056;
/* Paper is #F7F5EF (luma ~245) and the dots are 6.6% ink (luma ~231). Real
   content is ink, pigment or white card, all far from that band. */
const DARK = 210;
/** Ink this close to the bottom of the capture means the capture, not the content, ran out. */
const MARGIN_CSS = 8;

let failures = 0;

for (const file of process.argv.slice(2)) {
  const png = PNG.sync.read(await readFile(file));
  const scale = png.width / PAGE_W;
  if (!Number.isInteger(scale) || scale < 1) {
    console.log(`${file}: FAIL, ${png.width}px wide is not a whole multiple of the ${PAGE_W}px page`);
    failures++;
    continue;
  }
  const fold = PAGE_H * scale;
  if (png.height <= fold + MARGIN_CSS * scale) {
    console.log(
      `${file}: FAIL, rendered only ${png.height / scale}px tall; the window has to clear the ${PAGE_H}px page to show anything past it`,
    );
    failures++;
    continue;
  }

  /* Ink below the fold is content the real page would have thrown away. The
     overflow of a fixed height grid is contiguous with the bottom of the page,
     so it starts at the fold; if it reaches the bottom of the capture instead
     of ending inside it, the capture ran out before the content did and the
     shot proves nothing. */
  const inkRows = [];
  for (let y = fold; y < png.height; y++) {
    for (let x = 0; x < png.width; x++) {
      const i = (y * png.width + x) * 4;
      const luma = 0.299 * png.data[i] + 0.587 * png.data[i + 1] + 0.114 * png.data[i + 2];
      if (luma < DARK) {
        inkRows.push(y);
        break;
      }
    }
  }

  const last = inkRows.at(-1);
  if (last !== undefined && last >= png.height - MARGIN_CSS * scale) {
    console.log(
      `${file}: FAIL, ink runs to the bottom edge of a ${png.height / scale}px capture, so the overflow is itself cut off. Raise the tall window in render-booth.sh and run again.`,
    );
    failures++;
  } else if (inkRows.length) {
    console.log(
      `${file}: FAIL, ${inkRows.length} rows of ink below the fold, content overflowing the page by ~${Math.round((last + 1 - fold) / scale)}px`,
    );
    failures++;
  } else {
    console.log(
      `${file}: fits (${(png.height - fold) / scale}px of clear paper checked past the fold)`,
    );
  }
}

console.log(failures === 0 ? "\nALL SHEETS FIT" : `\n${failures} SHEET(S) OVERFLOW`);
process.exit(failures === 0 ? 0 : 1);
