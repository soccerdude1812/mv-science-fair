# MVHS Science Fair 2026

Website for the MVHS Science Fair 2026 — a student-led STEM event organized by the Mountain View High School STEM & Research Club for elementary school students, families, judges, and volunteers in Mountain View. Not affiliated with or endorsed by MVWSD.

## Event

| | |
|---|---|
| **Date** | Saturday, September 26, 2026 |
| **Time** | 9:00 AM – 12:00 PM |
| **Venue** | Amy Imai Elementary School — Multi-Use Room (MUR) |
| **Address** | 253 Martens Ave, Mountain View, CA 94040 |
| **Applications close** | Friday, September 4, 2026 (rolling review) |
| **Contact** | eeshankhandelwal123@gmail.com |

Date, time, venue, deadline, and contact all live in **`src/lib/event.ts`** — edit
there, not in individual pages. `SCHEDULE` in the same file drives both the
homepage process rail and the `Timeline` component.

The venue is an MVWSD facility, but the fair is not an MVWSD event. Keep the
non-affiliation disclaimer in the footer and do not imply district sponsorship.

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
