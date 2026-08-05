import PageHero from "@/components/PageHero";
import EventDetails from "@/components/EventDetails";
import { Magnifier } from "@/components/lab/cast";
import { EVENT } from "@/lib/event";

const JUDGE_SIGNUP_URL =
  "https://docs.google.com/forms/d/14Yo2IgS-PAsYNIFac4pzJRdTMX6xEnjtGslqGtAx6TQ/viewform";

export default function JudgesPage() {
  return (
    <>
      <PageHero
        title="Become a judge"
        subtitle="Help evaluate student projects on fair morning. Your feedback can shape a kid's love for science."
      />

      <div className="mx-auto max-w-4xl space-y-12 px-4 py-12 sm:space-y-16 sm:px-6 sm:py-16 md:py-20 lg:px-8">
        <EventDetails className="reveal" />

        {/* Who can judge */}
        <section className="reveal flex flex-col-reverse items-start gap-8 sm:flex-row sm:items-center sm:gap-12">
          <div className="flex-1">
            <h2 className="display-section mb-4">Who can judge?</h2>
            <p className="max-w-prose text-lg leading-relaxed text-ink-soft">
              Teachers, professionals, and community members with an interest
              in science, technology, engineering, or math. No judging
              experience needed: if you love science and mentoring kids, you
              belong here.
            </p>
          </div>
          <Magnifier className="w-28 shrink-0 sm:w-32 h-auto" />
        </section>

        {/* Sign up */}
        <section className="reveal dotted-band rounded-2xl border border-line p-8 text-center sm:p-10">
          <h2 className="display-section mb-3">Ready to make a difference?</h2>
          <p className="mx-auto mb-8 max-w-xl text-lg text-ink-soft">
            Judging takes one morning, and your encouragement can inspire a
            young scientist.
          </p>
          <a
            href={JUDGE_SIGNUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Sign up to judge
          </a>
        </section>

        {/* What to expect */}
        <section className="reveal">
          <h2 className="display-section mb-8">What to expect</h2>
          <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            <div className="border-t border-line pt-6">
              <h3 className="mb-2 text-lg font-semibold text-ink">
                Training provided
              </h3>
              <p className="leading-relaxed text-ink-soft">
                Training materials and rubrics arrive in advance, so you know
                how to evaluate projects fairly and constructively.
              </p>
            </div>

            <div className="border-t border-line pt-6">
              <h3 className="mb-2 text-lg font-semibold text-ink">
                Standardized rubrics
              </h3>
              <p className="leading-relaxed text-ink-soft">
                Every project is scored on the same six criteria: scientific
                thought, creativity, thoroughness, skill, clarity, and
                presentation.
              </p>
            </div>

            <div className="border-t border-line pt-6">
              <h3 className="mb-2 text-lg font-semibold text-ink">
                Judging schedule
              </h3>
              <p className="leading-relaxed text-ink-soft">
                Judging runs during the fair on{" "}
                <strong className="font-semibold text-ink">
                  {EVENT.dateFull}
                </strong>
                , 9:00 AM to 12:00 PM, at {EVENT.venueName}. We assign
                categories to match your background, then email your
                assignment, check-in time, and room layout before fair day.
              </p>
            </div>

            <div className="border-t border-line pt-6">
              <h3 className="mb-2 text-lg font-semibold text-ink">
                Special awards
              </h3>
              <p className="leading-relaxed text-ink-soft">
                Special awards are judged alongside category judging on fair
                morning, with winners announced before the noon close. They
                recognize outstanding work in areas like innovation and
                environmental impact.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
