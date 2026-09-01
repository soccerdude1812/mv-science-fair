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
Until one exists, edit it with `src/patch-flier.py`, which rewrites one run of
copy in place and leaves the other ~1300 content-stream operators untouched.

```sh
cd fliers/src
R="uv run --with pikepdf --with reportlab --with pymupdf python patch-flier.py"

$R pill "CLOSES SUNDAY, SEPT 13 · 11:59 PM"

$R footer "A student-led event organized by the MVHS STEM & Research Club." \
          "Not affiliated with or endorsed by MVWSD."
```

`pill` resizes the rounded rect to fit the new string, reusing the original left
padding on the right. `footer` rewrites the left footer, one argument per line,
and leaves the event stamp on the right alone.

Both read the geometry, size and tracking back out of the PDF instead of
hardcoding them, so they still work after they have been run once, and both
assert on the operators they match: copy that no longer matches fails loudly
rather than writing a broken page. Both also embed a font. The flier's own
JetBrains Mono subsets carry only the glyphs their original strings needed, with
no `1`, `3`, `:`, `&` or middot between them, so each rewritten run gets a fresh
full-coverage subset and the untouched runs keep the flier's.

After any change, check three things rather than eyeballing the render: that the
content streams differ only where you meant, that the QR still decodes out of a
rasterised page to the live application form, and that a second engine agrees
with poppler.

## Volunteer and mentor flier

Recruitment piece for the two roles on [/volunteer](../src/app/volunteer/page.tsx):
event-day volunteering and mentoring. Two layouts, one content source.

| File | Size | Use |
|------|------|-----|
| `MV-Science-Fair-Volunteer-Slide-16x9.png` | 1920 x 1080 | Google Slides. The design is 960 x 540 CSS px, exactly the Slides 16:9 canvas (10 x 5.625 in at 96dpi), exported at 2x. Insert > Image, then drag to the slide edges: it lands 1:1 with no rescaling. |
| `MV-Science-Fair-Volunteer-Flier.pdf` | 8.5 x 11 in, 1 page | Printing and posting. Vector, no page margin, prints edge to edge. |
| `MV-Science-Fair-Volunteer-Flier.png` | 1632 x 2112 | The same portrait sheet as an image (2x, ~192dpi) for anything that will not take a PDF. |

## Instagram posts

Two recruitment posts aimed at MVHS students, one per volunteer role, on both
surfaces. Copy, hashtags and the reasoning behind them live in
[`instagram-captions.md`](instagram-captions.md).

| File | Size | Use |
|------|------|-----|
| `MV-Science-Fair-IG-Mentor.png` | 1080 x 1350 | Feed post, 4:5, Instagram's tallest allowed frame. |
| `MV-Science-Fair-IG-Mentor-Story.png` | 1080 x 1920 | Story, 9:16. A separate layout, not a crop: words stay clear of the ~250px Instagram overlays top and bottom. |
| `MV-Science-Fair-IG-EventDay.png` | 1080 x 1350 | Feed post, 4:5. |
| `MV-Science-Fair-IG-EventDay-Story.png` | 1080 x 1920 | Story, 9:16. |

The mentor post carries the mentor code, the event-day post the event-day code,
and `verify-qr.mjs` now checks that pairing rather than only counting codes.

The border is thirteen figures from the cast, every one of them with a face.
`build-flier.mjs` and `build-instagram.mjs` both import them from
`src/cast-static.mjs`, so the printed sheet and the feed cannot drift apart.
That refactor was verified by regenerating the flier HTML and confirming it came
back byte for byte identical.

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
node inline-fonts.mjs      # needs network: fetches the Google Fonts CSS and
                           # inlines the latin subsets into fonts/inlined.css
node make-qr.mjs           # writes qr/*.svg
./render.sh                # the flier and slide
./render-instagram.sh      # the four Instagram artefacts
node verify-qr.mjs out/*.png
```

The faces come from Google Fonts at run time, so a rebuild picks up whatever
release is current. Regenerating on 2026-08-31 reproduced the committed sheet
exactly in layout, with the display serif a touch wider than the August cut:
about 2% of pixels move and nothing reflows. Do not commit a rebuild unless the
flier actually changed, since the committed files are the ones that were
printed.

`render.sh` and `render-instagram.sh` drive headless Chrome. `build-flier.mjs`
and `build-instagram.mjs` hold all the copy and every layout; edit there, never
the generated HTML.

The Instagram artefacts are authored at their delivered pixel size, shot at 2x
and downsampled back, which buys the serif display and the hairline strokes an
antialiasing pass they do not get at device scale 1. `verify-qr.mjs` then reads
the codes back out of the downsampled files, so the resample is proven not to
have cost them.

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
