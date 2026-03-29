import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Rules",
  description:
    "Review all MVWSD Science Fair rules and guidelines for participants, mentors, and special topics.",
};

const ruleCards = [
  {
    title: "MVWSD Science Fair Rules",
    description:
      "The comprehensive rulebook covering all aspects of the science fair including eligibility, project categories, timelines, and general guidelines.",
    href: "https://docs.google.com/document/d/15SAahb5817DqSySY_MRZs1WQ0aFv-XnKye_OrsofJPc/edit",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
      </svg>
    ),
  },
  {
    title: "Human Participant Rules",
    description:
      "Guidelines for projects that involve human subjects, including surveys, interviews, and behavioral observations.",
    href: "https://docs.google.com/document/d/12Y22HRdQ2ahjSZOgzAxBorjPfrTsH42qnb5A4sQ2J6U/edit",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    title: "Hazardous Materials Rules",
    description:
      "Safety rules for projects involving chemicals, electrical equipment, sharp tools, heat sources, or other potentially hazardous materials.",
    href: "https://docs.google.com/document/d/18L9rhZy4CaveZ4F5KMN6-bMuaOcy0kNvsH0rKvqq_k8/edit",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  {
    title: "Biohazardous Agent / Live Organism Rules",
    description:
      "Rules for projects involving living organisms, biological samples, microorganisms, or any biohazardous agents.",
    href: "https://docs.google.com/document/d/1Pl6SbfWtLmaIyOL7JxtxFqydMQNaRuTO-Z8W0JYkQEk/edit",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c-4.97 0-9-2.69-9-6v-4c0-3.31 4.03-6 9-6s9 2.69 9 6v4c0 3.31-4.03 6-9 6z" />
        <path d="M12 6c4.97 0 9 2.69 9 6" />
        <line x1="12" y1="6" x2="12" y2="22" />
      </svg>
    ),
  },
  {
    title: "Mentor Rulebook",
    description:
      "Guidelines and expectations for mentors supporting science fair participants, including roles, responsibilities, and boundaries.",
    href: "https://docs.google.com/document/d/1okIJtfiGXKSROUCFSIXBvdnN4pctZPD77df_KyQ8Uqs/edit",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <line x1="19" y1="8" x2="19" y2="14" />
        <line x1="22" y1="11" x2="16" y2="11" />
      </svg>
    ),
  },
];

export default function RulesPage() {
  return (
    <>
      <PageHero
        title="Rules & Guidelines"
        subtitle="Review these important rules before starting your project. Understanding the guidelines will help you plan a successful science fair experience."
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="space-y-5">
          {ruleCards.map((card) => (
            <a
              key={card.title}
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block clean-card-hover p-6 border-l-4 border-l-accent-primary"
            >
              <div className="flex items-start gap-4">
                <div
                  className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-accent-primary-light text-accent-primary"
                  aria-hidden="true"
                >
                  {card.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display font-bold text-text-heading text-lg flex items-center gap-2">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-text-body leading-relaxed">
                    {card.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 mt-3 text-sm font-medium text-accent-primary">
                    View Rules Document
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          ))}

          {/* Display & Safety link */}
          <Link
            href="/display-and-safety"
            className="block clean-card-hover p-6"
          >
            <div className="flex items-start gap-4">
              <div
                className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-bg-muted text-text-heading"
                aria-hidden="true"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-display font-bold text-text-heading text-lg">
                  Display and Safety Rules
                </h3>
                <p className="mt-2 text-text-body leading-relaxed">
                  Requirements for project display boards including dimensions,
                  safety guidelines, acknowledgments, and citations.
                </p>
                <span className="inline-flex items-center gap-1.5 mt-3 text-sm font-medium text-accent-primary">
                  View Display & Safety Page
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
