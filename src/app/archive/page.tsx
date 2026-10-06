import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "2026 fair archive",
  description:
    "The original 2026 MV Science Fair planning pages, preserved for families and the team preparing the next fair.",
};

const sections = [
  {
    title: "Project and family resources",
    links: [
      ["/the-process", "Project process and board preparation"],
      ["/students-families", "Students and families"],
      ["/example-boards", "Example project boards"],
      ["/project-ideas", "Project ideas"],
      ["/display-and-safety", "Display and safety rules"],
      ["/rules", "Fair rules"],
      ["/forms", "2026 forms and application status"],
    ],
  },
  {
    title: "People and event operations",
    links: [
      ["/mentors", "Mentor information"],
      ["/judges", "Judge information"],
      ["/volunteer", "Volunteer information"],
      ["/fair-day", "Fair day details"],
      ["/team", "The organizing team"],
    ],
  },
];

export default function ArchivePage() {
  return (
    <>
      <PageHero
        title="The 2026 fair archive"
        subtitle="The fair has ended. These original planning pages are kept intact as a reference for families and the spring organizing team."
      />
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 md:py-20">
        <div className="archive-note rounded-2xl border border-line bg-white p-6 sm:p-8">
          <h2 className="font-display text-2xl font-semibold text-ink">Planning for spring</h2>
          <p className="mt-3 max-w-[62ch] text-ink-soft">
            Another MV Science Fair is being planned for spring. The date and
            details have not been confirmed. Use these archived materials as a
            starting point, then update them when the new plan is set. The 2026
            forms and deadlines are historical.
          </p>
        </div>

        <div className="mt-12 grid gap-12 md:grid-cols-2">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="display-section !text-2xl">{section.title}</h2>
              <ul className="mt-5 divide-y divide-line border-y border-line">
                {section.links.map(([href, label]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="flex items-center justify-between gap-4 py-3.5 font-medium text-ink-soft transition-colors hover:text-coral-deep"
                    >
                      {label}
                      <span aria-hidden="true" className="text-coral-deep">↗</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      <p className="mt-12 border-t border-line pt-6 text-sm text-ink-faint">
          The previous home page is also preserved as a reference. Its 2026 dates and actions describe the completed fair.
        </p>
        <Link href="/archive/pre-fair-home" className="mt-2 inline-block font-semibold text-coral-deep underline underline-offset-4">
          View the previous home page
        </Link>
        <p className="mt-7 text-sm text-ink-faint">
          The 2026 sponsor plan is preserved too. Its contribution options and recognition commitments applied to that completed fair.
        </p>
        <Link href="/archive/2026-sponsorship-plan" className="mt-2 inline-block font-semibold text-coral-deep underline underline-offset-4">
          View the previous sponsor plan
        </Link>
      </section>
    </>
  );
}
