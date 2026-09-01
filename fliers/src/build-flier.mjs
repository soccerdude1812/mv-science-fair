/**
 * MV Science Fair volunteer + mentor flier, two layouts from one content source.
 *
 *   flier-slide.html  16:9, sized to the Google Slides canvas (960x540 pt)
 *   flier-print.html  8.5 x 11 portrait, for printing and posting
 *
 * Everything traces to DESIGN.md ("Chalk Lab"): the token values, the type
 * stack, the 16px container / pill interactive radius system, hairline borders,
 * warm never-black shadows, and the character style contract. The characters
 * are static ports of src/components/lab/cast.tsx, same path data and the same
 * derived-geometry formulas, with the motion stripped and pupils at rest.
 *
 * Colour coding follows /volunteer, which is already live: blue = event day,
 * green = mentor. Coral stays the accent that points at the two QR codes.
 */
import { readFile, writeFile } from "node:fs/promises";

const here = (p) => new URL(p, import.meta.url);

const fontCss = await readFile(here("./fonts/inlined.css"), "utf8");
const qrEventDay = await readFile(here("./qr/qr-eventday.svg"), "utf8");
const qrMentor = await readFile(here("./qr/qr-mentor.svg"), "utf8");

/* ------------------------------------------------------------------ cast -- */
/* Ports of cast.tsx. INK/pigment come out as literal hex because the SVG is
   inlined into a print document where CSS custom properties on <html> would
   still resolve, but a PDF renderer given the file standalone should not have
   to. Stroke widths, radii and wobble are copied verbatim. */

const INK = "#22211C";

/** cast.tsx <Eye>: white ellipse, low pupil, heavy upper lid, optional tilt. */
function eye({ cx, cy, rx = 8.5, ry = 10, tilt = 0 }) {
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
function smile({ cx, cy, w = 8, depth = 3 }) {
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
const dottedGround = (w, h, step) => {
  const dots = [];
  for (let y = step / 2; y < h; y += step)
    for (let x = step / 2; x < w; x += step)
      dots.push(`<circle cx="${+x.toFixed(1)}" cy="${+y.toFixed(1)}" r="1.1"/>`);
  return `<svg class="dots" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" aria-hidden="true">
    <g fill="#22211C" fill-opacity="0.066">${dots.join("")}</g>
  </svg>`;
};

const svg = (body, cls) =>
  `<svg class="${cls}" viewBox="0 0 120 120" fill="none" aria-hidden="true">${body}</svg>`;

/** Lightbulb: the volunteer-band character in DESIGN.md. Marigold glow. */
const lightbulb = (cls) =>
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
const gear = (cls) => {
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
const testTube = (cls) =>
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

/* --------------------------------------------------------------- content -- */
/* Copy obeys DESIGN.md: zero em-dashes, no invented timeframes. The Sept 13
   deadline is the STUDENT application deadline and is deliberately absent here;
   it does not gate volunteer or mentor sign-ups, so printing it would be wrong.
   Sept 26 is the only date on the flier. Role copy tracks /volunteer so the page and the
   paper say the same thing. */

const ROLES = [
  {
    key: "eventday",
    hue: "blue",
    mark: gear,
    chip: "High schoolers and community members",
    title: "Help on fair day",
    when: "Sat, September 26 · 9 AM to 12 PM",
    tasks: ["Event setup and cleanup", "Registration and check-in", "Guiding visitors and families"],
    kicker: "A great way to earn community service hours.",
    qr: qrEventDay,
    scan: "Scan to sign up",
  },
  {
    key: "mentor",
    hue: "green",
    mark: testTube,
    chip: "High school students",
    title: "Mentor a young scientist",
    when: "One to two hours a week before the fair",
    tasks: ["Guide project development", "Help with the scientific method", "Build student confidence"],
    kicker: "You advise and support. The project stays the student’s own.",
    qr: qrMentor,
    scan: "Scan to sign up",
  },
];

const EYEBROW = "MV SCIENCE FAIR · SEPTEMBER 26, 2026";
const HEADLINE = "Two ways to help young scientists.";
const SUBLINE =
  "The MV Science Fair is student-led. Give a few hours on fair day, or mentor a student through their project.";
const VENUE = "Amy Imai Elementary, Multi-Use Room · 253 Martens Ave, Mountain View";
const LINKS = "mvsciencefair.vercel.app · stemresearchclubmvhs@gmail.com · @stemresearchclubmvhs";
const DISCLAIMER =
  "Organized by the Mountain View High School STEM &amp; Research Club. Not affiliated with or endorsed by MVWSD.";

const check = (hue) =>
  `<svg class="tick" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8.5 L6.4 12 L13 4.6"
     stroke="var(--${hue})" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const roleCard = (r) => `
<section class="card card--${r.hue}">
  <div class="card__body">
    ${r.mark("mark")}
    <span class="chip chip--${r.hue}">${r.chip}</span>
    <h2 class="card__title">${r.title}</h2>
    <p class="card__when">${r.when}</p>
    <ul class="tasks">
      ${r.tasks.map((t) => `<li>${check(r.hue)}<span>${t}</span></li>`).join("\n      ")}
    </ul>
    <p class="kicker">${r.kicker}</p>
  </div>
  <div class="card__foot">
    <div class="qr">${r.qr}</div>
    <p class="qr__label">${r.scan}</p>
  </div>
</section>`;

/** WHEN / WHERE / QUESTIONS strip: the print sheet has room for the facts, the
    slide does not and does not need them (the venue lives in its footer). */
const FACTS = [
  ["When", ["Saturday, September 26, 2026", "9:00 AM to 12:00 PM"]],
  ["Where", ["Amy Imai Elementary (MUR)", "253 Martens Ave, Mountain View"]],
  ["Questions", ["stemresearchclubmvhs@gmail.com", "mvsciencefair.vercel.app"]],
];

const factStrip = `
<dl class="facts">
  ${FACTS.map(
    ([label, lines]) => `<div class="facts__item">
    <dt class="facts__label">${label}</dt>
    ${lines.map((l) => `<dd class="facts__line">${l}</dd>`).join("\n    ")}
  </div>`,
  ).join("\n  ")}
</dl>`;

/* ------------------------------------------------------------------ css -- */
/* Shared skin. Each layout then sets --u (its type/space unit) and its own
   grid; nothing below re-specifies a colour or a radius. */

const SKIN = `
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

/* ---- role cards ---- */

.card {
  position: relative;
  display: flex;
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: calc(var(--u) * 1.05);
  box-shadow: var(--shadow-sm);
  padding: calc(var(--u) * 1.15);
  overflow: hidden;
}
/* one hairline of pigment so the two roles are told apart at a glance,
   without letting a pigment hue become a button */
.card--blue { border-top: 3px solid var(--blue); }
.card--green { border-top: 3px solid var(--green); }

.card__body {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1;
}

.chip {
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: calc(var(--u) * 0.24) calc(var(--u) * 0.66);
  font-size: calc(var(--u) * 0.6);
  font-weight: 500;
  line-height: 1.25;
  color: var(--ink);
}
.chip--blue { background: var(--blue-soft); }
.chip--green { background: var(--green-soft); }

.card__title {
  margin-top: calc(var(--u) * 0.55);
  font-size: calc(var(--u) * 1.4);
  text-wrap: balance;
}
.card__when {
  margin-top: calc(var(--u) * 0.3);
  font-family: "JetBrains Mono", ui-monospace, monospace;
  font-size: calc(var(--u) * 0.58);
  font-weight: 500;
  letter-spacing: 0.03em;
  color: var(--ink-faint);
}

/* the character marks the card from its own corner, the way a stamp marks a
   page: present, never opening a column that pushes the text around */
.mark {
  position: absolute;
  top: calc(var(--u) * 0.95);
  right: calc(var(--u) * 0.95);
  width: calc(var(--u) * 2.4);
  height: calc(var(--u) * 2.4);
}

.tasks { list-style: none; display: grid; gap: calc(var(--u) * 0.42); }
.tasks li {
  display: flex;
  align-items: flex-start;
  gap: calc(var(--u) * 0.42);
  font-size: calc(var(--u) * 0.78);
  line-height: 1.4;
  color: var(--ink-soft);
}
.tick {
  flex: none;
  width: calc(var(--u) * 0.78);
  height: calc(var(--u) * 0.78);
  margin-top: calc(var(--u) * 0.06);
}

.kicker {
  font-size: calc(var(--u) * 0.68);
  line-height: 1.45;
  color: var(--ink-faint);
  max-width: 34ch;
}

.card__foot {
  flex: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: calc(var(--u) * 0.4);
}
.qr {
  background: #fff;
  border-radius: calc(var(--u) * 0.2);
}
.qr svg { display: block; width: 100%; height: 100%; }
.qr__label {
  display: flex;
  align-items: center;
  gap: calc(var(--u) * 0.3);
  color: var(--coral-deep);
  font-size: calc(var(--u) * 0.76);
  font-weight: 600;
  line-height: 1.2;
  white-space: nowrap;
}
/* the coral pointer: the one place the accent hue appears, aimed at the code */
.qr__label::before {
  content: "";
  width: calc(var(--u) * 0.82);
  height: calc(var(--u) * 0.82);
  flex: none;
  background: var(--coral);
  -webkit-mask: var(--scan-icon) center / contain no-repeat;
  mask: var(--scan-icon) center / contain no-repeat;
}

/* ---- facts strip (print only) ---- */

.facts {
  display: grid;
  grid-template-columns: 1fr 1.12fr 1.08fr;
  gap: calc(var(--u) * 1.1);
  border-top: 1px solid var(--line-strong);
  padding-top: calc(var(--u) * 0.75);
}
.facts__label {
  font-family: "JetBrains Mono", ui-monospace, monospace;
  font-size: calc(var(--u) * 0.55);
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink-faint);
  margin-bottom: calc(var(--u) * 0.3);
}
.facts__line {
  font-size: calc(var(--u) * 0.72);
  line-height: 1.4;
  color: var(--ink);
}

/* ---- footer ---- */

.foot {
  display: flex;
  flex-direction: column;
  gap: calc(var(--u) * 0.22);
  border-top: 1px solid var(--line-strong);
  padding-top: calc(var(--u) * 0.7);
}
.foot__venue {
  font-size: calc(var(--u) * 0.7);
  font-weight: 500;
  color: var(--ink);
}
.foot__links {
  font-family: "JetBrains Mono", ui-monospace, monospace;
  font-size: calc(var(--u) * 0.6);
  letter-spacing: 0.02em;
  color: var(--coral-deep);
}
.foot__legal {
  font-size: calc(var(--u) * 0.55);
  color: var(--ink-faint);
}
`;

/* A phone-with-a-frame glyph, drawn once and used as a mask so it picks up
   coral without a second svg in the markup. */
const SCAN_ICON =
  `url("data:image/svg+xml,` +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8V5.5A2.5 2.5 0 0 1 5.5 3H8"/><path d="M16 3h2.5A2.5 2.5 0 0 1 21 5.5V8"/><path d="M21 16v2.5a2.5 2.5 0 0 1-2.5 2.5H16"/><path d="M8 21H5.5A2.5 2.5 0 0 1 3 18.5V16"/><path d="M3 12h18"/></svg>`,
  ) +
  `")`;

const page = ({ title, css, body }) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${title}</title>
<style>
${SKIN}
:root { --scan-icon: ${SCAN_ICON}; }
${css}
</style>
</head>
<body>
${body}
</body>
</html>`;


/* ---------------------------------------------------------------- slide -- */
/* 960 x 540 CSS px is exactly the Google Slides 16:9 canvas (10 x 5.625 in at
   96dpi), so the exported PNG drops in edge to edge with no rescaling.
   Landscape gets a rail: the argument reads down the left, the two answers sit
   stacked and equal on the right, each ending in its own code. */

const slide = page({
  title: "MV Science Fair · Volunteer and Mentor (16:9)",
  css: `
  :root { --u: 17px; }
  body { width: 960px; height: 540px; }
  .sheet {
    width: 960px;
    height: 540px;
    padding: calc(var(--u) * 1.5) calc(var(--u) * 1.9);
    display: grid;
    grid-template-rows: auto 1fr auto;
    gap: calc(var(--u) * 0.85);
  }

  .body {
    display: grid;
    grid-template-columns: calc(var(--u) * 19.4) 1fr;
    column-gap: calc(var(--u) * 1.35);
    min-height: 0;
  }
  .rail { display: flex; flex-direction: column; min-width: 0; }
  .headline { font-size: calc(var(--u) * 2.55); }
  .subline { margin-top: calc(var(--u) * 0.7); font-size: calc(var(--u) * 0.8); }
  .bulb {
    width: calc(var(--u) * 6.8);
    height: calc(var(--u) * 6.8);
    margin-top: auto;
    margin-left: calc(var(--u) * -0.4);
  }

  .roles { display: grid; grid-template-rows: 1fr 1fr; gap: calc(var(--u) * 0.8); min-height: 0; }

  /* horizontal card: the reasons, then the code behind a rule */
  .card { align-items: center; gap: calc(var(--u) * 0.9); padding: calc(var(--u) * 0.95) calc(var(--u) * 1.05); }
  .card__body { gap: 0; }
  .chip { max-width: calc(100% - var(--u) * 2.7); }
  .card__title { font-size: calc(var(--u) * 1.2); margin-top: calc(var(--u) * 0.36); }
  .card__when { margin-top: calc(var(--u) * 0.22); }
  .tasks { margin-top: calc(var(--u) * 0.52); gap: calc(var(--u) * 0.24); }
  .tasks li { font-size: calc(var(--u) * 0.7); }
  .kicker { margin-top: calc(var(--u) * 0.46); font-size: calc(var(--u) * 0.63); max-width: none; }
  .mark {
    top: 50%;
    right: calc(var(--u) * 0.3);
    transform: translateY(-50%);
    width: calc(var(--u) * 3.7);
    height: calc(var(--u) * 3.7);
  }
  .card__foot {
    align-self: stretch;
    justify-content: center;
    padding-left: calc(var(--u) * 0.95);
    border-left: 1px solid var(--line);
  }
  .qr { width: calc(var(--u) * 5.3); height: calc(var(--u) * 5.3); }
  .qr__label { font-size: calc(var(--u) * 0.7); }

  .foot {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: end;
    column-gap: calc(var(--u) * 1.4);
    border-top: 1px solid var(--line-strong);
  }
  .foot__legal { grid-column: 2; grid-row: 1 / span 2; text-align: right; max-width: 30em; align-self: end; }
  `,
  body: `<div class="sheet">
  ${dottedGround(960, 540, 23)}
  <p class="eyebrow">${EYEBROW}</p>
  <div class="body">
    <div class="rail">
      <h1 class="headline">${HEADLINE}</h1>
      <p class="subline">${SUBLINE}</p>
      ${lightbulb("bulb")}
    </div>
    <div class="roles">
      ${ROLES.map(roleCard).join("\n")}
    </div>
  </div>
  <footer class="foot">
    <p class="foot__venue">${VENUE}</p>
    <p class="foot__links">${LINKS}</p>
    <p class="foot__legal">${DISCLAIMER}</p>
  </footer>
</div>`,
});

/* ---------------------------------------------------------------- print -- */
/* 816 x 1056 CSS px = 8.5 x 11 in at 96dpi. Chrome prints this 1:1 with no
   page margin, so the dotted ground reaches the sheet edge. Portrait puts the
   two roles side by side, mirroring /volunteer, and spends the recovered
   height on the facts a poster on a wall actually has to answer. */

const print = page({
  title: "MV Science Fair · Volunteer and Mentor (8.5x11)",
  css: `
  :root { --u: 20px; }
  @page { size: 8.5in 11in; margin: 0; }
  body { width: 816px; height: 1056px; }
  .sheet {
    width: 816px;
    height: 1056px;
    padding: calc(var(--u) * 2.2) calc(var(--u) * 2.2) calc(var(--u) * 1.9);
    display: grid;
    grid-template-rows: auto auto auto auto;
    align-content: space-between;
    gap: calc(var(--u) * 1.15);
  }

  .masthead { display: grid; gap: calc(var(--u) * 0.55); }
  .masthead__row {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    column-gap: calc(var(--u) * 1);
  }
  .bulb { width: calc(var(--u) * 4.6); height: calc(var(--u) * 4.6); }
  .headline { font-size: calc(var(--u) * 2.5); }
  .subline { font-size: calc(var(--u) * 0.88); max-width: 40ch; }

  /* two roles, side by side and equal: the choice is the whole message */
  .roles { display: grid; grid-template-columns: 1fr 1fr; gap: calc(var(--u) * 0.95); min-height: 0; }
  .card { flex-direction: column; gap: calc(var(--u) * 0.7); padding: calc(var(--u) * 1.2) calc(var(--u) * 1.1); }
  .mark { width: calc(var(--u) * 2.4); height: calc(var(--u) * 2.4); top: 0; right: 0; }
  .card__body { gap: 0; }
  .chip { max-width: calc(100% - var(--u) * 2.9); }
  .card__title { margin-top: calc(var(--u) * 0.6); font-size: calc(var(--u) * 1.34); }
  .tasks { margin-top: calc(var(--u) * 0.8); gap: calc(var(--u) * 0.4); }
  .tasks li { font-size: calc(var(--u) * 0.76); }
  .kicker { margin-top: calc(var(--u) * 0.7); }
  .card__foot {
    margin-top: auto;
    padding-top: calc(var(--u) * 0.9);
    border-top: 1px solid var(--line);
    align-self: stretch;
  }
  /* 1.6in box puts ~0.85mm per module on paper, well above what a phone
     camera needs at arm's length from a wall */
  .qr { width: calc(var(--u) * 7.7); height: calc(var(--u) * 7.7); }
  .qr__label { font-size: calc(var(--u) * 0.8); }

  .foot { border-top: none; padding-top: 0; }
  .foot__links { font-size: calc(var(--u) * 0.62); }
  `,
  body: `<div class="sheet">
  ${dottedGround(816, 1056, 27)}
  <header class="masthead">
    <p class="eyebrow">${EYEBROW}</p>
    <div class="masthead__row">
      <h1 class="headline">${HEADLINE}</h1>
      ${lightbulb("bulb")}
    </div>
    <p class="subline">${SUBLINE}</p>
  </header>
  <div class="roles">
    ${ROLES.map(roleCard).join("\n")}
  </div>
  ${factStrip}
  <footer class="foot">
    <p class="foot__links">${LINKS}</p>
    <p class="foot__legal">${DISCLAIMER}</p>
  </footer>
</div>`,
});

await writeFile(here("./flier-slide.html"), slide);
await writeFile(here("./flier-print.html"), print);
console.error(`slide ${(slide.length / 1024).toFixed(0)}KB · print ${(print.length / 1024).toFixed(0)}KB`);
