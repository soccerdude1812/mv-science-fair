import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import PageHero from "@/components/PageHero";

const supplements = [
  {
    title: "Human Participant Rules",
    description:
      "For projects involving human subjects: surveys, interviews, and behavioral observations.",
    href: "https://docs.google.com/document/d/12Y22HRdQ2ahjSZOgzAxBorjPfrTsH42qnb5A4sQ2J6U/edit",
    dot: "bg-green",
  },
  {
    title: "Hazardous Materials Rules",
    description:
      "Safety rules for chemicals, electrical equipment, sharp tools, heat sources, and other hazardous materials.",
    href: "https://docs.google.com/document/d/18L9rhZy4CaveZ4F5KMN6-bMuaOcy0kNvsH0rKvqq_k8/edit",
    dot: "bg-marigold",
  },
  {
    title: "Mentor Rulebook",
    description:
      "Expectations for mentors supporting participants: roles, responsibilities, and boundaries.",
    href: "https://docs.google.com/document/d/1okIJtfiGXKSROUCFSIXBvdnN4pctZPD77df_KyQ8Uqs/edit",
    dot: "bg-blue",
  },
];

export default function RulesPage() {
  return (
    <>
      <PageHero
        title="Rules & Guidelines"
        subtitle="Four rulebooks cover everything from eligibility to safety. Read them before starting your project."
      />

      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        {/* The main rulebook */}
        <div className="reveal stagger-1 card-soft p-7 sm:p-9">
          <p className="data-label">Start here</p>
          <h2 className="mt-3 text-2xl sm:text-3xl">MV Science Fair Rules</h2>
          <p className="mt-3 max-w-2xl text-ink-soft">
            The complete rulebook: eligibility, project categories, timelines,
            and general guidelines.
          </p>
          <a
            href="https://docs.google.com/document/d/15SAahb5817DqSySY_MRZs1WQ0aFv-XnKye_OrsofJPc/edit"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost mt-6"
          >
            Open the rulebook
            <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
          </a>
        </div>

        {/* Specialized rulebooks */}
        <div className="mt-14">
          {supplements.map((doc, i) => (
            <a
              key={doc.title}
              href={doc.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`reveal stagger-${i + 2} group flex items-start justify-between gap-6 border-t border-line py-7`}
            >
              <div className="min-w-0">
                <h3 className="flex items-center gap-3 text-xl">
                  <span
                    className={`h-2.5 w-2.5 shrink-0 rounded-full ${doc.dot}`}
                    aria-hidden="true"
                  />
                  <span className="group-hover:text-coral-deep transition-colors">
                    {doc.title}
                  </span>
                </h3>
                <p className="mt-2 max-w-2xl text-ink-soft">
                  {doc.description}
                </p>
              </div>
              <ArrowUpRight
                size={18}
                strokeWidth={2}
                aria-hidden="true"
                className="mt-2 shrink-0 text-ink-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-coral-deep"
              />
            </a>
          ))}

          {/* Display & Safety cross-link (on this site) */}
          <Link
            href="/display-and-safety"
            className="reveal stagger-5 group flex items-start justify-between gap-6 border-t border-line py-7"
          >
            <div className="min-w-0">
              <h3 className="text-xl">
                <span className="group-hover:text-coral-deep transition-colors">
                  Display and Safety Rules
                </span>
              </h3>
              <p className="mt-2 max-w-2xl text-ink-soft">
                Display board requirements: dimensions, safety guidelines,
                acknowledgments, and citations.
              </p>
            </div>
            <ArrowRight
              size={18}
              strokeWidth={2}
              aria-hidden="true"
              className="mt-2 shrink-0 text-ink-faint transition-all group-hover:translate-x-0.5 group-hover:text-coral-deep"
            />
          </Link>
        </div>
      </div>
    </>
  );
}
