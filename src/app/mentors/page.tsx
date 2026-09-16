import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import { TestTube } from "@/components/lab/cast";
import { EVENT, MENTOR_REQUEST_URL } from "@/lib/event";

export const metadata: Metadata = {
  title: "Stuck? Get help",
  description:
    "Help for the last stretch before the MV Science Fair: building your poster, an experiment that will not behave, making sense of your numbers, and practising what you say to a judge. Free high school mentors available.",
};

/**
 * The help page. Added 2026-09-15 at the owner's request, for the eleven days
 * between applications closing and fair day.
 *
 * WHY IT IS SHAPED LIKE A HELP DESK AND NOT A FORM. The mentor request form has
 * existed since August and was linked from /forms and /the-process, and four
 * families used it. The thing that actually happens in the last fortnight is
 * narrower and more urgent than "I would like a mentor": a board that will not
 * lay out, an experiment giving different answers every run, a page of numbers
 * nobody can read. So the page answers those on the spot and offers a person as
 * the escalation, rather than making a form the only door.
 *
 * The mentor offer is deliberately smaller than August's. See the note on
 * MENTOR_REQUEST_URL in event.ts: the reservoir is thin, so this page promises
 * a session or two on a specific problem and never "a mentor for your project".
 */

const STUCK = [
  {
    chip: "chip--coral",
    label: "Your poster",
    heading: "The board will not come together",
    symptom:
      "You have the work done and a blank piece of cardboard, and every way you try to lay it out looks wrong.",
    moves: [
      "Stop designing and start placing. Write each of the nine required sections on a separate sheet of paper, then move the sheets around the board until the order reads left to right, top to bottom.",
      "Give the middle panel to your results. The question and hypothesis go top left, the method down the left side, the conclusion bottom right. A judge should be able to follow it without you.",
      "Titles you can read from a metre away, body text you can read from arm's length. If you are shrinking text to make something fit, cut the text instead.",
      "Glue nothing until the whole layout is sitting there loose and you like it.",
    ],
    link: { href: "/example-boards", text: "Three finished boards, pulled apart" },
  },
  {
    chip: "chip--green",
    label: "Experimentation",
    heading: "The experiment is not behaving",
    symptom:
      "It gives you a different answer every time, or nothing happens at all, or it worked once and never again.",
    moves: [
      "Change one thing at a time. If two things changed between run three and run four, the run tells you nothing.",
      "Write down the runs that go wrong, with what went wrong. Those are data, and judges take them seriously. Throwing them away is the actual mistake.",
      "Do at least three trials of everything. Results that bounce around are normal, and three runs are what let you say so honestly.",
      "Make the push identical every time. A ramp and a fixed starting mark beat a hand. A measuring cup beats a guess.",
      "If it still will not work, that is a finding. A project that explains why something failed beats a project that quietly reports a success it did not get.",
    ],
    link: { href: "/the-process", text: "Planning, variables and trials" },
  },
  {
    chip: "chip--blue",
    label: "Your numbers",
    heading: "You have data and no idea what it says",
    symptom:
      "A page of measurements, and no sense of what any of it means or how to put it on a board.",
    moves: [
      "Average each group first. Add up the trials, divide by how many there were, and write the averages in a small table.",
      "One chart, and only one. Bar chart to compare groups, line chart for something changing over time. Label both axes and say what the units are.",
      "Then read your own chart out loud and write what you see. That sentence is your conclusion.",
      "Check the conclusion against the table underneath it before you glue anything down. If the table says your favourite came second, the conclusion has to say second.",
    ],
    link: { href: "/the-process", text: "Averages, comparisons and patterns" },
  },
  {
    chip: "chip--marigold",
    label: "Talking to a judge",
    heading: "You freeze when you try to explain it",
    symptom:
      "You know the project inside out and it falls apart the moment somebody asks you about it.",
    moves: [
      "Practise out loud, standing up, to a person. Reading it in your head does not work and everyone finds this out too late.",
      "Learn the opening thirty seconds only: what you wondered, what you did, what you found. The rest is just answering questions.",
      "Have somebody at home ask you the eight questions judges actually ask, until none of them is a surprise.",
      "It is completely fine to say you do not know. Following it with what you would try next is what a scientist does.",
    ],
    link: { href: "/the-process#judging", text: "The eight questions, and the rubric" },
  },
];

export default function MentorsPage() {
  return (
    <>
      <PageHero
        title="Stuck? Get help"
        subtitle="Everybody gets stuck somewhere between the idea and fair day. Here is what to do about the four places it usually happens, and how to get a high schooler to help with yours."
      />

      {/* The four stuck points */}
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <section className="reveal flex flex-col-reverse items-start gap-8 sm:flex-row sm:items-center sm:gap-12">
          <div className="flex-1">
            <h2 className="display-section">Where projects get stuck</h2>
            <p className="mt-4 max-w-prose text-lg leading-relaxed text-ink-soft">
              Find the one that sounds like your week. None of this needs anyone
              else, and all of it is worth trying before you ask for a mentor.
            </p>
          </div>
          <TestTube className="h-auto w-24 shrink-0 sm:w-28" />
        </section>

        <div className="mt-12 space-y-6">
          {STUCK.map(({ chip, label, heading, symptom, moves, link }, i) => (
            <article
              key={label}
              className={`reveal stagger-${i + 1} card-soft p-6 sm:p-8`}
            >
              <span className={`chip ${chip} text-[0.9rem] font-semibold`}>
                {label}
              </span>
              <h3 className="mt-5 text-xl text-ink sm:text-2xl">{heading}</h3>
              <p className="mt-2 max-w-[62ch] italic leading-relaxed text-ink-faint">
                {symptom}
              </p>

              <ul className="mt-6 space-y-3 border-t border-line pt-5">
                {moves.map((move) => (
                  <li key={move} className="flex items-start gap-3">
                    <span
                      className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-coral"
                      aria-hidden="true"
                    />
                    <span className="max-w-[62ch] leading-relaxed text-ink-soft">
                      {move}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={link.href}
                className="mt-6 inline-flex items-center gap-2 font-medium text-coral-deep hover:underline"
              >
                {link.text}
                <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </div>

      {/* Request a mentor */}
      <section className="dotted-band border-y border-line">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <h2 className="display-section reveal">Ask a high schooler</h2>
          <p className="reveal mt-4 max-w-2xl text-lg text-ink-soft">
            Mentors are high school students from the {EVENT.organizer}. Tell us
            what you are stuck on and we will pair you with somebody who has done
            it before.
          </p>

          <div className="reveal mt-9 grid gap-x-10 gap-y-6 sm:grid-cols-3">
            <div className="border-t border-line pt-5">
              <p className="data-label">What you get</p>
              <p className="mt-2 text-[0.98rem] text-ink-soft">
                A session or two before the 26th, usually over video, on the one
                thing that is blocking you.
              </p>
            </div>
            <div className="border-t border-line pt-5">
              <p className="data-label">What it costs</p>
              <p className="mt-2 text-[0.98rem] text-ink-soft">
                Nothing. Mentors are volunteers, and everything is arranged
                through a parent or guardian.
              </p>
            </div>
            <div className="border-t border-line pt-5">
              <p className="data-label">What they will not do</p>
              <p className="mt-2 text-[0.98rem] text-ink-soft">
                Your project. A mentor asks questions and shows you how, and the
                work and the thinking stay yours.
              </p>
            </div>
          </div>

          <div className="reveal mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a
              href={MENTOR_REQUEST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Request a mentor
              <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
            </a>
            <p className="max-w-[40ch] text-[0.95rem] leading-relaxed text-ink-faint">
              A parent or guardian fills this in. We have a small team of
              mentors, so ask early in the week rather than late.
            </p>
          </div>
        </div>
      </section>

      {/* Just email us */}
      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <section className="reveal">
          <h2 className="display-section">Or just write to us</h2>
          <p className="mt-3 max-w-2xl text-ink-soft">
            A question about your project, the rules, or the morning of the 26th
            does not need a form. Real people read this inbox and answer it.
          </p>
          <a
            href={`mailto:${EVENT.contactEmail}`}
            className="mt-5 inline-block font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-coral"
          >
            {EVENT.contactEmail}
          </a>
        </section>
      </div>
    </>
  );
}
