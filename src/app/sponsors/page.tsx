import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { Beaker, Gear, Lightbulb } from "@/components/lab/cast";
import { EVENT, SPONSOR_INTEREST_URL } from "@/lib/event";

export const metadata: Metadata = {
  title: "Sponsors",
  description:
    "Support a free science fair for Mountain View kids in grades 3 to 5. Supplies, prizes, snacks, or a named award.",
};

/**
 * Sponsor page, Chalk Lab system. Two audiences on one page: businesses
 * deciding whether to help (top), and sponsors who already said yes (the
 * wall, currently empty and honest about it).
 *
 * Copy rule from DESIGN.md holds: no em-dashes, and the only two dates on
 * the site are the Sept 4 close and the Sept 26 fair.
 */

const WAYS = [
  {
    icon: Beaker,
    title: "Supplies",
    body: "Tri-fold display boards for students whose families would rather not buy one, snacks for the kids and the judges, or printing for signage and certificates. Boards are the ask that matters most, because a board is the one cost that makes a family skip the fair.",
  },
  {
    icon: Lightbulb,
    title: "A named award",
    body: "You fund one prize and the award carries your name. Something like the Acme Robotics Award for Best Engineering Design, announced from the front of the room while the whole fair is listening.",
  },
  {
    icon: Gear,
    title: "Something you already give away",
    body: "Gift cards, class passes, books, museum tickets, product samples. If a 9 year old would be excited to win it, we can put it to work.",
  },
];

const RECOGNITION = [
  ["On this page", "Your name and link, listed here for the whole season."],
  ["At the fair", "On the event signage, and read out during the awards."],
  ["On Instagram", "Tagged in a post to @stemresearchclubmvhs."],
  ["On the shirts", "Printed on the volunteer and organizer shirts."],
];

export default function SponsorsPage() {
  return (
    <>
      <PageHero
        title="Sponsor the fair"
        subtitle="A free science fair for Mountain View kids in grades 3 to 5, run by high school student volunteers. Local businesses are how it stays free."
      />

      <div className="mx-auto max-w-4xl space-y-14 px-4 py-12 sm:space-y-20 sm:px-6 sm:py-16 md:py-20 lg:px-8">
        {/* What sponsorship pays for */}
        <section className="reveal">
          <h2 className="display-section mb-4">What your help pays for</h2>
          <p className="max-w-prose text-lg leading-relaxed text-ink-soft">
            Every organizer here is a high school student volunteer and nobody
            is paid. Sponsorship goes to display boards, snacks for
            participants and judges, printed certificates, prizes, and the
            signage that makes the room feel like an event instead of a
            cafeteria.
          </p>
        </section>

        {/* Ways to help */}
        <section className="reveal">
          <h2 className="display-section mb-8">Three ways to help</h2>
          <div className="space-y-8">
            {WAYS.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="flex flex-col-reverse items-start gap-6 border-t border-line pt-7 sm:flex-row sm:items-start sm:gap-8"
              >
                <div className="flex-1">
                  <h3 className="mb-2 text-lg font-semibold text-ink">
                    {title}
                  </h3>
                  <p className="max-w-prose leading-relaxed text-ink-soft">
                    {body}
                  </p>
                </div>
                <Icon className="w-16 shrink-0 sm:w-20 h-auto" />
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-prose leading-relaxed text-ink-soft">
            If sending a contribution is simpler than shopping for us, that
            works too. Get in touch and we will sort out the details.
          </p>
        </section>

        {/* Award sponsors: both versions of fair morning */}
        <section className="reveal rounded-2xl border border-line bg-card p-8 sm:p-10">
          <h2 className="display-section mb-3">
            Sponsoring an award, two ways
          </h2>
          <p className="mb-8 max-w-prose leading-relaxed text-ink-soft">
            Both are completely fine, and they get identical billing.
          </p>
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="border-t-2 border-coral pt-5">
              <h3 className="mb-2 text-lg font-semibold text-ink">
                Come and present it
              </h3>
              <p className="leading-relaxed text-ink-soft">
                Send someone to help judge that category and hand the award to
                the student in person. This is the version families photograph
                and remember.
              </p>
            </div>
            <div className="border-t-2 border-blue pt-5">
              <h3 className="mb-2 text-lg font-semibold text-ink">
                Leave it to us
              </h3>
              <p className="leading-relaxed text-ink-soft">
                Skip the morning entirely. We present the award in your name
                from the front of the room and send you photos afterward. No
                Saturday required.
              </p>
            </div>
          </div>
        </section>

        {/* Recognition */}
        <section className="reveal">
          <h2 className="display-section mb-8">What sponsors get</h2>
          <div className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
            {RECOGNITION.map(([label, body]) => (
              <div key={label} className="border-t border-line pt-5">
                <h3 className="mb-1.5 text-lg font-semibold text-ink">
                  {label}
                </h3>
                <p className="leading-relaxed text-ink-soft">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Get in touch */}
        <section
          id="contact"
          className="reveal dotted-band scroll-mt-24 rounded-2xl border border-line p-8 text-center sm:p-10"
        >
          <h2 className="display-section mb-3">Talk to us</h2>
          <p className="mx-auto mb-8 max-w-xl text-lg text-ink-soft">
            Tell us what you have in mind and we will follow up. Nothing on the
            form is a commitment.
          </p>
          <a
            href={SPONSOR_INTEREST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Sponsor interest form
          </a>
          <p className="mt-6 text-[0.95rem] text-ink-soft">
            Or email us directly at{" "}
            <a
              href={`mailto:${EVENT.contactEmail}?subject=Science%20fair%20sponsorship`}
              className="font-medium text-coral-deep hover:underline"
            >
              {EVENT.contactEmail}
            </a>
            .
          </p>
        </section>

        {/* The honest bit */}
        <section className="reveal border-t border-line pt-8">
          <h2 className="mb-3 text-lg font-semibold text-ink">
            One thing to know up front
          </h2>
          <p className="max-w-prose leading-relaxed text-ink-soft">
            We are a student club, not a 501(c)(3), so a donation to the fair
            is not tax deductible. We would rather tell you now than have you
            find out afterward.
          </p>
        </section>

        {/* Sponsor wall */}
        <section className="reveal">
          <h2 className="display-section mb-4">This year&rsquo;s sponsors</h2>
          <div className="rounded-2xl border border-dashed border-line-strong bg-paper-warm p-10 text-center">
            <p className="mx-auto max-w-md leading-relaxed text-ink-soft">
              Nobody yet. We are a first-year fair and we are asking around
              Mountain View right now. The first names on this wall will sit at
              the top of it.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
