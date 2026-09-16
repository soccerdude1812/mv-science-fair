import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, X } from "lucide-react";
import PageHero from "@/components/PageHero";
import FormCard from "@/components/FormCard";
import EventDetails from "@/components/EventDetails";
import { EVENT, MENTOR_REQUEST_URL } from "@/lib/event";

export const metadata: Metadata = {
  title: "Forms",
  description:
    "Every MV Science Fair form, live and closed: safety approvals, mentor requests, judge and volunteer sign-ups.",
};

const CONSENT_RULES = [
  "Tell participants what your project is about and what they will be asked to do",
  "Get their voluntary permission; no one should be pressured or forced",
  "Get written parent/guardian permission if participants are under 18, unless we approve the anonymous survey exception",
  "Let them stop at any time, for any reason",
  "Keep all data confidential: use codes (e.g., Participant 1), never real names on your data, notes, or display board",
];

const NEVER_ALLOWED = [
  "Open flames (candles, matches, lighters)",
  "Industrial or laboratory chemicals",
  "High-voltage electricity (wall outlets)",
  "Compressed gas cylinders (propane, CO2 cartridges, air tanks)",
  "Radioactive materials",
  "Toxic substances (pesticides, paint thinner)",
  "Weapons, projectiles, or launchers",
  "Biological hazards (bacteria, mold, blood)",
];

/** "Required when / not required when" facts for a safety form. */
function WhenNeeded({
  required,
  notRequired,
  examplesRequired,
  examplesNotRequired,
}: {
  required: string;
  notRequired: string;
  examplesRequired: string;
  examplesNotRequired: string;
}) {
  return (
    <dl className="mt-6 grid gap-x-10 gap-y-5 border-t border-line pt-6 sm:grid-cols-2">
      <div>
        <dt className="data-label mb-1.5">Required when</dt>
        <dd className="text-sm leading-relaxed text-ink-soft">
          {required}
          <span className="mt-1.5 block text-ink-faint">
            Examples: {examplesRequired}.
          </span>
        </dd>
      </div>
      <div>
        <dt className="data-label mb-1.5">Not required when</dt>
        <dd className="text-sm leading-relaxed text-ink-soft">
          {notRequired}
          <span className="mt-1.5 block text-ink-faint">
            Examples: {examplesNotRequired}.
          </span>
        </dd>
      </div>
    </dl>
  );
}

/** Header for a safety form card: title plus a preview link to the form. */
function SafetyFormHeader({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h3 className="text-xl font-semibold">{title}</h3>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-semibold text-coral-deep underline-offset-4 hover:underline"
        >
          Preview the form
          <ArrowUpRight size={14} strokeWidth={2} aria-hidden="true" />
        </a>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft sm:text-base">
        {description}
      </p>
    </div>
  );
}

export default function FormsPage() {
  return (
    <div>
      <PageHero
        title="Forms"
        subtitle="Every form the fair uses, live and closed, so you can see at a glance which ones still apply to you."
      />

      <div className="mx-auto max-w-4xl space-y-16 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 sm:space-y-20">
        {/* The application. Closed 2026-09-13, and deliberately NOT linked: the
            URL is printed on a flier and sitting in inboxes, so the page has to
            be able to name the form and say what happened to it without handing
            anyone a live door into a shut window. */}
        <section className="reveal card-soft p-7 sm:p-10">
          <span className="inline-flex items-center rounded-full bg-paper-warm px-[0.85rem] py-[0.3rem] text-[0.8125rem] font-semibold text-ink-faint">
            Closed {EVENT.applicationDeadlineShort}
          </span>
          <h2 className="mt-5 text-2xl font-semibold sm:text-3xl">
            Application &amp; Registration Form
          </h2>
          <p className="mt-3 max-w-2xl text-ink-soft">
            Applications closed {EVENT.applicationDeadlineFull}. Thirty-two
            projects came in and thirty-one were approved, and every family has
            had a decision by email.
          </p>
          <p className="mt-3 max-w-2xl text-ink-soft">
            If you applied and have heard nothing, check your spam folder, then
            write to{" "}
            <a
              href={`mailto:${EVENT.contactEmail}`}
              className="font-semibold text-coral-deep hover:underline"
            >
              {EVENT.contactEmail}
            </a>
            .
          </p>
          <Link href="/fair-day" className="btn-ghost mt-7">
            What happens on fair day
            <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
          </Link>
        </section>

        {/* No `arrival` here on purpose. This page carries the judge and
            event-day volunteer sign-ups further down, and they keep their own
            check-in times: showing them the participants' 8:00 AM window would
            be telling them to turn up an hour early. */}
        <EventDetails className="reveal" />

        {/* Safety forms: sent by us, only when a project needs one */}
        <section className="reveal">
          <h2 className="text-2xl font-semibold sm:text-3xl">Safety forms</h2>
          <p className="mt-3 max-w-2xl text-ink-soft">
            <strong className="font-semibold text-ink">
              You don&apos;t submit these yourself.
            </strong>{" "}
            If your project involves human participants or hazardous materials,
            we emailed you the right form when we reviewed your application. If
            one is still outstanding, finishing it is the most urgent thing on
            your list: a project cannot be cleared for fair day without it.
          </p>

          <div className="mt-8 space-y-6">
            {/* Human participation */}
            <article className="reveal card-soft p-6 sm:p-8">
              <SafetyFormHeader
                title="Human Participation Approval Form"
                description="We send this to you after review if your project involves surveys, interviews, or testing people."
                href="https://docs.google.com/forms/d/12x3JQnRFlzUU86kUAPY_eyoPJ33u0h5tUsIFXcRCAjM/viewform"
              />

              <div className="mt-6 rounded-2xl bg-coral-soft p-5">
                <p className="text-sm font-semibold text-ink">
                  No projects involving any risk to human participants are
                  permitted.
                </p>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                  Keep interactions simple and safe, such as surveys or taste
                  tests. Participants&apos; wellbeing and comfort come first,
                  always.
                </p>
              </div>

              <WhenNeeded
                required="Surveying, interviewing, testing people, or observing behavior."
                notRequired="Using existing public data, no interaction with people."
                examplesRequired="surveying classmates about screen time, testing how music affects study habits"
                examplesNotRequired="analyzing published health data, measuring plant growth"
              />

              <div className="mt-6 border-t border-line pt-6">
                <h4 className="text-base font-semibold">
                  Participant consent requirements
                </h4>
                <ul className="mt-3 space-y-2">
                  {CONSENT_RULES.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-soft"
                    >
                      <Check
                        size={15}
                        strokeWidth={2}
                        aria-hidden="true"
                        className="mt-1 shrink-0 text-green"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>

            {/* Hazardous materials */}
            <article className="reveal card-soft p-6 sm:p-8">
              <SafetyFormHeader
                title="Hazardous Materials & Safety Approval Form"
                description="We send this to you after review if your project uses chemicals, electrical equipment, sharp tools, or heat sources."
                href="https://docs.google.com/forms/d/1Jk1m1QwhiiDPHf-ZZ8C4D6FglqJB9aUStY8G4OlHpmk/viewform"
              />

              <WhenNeeded
                required="Chemicals, electrical equipment, sharp tools, heat sources."
                notRequired="Common household items with no realistic safety risk."
                examplesRequired="vinegar and steel wool reaction, building motor circuits"
                examplesNotRequired="baking soda and vinegar in small amounts, a household spray can with a grown-up, paper airplanes"
              />

              <div className="mt-6 rounded-2xl bg-coral-soft p-5">
                <p className="text-sm font-semibold text-ink">
                  Never allowed, no exceptions:
                </p>
                <ul className="mt-2 grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
                  {NEVER_ALLOWED.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-soft"
                    >
                      <X
                        size={15}
                        strokeWidth={2}
                        aria-hidden="true"
                        className="mt-1 shrink-0 text-coral-deep"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </div>
        </section>

        {/* Volunteer and judge forms */}
        <section className="reveal">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Volunteer and judge forms
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <FormCard
              className="reveal stagger-1"
              title="Judge Sign-Up"
              description="Interested in judging projects? Sign up here. Training and rubrics will be provided in advance."
              href="https://docs.google.com/forms/d/14Yo2IgS-PAsYNIFac4pzJRdTMX6xEnjtGslqGtAx6TQ/viewform"
            />
            <FormCard
              className="reveal stagger-2"
              title="Event-Day Volunteering"
              description="Help out on fair day. Open to high school students and community members."
              href="https://docs.google.com/forms/d/1iuy7stpEJE6Espci9gCiEdNe06Cx0DR8I73fKNuyCbg/viewform"
            />
            <FormCard
              className="reveal stagger-3"
              title="Mentor Volunteer Interest"
              description="High school students: share your knowledge and experience by mentoring a young scientist."
              href="https://docs.google.com/forms/d/1Go59zVliqQohI9kTUKptz8PFpYWdTSJbQ5qzyY6b2yY/viewform"
            />
            <FormCard
              className="reveal stagger-4"
              title="High School Mentor Request"
              description="Parents: request a high school student mentor to guide your child through their project."
              href={MENTOR_REQUEST_URL}
            />
          </div>
        </section>

        {/* When to submit each form */}
        <section className="reveal">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            When to submit each form
          </h2>
          <ol className="mt-6 divide-y divide-line border-t border-line">
            <li className="grid grid-cols-[2.75rem_1fr] py-5">
              <span className="data-label pt-1.5" aria-hidden="true">
                01
              </span>
              <div>
                <p className="font-semibold text-ink">
                  Application &amp; Registration Form
                </p>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                  Closed {EVENT.applicationDeadlineFull}. Nothing to do here.
                </p>
              </div>
            </li>
            <li className="grid grid-cols-[2.75rem_1fr] py-5">
              <span className="data-label pt-1.5" aria-hidden="true">
                02
              </span>
              <div>
                <p className="font-semibold text-ink">
                  Safety forms, only if we asked
                </p>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                  We emailed the Human Participation or Hazardous Materials form
                  to the projects that need one. Due back before fair day.
                </p>
              </div>
            </li>
            <li className="grid grid-cols-[2.75rem_1fr] py-5">
              <span className="data-label pt-1.5" aria-hidden="true">
                03
              </span>
              <div>
                <p className="font-semibold text-ink">
                  Mentor request, optional
                </p>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                  <a
                    href={MENTOR_REQUEST_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-coral-deep hover:underline"
                  >
                    Request a high school mentor
                  </a>{" "}
                  any time before fair day. Free and optional, and most stuck
                  points have a{" "}
                  <Link
                    href="/mentors"
                    className="font-semibold text-coral-deep hover:underline"
                  >
                    fix you can try first
                  </Link>
                  .
                </p>
              </div>
            </li>
          </ol>
        </section>
      </div>
    </div>
  );
}
