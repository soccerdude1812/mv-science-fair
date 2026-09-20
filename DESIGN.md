# MV Science Fair — Design System: "Chalk Lab"

Redesign direction approved 2026-08-05. This file is the constitution: every visual
decision on the site traces back to here. If a change contradicts this file, either
the change is wrong or this file gets updated first, never silent drift.

## Design read

Event landing site for parents and kids (grades 3-5). Playful-warm "chalk lab
notebook" language on a cream ground, in the family of Anthropic's design language
(warm paper, serif display, generous space, hand-drawn characters) with Google's
palette discipline (few clear hues, high clarity). Dials: VARIANCE 7 / MOTION 6 /
DENSITY 3.

**The site's job changed on 2026-09-15.** Applications closed Sept 13 with 32
submissions and 31 approved projects, so "get families to apply" is finished and
cannot be the brief any more. The new job: **get 31 approved projects to fair day
ready**. The audience is no longer strangers deciding whether to enter, it is
families who are already in and have eleven days of work left. Every surface
answers one of three questions now: what happens on the morning of Sept 26, what
is still left to build, and where to get help when stuck.

A second, smaller job rides along: fair day needs judges and helpers in the room,
and sign-ups sat at 2 and 0 on 2026-09-15. That is why a recruitment band now
exists on the home page (owner's call, 2026-09-15).

Explicit owner brief (2026-08-05): chalk light theme; elegant fonts, margins, text;
minimal copy (old home was overwhelming); scroll-driven science animations (turning
gears, beaker pouring liquid); personified doodle characters (beakers and gears
with heavy-lidded eyes, thick ink outlines, like Anthropic's illustration style);
colorful but restrained palette; no neon gradients; every element must justify its
existence; all buttons must work.

## Ground and ink

The page is light, always. One theme, locked. No dark sections, no theme flips.

| Token          | Value                  | Role |
|----------------|------------------------|------|
| `--paper`      | `#F7F5EF`              | page ground (chalk) |
| `--paper-warm` | `#F0EDE4`              | alternate section band |
| `--card`       | `#FFFFFF`              | raised surfaces |
| `--ink`        | `#22211C`              | headlines, character outlines, primary text |
| `--ink-soft`   | `#5A574C`              | body text |
| `--ink-faint`  | `#6B675A`              | captions, small labels |
| `--line`       | `rgba(34,33,28,0.12)`  | hairlines |
| `--line-strong`| `rgba(34,33,28,0.25)`  | emphasized rules |

`--ink-faint` was `#8C8779` until 2026-09-15. Every use of it is text, and at
`#8C8779` all of it measured 3.1 to 3.6:1 against the three page grounds, which
fails WCAG AA at every size the site actually sets. It is now 5.2:1 on paper,
4.8:1 on paper-warm, 5.7:1 on white, still visibly lighter than `--ink-soft`.
A colour named "faint" that carries words still has to be legible.

No pure `#000`. No pure-black shadows: shadows are warm and faint,
`0 2px 14px rgba(64,54,32,0.10)` and quieter. No glows, no neon, no gradient
washes. Flat color, hairlines, and space do the work.

## The crayon box (accents)

Four hues, Google-clear but matte so they sit on cream. Coral is THE accent:
every CTA, every link-emphasis, always coral, whole site (color consistency
lock). The other three are pigment for the characters, category chips, and
small semantic touches only. They never become button colors.

| Token          | Value     | Role |
|----------------|-----------|------|
| `--coral`      | `#D96C4F` | brand fill you LOOK at: beaker liquid, chips, bullet dots, character pigment |
| `--coral-deep` | `#AE4527` | coral you READ: link text, and the primary button's ground under white text |
| `--coral-press`| `#8F3820` | primary button hover and press |
| `--blue`       | `#4E7DC4` | character/chip pigment |
| `--green`      | `#619B6E` | character/chip pigment |
| `--marigold`   | `#DFA33C` | character/chip pigment |

**The two-coral split, ruled 2026-09-15.** `--coral-deep` was `#C25A3E` and
`.btn-primary` was filled with `--coral`. White on `#D96C4F` measures 3.3:1 and
`#C25A3E` link text measures 3.7:1 on the footer band, so the single most
important button on the site and every link on it both failed WCAG AA.
The brand hue did not move: `#D96C4F` is untouched everywhere it is a fill with
no type on it. What changed is that type-bearing coral is now deep enough to
read, at 5.7:1 under button text, 5.2:1 as a link on paper, 4.7:1 on coral-soft.
The rule to carry forward: **if coral has words on or in it, it is
`--coral-deep`. If it is just colour, it is `--coral`.**

Each has a `-soft` tint (~10-14% on white) for chip and panel fills. Saturation
stays matte; if a color looks like a highlighter, it is wrong.

## Type

| Role    | Face            | Notes |
|---------|-----------------|-------|
| Display | Source Serif 4  | Tiempos-family serif, the Anthropic kinship. Weights 500-600. Tight tracking (-0.02em) at display sizes only. |
| Body/UI | Outfit          | 400/500/600. Warm geometric sans; also used on the print flier, so print and web are one family. |
| Data    | JetBrains Mono  | RATIONED. Small data labels only (date chips, form labels). Never for prose, never for headlines. |

Scale: hero `clamp(2.75rem, 6vw, 4.5rem)`; section heads `clamp(1.75rem, 3.5vw, 2.5rem)`;
body `1.0625rem / 1.7`; max measure 65ch. Generous margins: sections breathe at
`py-20` to `py-28` desktop.

## Shape

One radius system: containers 16px, interactive elements (buttons, chips, inputs)
full pill. Character cards 20px. Nothing else. Borders are hairline `--line`,
1px, never 2px+.

## The cast (hand-drawn characters)

Original SVG characters, explicitly briefed by the owner (reference: Anthropic-style
doodles, thick ink outlines, heavy-lidded oval eyes, cream ground). These are the
site's imagery; there is no photography.

Style contract for every character:
- Stroke: `--ink`, width 6-7 on a 120 viewBox, round caps and joins
- Paths deliberately imperfect: hand-drawn wobble, slight asymmetry
- Eyes: white ellipse + large ink pupil sitting low, heavy upper-lid arc.
  Pupils live in a `data-pupil` group so they can track the cursor
- Mouths tiny, expressions calm-curious (heavy-lidded cool, not hyper)
- Accent color as flat fill only where the object demands it (liquid, gear
  center), one hue per character

## Sponsor logos

Sponsor logos are the site's one piece of imagery it did not draw or shoot, and
they live in exactly one place: the wall at the top of `/sponsors`. Added
2026-09-20, when eleven businesses had agreed in writing and the page's own
promise was "your logo and name, linked, for the whole season".

- The roster is `src/lib/sponsors.ts`, never inline. A logo goes up only when
  the club inbox holds both halves of the agreement: the business named what it
  was giving, and the club accepted. The tracker's Yes column is not the test,
  and that file records the four names it deliberately leaves off
- Logos sit on white `card-soft` cards, 16px radius, hairline border, in their
  own colors. No grayscale-until-hover, no duotone, no chalk filter: a
  recognition wall that recolors a sponsor's mark is not recognition. The
  crayon box does not apply to somebody else's brand
- `logoHeight` is per logo, not shared. An 8:1 wordmark and a square seal set
  to the same height do not read as the same size, so wide lockups get less
  height, square marks get more, and the shared cap is the 200px box width
- Files are self-hosted in `public/sponsors/`, vector where the business
  publishes vector, and never hotlinked. Where a mark exists only in a version
  built for dark backgrounds, the neutral is darkened enough to read on white
  and the brand hue is left untouched (Tee Rabbit's grey wordmark, 2026-09-20)
- One line per sponsor saying what they gave, in a family's words. Prizes are
  credited to the business that gave them, which is Mr. Robell's condition on
  accepting them at all

## Photography

Photographs appear in exactly two places: the `/team` page, and the "The students
behind it" band on the home page. Everywhere else the hand-drawn cast above is
the imagery, and that rule is unchanged.

The exception exists because a parent deciding whether to hand their 9 year old
to a group of teenagers is owed real faces, and a doodle cannot do that job.
Added 2026-09-03 on the owner's instruction; recorded here rather than left as
silent drift.

Rules for the portraits:
- Source is the MV Physics & Astronomy Club site, `mvhsastro.org/team/`, so the
  two student sites show the same people the same way. The one exception is the
  faculty advisor, who had no headshot to hand and named the Spartans Sports
  Camp staff page as the photo to use (2026-09-06), so his comes from there and
  is cropped to the same frame
- Every portrait is re-cropped to **4:5** at 400x500, with the **eye line at 40%
  from the top** and the head filling ~46% of the frame height. Six photos taken
  in six different places have to read as one row
- A cutout portrait is composited onto the card surface it sits on, `#FFFFFF`,
  so the crop has no visible rectangle behind it
- Photos live in `public/team/`, are served through `next/image`, and are never
  hotlinked from the other site
- Cards: 20px radius on `card-soft`, role as a chip. Chips use blue / green /
  marigold only. Coral stays the CTA colour, here as everywhere
- The home band is the lighter cut of the same roster: no card, no chip, a
  hairline-bordered portrait and one role line. Lighter means less chrome, never
  a shorter title: both surfaces print `role` verbatim, and the home grid drops
  to two columns on a phone so the real titles fit (ruled 2026-09-03, after an
  abbreviated `shortRole` shipped and was removed)
- Both surfaces read `src/lib/team.ts`. Never hand-maintain a second list
- The advisor is a photograph too, but not a seventh face. He is the `ADVISOR`
  export, he appears only on `/team`, in his own band under the grid, and the
  home band stays six students wide. A teacher listed among students under the
  heading "The students behind it" would make that heading false

Cast and placement (one meaning per character, wherever it appears):
- **Beaker** (hero): coral liquid; idle bob; pours its liquid as you scroll past
- **Gears** (what is left to do): blue + marigold pair; rotate with scroll
  progress; faces counter-rotate so the eyes stay level
- **Test tube** (experiment help): green liquid, bubbles. Home "stuck?" band and
  the `/mentors` page. Re-pointed 2026-09-15: it used to mark the home categories
  section, which was retired because every project is already chosen and approved
- **Magnifier** (rules/judging cross-link): big eye in the lens. `/judges`, and
  the judging block on `/fair-day`
- **Lightbulb** (helping out): marigold glow, filament smile. `/volunteer`, and
  the home recruitment band added 2026-09-15

A character may appear on more than one page, but only ever for the same meaning.
The rule that matters is that a reader never sees the same doodle standing for two
different ideas, not that each doodle is used exactly once.

## Motion

Library: `motion` (motion/react). No `window.addEventListener("scroll")` anywhere,
ever. Scroll-linked pieces use `useScroll` + `useTransform`; reveals use
`whileInView` (once, amount 0.3, y 16px, 0.5s, ease [0.16,1,0.3,1], stagger 60ms).
Pointer work (eye tracking) uses motion values + springs, never React state.

Every animation must answer "what does this communicate?":
- Gear rotation = progress through the steps (storytelling)
- Beaker pour = handoff from promise (hero) to the work (what is left to do)
- Reveals = reading order (hierarchy)
- Eye tracking + hover wiggles = the site is alive and friendly (kid delight)

`prefers-reduced-motion`: all scroll-linked transforms freeze at their resting
state, idle bobs off, reveals become instant. Non-negotiable.

Animate only `transform` and `opacity`.

## Copy rules

- Home page is minimal: short declaratives, one idea per section
- Section heads ≤ 8 words; sub-copy ≤ 25 words
- **Three real times exist, and no others.** Fair day Sat Sept 26, 9 AM to
  12 PM. Participant arrival and setup 8 AM to 9 AM that same morning. The
  application deadline, Sun Sept 13 at 11:59 PM, which is now only ever written
  in the past tense. Never invent timeframes, and in particular never publish a
  judging start time, an awards time, or a minute-by-minute run of show: nobody
  has set those, and the only two claims the record supports are that judging
  happens inside the 9 to 12 window and that winners are announced before the
  noon close
- The arrival window is a PARTICIPANT fact, not a public one. Judges and
  volunteers keep their own schedules and visitors are told 9:00, so it appears
  only where students and families read, never in the schema.org start time.
  `EventDetails` takes an opt-in `arrival` prop for exactly this reason. Source:
  every project approval letter sent through 2026-09-13 reads "Saturday,
  September 26, 2026, 9:00 AM to 12:00 PM (arrival and setup 8 to 9 AM)"
- Zero em-dashes anywhere on the site. Use periods, commas, or colons
- Max one small-caps eyebrow label per 3 sections (data labels on fact tiles
  do not count)
- Event name is "MV Science Fair". MVHS appears only as organizer, always
  spelled "MVHS STEM & Research Club"; MVWSD only
  in the footer disclaimer
- CTA intent: there is exactly one site-wide CTA and it points at `/fair-day`.
  It replaced "Apply now" on 2026-09-15. It has **two labels, and only two**:
  the desktop nav pill reads **"Fair day"**, because the top line has five
  links beside it and a longer label reopens the md-breakpoint squeeze; every
  other instance, the home hero, the home closing band and the mobile sheet
  button, reads **"Fair day details"**, because a standalone button wants the
  noun plus what you get. Never a third wording
- A subpage whose whole purpose is one action still gets its own coral
  `.btn-primary` for that action, one per page and never two ("Request a
  mentor" on `/mentors`, "Sign up to judge" on `/judges`), which is how the
  site has always worked. Everything else is `.btn-ghost`
- Applications are described in the past tense everywhere, never with a live
  link. `/forms` still lists the application so a family arriving from an old
  flier or email can see what happened to it, marked closed, unlinked

## Structure

- Nav (68px, one line): wordmark + Get ready / Mentors / Rules / Judges /
  Volunteer + **Fair day** pill. The Support disclosure was removed on
  2026-09-15: Judges and Volunteer came out of it into the top line because
  fair day needs bodies, and Sponsors went to the footer sitemap because
  cold outreach is retired. Everything else reachable from the footer sitemap.
  Mobile: sheet menu, which still lists every route
- Home: Hero (split: copy left, beaker right) → fact strip (when / where /
  participants arrive / visitors) → The morning in order (3 tiles) → What is
  left to do (4 steps + gears) → Stuck? (help routes + test tube) → Parents'
  quick answers (3 items) → Help on fair day (recruitment, + lightbulb) → The
  students behind it (6 portraits) → Fair day band (CTA + QR + countdown) →
  footer
- **All fourteen routes stay alive at their current slugs**, plus the twelve
  `/project-ideas/[slug]` detail pages (SEO + external links + links already
  mailed to 31 families). `/fair-day` and `/mentors` were added 2026-09-15;
  nothing was deleted or redirected. `/the-process` keeps its slug and is
  titled "Get ready" in the nav and on the page
- Every route exports its own `metadata` with a distinct `title`. Seven pages
  were missing it until 2026-09-15 and all rendered the same browser title,
  which made a shared link and a row of open tabs useless
- Footer: sitemap (all routes), contact email, MVWSD non-affiliation disclaimer

## Provenance notes

- Chalk ground + hand-drawn characters + light-only: explicit owner brief,
  overriding skill defaults that would otherwise discourage them
- Serif display justified by the Anthropic-direction brief; Source Serif 4
  chosen as the free Tiempos-family face (not an LLM-default serif)
- Coral continuity: the old site's `--sf-orange` (oklch 70% 0.15 41), the print
  flier, and this system's `--coral` are the same brand hue family
