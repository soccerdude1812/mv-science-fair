/**
 * Club-fair booth sheets: four 8.5x11 portrait pages, taped to a poster board
 * and read by high schoolers walking past. One idea per sheet, nothing on any
 * of them smaller than a caption, and the two sign-up codes big enough to scan
 * from a step back.
 *
 *   booth-1-what.html      what the MV Science Fair even is
 *   booth-2-why.html       what a high schooler gets out of helping
 *   booth-3-fairday.html   event-day volunteering, giant code
 *   booth-4-mentor.html    mentoring, giant code
 *
 * Skin and cast come from chalk.mjs, so these say the same thing the site and
 * the volunteer flier say, in the same voice and the same ink.
 *
 * Copy obeys DESIGN.md: zero em-dashes, no invented timeframes, and the Sept 13
 * application deadline is deliberately absent. That gates student applications,
 * not volunteers, and it has already passed. Sept 26 is the only date here.
 *
 * Colour follows /volunteer: blue = event day, green = mentor. Coral is the
 * accent, and on these sheets it does exactly one job: point at a code.
 */
import { readFile, writeFile } from "node:fs/promises";
import {
  beaker,
  dottedGround,
  gear,
  here,
  lightbulb,
  page,
  testTube,
} from "./chalk.mjs";

const qrEventDay = await readFile(here("./qr/qr-eventday.svg"), "utf8");
const qrMentor = await readFile(here("./qr/qr-mentor.svg"), "utf8");
const qrSite = await readFile(here("./qr/qr-site.svg"), "utf8");

/* --------------------------------------------------------------- content -- */

const SITE = "mvsciencefair.vercel.app";
const DISCLAIMER =
  "Organized by the MVHS STEM &amp; Research Club. Not affiliated with or endorsed by MVWSD.";

/* -------------------------------------------------------------------- css -- */
/* --u is the unit every size below is cut from. 34px is a deliberately blunt
   setting: it puts the headline near 90px and floors body copy at 27px, which
   is what "readable from the far side of a gym" costs. */

const BOOTH = `
:root { --u: 34px; }
@page { size: 8.5in 11in; margin: 0; }
body { width: 816px; height: 1056px; }

.sheet {
  width: 816px;
  height: 1056px;
  padding: calc(var(--u) * 1.9) calc(var(--u) * 1.75) calc(var(--u) * 1.5);
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: calc(var(--u) * 0.9);
}

.eyebrow { font-size: calc(var(--u) * 0.66); letter-spacing: 0.15em; }
.headline { font-size: calc(var(--u) * 2.45); }
.lede {
  margin-top: calc(var(--u) * 0.6);
  color: var(--ink-soft);
  font-size: calc(var(--u) * 0.95);
  line-height: 1.35;
  max-width: 24ch;
}

.head { display: grid; gap: calc(var(--u) * 0.62); }
.head__row {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: start;
  column-gap: calc(var(--u) * 0.7);
}
.mark { width: calc(var(--u) * 4.2); height: calc(var(--u) * 4.2); }

/* the when/who pill: one fact, stated once, in the colour of its role */
.when {
  align-self: start;
  justify-self: start;
  display: inline-block;
  border-radius: 999px;
  padding: calc(var(--u) * 0.3) calc(var(--u) * 0.72);
  font-size: calc(var(--u) * 0.82);
  font-weight: 500;
  line-height: 1.2;
  color: var(--ink);
}
.when--blue { background: var(--blue-soft); }
.when--green { background: var(--green-soft); }

/* ---- sheet 1: the facts ---- */

.facts { display: grid; align-content: center; gap: calc(var(--u) * 0.75); }
.facts__row { border-top: 1px solid var(--line-strong); padding-top: calc(var(--u) * 0.42); }
.facts__label {
  font-family: "JetBrains Mono", ui-monospace, monospace;
  font-size: calc(var(--u) * 0.56);
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--ink-faint);
}
.facts__value {
  margin-top: calc(var(--u) * 0.16);
  color: var(--ink);
  font-size: calc(var(--u) * 1.06);
  font-weight: 500;
  line-height: 1.22;
}

/* ---- sheet 2: the reasons ---- */

.reasons { display: grid; align-content: center; gap: calc(var(--u) * 1.15); }
.reason { display: grid; grid-template-columns: auto 1fr; column-gap: calc(var(--u) * 0.7); }
.reason__n {
  font-family: "JetBrains Mono", ui-monospace, monospace;
  font-size: calc(var(--u) * 0.72);
  font-weight: 500;
  color: var(--coral);
  padding-top: calc(var(--u) * 0.2);
}
.reason__title {
  color: var(--ink);
  font-family: "Source Serif 4", Georgia, serif;
  font-weight: 600;
  font-size: calc(var(--u) * 1.32);
  line-height: 1.1;
  letter-spacing: -0.02em;
}
.reason__sub {
  margin-top: calc(var(--u) * 0.24);
  color: var(--ink-soft);
  font-size: calc(var(--u) * 0.8);
  line-height: 1.32;
  max-width: 26ch;
}

/* ---- sheets 3 and 4: the tasks, then the code ---- */

.middle { display: grid; align-content: center; gap: calc(var(--u) * 0.7); }
.tasks { list-style: none; display: grid; gap: calc(var(--u) * 0.52); }
.tasks li {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  column-gap: calc(var(--u) * 0.5);
  color: var(--ink);
  font-size: calc(var(--u) * 1.04);
  font-weight: 500;
  line-height: 1.2;
}
.tick { width: calc(var(--u) * 0.92); height: calc(var(--u) * 0.92); }
.kicker { color: var(--ink-soft); font-size: calc(var(--u) * 0.8); line-height: 1.3; }

/* ---- the code ---- */

.code {
  display: grid;
  justify-items: center;
  gap: calc(var(--u) * 0.5);
}
.code__card {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: calc(var(--u) * 0.5);
  box-shadow: var(--shadow-md);
  padding: calc(var(--u) * 0.3);
}
.code__card svg { display: block; width: 100%; height: 100%; }
.code--big .code__card { width: calc(var(--u) * 8.0); height: calc(var(--u) * 8.0); }
.scan {
  display: flex;
  align-items: center;
  gap: calc(var(--u) * 0.36);
  color: var(--coral-deep);
  font-size: calc(var(--u) * 1.16);
  font-weight: 600;
  line-height: 1.1;
  white-space: nowrap;
}
.scan::before {
  content: "";
  width: calc(var(--u) * 1.15);
  height: calc(var(--u) * 1.15);
  flex: none;
  background: var(--coral);
  -webkit-mask: var(--scan-icon) center / contain no-repeat;
  mask: var(--scan-icon) center / contain no-repeat;
}

/* ---- footer ---- */

/* the closing block: the code (or the closer) and then the footer, never
   crowding each other */
.bottom { display: grid; gap: calc(var(--u) * 0.62); }

.foot {
  display: grid;
  gap: calc(var(--u) * 0.2);
  border-top: 1px solid var(--line-strong);
  padding-top: calc(var(--u) * 0.55);
}
.foot__links {
  font-family: "JetBrains Mono", ui-monospace, monospace;
  font-size: calc(var(--u) * 0.66);
  letter-spacing: 0.01em;
  color: var(--coral-deep);
}
.foot__legal { font-size: calc(var(--u) * 0.46); color: var(--ink-faint); line-height: 1.35; }
`;

const check = (hue) =>
  `<svg class="tick" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8.5 L6.4 12 L13 4.6"
     stroke="var(--${hue})" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const ground = dottedGround(816, 1056, 27);

/* Every sheet ends with somewhere to go: the site, or on the two sign-up
   sheets the page those codes came from. Sheet 1 prints its URL beside its own
   code instead, so it takes the legal line alone. */
const foot = ({ links = "", legal = false } = {}) => `<footer class="foot">
    ${links ? `<p class="foot__links">${links}</p>` : ""}
    ${legal ? `<p class="foot__legal">${DISCLAIMER}</p>` : ""}
  </footer>`;

/* A fixed 816x1056 page clips silently: anything taller is simply not printed,
   and a footer that fell off the bottom looks fine until it is on a wall. So
   every sheet is also written with the page height released, and check-fit.mjs
   renders THAT tall and fails if any ink lands below the 1056px fold. */
const RELEASE_HEIGHT = `
  .sheet { height: auto; min-height: 1056px; overflow: visible; }
  `;

const sheet = async ({ file, title, css = "", body }) => {
  const markup = `<div class="sheet">\n  ${ground}\n  ${body}\n</div>`;
  await writeFile(here(`./${file}`), page({ title, css: BOOTH + css, body: markup }));
  await writeFile(
    here(`./${file.replace(/\.html$/, ".check.html")}`),
    page({ title: `${title} [fit check]`, css: BOOTH + css + RELEASE_HEIGHT, body: markup }),
  );
};

/* ------------------------------------------------------------- 1. what -- */
/* The sheet that has to work on someone who has never heard of any of this:
   what it is, when, where, who it is for. The beaker is the site's hero
   character, so the poster and the page open the same way. */

await sheet({
  file: "booth-1-what.html",
  title: "MV Science Fair · What it is (8.5x11)",
  css: `
  .headline { font-size: calc(var(--u) * 2.0); }
  .mark { width: calc(var(--u) * 4.5); height: calc(var(--u) * 4.5); }
  .facts { gap: calc(var(--u) * 0.58); }
  .lede { margin-top: calc(var(--u) * 0.45); font-size: calc(var(--u) * 0.88); }
  .code { grid-auto-flow: column; justify-items: start; align-items: center; gap: calc(var(--u) * 0.7); }
  .code__card { width: calc(var(--u) * 4.7); height: calc(var(--u) * 4.7); }
  .bottom { gap: calc(var(--u) * 0.38); }
  .scan { font-size: calc(var(--u) * 0.98); }
  .code__url {
    font-family: "JetBrains Mono", ui-monospace, monospace;
    font-size: calc(var(--u) * 0.68);
    color: var(--ink-soft);
    margin-top: calc(var(--u) * 0.16);
  }
  .sheet { gap: calc(var(--u) * 0.62); }
  `,
  body: `<header class="head">
    <p class="eyebrow">MV SCIENCE FAIR · SEPT 26</p>
    <div class="head__row">
      <h1 class="headline">We put on a science fair for little kids.</h1>
      ${beaker("mark")}
    </div>
    <p class="lede">Grades 3 to 5. Real projects, real judges, free to enter.</p>
  </header>
  <dl class="facts">
    <div class="facts__row">
      <dt class="facts__label">When</dt>
      <dd class="facts__value">Saturday, September 26<br>9 AM to 12 PM</dd>
    </div>
    <div class="facts__row">
      <dt class="facts__label">Where</dt>
      <dd class="facts__value">Amy Imai Elementary, Mountain View</dd>
    </div>
    <div class="facts__row">
      <dt class="facts__label">Who runs it</dt>
      <dd class="facts__value">Us. The MVHS STEM &amp; Research Club.</dd>
    </div>
  </dl>
  <div class="bottom">
    <div class="code">
      <div class="code__card">${qrSite}</div>
      <div>
        <p class="scan">See the whole thing</p>
        <p class="code__url">${SITE}</p>
      </div>
    </div>
    ${foot({ legal: true })}
  </div>`,
});

/* -------------------------------------------------------------- 2. why -- */
/* The sheet that answers the question a high schooler is actually asking.
   Three reasons, in the order they land: the hours, the standing, the point. */

await sheet({
  file: "booth-2-why.html",
  title: "MV Science Fair · Why help (8.5x11)",
  css: `
  .headline { font-size: calc(var(--u) * 2.5); }
  .closer {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    column-gap: calc(var(--u) * 0.8);
    border-top: 1px solid var(--line-strong);
    padding-top: calc(var(--u) * 0.6);
  }
  .closer__line { color: var(--ink); font-size: calc(var(--u) * 1.0); font-weight: 500; line-height: 1.22; max-width: 18ch; }
  .closer .mark { width: calc(var(--u) * 3.2); height: calc(var(--u) * 3.2); }
  .foot { border-top: none; padding-top: calc(var(--u) * 0.3); }
  `,
  body: `<header class="head">
    <p class="eyebrow">MV SCIENCE FAIR · WHY BOTHER</p>
    <h1 class="headline">What you get out of it.</h1>
  </header>
  <div class="reasons">
    <div class="reason">
      <span class="reason__n">01</span>
      <div>
        <p class="reason__title">Community service hours.</p>
        <p class="reason__sub">Fair day is one morning, 9 to 12.</p>
      </div>
    </div>
    <div class="reason">
      <span class="reason__n">02</span>
      <div>
        <p class="reason__title">You are the expert in the room.</p>
        <p class="reason__sub">To a fourth grader, a high schooler knows everything.</p>
      </div>
    </div>
    <div class="reason">
      <span class="reason__n">03</span>
      <div>
        <p class="reason__title">A kid leaves liking science.</p>
        <p class="reason__sub">That is the entire point of the fair.</p>
      </div>
    </div>
  </div>
  <div class="bottom">
    <div class="closer">
      <p class="closer__line">Two ways in. Both codes are on this board.</p>
      ${lightbulb("mark")}
    </div>
    ${foot({ links: SITE })}
  </div>`,
});

/* ---------------------------------------------------------- 3. fair day -- */

await sheet({
  file: "booth-3-fairday.html",
  title: "MV Science Fair · Help on fair day (8.5x11)",
  css: `
  .headline { font-size: calc(var(--u) * 2.6); }
  .head { gap: calc(var(--u) * 0.5); }
  `,
  body: `<header class="head">
    <p class="eyebrow">MV SCIENCE FAIR · EVENT DAY</p>
    <div class="head__row">
      <h1 class="headline">Help on fair day.</h1>
      ${gear("mark")}
    </div>
    <span class="when when--blue">Sat, Sept 26 · 9 AM to 12 PM</span>
  </header>
  <div class="middle">
  <ul class="tasks">
    <li>${check("blue")}<span>Set up and clean up</span></li>
    <li>${check("blue")}<span>Check families in</span></li>
    <li>${check("blue")}<span>Show visitors around</span></li>
  </ul>
  <p class="kicker">Counts as community service hours.</p>
  </div>
  <div class="bottom">
    <div class="code code--big">
      <div class="code__card">${qrEventDay}</div>
      <p class="scan">Scan to sign up</p>
    </div>
    ${foot({ links: `${SITE}/volunteer` })}
  </div>`,
});

/* ------------------------------------------------------------ 4. mentor -- */

await sheet({
  file: "booth-4-mentor.html",
  title: "MV Science Fair · Mentor a young scientist (8.5x11)",
  css: `
  .headline { font-size: calc(var(--u) * 2.05); }
  .head { gap: calc(var(--u) * 0.5); }
  `,
  body: `<header class="head">
    <p class="eyebrow">MV SCIENCE FAIR · MENTOR</p>
    <div class="head__row">
      <h1 class="headline">Mentor a young scientist.</h1>
      ${testTube("mark")}
    </div>
    <span class="when when--green">1 to 2 hours a week, until Sept 26</span>
  </header>
  <div class="middle">
  <ul class="tasks">
    <li>${check("green")}<span>Help them pick a question</span></li>
    <li>${check("green")}<span>Walk them through the method</span></li>
    <li>${check("green")}<span>Build their confidence</span></li>
  </ul>
  <p class="kicker">You advise. The project stays theirs.</p>
  </div>
  <div class="bottom">
    <div class="code code--big">
      <div class="code__card">${qrMentor}</div>
      <p class="scan">Scan to sign up</p>
    </div>
    ${foot({ links: `${SITE}/volunteer` })}
  </div>`,
});

console.error("booth sheets: 4 written");
