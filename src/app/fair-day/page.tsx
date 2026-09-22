import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";
import PageHero from "@/components/PageHero";
import EventDetails from "@/components/EventDetails";
import { Magnifier } from "@/components/lab/cast";
import { EVENT } from "@/lib/event";

export const metadata: Metadata = {
  title: "Fair day",
  description: `Everything for the morning of the MV Science Fair: ${EVENT.dateFull}, ${EVENT.timeFull}, at ${EVENT.venueName}. Participants arrive and set up ${EVENT.arrivalWindowFull}.`,
};

/**
 * The fair day page. Added 2026-09-15, when applications closed and the site's
 * job became getting 31 approved projects to the morning of the 26th.
 *
 * EVERY TIME ON THIS PAGE IS SOURCED. The 8 to 9 arrival window and the 9 to 12
 * fair sit in event.ts and in every approval letter the club has sent.
 *
 * The inside of the morning was settled in the 2026-09-21 planning meeting and
 * supersedes the 2026-09-20 fair day letter: judging runs 9:20 to 10:35, the
 * judges then break to confer while snacks are out, and awards run 11:15 to
 * 11:50. The 9:15 and 11:30 in the earlier letter were the open decision the
 * event day checklist flagged; Eeshan chose the meeting's times on 2026-09-21
 * and a correction went to the 44 family addresses. Do not add a time to this
 * page that no organizer has agreed to, and if the schedule changes again, this
 * page and a note to the families change with it.
 */

/* The morning, in the order it happens. `who` drives the chip colour: what a
   participant does, versus what simply happens in the room around them. */
const MOMENTS = [
  {
    time: EVENT.arrivalWindowFull,
    title: "Arrive and set up",
    who: "Participants",
    body: "Come to the Multi-Use Room and check in with us at the door. We will point you to your table, and the display and safety check happens here too. Stand your board up, lay out your data, and make sure it does not wobble. An hour sounds like plenty, and it goes quickly, so come well before 9.",
  },
  {
    time: "9:00 AM",
    title: "Doors open",
    who: "Everyone",
    body: "Visitors come in. By this point every board should be standing and every scientist should be beside their own table, ready to talk about what they found.",
  },
  {
    time: "9:20 AM",
    title: "Judging begins",
    who: "Everyone",
    body: "Judging runs until about 10:35. Judges work through the room in their own order, so stay near your board and be ready whenever one reaches you. In between, families and other students will stop and ask you about your project, which is the fun part.",
  },
  {
    time: "10:35 AM",
    title: "A break while the judges confer",
    who: "Everyone",
    body: "About forty minutes with snacks out while the judges talk it over and write the certificates. Walk the room and look at the projects you have not seen yet. Please be back in a seat by 11:10.",
  },
  {
    time: "11:15 AM",
    title: "Awards",
    who: "Everyone",
    body: "About thirty five minutes. Category and special award winners are announced. Everybody who presents a project has done the thing that matters, which is finding something out and explaining it to a stranger.",
  },
  {
    time: "12:00 PM",
    title: "Pack up and go home",
    who: "Participants",
    body: "Take your board, your notes and everything you brought in with you.",
  },
];

const BRING = [
  "Your display board, already assembled",
  "Your data table or lab notebook",
  "Photographs of your setup and your results",
  "A video on a phone or tablet, if your project was a build",
  "Water, and a grown-up who knows where you are",
];

const LEAVE = [
  "The project itself: models, builds, samples, equipment",
  "Liquids, powders, chemicals, anything that pours",
  "Anything that switches on, mixes, heats, or launches",
  "Handouts, printouts or copies for the judges",
  "Your name on the front of the board",
];

export default function FairDayPage() {
  return (
    <>
      <PageHero
        title="Fair day"
        subtitle="Saturday, September 26. Here is exactly how the morning runs, what to bring, and what happens when a judge reaches your table."
      />

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <EventDetails className="reveal" arrival />

        {/* The morning, in order */}
        <section className="mt-14 sm:mt-20">
          <h2 className="display-section reveal">The morning, in order</h2>
          <p className="reveal mt-3 max-w-2xl text-ink-soft">
            Six moments. The only one with a hard edge is the first.
          </p>

          <ol className="mt-8 border-t border-line">
            {MOMENTS.map((m) => (
              <li
                key={m.title}
                className="reveal grid gap-x-8 gap-y-2 border-b border-line py-7 sm:grid-cols-[11rem_1fr]"
              >
                <div>
                  <p className="font-mono text-sm font-medium text-ink">
                    {m.time}
                  </p>
                  <p className="data-label mt-1.5">{m.who}</p>
                </div>
                <div className="min-w-0">
                  <h3 className="text-xl text-ink">{m.title}</h3>
                  <p className="mt-2 max-w-[62ch] leading-relaxed text-ink-soft">
                    {m.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Bring / leave */}
        <section className="mt-14 sm:mt-20">
          <h2 className="display-section reveal">What comes with you</h2>
          <p className="reveal mt-3 max-w-2xl text-ink-soft">
            Projects are presented, not demonstrated. Your board and your numbers
            do the talking, and the project itself stays at home.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="reveal card-soft p-6 sm:p-7">
              <p className="data-label">Bring</p>
              <ul className="mt-4 space-y-3">
                {BRING.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check
                      className="mt-1.5 h-[17px] w-[17px] shrink-0 text-green"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                    <span className="text-ink-soft">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="reveal stagger-1 card-soft p-6 sm:p-7">
              <p className="data-label">Leave at home</p>
              <ul className="mt-4 space-y-3">
                {LEAVE.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <X
                      className="mt-1.5 h-[17px] w-[17px] shrink-0 text-coral-deep"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                    <span className="text-ink-soft">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="reveal mt-6 rounded-2xl bg-marigold-soft p-6">
            <p className="font-semibold text-ink">
              If you built something, film it.
            </p>
            <p className="mt-2 max-w-[62ch] leading-relaxed text-ink-soft">
              A video of your build running does the job the build would have
              done, and it never spills, tips over, or refuses to work in front
              of a judge. Shoot it at home this week while everything still
              works.
            </p>
          </div>

          <Link href="/display-and-safety" className="btn-ghost reveal mt-8">
            Full display and safety rules
            <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          </Link>
        </section>
      </div>

      {/* Judging */}
      <section className="dotted-band border-y border-line">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="flex flex-col-reverse items-start gap-8 sm:flex-row sm:items-center sm:gap-12">
            <div className="flex-1">
              <h2 className="display-section reveal">
                When a judge reaches your table
              </h2>
              <p className="reveal mt-4 max-w-prose text-lg leading-relaxed text-ink-soft">
                A judge will read your board, then ask you to walk them through
                it. Talk about what you did and what you found out, not what you
                hoped would happen. Telling a judge that a result surprised you,
                and what you think went wrong, is a strong answer rather than a
                weak one.
              </p>
            </div>
            <Magnifier className="h-auto w-28 shrink-0 sm:w-32" />
          </div>

          <div className="reveal mt-10 grid gap-x-10 gap-y-6 sm:grid-cols-2">
            <div className="border-t border-line pt-5">
              <h3 className="mb-2 text-lg font-semibold text-ink">
                No appointment to keep
              </h3>
              <p className="leading-relaxed text-ink-soft">
                Judging starts at 9:20 and runs until about 10:35, but you are
                not given a slot inside that. Stay near your board and
                be ready whenever a judge reaches you.
              </p>
            </div>
            <div className="border-t border-line pt-5">
              <h3 className="mb-2 text-lg font-semibold text-ink">
                Judged inside your category
              </h3>
              <p className="leading-relaxed text-ink-soft">
                Every project is scored on the same six criteria: scientific
                thought, creativity, thoroughness, skill, clarity, and
                presentation.
              </p>
            </div>
            <div className="border-t border-line pt-5">
              <h3 className="mb-2 text-lg font-semibold text-ink">
                Nothing changes hands
              </h3>
              <p className="leading-relaxed text-ink-soft">
                Do not pass a judge papers, printouts or photographs. Everything
                you want them to see lives on the board and on your table.
              </p>
            </div>
            <div className="border-t border-line pt-5">
              <h3 className="mb-2 text-lg font-semibold text-ink">
                Names stay on the back
              </h3>
              <p className="leading-relaxed text-ink-soft">
                Your name belongs on the back of the board only, so a judge
                meets the work before they meet the scientist.
              </p>
            </div>
          </div>

          <div className="reveal mt-9 flex flex-wrap gap-3">
            <Link href="/the-process#judging" className="btn-ghost">
              Practise the eight questions judges ask
              <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            </Link>
            <Link href="/example-boards" className="btn-ghost">
              See finished boards
              <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Families */}
      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <section>
          <h2 className="display-section reveal">For families</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            <div className="reveal border-t-2 border-ink pt-5">
              <h3 className="font-body text-lg font-semibold text-ink">
                Stay as long as you like
              </h3>
              <p className="mt-2 text-[0.98rem] text-ink-soft">
                You are welcome for the whole morning, and walking the room to
                see the other projects is half the point of a fair.
              </p>
            </div>
            <div className="reveal stagger-1 border-t-2 border-ink pt-5">
              <h3 className="font-body text-lg font-semibold text-ink">
                It still costs nothing
              </h3>
              <p className="mt-2 text-[0.98rem] text-ink-soft">
                Entry, judging and the morning itself are free, for scientists
                and for visitors alike.
              </p>
            </div>
            <div className="reveal stagger-2 border-t-2 border-ink pt-5">
              <h3 className="font-body text-lg font-semibold text-ink">
                Let them answer
              </h3>
              <p className="mt-2 text-[0.98rem] text-ink-soft">
                When a judge asks your child a question, the pause before they
                answer is doing useful work. It is their project to explain.
              </p>
            </div>
          </div>

          <p className="reveal mt-10 text-ink-soft">
            Anything at all about the morning, ask us:{" "}
            <a
              href={`mailto:${EVENT.contactEmail}`}
              className="font-medium text-coral-deep hover:underline"
            >
              {EVENT.contactEmail}
            </a>
          </p>
        </section>
      </div>
    </>
  );
}
