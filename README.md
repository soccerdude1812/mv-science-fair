# MV Science Fair 2026

Website for the MV Science Fair 2026 — a student-led STEM event organized by the Mountain View High School STEM & Research Club for elementary school students, families, judges, and volunteers in Mountain View. Not affiliated with or endorsed by MVWSD.

## Event

| | |
|---|---|
| **Date** | Saturday, September 26, 2026 |
| **Time** | 9:00 AM – 12:00 PM |
| **Venue** | Amy Imai Elementary School — Multi-Use Room (MUR) |
| **Address** | 253 Martens Ave, Mountain View, CA 94040 |
| **Applications close** | Sunday, September 13, 2026, 11:59 PM |
| **Contact** | stemresearchclubmvhs@gmail.com |

Date, time, venue, deadline, contact, and the application form URL all live in
**`src/lib/event.ts`** — edit there, not in individual pages. The contact
address is the club inbox, and the same address is set in the description of
every Google Form; change both together.

## Naming

The event is the **MV Science Fair**. Not "MVHS Science Fair", not "MVWSD
Science Fair". MVHS / Mountain View High School may appear as the **organizer**
(the STEM & Research Club runs it), never in the event name.

MVWSD appears in exactly two places, deliberately: the footer non-affiliation
disclaimer, and the liability waiver in the application form. Amy Imai is an
MVWSD facility, so the district is named there as venue owner. Nowhere else.

## Entry point

The **Application & Registration Form** is the single entry point for students,
linked and QR-coded across the site. The old interest form is retired — it
existed to gauge demand before applications opened and is no longer linked
anywhere.

## Tech Stack

- **Framework**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui
- **Deployment**: Vercel (auto-deploy from `main`)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home page with hero, categories, and quick navigation |
| `/students-families` | Information for students and families |
| `/the-process` | Science fair process and timeline |
| `/rules` | Rules and guidelines |
| `/forms` | Registration and submission forms |
| `/judges` | Judge information and sign-up |
| `/volunteer` | Volunteer information |
| `/display-and-safety` | Display board and safety guidelines |

## Forms

All forms use external Google Forms integration -- no backend database. Form links are configured in the page components.

## Build

```bash
npm run build    # production build
npm run lint     # ESLint
```

## Deployment

Deployed on Vercel from the `website/` subdirectory of the repo. Pushes to `main` trigger auto-deploy. Git author email must be `soccerdude1812@gmail.com`.
