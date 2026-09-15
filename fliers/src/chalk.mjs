/**
 * Chalk Lab, ported to paper: the shared skin and the cast, used by every
 * printed piece in this directory.
 *
 *   build-flier.mjs   the volunteer and mentor flier (8.5x11 + 16:9 slide)
 *   build-booth.mjs   the four club-fair booth sheets (8.5x11 each)
 *
 * Everything traces to DESIGN.md: the token values, the type stack, the 16px
 * container / pill interactive radius system, hairline borders, warm
 * never-black shadows, and the character style contract. The characters are
 * static ports of src/components/lab/cast.tsx, same path data and the same
 * derived-geometry formulas, with the motion stripped and pupils at rest.
 *
 * `BASE` stops at the masthead: tokens, reset, type, the dotted ground and the
 * eyebrow/headline/subline trio. Anything a single piece invents (the flier's
 * role cards, the booth sheets' facts and giant codes) stays with that piece.
 */
import { readFile } from "node:fs/promises";

export const here = (p) => new URL(p, import.meta.url);

export const fontCss = await readFile(here("./fonts/inlined.css"), "utf8");
/* ------------------------------------------------------------------ cast -- */
/* Ports of cast.tsx. INK/pigment come out as literal hex because the SVG is
   inlined into a print document where CSS custom properties on <html> would
   still resolve, but a PDF renderer given the file standalone should not have
   to. Stroke widths, radii and wobble are copied verbatim. */

export const INK = "#22211C";

/** cast.tsx <Eye>: white ellipse, low pupil, heavy upper lid, optional tilt. */
export function eye({ cx, cy, rx = 8.5, ry = 10, tilt = 0 }) {
  const pupilR = ry * 0.46;
  const lid =
    `M${cx - rx + 0.5},${cy - ry * 0.28} ` +
    `Q${cx - rx * 0.2},${cy - ry * 0.72} ${cx + rx - 0.5},${cy - ry * 0.34}`;
  return `<g${tilt ? ` transform="rotate(${tilt} ${cx} ${cy})"` : ""}>
    <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#fff" stroke="${INK}" stroke-width="5"/>
    <circle cx="${cx}" cy="${cy + ry * 0.3}" r="${pupilR}" fill="${INK}"/>
    <path d="${lid}" fill="none" stroke="${INK}" stroke-width="4.5" stroke-linecap="round"/>
  </g>`;
}

/** cast.tsx <Smile>. */
export function smile({ cx, cy, w = 8, depth = 3 }) {
  return `<path d="M${cx - w / 2},${cy} Q${cx},${cy + depth} ${cx + w / 2},${cy - 0.5}"
    fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>`;
}

/**
 * The notebook ground. globals.css draws this with a tiled radial-gradient,
 * which is right for the browser and wrong here: Chrome's print-to-PDF renders
 * that tile erratically, dropping the dots across most of the page and
 * scattering blobs elsewhere (verified by cropping the same patch of paper out
 * of the PDF and the PNG side by side). Explicit circles are plain vector
 * content that every renderer treats the same way.
 */
export const dottedGround = (w, h, step) => {
  const dots = [];
  for (let y = step / 2; y < h; y += step)
    for (let x = step / 2; x < w; x += step)
      dots.push(`<circle cx="${+x.toFixed(1)}" cy="${+y.toFixed(1)}" r="1.1"/>`);
  return `<svg class="dots" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" aria-hidden="true">
    <g fill="#22211C" fill-opacity="0.066">${dots.join("")}</g>
  </svg>`;
};

export const svg = (body, cls) =>
  `<svg class="${cls}" viewBox="0 0 120 120" fill="none" aria-hidden="true">${body}</svg>`;

/** Lightbulb: the volunteer-band character in DESIGN.md. Marigold glow. */
export const lightbulb = (cls) =>
  svg(
    `<path d="M60,8 L60,15 M31,20 L36,26 M89,19.5 L84,25.5 M20,49 L28,50 M100,48 L92,49.5"
       stroke="${INK}" stroke-width="4.5" stroke-linecap="round"/>
     <path d="M45.5,72 Q31,62 31.5,47 Q32.5,25.5 60,25 Q87.5,25.5 88.5,47 Q89,62 74.5,72 Z"
       fill="#F9EEDA" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
     <path d="M51,58 Q60,65 69,57.5" fill="none" stroke="${INK}" stroke-width="4.2" stroke-linecap="round"/>
     ${eye({ cx: 51.5, cy: 45.5, rx: 7.5, ry: 9, tilt: -2 })}
     ${eye({ cx: 69, cy: 45, rx: 7.8, ry: 9.2, tilt: 2 })}
     <path d="M46.5,79 L73.5,78.5 M47.5,86.5 L72.5,86 M50.5,94 L69.5,93.5"
       stroke="${INK}" stroke-width="5.5" stroke-linecap="round"/>`,
    cls,
  );

/** Gear, blue: the event-day mark. Teeth carry cast.tsx's hand-cut jitter. */
const TOOTH_JITTER = [0.8, -0.6, 0.4, -0.9, 0.7, -0.4, 0.9, -0.7];
export const gear = (cls) => {
  const teeth = TOOTH_JITTER.map(
    (j, i) => `<g transform="rotate(${i * 45 + j} 60 60)">
      <path d="M52.5,25.5 Q52,11.5 56.5,11 L63.5,11 Q68,11.5 67.5,25.5"
        stroke="${INK}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="#E4ECF7"/>
    </g>`,
  ).join("");
  const rivets = [45, 135, 225, 315]
    .map((a) => {
      const x = (60 + 28.5 * Math.cos((a * Math.PI) / 180)).toFixed(2);
      const y = (60 + 28.5 * Math.sin((a * Math.PI) / 180)).toFixed(2);
      return `<circle cx="${x}" cy="${y}" r="2.2" fill="#4E7DC4"/>`;
    })
    .join("");
  return svg(
    `${teeth}
     <circle cx="60" cy="60" r="35" fill="#E4ECF7" stroke="${INK}" stroke-width="6"/>
     ${rivets}
     <circle cx="60" cy="60" r="20.5" fill="#fff" stroke="${INK}" stroke-width="5"/>
     ${eye({ cx: 52.5, cy: 57.5, rx: 7.4, ry: 8.4 })}
     ${eye({ cx: 68, cy: 57, rx: 7.6, ry: 8.6, tilt: 2 })}
     ${smile({ cx: 60.5, cy: 70, w: 9 })}`,
    cls,
  );
};

/** Test tube, green: the mentor mark. */
export const testTube = (cls) =>
  svg(
    `<g transform="rotate(7 60 60)">
      <path d="M46.6,66 Q53,62.5 60,66 T73.4,65.5 L73.4,84 Q73.4,98 60,98 Q46.6,98 46.6,84 Z" fill="#619B6E"/>
      <path d="M46.6,66 Q53,62.5 60,66 T73.4,65.5" stroke="${INK}" stroke-width="4.2" stroke-linecap="round"/>
      <path d="M47,21 L46.4,82 Q46.2,97.8 60,98 Q73.8,97.8 73.6,82 L73,20.5"
        stroke="${INK}" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M42.5,21.8 L47,21 M73,20.5 L77.6,21.6" stroke="${INK}" stroke-width="5.5" stroke-linecap="round"/>
      <path d="M66,74 L72,74 M66,83 L71.8,83" stroke="${INK}" stroke-width="3.2" stroke-linecap="round"/>
      <circle cx="55" cy="54" r="2.6" stroke="${INK}" stroke-width="3.2"/>
      <circle cx="64" cy="44" r="2" stroke="${INK}" stroke-width="3"/>
      <circle cx="58" cy="12" r="3" stroke="${INK}" stroke-width="3.4"/>
      ${eye({ cx: 52.5, cy: 34, rx: 7, ry: 8.5, tilt: -2 })}
      ${eye({ cx: 68, cy: 33.5, rx: 7.2, ry: 8.7, tilt: 2 })}
      ${smile({ cx: 60.5, cy: 45, w: 7 })}
    </g>`,
    cls,
  );

/* ------------------------------------------------------------------ css -- */
/* The shared skin. Each layout then sets --u (its type/space unit) and its
   own grid; nothing below re-specifies a colour or a radius. */

export const BASE = `
${fontCss}

:root {
  --paper: #F7F5EF;
  --paper-warm: #F0EDE4;
  --card: #FFFFFF;
  --ink: #22211C;
  --ink-soft: #5A574C;
  --ink-faint: #8C8779;
  --line: rgba(34,33,28,0.12);
  --line-strong: rgba(34,33,28,0.25);
  --coral: #D96C4F;
  --coral-deep: #C25A3E;
  --coral-soft: #F8E6DF;
  --blue: #4E7DC4;
  --blue-soft: #E4ECF7;
  --green: #619B6E;
  --green-soft: #E4EFE7;
  --marigold: #DFA33C;
  --marigold-soft: #F9EEDA;
  --shadow-sm: 0 1px 4px rgba(64,54,32,0.07);
  --shadow-md: 0 2px 14px rgba(64,54,32,0.10);
}

* { margin: 0; padding: 0; box-sizing: border-box; }

html, body {
  background: var(--paper);
  color: var(--ink-soft);
  font-family: "Outfit", system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  text-rendering: geometricPrecision;
  print-color-adjust: exact;
  -webkit-print-color-adjust: exact;
}

h1, h2 {
  color: var(--ink);
  font-family: "Source Serif 4", Georgia, serif;
  font-weight: 600;
  line-height: 1.06;
  letter-spacing: -0.025em;
}

/* the sheet: notebook dots from globals.css, held to the outer band only so
   the cards read as paper laid on paper */
.sheet {
  position: relative;
  background: var(--paper);
  overflow: hidden;
}
.dots {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}
.sheet > *:not(.dots) { position: relative; z-index: 1; }

/* ---- masthead ---- */

.eyebrow {
  display: flex;
  align-items: center;
  gap: calc(var(--u) * 0.75);
  font-family: "JetBrains Mono", ui-monospace, monospace;
  font-size: calc(var(--u) * 0.62);
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink-faint);
  white-space: nowrap;
}
.eyebrow::after {
  content: "";
  flex: 1;
  height: 1px;
  background: var(--line-strong);
}

.headline {
  font-size: calc(var(--u) * 2.72);
  text-wrap: balance;
}
.subline {
  color: var(--ink-soft);
  font-size: calc(var(--u) * 0.92);
  line-height: 1.55;
  max-width: 46ch;
}
`;

/* A phone-with-a-frame glyph, drawn once and used as a mask so it picks up
   coral without a second svg in the markup. */
export const SCAN_ICON =
  `url("data:image/svg+xml,` +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8V5.5A2.5 2.5 0 0 1 5.5 3H8"/><path d="M16 3h2.5A2.5 2.5 0 0 1 21 5.5V8"/><path d="M21 16v2.5a2.5 2.5 0 0 1-2.5 2.5H16"/><path d="M8 21H5.5A2.5 2.5 0 0 1 3 18.5V16"/><path d="M3 12h18"/></svg>`,
  ) +
  `")`;


/** One standalone HTML document: shared skin, then the piece's own CSS. */
export const page = ({ title, css, body, skin = BASE }) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${title}</title>
<style>
${skin}
:root { --scan-icon: ${SCAN_ICON}; }
${css}
</style>
</head>
<body>
${body}
</body>
</html>`;

/**
 * Beaker, coral: the hero character in DESIGN.md, ported static. The liquid is
 * the tilt-time shape at rest, clipped to the glass interior exactly as
 * cast.tsx clips it, so the surface wobble stops at the wall instead of
 * bleeding past it. No pour, no tilt: paper does not scroll.
 */
export const beaker = (cls, clipId = "beaker-interior") =>
  svg(
    `<clipPath id="${clipId}">
       <path d="M31,26 L89.5,25.5 L89.8,86 Q89.6,96 78.5,98 L41.5,98 Q30.6,96 30.4,86 Z"/>
     </clipPath>
     <g clip-path="url(#${clipId})">
       <path d="M12,72.5 Q30,68.5 48,72 T84,71.5 T112,72 L112,116 L12,116 Z" fill="#D96C4F"/>
       <path d="M12,72.5 Q30,68.5 48,72 T84,71.5 T112,72" stroke="${INK}" stroke-width="4.5" stroke-linecap="round"/>
     </g>
     <path d="M31.5,30 Q29.6,60 30.2,86 Q30.4,97.6 41,98.8 L79,98.8 Q89.6,97.6 89.8,86 Q90.4,60 88.5,29.5"
       stroke="${INK}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
     <path d="M33.5,26.5 Q60,21.8 86.5,26" stroke="${INK}" stroke-width="3.6" stroke-linecap="round"/>
     <path d="M31.5,30 Q60,35.5 88.5,29.5 Q92.6,28.4 93.6,31.6" stroke="${INK}" stroke-width="5.5" stroke-linecap="round"/>
     <path d="M77.5,50 L84,50 M77.5,60.5 L84.2,60.5" stroke="${INK}" stroke-width="3.5" stroke-linecap="round"/>
     <circle cx="52" cy="18" r="3.4" stroke="${INK}" stroke-width="3.5"/>
     <circle cx="63" cy="10.5" r="2.4" stroke="${INK}" stroke-width="3.2"/>
     ${eye({ cx: 48.5, cy: 51, tilt: -2 })}
     ${eye({ cx: 68, cy: 50, rx: 9, ry: 10.5, tilt: 2 })}
     ${smile({ cx: 58.5, cy: 63.5 })}`,
    cls,
  );
