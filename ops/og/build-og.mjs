/**
 * Builds the source artwork for the two places the site is seen from outside
 * itself: ops/og/og.html, the social preview card behind
 * src/app/opengraph-image.png and twitter-image.png, and ops/og/icon.html, the
 * site mark behind src/app/icon.png, apple-icon.png and favicon.ico.
 * To regenerate:
 *
 *   node ops/og/build-og.mjs
 *   python3 -m http.server 8931 --directory ops/og   # file:// is blocked in Playwright
 *   # screenshot og.html at 1200x630 with a 2x zoom  -> src/app/opengraph-image.png
 *   # screenshot icon.html at 512x512                -> ops/og/icon-512.png
 *   python3 ops/og/make-icons.py ops/og/icon-512.png # writes the three icon files
 *
 * The characters mirror src/components/lab/cast.tsx path for path, minus the
 * motion groups (pupils rest centre-low, the beaker does not pour). Eye and
 * smile geometry is COMPUTED from the same formulas rather than typed out, so
 * a change to the cast's expression is one edit here. Chalk Lab tokens come
 * from src/app/globals.css; the rules they obey are in DESIGN.md.
 *
 * Each character carries a `box`: the bounding box of its INK in viewBox
 * units, strokes included. The five objects are drawn in one 120 box but stop
 * at wildly different edges (the test tube's ink is 44 units wide, the gear's
 * is 104), so sizing them by the shared box would leave the tube a third the
 * size of the gear and the gaps between them uneven. Cropping to the ink and
 * sizing by ink height is what makes the row read as one shelf.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const repo = join(here, "..", "..");

/**
 * Read the event facts out of src/lib/event.ts rather than retyping them.
 * DESIGN.md: "src/lib/event.ts stays the single source of truth for
 * date/venue/deadline/contact. Edit there, never inline." This script is plain
 * node with no TypeScript step, so it pulls the string literals out by name; a
 * missing or renamed key throws here instead of quietly shipping a wrong date
 * on the one surface nobody on the project ever looks at.
 */
const EVENT_SRC = readFileSync(join(repo, "src", "lib", "event.ts"), "utf8");
function ev(key) {
  const m = EVENT_SRC.match(new RegExp(`^\\s*${key}:\\s*"([^"]*)"`, "m"));
  if (!m) throw new Error(`event.ts has no string field "${key}"`);
  return m[1];
}
const EVENT = {
  dateMedium: ev("dateMedium"),
  timeShort: ev("timeShort"),
  venueName: ev("venueName"),
  venueCity: ev("venueCity"),
  organizer: ev("organizer"),
};

const INK = "var(--ink)";

/* ------------------------------------------------------------- face -- */

let uid = 0;
const nextId = (p) => `${p}${++uid}`;

/** cast.tsx Eye(), minus the motion group: the pupil sits at rest. */
function eye({ cx, cy, rx = 8.5, ry = 10, tilt = 0 }) {
  const clip = nextId("eye");
  const pupilR = ry * 0.46;
  const lid =
    `M${cx - rx + 0.5},${cy - ry * 0.28} ` +
    `Q${cx - rx * 0.2},${cy - ry * 0.72} ${cx + rx - 0.5},${cy - ry * 0.34}`;
  return `<g${tilt ? ` transform="rotate(${tilt} ${cx} ${cy})"` : ""}>
      <clipPath id="${clip}"><ellipse cx="${cx}" cy="${cy}" rx="${rx - 1.5}" ry="${ry - 1.5}"/></clipPath>
      <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#fff" stroke="${INK}" stroke-width="5"/>
      <g clip-path="url(#${clip})"><circle cx="${cx}" cy="${cy + ry * 0.3}" r="${pupilR}" fill="${INK}"/></g>
      <path d="${lid}" fill="none" stroke="${INK}" stroke-width="4.5" stroke-linecap="round"/>
    </g>`;
}

/** cast.tsx Smile(). */
function smile({ cx, cy, w = 8, depth = 3 }) {
  const d = `M${cx - w / 2},${cy} Q${cx},${cy + depth} ${cx + w / 2},${cy - 0.5}`;
  return `<path d="${d}" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>`;
}

/* ------------------------------------------------------------ cast -- */

const beakerInteriorId = nextId("interior");
const beaker = {
  box: { x: 26.5, y: 6.5, w: 69.9, h: 95.3 },
  body: `
    <clipPath id="${beakerInteriorId}"><path d="M31,26 L89.5,25.5 L89.8,86 Q89.6,96 78.5,98 L41.5,98 Q30.6,96 30.4,86 Z"/></clipPath>
    <g clip-path="url(#${beakerInteriorId})">
      <path d="M12,72.5 Q30,68.5 48,72 T84,71.5 T112,72 L112,116 L12,116 Z" fill="var(--coral)"/>
      <path d="M12,72.5 Q30,68.5 48,72 T84,71.5 T112,72" stroke="${INK}" stroke-width="4.5" stroke-linecap="round"/>
    </g>
    <path d="M31.5,30 Q29.6,60 30.2,86 Q30.4,97.6 41,98.8 L79,98.8 Q89.6,97.6 89.8,86 Q90.4,60 88.5,29.5" stroke="${INK}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M33.5,26.5 Q60,21.8 86.5,26" stroke="${INK}" stroke-width="3.6" stroke-linecap="round"/>
    <path d="M31.5,30 Q60,35.5 88.5,29.5 Q92.6,28.4 93.6,31.6" stroke="${INK}" stroke-width="5.5" stroke-linecap="round"/>
    <path d="M77.5,50 L84,50 M77.5,60.5 L84.2,60.5" stroke="${INK}" stroke-width="3.5" stroke-linecap="round"/>
    <circle cx="52" cy="18" r="3.4" stroke="${INK}" stroke-width="3.5"/>
    <circle cx="63" cy="10.5" r="2.4" stroke="${INK}" stroke-width="3.2"/>
    ${eye({ cx: 48.5, cy: 51, tilt: -2 })}
    ${eye({ cx: 68, cy: 50, rx: 9, ry: 10.5, tilt: 2 })}
    ${smile({ cx: 58.5, cy: 63.5 })}`,
};

const TOOTH_JITTER = [0.8, -0.6, 0.4, -0.9, 0.7, -0.4, 0.9, -0.7];

const gear = (color = "blue") => {
  const soft = `var(--${color}-soft)`;
  const deep = `var(--${color})`;
  const teeth = TOOTH_JITTER.map(
    (j, i) =>
      `<g transform="rotate(${i * 45 + j} 60 60)"><path d="M52.5,25.5 Q52,11.5 56.5,11 L63.5,11 Q68,11.5 67.5,25.5" stroke="${INK}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="${soft}"/></g>`,
  ).join("\n    ");
  const rivets = [45, 135, 225, 315]
    .map(
      (a) =>
        `<circle cx="${(60 + 28.5 * Math.cos((a * Math.PI) / 180)).toFixed(2)}" cy="${(60 + 28.5 * Math.sin((a * Math.PI) / 180)).toFixed(2)}" r="2.2" fill="${deep}"/>`,
    )
    .join("\n    ");
  return {
    box: { x: 8, y: 8, w: 104, h: 104 },
    body: `
    ${teeth}
    <circle cx="60" cy="60" r="35" fill="${soft}" stroke="${INK}" stroke-width="6"/>
    ${rivets}
    <circle cx="60" cy="60" r="20.5" fill="#fff" stroke="${INK}" stroke-width="5"/>
    ${eye({ cx: 52.5, cy: 57.5, rx: 7.4, ry: 8.4 })}
    ${eye({ cx: 68, cy: 57, rx: 7.6, ry: 8.6, tilt: 2 })}
    ${smile({ cx: 60.5, cy: 70, w: 9 })}`,
  };
};

const testTube = {
  /* ink box measured after the 7 degree rotation, not before it */
  box: { x: 40.5, y: 7.4, w: 44.4, h: 93.1 },
  body: `<g transform="rotate(7 60 60)">
    <path d="M46.6,66 Q53,62.5 60,66 T73.4,65.5 L73.4,84 Q73.4,98 60,98 Q46.6,98 46.6,84 Z" fill="var(--green)"/>
    <path d="M46.6,66 Q53,62.5 60,66 T73.4,65.5" stroke="${INK}" stroke-width="4.2" stroke-linecap="round"/>
    <path d="M47,21 L46.4,82 Q46.2,97.8 60,98 Q73.8,97.8 73.6,82 L73,20.5" stroke="${INK}" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M42.5,21.8 L47,21 M73,20.5 L77.6,21.6" stroke="${INK}" stroke-width="5.5" stroke-linecap="round"/>
    <path d="M66,74 L72,74 M66,83 L71.8,83" stroke="${INK}" stroke-width="3.2" stroke-linecap="round"/>
    <circle cx="55" cy="54" r="2.6" stroke="${INK}" stroke-width="3.2"/>
    <circle cx="64" cy="44" r="2" stroke="${INK}" stroke-width="3"/>
    <circle cx="58" cy="12" r="3" stroke="${INK}" stroke-width="3.4"/>
    ${eye({ cx: 52.5, cy: 34, rx: 7, ry: 8.5, tilt: -2 })}
    ${eye({ cx: 68, cy: 33.5, rx: 7.2, ry: 8.7, tilt: 2 })}
    ${smile({ cx: 60.5, cy: 45, w: 7 })}
  </g>`,
};

const lensId = nextId("lens");
const magnifier = {
  box: { x: 21.75, y: 17.75, w: 75.75, h: 77.25 },
  body: `
    <path d="M71.5,68.5 L92,89.5" stroke="${INK}" stroke-width="11" stroke-linecap="round"/>
    <circle cx="52" cy="48" r="27" fill="#fff" stroke="${INK}" stroke-width="6.5"/>
    <clipPath id="${lensId}"><circle cx="52" cy="48" r="23"/></clipPath>
    <g clip-path="url(#${lensId})"><circle cx="52" cy="53" r="9.5" fill="${INK}"/></g>
    <path d="M29.5,42 Q42,26.5 73,36.5" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
    <path d="M38,60.5 Q45,66 54,66.5" fill="none" stroke="${INK}" stroke-width="3.4" stroke-linecap="round"/>`,
};

const lightbulb = {
  box: { x: 17.75, y: 5.75, w: 84.5, h: 91 },
  body: `
    <path d="M60,8 L60,15 M31,20 L36,26 M89,19.5 L84,25.5 M20,49 L28,50 M100,48 L92,49.5" stroke="${INK}" stroke-width="4.5" stroke-linecap="round"/>
    <path d="M45.5,72 Q31,62 31.5,47 Q32.5,25.5 60,25 Q87.5,25.5 88.5,47 Q89,62 74.5,72 Z" fill="var(--marigold-soft)" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
    <path d="M51,58 Q60,65 69,57.5" fill="none" stroke="${INK}" stroke-width="4.2" stroke-linecap="round"/>
    ${eye({ cx: 51.5, cy: 45.5, rx: 7.5, ry: 9, tilt: -2 })}
    ${eye({ cx: 69, cy: 45, rx: 7.8, ry: 9.2, tilt: 2 })}
    <path d="M46.5,79 L73.5,78.5 M47.5,86.5 L72.5,86 M50.5,94 L69.5,93.5" stroke="${INK}" stroke-width="5.5" stroke-linecap="round"/>`,
};

/* ------------------------------------------------------------ page -- */

/* Order puts the beaker in the middle, because it is the hero character on the
   site and the only one the brand colour lives in. `ink` is the rendered
   height of the ink in px; widths follow from each box's aspect ratio, so the
   row is sized optically rather than by a shared square. */
const PAD = 1.5;
const CAST = [
  { name: "lightbulb", char: lightbulb, ink: 149 },
  { name: "gear", char: gear("blue"), ink: 154 },
  { name: "beaker", char: beaker, ink: 185 },
  { name: "testtube", char: testTube, ink: 156 },
  { name: "magnifier", char: magnifier, ink: 132 },
].map(({ name, char, ink }) => {
  const b = char.box;
  const vb = [b.x - PAD, b.y - PAD, b.w + PAD * 2, b.h + PAD * 2];
  const height = Math.round(ink * ((b.h + PAD * 2) / b.h));
  const width = Math.round(height * (vb[2] / vb[3]));
  return {
    name,
    width,
    height,
    svg: `<svg viewBox="${vb.map((n) => +n.toFixed(2)).join(" ")}" fill="none" aria-hidden="true">${char.body}</svg>`,
  };
});

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>MV Science Fair 2026 social card</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,600&family=Outfit:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">
<style>
  /* Chalk Lab tokens, copied from src/app/globals.css */
  :root {
    --paper: #f7f5ef;
    --paper-warm: #f0ede4;
    --ink: #22211c;
    --ink-soft: #5a574c;
    --ink-faint: #6b675a;
    --line: rgba(34, 33, 28, 0.12);
    --coral: #d96c4f;
    --coral-deep: #ae4527;
    --blue: #4e7dc4;
    --blue-soft: #e4ecf7;
    --green: #619b6e;
    --marigold: #dfa33c;
    --marigold-soft: #f9eeda;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: 630px; }
  body {
    /* the site's .dotted-band, on the warm ground */
    background-color: var(--paper-warm);
    background-image: radial-gradient(var(--line) 1.1px, transparent 1.1px);
    background-size: 22px 22px;
    font-family: Outfit, system-ui, sans-serif;
    display: flex;
    padding: 28px;
  }
  .sheet {
    flex: 1;
    background: var(--paper);
    border: 1px solid var(--line);
    border-radius: 16px;
    box-shadow: 0 2px 14px rgba(64, 54, 32, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 54px 56px 0;
    overflow: hidden;
  }
  .eyebrow {
    font-family: "JetBrains Mono", ui-monospace, monospace;
    font-size: 19px;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--ink-faint);
  }
  h1 {
    margin-top: 16px;
    font-family: "Source Serif 4", Georgia, serif;
    font-weight: 600;
    font-size: 92px;
    line-height: 1.02;
    letter-spacing: -0.025em;
    color: var(--ink);
  }
  .sub {
    margin-top: 18px;
    font-size: 27px;
    line-height: 1.42;
    color: var(--ink-soft);
    text-align: center;
  }
  .free { color: var(--coral-deep); font-weight: 600; }
  .bench {
    margin-top: auto;
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: 50px;
    border-bottom: 1px solid var(--line);
    padding-bottom: 16px;
  }
  .bench svg { display: block; width: 100%; height: 100%; }
  .org {
    width: 100%;
    padding: 16px 0 18px;
    text-align: center;
    font-size: 19px;
    font-weight: 500;
    color: var(--ink-faint);
  }
</style>
</head>
<body>
  <div class="sheet">
    <p class="eyebrow">${EVENT.dateMedium} &middot; ${EVENT.timeShort}</p>
    <h1>MV Science Fair</h1>
    <p class="sub">${EVENT.venueName}, ${EVENT.venueCity}.<br><span class="free">Free, and open to families.</span></p>
    <div class="bench">
      ${CAST.map(
        (c) =>
          `<figure style="width:${c.width}px;height:${c.height}px">${c.svg}</figure>`,
      ).join("\n      ")}
    </div>
    <p class="org">Organized by the ${EVENT.organizer.replace("&", "&amp;")}</p>
  </div>
</body>
</html>
`;

/* ------------------------------------------------------------ icon -- */

/* The site mark is the beaker alone, because it is the hero character and the
   one the brand coral lives in. It is NOT the bench beaker: the escaping
   bubbles and the measurement ticks are legible at 190px and are grit at 16,
   so the icon drops both and crops to the glass. Everything else is the same
   geometry, so the tab and the card are visibly the same object. */
const iconBeaker = {
  box: { x: 26.5, y: 22, w: 69.9, h: 79.8 },
  body: beaker.body
    .split("\n")
    .filter(
      (line) =>
        !line.includes('circle cx="52" cy="18"') &&
        !line.includes('circle cx="63" cy="10.5"') &&
        !line.includes("M77.5,50 L84,50"),
    )
    .join("\n"),
};

const iconVb = [
  iconBeaker.box.x - PAD,
  iconBeaker.box.y - PAD,
  iconBeaker.box.w + PAD * 2,
  iconBeaker.box.h + PAD * 2,
];

const iconHtml = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>MV Science Fair site mark</title>
<style>
  :root { --paper: #f7f5ef; --ink: #22211c; --coral: #d96c4f; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 512px; height: 512px; }
  body { background: var(--paper); display: flex; align-items: center; justify-content: center; }
  svg { display: block; height: 448px; }
</style>
</head>
<body>
  <svg viewBox="${iconVb.map((n) => +n.toFixed(2)).join(" ")}" fill="none" aria-hidden="true">${iconBeaker.body}</svg>
</body>
</html>
`;

writeFileSync(join(here, "og.html"), html);
writeFileSync(join(here, "icon.html"), iconHtml);
console.log(
  "wrote",
  join(here, "og.html"),
  "| bench:",
  CAST.map((c) => `${c.name} ${c.width}x${c.height}`).join(", "),
);
console.log("wrote", join(here, "icon.html"));
