/**
 * Club activity post: elephant toothpaste at lunch, Instagram 4:5 (1080x1350).
 *
 *   node build-elephant.mjs
 *
 * writes instagram-elephant-toothpaste.html, then shoots it with headless
 * Chrome at 1x into ../MV-STEM-Club-IG-Elephant-Toothpaste.png. 1080x1350 is
 * Instagram's tallest feed frame, so the upload is never rescaled.
 *
 * Same Chalk Lab skin as the fair posts so the feed reads as one account, but
 * one hero instead of a ring of characters: the cast's flask, deadpan, with a
 * striped foam column erupting out of its neck.
 *
 * The foam is a union of circles and round-capped strokes. Every piece is
 * drawn once in ink, fattened by OUTLINE on each side, then again in white at
 * true size, so the overlaps vanish and only the outer silhouette keeps a line.
 * The same pieces, white, make the mask that holds the stripes inside it.
 */
import { execFileSync } from "node:child_process";
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { fontCss, dottedGround, here, INK } from "./chalk.mjs";

const W = 1080;
const H = 1350;
const OUTLINE = 12;
const FOAM = "#FFFFFF";

const n = (v) => +v.toFixed(1);

/* deterministic jitter, so a rebuild is byte-identical */
let seed = 7;
const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
const jit = (a) => (rand() * 2 - 1) * a;

/* ---------------------------------------------------------------- flask -- */
/* cast flask (the one on the event-day post), scaled up. Box units, so stroke
   widths here are a third of the on-screen width. */
const S = 3.5;
const FLASK_X = W / 2 - 60 * S;
const BASE_Y = 1016;
const FLASK_Y = BASE_Y - 100 * S;
const toPx = (x, y) => [FLASK_X + x * S, FLASK_Y + y * S];

function eye({ cx, cy, rx, ry, tilt = 0 }) {
  const lid =
    `M${n(cx - rx + 0.5)},${n(cy - ry * 0.28)} ` +
    `Q${n(cx - rx * 0.2)},${n(cy - ry * 0.72)} ${n(cx + rx - 0.5)},${n(cy - ry * 0.34)}`;
  return `<g transform="rotate(${tilt} ${cx} ${cy})">
      <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#fff" stroke="${INK}" stroke-width="3.4"/>
      <circle cx="${cx}" cy="${n(cy + ry * 0.3)}" r="${n(ry * 0.46)}" fill="${INK}"/>
      <path d="${lid}" fill="none" stroke="${INK}" stroke-width="3.1" stroke-linecap="round"/>
    </g>`;
}

const flask = `<g transform="translate(${FLASK_X} ${FLASK_Y}) scale(${S})">
    <clipPath id="flask-in"><path d="M49,24 L49,54 L26,92 Q22,100 31,100 L89,100 Q98,100 94,92 L71,54 L71,24 Z"/></clipPath>
    <g clip-path="url(#flask-in)">
      <path d="M8,84 Q26,80 44,83.5 T80,83 T116,83.5 L116,118 L8,118 Z" fill="#D96C4F"/>
      <path d="M8,84 Q26,80 44,83.5 T80,83 T116,83.5" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
    </g>
    <path d="M49.5,23 Q48.6,40 49,54 L26.5,91.5 Q22.6,99.4 31.4,99.6 L88.8,99.6 Q97.6,99.4 93.7,91.5 L71,54 Q71.4,40 70.5,23"
      fill="none" stroke="${INK}" stroke-width="4.2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M43.5,22.5 Q60,19.6 76.5,22.8" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
    ${eye({ cx: 51.5, cy: 66, rx: 6.8, ry: 8.2, tilt: -2 })}
    ${eye({ cx: 68.5, cy: 65.5, rx: 7, ry: 8.4, tilt: 2 })}
    <ellipse cx="60.4" cy="77.6" rx="2.5" ry="3" fill="${INK}"/>
  </g>`;

/* ----------------------------------------------------------------- foam -- */
const blobs = []; // [x, y, r]
const drips = []; // [x1, y1, x2, y2, width]

const [lipL] = toPx(43.5, 22.5);
const [lipR, lipY] = toPx(76.5, 22.5);
const [neckL] = toPx(49, 0);
const [neckR] = toPx(71, 0);
const mid = W / 2;

/* collar: foam already over the lip */
blobs.push([lipL + 20, lipY + 6, 24], [mid, lipY - 4, 34], [lipR - 20, lipY + 6, 24]);
/* runs down the outside of the neck */
drips.push([neckL + 1, lipY + 10, neckL - 2, lipY + 66, 24]);
blobs.push([neckL - 2, lipY + 70, 15]);
drips.push([neckR - 2, lipY + 10, neckR + 1, lipY + 40, 21]);
blobs.push([neckR + 1, lipY + 44, 12.5]);

/* the column: a cubic from the mouth up into the cloud, fattening as it goes,
   with scallops on both flanks so it reads as foam and not as a tube */
const P = [
  [mid, lipY - 4],
  [mid + 20, lipY - 70],
  [mid - 22, lipY - 130],
  [mid + 2, lipY - 200],
];
const bez = (t, i) =>
  (1 - t) ** 3 * P[0][i] + 3 * (1 - t) ** 2 * t * P[1][i] + 3 * (1 - t) * t ** 2 * P[2][i] + t ** 3 * P[3][i];
const dBez = (t, i) =>
  3 * (1 - t) ** 2 * (P[1][i] - P[0][i]) + 6 * (1 - t) * t * (P[2][i] - P[1][i]) + 3 * t ** 2 * (P[3][i] - P[2][i]);
const colR = (t) => 34 + 26 * t ** 1.4;
for (let t = 0; t <= 1.0001; t += 0.025) blobs.push([bez(t, 0), bez(t, 1), colR(t)]);
for (let t = 0.07; t <= 0.98; t += 0.1) {
  const r = colR(t);
  const dx = dBez(t, 0);
  const dy = dBez(t, 1);
  const len = Math.hypot(dx, dy);
  const [nx, ny] = [-dy / len, dx / len];
  for (const side of [-1, 1]) {
    const off = r * (0.8 + jit(0.06));
    blobs.push([bez(t, 0) + side * nx * off, bez(t, 1) + side * ny * off, r * (0.36 + jit(0.06))]);
  }
}

/* the cloud it blooms into */
const CY = lipY - 292;
blobs.push(
  [mid, CY + 6, 88],
  [mid - 82, CY + 34, 63],
  [mid + 80, CY + 30, 66],
  [mid - 53, CY - 44, 61],
  [mid + 53, CY - 49, 63],
  [mid + 2, CY - 78, 53],
  [mid - 128, CY + 60, 44],
  [mid + 133, CY + 63, 43],
  [mid - 109, CY - 5, 44],
  [mid + 109, CY - 14, 48],
  [mid, CY + 78, 53],
);
/* a scalloped rim, so the edge is many small bubbles rather than six big ones */
for (let i = 0; i < 28; i++) {
  const a = (i / 28) * Math.PI * 2 + jit(0.05);
  blobs.push([mid + Math.cos(a) * (156 + jit(7)), CY + 2 + Math.sin(a) * (104 + jit(7)), 26 + jit(6)]);
}
/* where it flops over the side and starts to run */
drips.push([mid - 142, CY + 72, mid - 147, CY + 120, 40]);
blobs.push([mid - 147, CY + 126, 23]);
drips.push([mid + 150, CY + 76, mid + 153, CY + 102, 32]);
blobs.push([mid + 153, CY + 107, 17.5]);

const circle = ([x, y, r], extra) =>
  `<circle cx="${n(x)}" cy="${n(y)}" r="${n(r + extra)}"/>`;
const capsule = ([x1, y1, x2, y2, w], extra) =>
  `<path d="M${n(x1)},${n(y1)} L${n(x2)},${n(y2)}" stroke-width="${n(w + extra * 2)}"/>`;
const pieces = (extra) =>
  blobs.map((b) => circle(b, extra)).join("") + drips.map((d) => capsule(d, extra)).join("");

/* stripes: food colouring streaks that ride up the column and fan out across
   the cloud, running past its rim so the mask, not a round cap, ends them.
   They fade in out of the mouth and out as they climb, so the top of the cloud stays white foam. */
const STREAKS = [
  { k: -1.5, c: "#4E7DC4" },
  { k: -0.5, c: "#D96C4F" },
  { k: 0.5, c: "#DFA33C" },
  { k: 1.5, c: "#619B6E" },
];
const streak = ({ k, c }) => {
  const pts = [];
  for (let t = 0; t <= 1.0001; t += 0.05) {
    const sway = Math.sin(t * Math.PI * 2.2 + k) * 3;
    pts.push([bez(t, 0) + k * colR(t) * 0.5 + sway, bez(t, 1) + 24 * (1 - t)]);
  }
  const [ex, ey] = pts.at(-1);
  const tip = [mid + k * 170, CY - 170];
  const ctrl = [ex + k * 14, ey - 90];
  const d =
    `M${pts.map(([x, y]) => `${n(x)},${n(y)}`).join(" L")} ` +
    `Q${n(ctrl[0])},${n(ctrl[1])} ${n(tip[0])},${n(tip[1])}`;
  return `<path d="${d}" stroke="${c}" stroke-width="19" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`;
};

/* bubbles inside the foam, and a few that got away */
const inner = [
  [mid - 104, CY - 30, 8], [mid + 118, CY + 22, 9.5], [mid + 64, CY - 66, 5.5],
  [mid - 60, CY - 74, 6], [mid - 128, CY + 46, 5],
];
const loose = [
  [mid - 232, CY - 54, 12], [mid - 262, CY + 16, 6.5], [mid + 236, CY - 80, 13],
  [mid + 268, CY - 12, 7], [mid + 190, CY - 150, 8], [mid - 214, lipY - 78, 8],
];
const bubble = ([x, y, r], sw) =>
  `<circle cx="${n(x)}" cy="${n(y)}" r="${r}" fill="${FOAM}" stroke="${INK}" stroke-width="${sw}"/>`;

const foam = `
    <mask id="foam" maskUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="${H}">
      <g fill="#fff" stroke="#fff" stroke-linecap="round">${pieces(0)}</g>
    </mask>
    <linearGradient id="climb" gradientUnits="userSpaceOnUse" x1="0" y1="${n(lipY + 30)}" x2="0" y2="${n(CY - 110)}">
      <stop offset="0" stop-color="#fff" stop-opacity="0"/>
      <stop offset="0.17" stop-color="#fff"/>
      <stop offset="0.4" stop-color="#fff"/>
      <stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <mask id="fade" maskUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="${H}">
      <rect width="${W}" height="${H}" fill="url(#climb)"/>
    </mask>
    <g fill="${INK}" stroke="${INK}" stroke-linecap="round">${pieces(OUTLINE)}</g>
    <g fill="${FOAM}" stroke="${FOAM}" stroke-linecap="round">${pieces(0)}</g>
    <g mask="url(#foam)">
      <g mask="url(#fade)" opacity="0.9">${STREAKS.map(streak).join("")}</g>
      ${inner.map((b) => bubble(b, 4)).join("")}
    </g>
    ${loose.map((b) => bubble(b, 4.5)).join("")}`;

const shadow = `<ellipse cx="${mid}" cy="${BASE_Y + 4}" rx="186" ry="12" fill="rgba(64,54,32,0.09)"/>`;

const art = `<svg class="art" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" aria-hidden="true">
    ${shadow}
    ${flask}
    ${foam}
  </svg>`;

/* ----------------------------------------------------------------- page -- */
const css = `
:root {
  --paper: #F7F5EF;
  --ink: #22211C;
  --ink-soft: #5A574C;
  --ink-faint: #6B675A;
  --coral-deep: #AE4527;
  --coral-soft: #F8E6DF;
}
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body {
  width: ${W}px;
  height: ${H}px;
  background: var(--paper);
  color: var(--ink-soft);
  font-family: "Outfit", system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  text-rendering: geometricPrecision;
}
.post { position: relative; width: ${W}px; height: ${H}px; overflow: hidden; background: var(--paper); }
.dots, .art { position: absolute; inset: 0; }
.words {
  position: absolute;
  left: 96px;
  right: 96px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.top { top: 84px; }
.bottom { top: 1062px; }
.eyebrow {
  font-size: 21px;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--ink-faint);
}
h1 {
  margin-top: 26px;
  color: var(--ink);
  font-family: "Source Serif 4", Georgia, serif;
  font-weight: 600;
  font-size: 92px;
  line-height: 1;
  white-space: nowrap;
  letter-spacing: -0.03em;
}
.invite {
  font-size: 38px;
  line-height: 1.38;
  max-width: 800px;
  text-wrap: balance;
}
.invite b { font-weight: 600; color: var(--ink); }
.when {
  margin-top: 30px;
  padding: 12px 22px 13px;
  border-radius: 999px;
  background: var(--coral-soft);
  color: var(--coral-deep);
  font-family: "JetBrains Mono", ui-monospace, monospace;
  font-size: 19px;
  font-weight: 500;
  letter-spacing: 0.08em;
  line-height: 1;
  text-transform: uppercase;
}
`;

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Elephant Toothpaste (Instagram 4:5)</title>
<style>
${fontCss}
${css}
</style>
</head>
<body>
<div class="post">
  ${dottedGround(W, H, 30)}
  ${art}
  <div class="words top">
    <p class="eyebrow">MVHS STEM &amp; Research Club</p>
    <h1>Elephant toothpaste</h1>
  </div>
  <div class="words bottom">
    <p class="invite">Come to <b>room 120</b> at <b>lunch</b> to make elephant toothpaste.</p>
    <p class="when">Thursday, Oct 29</p>
  </div>
</div>
</body>
</html>`;

const src = here("./instagram-elephant-toothpaste.html");
const png = fileURLToPath(here("../MV-STEM-Club-IG-Elephant-Toothpaste.png"));
await writeFile(src, html);
execFileSync("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", [
  "--headless", "--disable-gpu", "--hide-scrollbars", "--virtual-time-budget=6000",
  "--force-device-scale-factor=1", `--window-size=${W},${H}`,
  `--screenshot=${png}`, src.href,
], { stdio: "ignore" });
console.log(`wrote ${png}`);
