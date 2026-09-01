# MV Science Fair

MV Science Fair website for elementary schoolers in Mountain View. Organized by the MVHS STEM & Research Club. NOT affiliated with or endorsed by MVWSD.

**Naming (updated 2026-08-04):** the event is the **"MV Science Fair"** — not "MVHS Science Fair", not "MVWSD Science Fair". This supersedes the earlier "use MVHS" guidance from Shelly Hausman (MVWSD PIO, Apr 30 2026); the point of that ruling was to keep MVWSD out of the name, and "MV" satisfies it. MVHS may still appear as the ORGANIZER, never in the event name.

**Organizer name (set 2026-08-31):** the club is an official MVHS club as of its school re-registration, and is written exactly one way everywhere, site copy and forms and fliers and outbound email alike: **MVHS STEM & Research Club**. Read it from `EVENT.organizer`, never inline. It had previously been written four different ways. `EVENT.organizerLong` ("Mountain View High School STEM & Research Club") exists only as the schema.org `alternateName`, so the spelled-out search still finds the event. MVWSD appears in exactly two places by decision: the footer non-affiliation disclaimer and the application-form liability waiver (Amy Imai is a district facility).

## Key facts (do not guess these)
- **Live site: https://mvsciencefair.vercel.app** — also in `src/lib/event.ts` as `EVENT.siteUrl`. Read it from there, never from the GitHub `homepageUrl` field or a Vercel dashboard guess; that field pointed at a stale unrelated project (`website-sigma-ochre.vercel.app`) until 2026-08-09 and sent the wrong URL into outbound sponsorship email.
- Club inbox: `stemresearchclubmvhs@gmail.com`. Instagram: `@stemresearchclubmvhs`.
- Ops workbooks live in Drive under `2026 MVHS Science Fair`: **Master Tracker** (form responses) and **Sponsorship & Cold Outreach** (prospects, templates, budget).

## GitHub
- Repo: soccerdude1812/mv-science-fair

## Tech Stack
- Next.js (check `node_modules/next/dist/docs/` for API conventions — may differ from training data)

## Design
- The visual system is "Chalk Lab" — see `DESIGN.md` at the repo root. That file is the constitution: tokens, type, the character cast, motion rules, and copy rules (zero em-dashes on the site; only two real dates: Sept 13 close, Sept 26 fair). Read it before any visual change.
- `src/lib/event.ts` stays the single source of truth for date/venue/deadline/contact. Edit there, never inline.

## Slack
- Post progress updates to #science-fair channel

@AGENTS.md
