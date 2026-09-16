import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import EventDetails from "@/components/EventDetails";
import { EVENT } from "@/lib/event";

export const metadata: Metadata = {
  title: "Students & Families",
  description:
    "Everything a young scientist needs between now and MV Science Fair day, in one place.",
};

const RESOURCES = [
  {
    href: "/fair-day",
    title: "Fair Day",
    blurb: "The morning in order, what to bring, what stays home, and how judging works.",
  },
  {
    href: "/mentors",
    title: "Stuck? Get Help",
    blurb: "Fixes for the four places projects get stuck, and how to request a mentor.",
  },
  {
    href: "/display-and-safety",
    title: "Display & Safety Guidelines",
    blurb: "Board dimensions and safety rules.",
  },
  {
    href: "/example-boards",
    title: "Example Boards",
    blurb: "Where the nine sections go, and three finished boards to copy.",
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
    href: "/project-ideas",
    title: "Project Ideas",
    blurb: "Twelve worked examples, useful now for shaping a write-up or a chart.",
  },
  {
    href: "/forms",
    title: "All Forms",
    blurb: "Safety, mentor, judge and volunteer forms, with what is still open.",
  },
] as const;

export default function StudentsFamiliesPage() {
  return (
    <>
      <PageHero
        title="Students & Families"
        subtitle="Everything your young scientist needs between now and fair day, in one place."
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16 md:py-20">
        <EventDetails className="reveal" arrival />

        {/* Getting started */}
        <section className="reveal mt-14 sm:mt-16">
          <h2 className="display-section">Start with the get ready guide</h2>
          <p className="mt-3 max-w-2xl text-ink-soft">
            Running experiments, making sense of the numbers, building a board,
            practising for judges: one guide walks you through all of it.
          </p>
          <Link href="/the-process" className="btn-ghost mt-6">
            Read the get ready guide
            <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          </Link>
        </section>

        {/* Fair day morning */}
        <section className="reveal mt-14 border-t border-line pt-10 sm:mt-16 sm:pt-12">
          <h2 className="display-section">The morning of the 26th</h2>
          <p className="mt-3 max-w-2xl text-ink-soft">
            Scientists arrive between{" "}
            <strong className="font-semibold text-ink">
              {EVENT.arrivalWindowFull}
            </strong>{" "}
            to check in and set up. Doors open to visitors at 9:00, so every
            board should be standing by then. Families are welcome to stay for
            the whole morning and walk the room.
          </p>
          <Link href="/fair-day" className="btn-ghost mt-6">
            The morning in order
            <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          </Link>
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

        {/* Applications */}
        <section className="reveal mt-14 border-t border-line pt-10 sm:mt-16 sm:pt-12">
          <h2 className="display-section">Applications are closed</h2>
          <p className="mt-3 max-w-2xl text-ink-soft">
            Applications closed {EVENT.applicationDeadlineFull} and every family
            who applied has had a decision by email. If yours has not arrived,
            check your spam folder and then write to us.
          </p>
        </section>

        {/* Contact */}
        <section className="reveal mt-14 border-t border-line pt-10 sm:mt-16 sm:pt-12">
          <h2 className="display-section">Questions?</h2>
          <p className="mt-3 max-w-2xl text-ink-soft">
            Ask us anything about your project, the rules, or the morning of the
            26th. Real people read this inbox.
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
