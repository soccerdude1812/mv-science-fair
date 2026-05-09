# MVHS Science Fair 2026

Website for the MVHS Science Fair 2026 — a student-led STEM event organized by the Mountain View High School STEM & Research Club for elementary school students, families, judges, and volunteers in Mountain View. Not affiliated with or endorsed by MVWSD.

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
