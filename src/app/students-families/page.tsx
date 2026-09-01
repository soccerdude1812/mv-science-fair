import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import EventDetails from "@/components/EventDetails";
import { EVENT, APPLICATION_URL } from "@/lib/event";

const RESOURCES = [
  {
    href: "/project-ideas",
    title: "Project Ideas",
    blurb: "Twelve example projects with steps, materials, and ways to make each one your own.",
  },
  {
    href: "/display-and-safety",
    title: "Display & Safety Guidelines",
    blurb: "Board dimensions and safety rules.",
  },
  {
    href: "/the-process#judging",
    title: "Judging Questions & Rubric",
    blurb: "Practice questions judges ask and how they score.",
  },
  {
    href: "/rules",
    title: "Rules & Guidelines",
    blurb: "All rulebooks and guidelines.",
  },
  {
    href: "/forms",
    title: "All Forms",
    blurb: "Application, approval, and volunteer forms.",
  },
] as const;

export default function StudentsFamiliesPage() {
  return (
    <>
      <PageHero
        title="Students & Families"
        subtitle="Everything your young scientist needs for the MV Science Fair, in one place."
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16 md:py-20">
        <EventDetails className="reveal" />

        {/* Getting started */}
        <section className="reveal mt-14 sm:mt-16">
          <h2 className="display-section">Start with the process guide</h2>
          <p className="mt-3 max-w-2xl text-ink-soft">
            Choosing a topic, running experiments, building a board: one guide
            walks you through the whole project.
          </p>
          <Link href="/the-process" className="btn-ghost mt-6">
            Read the process guide
            <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          </Link>
        </section>

        {/* After you apply */}
        <section className="reveal mt-14 border-t border-line pt-10 sm:mt-16 sm:pt-12">
          <h2 className="display-section">After you apply</h2>
          <p className="mt-3 max-w-2xl text-ink-soft">
            The Science Fair Committee emails a confirmation with setup details
            and next steps. If it is not in your inbox, check your spam folder.
          </p>
        </section>

        {/* Resources */}
        <section className="reveal mt-14 border-t border-line pt-10 sm:mt-16 sm:pt-12">
          <h2 className="display-section">Resources</h2>
          <ul className="mt-6">
            {RESOURCES.map((r, i) => (
              <li
                key={r.title}
                className={i === 0 ? undefined : "border-t border-line"}
              >
                <Link
                  href={r.href}
                  className="group flex items-center justify-between gap-4 py-5"
                >
                  <span>
                    <span className="font-semibold text-ink">{r.title}</span>
                    <span className="mt-0.5 block text-sm text-ink-soft">
                      {r.blurb}
                    </span>
                  </span>
                  <ArrowRight
                    className="h-4 w-4 shrink-0 text-ink-faint transition-transform group-hover:translate-x-1"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Apply */}
        <section className="reveal mt-14 border-t border-line pt-10 sm:mt-16 sm:pt-12">
          <h2 className="display-section">Not signed up yet?</h2>
          <p className="mt-3 max-w-2xl text-ink-soft">
            Applications close {EVENT.applicationDeadlineFull}. We review them as
            they arrive, so the earlier you apply, the sooner you can start.
          </p>
          <a
            href={APPLICATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-6"
          >
            Apply now
          </a>
        </section>

        {/* Contact */}
        <section className="reveal mt-14 border-t border-line pt-10 sm:mt-16 sm:pt-12">
          <h2 className="display-section">Questions?</h2>
          <p className="mt-3 max-w-2xl text-ink-soft">
            Ask us anything about the fair, your application, or your project.
          </p>
          <a
            href={`mailto:${EVENT.contactEmail}`}
            className="mt-4 inline-block font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-coral"
          >
            {EVENT.contactEmail}
          </a>
        </section>
      </div>
    </>
  );
}
