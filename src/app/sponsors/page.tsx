import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { EVENT } from "@/lib/event";
import { SPONSORS } from "@/lib/sponsors";

export const metadata: Metadata = {
  title: "Sponsors",
  description: "Meet the businesses and organizations that supported the 2026 MV Science Fair.",
};

export default function SponsorsPage() {
  return (
    <>
      <PageHero
        title="Thank you to our sponsors"
        subtitle="Local businesses and organizations helped make the 2026 MV Science Fair possible. We’re grateful for their support."
      />
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 md:py-20">
        <h2 className="display-section mb-3">Our 2026 supporters</h2>
        <p className="mb-9 max-w-[60ch] text-ink-soft">
          Their gifts helped provide prizes, printing, food, and experiences for students.
        </p>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SPONSORS.map((sponsor) => (
            <li key={sponsor.name}>
              <a
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-soft flex h-full flex-col items-center p-6 text-center transition-[border-color,box-shadow] duration-200 hover:border-line-strong hover:shadow-[var(--shadow-md)] focus-visible:border-line-strong"
              >
                <div className="flex h-[88px] w-full items-center justify-center">
                  <Image
                    src={sponsor.logo}
                    alt={`${sponsor.name} logo`}
                    width={sponsor.width}
                    height={sponsor.height}
                    className="w-auto max-w-[200px] object-contain"
                    style={{ height: sponsor.logoHeight }}
                  />
                </div>
                <h3 className="mt-5 text-[1.0625rem] font-semibold leading-snug text-ink">
                  {sponsor.name}
                </h3>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-faint">
                  {sponsor.gives}
                </p>
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-12 rounded-2xl border border-line bg-paper-warm p-6 sm:p-8">
          <h2 className="font-display text-2xl font-semibold text-ink">Interested in supporting the next fair?</h2>
          <p className="mt-3 max-w-[58ch] text-ink-soft">
            We’re planning another fair for spring. Sponsorship details will be updated when those plans are confirmed.
          </p>
          <a
            href={`mailto:${EVENT.contactEmail}?subject=Spring%20MV%20Science%20Fair%20sponsorship`}
            className="mt-5 inline-flex font-semibold text-coral-deep underline decoration-line underline-offset-4 hover:decoration-coral"
          >
            Contact the organizers
          </a>
        </div>
      </section>
    </>
  );
}
