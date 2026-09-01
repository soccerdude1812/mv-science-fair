# Fliers

Two separate pieces live here. The **student flier** recruits applicants; the
**volunteer and mentor flier** recruits helpers. They do not share a source.

## Student flier

| File | Size | Use |
|------|------|-----|
| `MV-Science-Fair-Flier.pdf` | 8.5 x 11 in, 1 page | Printing and posting. Imai has confirmed these can go up on their walls. |
| `MV-Science-Fair-Flier.png` | 2550 x 3300 | The same sheet at 300dpi, for anything that will not take a PDF. |
| `MV-Science-Fair-Flier-Instagram-4x5.png` | 1080 x 1350 | Instagram's tallest allowed frame. The whole sheet, uncropped, centred on its own white with 18px either side. |

The QR code goes to the Application & Registration Form.

Its generator did not survive the session that produced it: the PDF is a
ReportLab artefact from 2026-08-04 and there is no source for it in the repo.
Until one exists, edit it with `src/patch-deadline.py`, which rewrites the
deadline pill in place and leaves the other ~1300 content-stream operators
untouched:

```sh
cd fliers/src
uv run --with pikepdf --with reportlab --with pymupdf python patch-deadline.py \
  "CLOSES SUNDAY, SEPT 13 · 11:59 PM" ../MV-Science-Fair-Flier.pdf
```

The pill's own embedded font subset carries only the glyphs the first version of
that string needed, with no `1`, `3`, `:` or middot, so the script embeds a
fresh JetBrains Mono Bold for the pill alone. It resizes the rounded rect to the
new text and asserts on every anchor it edits, so a copy change that no longer
matches fails loudly instead of writing a broken page.

## Volunteer and mentor flier

Recruitment piece for the two roles on [/volunteer](../src/app/volunteer/page.tsx):
event-day volunteering and mentoring. Two layouts, one content source.

| File | Size | Use |
|------|------|-----|
| `MV-Science-Fair-Volunteer-Slide-16x9.png` | 1920 x 1080 | Google Slides. The design is 960 x 540 CSS px, exactly the Slides 16:9 canvas (10 x 5.625 in at 96dpi), exported at 2x. Insert > Image, then drag to the slide edges: it lands 1:1 with no rescaling. |
| `MV-Science-Fair-Volunteer-Flier.pdf` | 8.5 x 11 in, 1 page | Printing and posting. Vector, no page margin, prints edge to edge. |
| `MV-Science-Fair-Volunteer-Flier.png` | 1632 x 2112 | The same portrait sheet as an image (2x, ~192dpi) for anything that will not take a PDF. |

## What the QR codes point at

Both encode the short `/forms/d/<id>/viewform` URL, which Google redirects to the
published `/forms/d/e/<id>/` form:

- **Help on fair day** -> Event-Day Volunteering Form (`1iuy7st...`)
- **Mentor a young scientist** -> Mentor Volunteer Interest Form (`1Go59zV...`)

The short URL is 14 characters shorter than the published one, which keeps the
code at 41 modules instead of pushing it to the next version. Fatter modules
scan better off a wall.

On the printed sheet the code box is 1.6 in, so a module is about 0.85 mm,
comfortably above what a phone camera needs at arm's length.

## Design

Follows [`DESIGN.md`](../DESIGN.md) ("Chalk Lab"): the same tokens, the Source
Serif 4 / Outfit / JetBrains Mono stack, 16px container and pill radii, hairline
borders, warm shadows. The characters are static ports of
[`src/components/lab/cast.tsx`](../src/components/lab/cast.tsx) with the motion
stripped, reusing the same path data and derived-geometry formulas. Blue for
event day and green for mentoring matches what `/volunteer` already ships; coral
stays the accent, used only to point at the codes.

Deliberately absent: the application deadline. That gates student *applications*, not
volunteer or mentor sign-ups, so printing it here would be wrong. Sept 26 is the
only date on the flier.

## Regenerating

```sh
cd fliers/src
npm install                # qrcode, jsqr, pngjs
node inline-fonts.mjs      # needs network: pulls the latin subsets from Google Fonts
node make-qr.mjs           # writes qr/*.svg
./render.sh                # builds the HTML and renders to out/
node verify-qr.mjs out/*.png
```

`render.sh` drives headless Chrome. `build-flier.mjs` holds all the copy and both
layouts; edit there, never the generated HTML.

`verify-qr.mjs` decodes the codes back out of the **rendered** artefacts and
fetches each URL to confirm it still returns the right form. Run it after any
change that touches a code, a size, or a URL. Checking the source SVG proves
nothing about what a phone sees after layout and rasterisation.

## Gotcha

The dotted ground is drawn as explicit SVG circles rather than the tiled
`radial-gradient` that `globals.css` uses. Chrome's print-to-PDF renders that
tile erratically: it dropped the dots across most of the page and scattered
blobs elsewhere. Verified by cropping the same patch of paper out of the PDF and
the PNG side by side.
