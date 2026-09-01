/**
 * Two Instagram posts recruiting high schoolers, 1080 x 1350 (Instagram's
 * tallest allowed frame, 4:5).
 *
 *   instagram-mentor.html    "Be a research mentor."   green
 *   instagram-eventday.html  "Get volunteer hours."    blue
 *
 * They are recruitment posts for the two roles on /volunteer, aimed at MVHS
 * students rather than at the families the student flier targets. The audience
 * scrolls, so the whole post is one headline, one line of proof, three facts,
 * and a code. Nothing else earns its place at thumbnail size.
 *
 * Design: DESIGN.md ("Chalk Lab"). Cream ground, notebook dots, Source Serif 4
 * display, Outfit body, JetBrains Mono rationed to the small data labels,
 * hairline borders, warm shadows, coral as the only accent that points at a
 * call to action. The hue coding matches /volunteer and the printed volunteer
 * flier: blue is event day, green is mentoring.
 *
 * The border is the idea: a ring of lab equipment, every piece of it looking
 * back at the reader. Figures come from cast-static.mjs, which the printed
 * flier shares, so paper and feed cannot drift apart.
 *
 * The QR codes are the same two the volunteer flier carries, encoding the short
 * /forms/d/<id>/viewform URL. The typed link underneath is the /volunteer page
 * rather than a form: a Google Forms id cannot be read off a phone screen and
 * retyped, and Instagram does not linkify captions anyway.
 */
import { readFile, writeFile } from "node:fs/promises";
import {
  FIGURES,
  dottedGround,
} from "./cast-static.mjs";

const here = (p) => new URL(p, import.meta.url);

const fontCss = await readFile(here("./fonts/inlined.css"), "utf8");
const qrEventDay = await readFile(here("./qr/qr-eventday.svg"), "utf8");
const qrMentor = await readFile(here("./qr/qr-mentor.svg"), "utf8");

/**
 * Two surfaces per role. The feed post is the artefact people find later; the
 * story is the one that actually reaches a high schooler on the day it goes
 * up, so it is a first-class layout rather than a crop of the post.
 *
 * Instagram overlays a story's top ~250px with the account header and its
 * bottom ~250px with the reply bar, so every word on the 1920 canvas lives
 * between y 330 and y 1640. The doodles are allowed into those bands: losing
 * a corner of a test tube behind the reply bar costs nothing.
 */
const FEED = { key: "", w: 1080, h: 1350 };
const STORY = { key: "-Story", w: 1080, h: 1920 };

/* SVG ids are document-global once inlined, so every figure instance gets its
   own suffix. Two figures sharing a clipPath id would silently clip one of
   them to the other's shape. */
let uid = 0;
const isolate = (svg) => {
  const n = `i${uid++}`;
  return svg
    .replace(/id="([a-z]+)"/g, (_, id) => `id="${id}-${n}"`)
    .replace(/url\(#([a-z]+)\)/g, (_, id) => `url(#${id}-${n})`);
};

/* ------------------------------------------------------------ the ring -- */
/* Positions are the CENTRE of each figure in canvas pixels. A few sit far
   enough out to be cropped by the frame, which is what keeps the ring from
   reading as a tidy border of stickers. The centre column stays clear: that is
   where the words are. Both rings take the same thirteen figures in the same
   order, so a role looks like itself on either surface. */

FEED.ring = [
  { x: 250, y: 108, s: 138, r: -9 },
  { x: 540, y: 96, s: 154, r: 5 },
  { x: 838, y: 112, s: 130, r: 8 },
  { x: 66, y: 316, s: 146, r: -14 },
  { x: 96, y: 566, s: 126, r: 10 },
  { x: 74, y: 806, s: 158, r: -6 },
  { x: 106, y: 1042, s: 122, r: 13 },
  { x: 1012, y: 310, s: 142, r: 11 },
  { x: 986, y: 558, s: 126, r: -8 },
  { x: 1008, y: 800, s: 152, r: 7 },
  { x: 974, y: 1036, s: 124, r: -12 },
  { x: 196, y: 1262, s: 140, r: 6 },
  { x: 884, y: 1256, s: 146, r: -7 },
];

STORY.ring = [
  { x: 246, y: 286, s: 142, r: -9 },
  { x: 540, y: 214, s: 160, r: 5 },
  { x: 840, y: 292, s: 134, r: 8 },
  { x: 66, y: 520, s: 148, r: -14 },
  { x: 94, y: 806, s: 128, r: 10 },
  { x: 72, y: 1090, s: 160, r: -6 },
  { x: 104, y: 1374, s: 124, r: 13 },
  { x: 1014, y: 512, s: 144, r: 11 },
  { x: 988, y: 798, s: 128, r: -8 },
  { x: 1010, y: 1084, s: 154, r: 7 },
  { x: 976, y: 1368, s: 126, r: -12 },
  { x: 210, y: 1662, s: 144, r: 6 },
  { x: 872, y: 1652, s: 148, r: -7 },
];

const ring = (fmt, order) =>
  fmt.ring.map((slot, i) => {
    const draw = FIGURES[order[i % order.length]];
    const style =
      `left:${slot.x - slot.s / 2}px;top:${slot.y - slot.s / 2}px;` +
      `width:${slot.s}px;height:${slot.s}px;--r:${slot.r}deg`;
    return `<div class="doodle" style="${style}">${isolate(draw("fig"))}</div>`;
  }).join("\n    ");

/* ------------------------------------------------------------- content -- */
/* DESIGN.md copy rules: zero em-dashes, no invented timeframes, and only the
   two real dates. The Sept 13 application deadline is deliberately absent: it
   gates student applications, not volunteer or mentor sign-ups. */

const POSTS = [
  {
    file: "instagram-mentor",
    title: "MV Science Fair · Mentor (Instagram 4:5)",
    hue: "green",
    eyebrow: "MV SCIENCE FAIR &middot; MVHS STEM &amp; RESEARCH CLUB",
    headline: "Be a research<br>mentor.",
    sub: "High schoolers, 1 to 2 hours a week,<br>start to finish. Your student brings the<br>question. You bring the scientific method.",
    /* The four categories the fair runs, in the site's own pigments
       (src/lib/projectIdeas.ts CATEGORY_COLOR), so a prospective mentor can see
       what they would actually be mentoring. Coral is absent on purpose: it is
       reserved for calls to action. */
    chips: [
      { t: "LIFE &amp; HEALTH SCIENCES", hue: "green" },
      { t: "PHYSICAL SCIENCE &amp; ENGINEERING", hue: "blue" },
      { t: "CHEMISTRY &amp; MATERIALS", hue: "marigold" },
      { t: "TECHNOLOGY &amp; INNOVATION", hue: "blue" },
    ],
    qr: qrMentor,
    scan: "Scan to sign up",
    link: "mvsciencefair.vercel.app/volunteer",
    order: [
      "testTube", "flask", "molecule",
      "petri", "beaker", "chart", "atom",
      "microscope", "magnifier", "lightbulb", "pencil",
      "gear", "rocket",
    ],
  },
  {
    file: "instagram-eventday",
    title: "MV Science Fair · Event Day (Instagram 4:5)",
    hue: "blue",
    eyebrow: "MV SCIENCE FAIR &middot; MVHS STEM &amp; RESEARCH CLUB",
    headline: "Get volunteer<br>hours.",
    sub: "Set up the evening before, run check-in and<br>guide families on fair day, then help pack<br>down after. Take any part of it.",
    chips: [
      { t: "SAT, SEPT 26", hue: "blue" },
      { t: "9 AM TO 12 PM", hue: "blue" },
      { t: "AMY IMAI ELEMENTARY", hue: "blue" },
    ],
    qr: qrEventDay,
    scan: "Scan to sign up",
    link: "mvsciencefair.vercel.app/volunteer",
    order: [
      "gear", "beaker", "magnet",
      "rocket", "microscope", "lightbulb", "molecule",
      "flask", "chart", "atom", "magnifier",
      "petri", "testTube",
    ],
  },
];

/* ----------------------------------------------------------------- css -- */

const SCAN_ICON =
  `url("data:image/svg+xml,` +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8V5.5A2.5 2.5 0 0 1 5.5 3H8"/><path d="M16 3h2.5A2.5 2.5 0 0 1 21 5.5V8"/><path d="M21 16v2.5a2.5 2.5 0 0 1-2.5 2.5H16"/><path d="M8 21H5.5A2.5 2.5 0 0 1 3 18.5V16"/><path d="M3 12h18"/></svg>`,
  ) +
  `")`;

const CSS = `
${fontCss}

:root {
  --paper: #F7F5EF;
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
  --scan-icon: ${SCAN_ICON};
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

.post {
  position: relative;
  overflow: hidden;
  background: var(--paper);
}
.dots { position: absolute; inset: 0; z-index: 0; }

/* ---- the ring ---- */

.doodle {
  position: absolute;
  z-index: 1;
  transform: rotate(var(--r));
}
.doodle .fig { display: block; width: 100%; height: 100%; overflow: visible; }

/* ---- the words ---- */

.core {
  position: absolute;
  z-index: 2;
  left: 96px;
  right: 96px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.eyebrow {
  font-family: "JetBrains Mono", ui-monospace, monospace;
  font-size: 19px;
  font-weight: 500;
  letter-spacing: 0.17em;
  text-transform: uppercase;
  color: var(--ink-faint);
}

.headline {
  color: var(--ink);
  font-family: "Source Serif 4", Georgia, serif;
  font-weight: 600;
  line-height: 1.0;
  letter-spacing: -0.03em;
}

/* the one flourish: a hand-drawn rule under the promise, in the role's hue */
.rule { width: 168px; height: 12px; }

.sub {
  font-size: 30px;
  font-weight: 400;
  line-height: 1.42;
  color: var(--ink-soft);
}

.facts {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px 12px;
  max-width: 900px;
}
.facts li {
  list-style: none;
  border-radius: 999px;
  padding: 11px 18px 12px;
  font-family: "JetBrains Mono", ui-monospace, monospace;
  font-size: 17px;
  font-weight: 500;
  letter-spacing: 0.07em;
  line-height: 1;
  color: var(--ink);
  white-space: nowrap;
}
.chip--green { background: var(--green-soft); }
.chip--blue { background: var(--blue-soft); }
.chip--marigold { background: var(--marigold-soft); }

/* ---- sign up ---- */

.signup {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.qr {
  padding: 13px;
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 20px;
  box-shadow: var(--shadow-md);
}
.qr svg { display: block; width: 100%; height: 100%; }

.scan {
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--coral-deep);
  font-size: 27px;
  font-weight: 600;
  line-height: 1;
}
.scan::before {
  content: "";
  width: 29px;
  height: 29px;
  flex: none;
  background: var(--coral);
  -webkit-mask: var(--scan-icon) center / contain no-repeat;
  mask: var(--scan-icon) center / contain no-repeat;
}

.link {
  margin-top: 12px;
  font-family: "JetBrains Mono", ui-monospace, monospace;
  font-size: 22px;
  font-weight: 500;
  letter-spacing: 0.01em;
  color: var(--ink-soft);
}
`;

/* Everything the two canvases disagree about, in one place each. The feed post
   fills a 4:5 frame edge to edge; the story spends its extra 570px of height on
   air between the blocks and on a bigger code, because a story is read at arm's
   length for about five seconds and then swiped. */

FEED.css = `
  html, body, .post { width: 1080px; height: 1350px; }
  .core { top: 176px; bottom: 128px; }
  .headline { margin-top: 56px; font-size: 110px; line-height: 1.0; }
  .rule { margin-top: 34px; }
  .sub { margin-top: 30px; }
  .facts { margin-top: 38px; }
  .signup { margin-top: 72px; }
  .qr { width: 238px; height: 238px; }
`;

STORY.css = `
  html, body, .post { width: 1080px; height: 1920px; }
  .core { top: 356px; bottom: 300px; }
  .eyebrow { font-size: 20px; letter-spacing: 0.18em; }
  .headline { margin-top: 74px; font-size: 118px; line-height: 1.02; }
  .rule { margin-top: 48px; width: 190px; }
  .sub { margin-top: 44px; font-size: 33px; }
  .facts { margin-top: 54px; gap: 13px; }
  .facts li { font-size: 18px; padding: 12px 20px 13px; }
  .signup { margin-top: 116px; }
  .qr { width: 272px; height: 272px; }
  .scan { margin-top: 24px; font-size: 30px; }
  .scan::before { width: 32px; height: 32px; }
  .link { margin-top: 14px; font-size: 24px; }
`;

const FORMATS = [FEED, STORY];

/** The hand-drawn rule: a single wobbling stroke, not a border. */
const rule = (hue) =>
  `<svg class="rule" viewBox="0 0 168 12" fill="none" aria-hidden="true">
    <path d="M3,7.5 Q42,2.6 84,6.4 T165,4.6" stroke="var(--${hue})" stroke-width="6" stroke-linecap="round"/>
  </svg>`;

const render = (p, fmt) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${p.title}${fmt.key ? " Story" : ""}</title>
<style>
${CSS}
${fmt.css}
</style>
</head>
<body>
<div class="post post--${p.hue}">
  ${dottedGround(fmt.w, fmt.h, 30, 1.4)}
  ${ring(fmt, p.order)}
  <div class="core">
    <p class="eyebrow">${p.eyebrow}</p>
    <h1 class="headline">${p.headline}</h1>
    ${rule(p.hue)}
    <p class="sub">${p.sub}</p>
    <ul class="facts">${p.chips.map((c) => `<li class="chip--${c.hue}">${c.t}</li>`).join("")}</ul>
    <div class="signup">
      <div class="qr">${p.qr}</div>
      <p class="scan">${p.scan}</p>
      <p class="link">${p.link}</p>
    </div>
  </div>
</div>
</body>
</html>`;

for (const p of POSTS) {
  for (const fmt of FORMATS) {
    const name = `${p.file}${fmt.key.toLowerCase()}`;
    const html = render(p, fmt);
    await writeFile(here(`./${name}.html`), html);
    console.error(`${name}.html  ${(html.length / 1024).toFixed(0)}KB`);
  }
}
