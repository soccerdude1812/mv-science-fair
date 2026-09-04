# MV Science Fair — Design System: "Chalk Lab"

Redesign direction approved 2026-08-05. This file is the constitution: every visual
decision on the site traces back to here. If a change contradicts this file, either
the change is wrong or this file gets updated first, never silent drift.

## Design read

Event landing site for parents and kids (grades 3-5). Playful-warm "chalk lab
notebook" language on a cream ground, in the family of Anthropic's design language
(warm paper, serif display, generous space, hand-drawn characters) with Google's
palette discipline (few clear hues, high clarity). The site has ONE job: get
families to apply before Sept 13. Dials: VARIANCE 7 / MOTION 6 / DENSITY 3.

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
| `--ink-faint`  | `#8C8779`              | captions, small labels |
| `--line`       | `rgba(34,33,28,0.12)`  | hairlines |
| `--line-strong`| `rgba(34,33,28,0.25)`  | emphasized rules |

No pure `#000`. No pure-black shadows: shadows are warm and faint,
`0 2px 14px rgba(64,54,32,0.10)` and quieter. No glows, no neon, no gradient
washes. Flat color, hairlines, and space do the work.

## The crayon box (accents)

Four hues, Google-clear but matte so they sit on cream. Coral is THE accent:
every CTA, every link-emphasis, always coral, whole site (color consistency
lock). The other three are pigment for the characters, category chips, and
small semantic touches only. They never become button colors.

| Token        | Value     | Role |
|--------------|-----------|------|
| `--coral`    | `#D96C4F` | primary accent: CTAs, active states, brand moments |
| `--blue`     | `#4E7DC4` | character/chip pigment |
| `--green`    | `#619B6E` | character/chip pigment |
| `--marigold` | `#DFA33C` | character/chip pigment |

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
  two student sites show the same people the same way
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

Cast and placement (each appears once, with a purpose):
- **Beaker** (hero): coral liquid; idle bob; pours its liquid as you scroll past
- **Gears** (how it works): blue + marigold pair; rotate with scroll progress;
  faces counter-rotate so the eyes stay level
- **Test tube** (categories): green liquid, bubbles
- **Magnifier** (rules/judging cross-link): big eye in the lens
- **Lightbulb** (volunteer band): marigold glow, filament smile

## Motion

Library: `motion` (motion/react). No `window.addEventListener("scroll")` anywhere,
ever. Scroll-linked pieces use `useScroll` + `useTransform`; reveals use
`whileInView` (once, amount 0.3, y 16px, 0.5s, ease [0.16,1,0.3,1], stagger 60ms).
Pointer work (eye tracking) uses motion values + springs, never React state.

Every animation must answer "what does this communicate?":
- Gear rotation = progress through the steps (storytelling)
- Beaker pour = handoff from promise (hero) to process (how it works)
- Reveals = reading order (hierarchy)
- Eye tracking + hover wiggles = the site is alive and friendly (kid delight)

`prefers-reduced-motion`: all scroll-linked transforms freeze at their resting
state, idle bobs off, reveals become instant. Non-negotiable.

Animate only `transform` and `opacity`.

## Copy rules

- Home page is minimal: short declaratives, one idea per section
- Section heads ≤ 8 words; sub-copy ≤ 25 words
- Only two real dates exist: applications close Sun Sept 13 at 11:59 PM (moved
  from Fri Sept 4 on 2026-08-31, fair day unchanged); fair day Sat Sept 26,
  9 AM to 12 PM. Never invent timeframes
- Zero em-dashes anywhere on the site. Use periods, commas, or colons
- Max one small-caps eyebrow label per 3 sections (data labels on fact tiles
  do not count)
- Event name is "MV Science Fair". MVHS appears only as organizer, always
  spelled "MVHS STEM & Research Club"; MVWSD only
  in the footer disclaimer
- CTA intent: exactly one apply label, "Apply now", used identically everywhere

## Structure

- Nav (68px, one line): wordmark + How it works / Rules / Volunteer + Apply now
  pill. Everything else reachable from the footer sitemap. Mobile: sheet menu
- Home: Hero (split: copy left, beaker right) → fact strip (when/where/who) →
  How it works (4 steps + gears) → What kids explore (category chips + test tube)
  → Parents' quick answers (3 items) → The students behind it (6 portraits,
  added 2026-09-03) → Apply band (CTA + QR + deadline) → footer
- All 8 routes stay alive at their current slugs (SEO + external links).
  Subpages keep their reference-density content, rethemed, copy tightened
- Footer: sitemap (all routes), contact email, MVWSD non-affiliation disclaimer

## Provenance notes

- Chalk ground + hand-drawn characters + light-only: explicit owner brief,
  overriding skill defaults that would otherwise discourage them
- Serif display justified by the Anthropic-direction brief; Source Serif 4
  chosen as the free Tiempos-family face (not an LLM-default serif)
- Coral continuity: the old site's `--sf-orange` (oklch 70% 0.15 41), the print
  flier, and this system's `--coral` are the same brand hue family
