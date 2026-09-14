import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import BoardDiagram from "@/components/BoardDiagram";
import { Magnifier } from "@/components/lab/cast";
import {
  ANATOMY_TITLE_NOTE,
  BOARD_ANATOMY,
  BOARD_HABITS,
  EXAMPLE_BOARDS,
} from "@/lib/exampleBoards";
import { CATEGORY_COLOR } from "@/lib/projectIdeas";

export const metadata: Metadata = {
  title: "Example boards",
  description:
    "What a strong grades 3 to 5 display board looks like: where the nine required sections go, and three worked examples with real data, charts and conclusions.",
};

/** Pigment per board. Coral stays reserved for CTAs, per DESIGN.md. */
const BOARD_TONE = {
  "paper-towels": "green",
  "paper-airplane-weight": "blue",
  "plants-and-light": "green",
} as const;

export default function ExampleBoardsPage() {
  return (
    <>
      <PageHero
        title="Example boards"
        subtitle="Where the nine required sections go, and three finished boards worth copying."
      />

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8">
        {/* Where these came from. Said plainly, because a family asked for
            boards from previous years and there are none. */}
        <section className="reveal flex flex-col-reverse items-start gap-8 sm:flex-row sm:items-center sm:gap-12">
          <div className="flex-1">
            <h2 className="display-section mb-4">We made these ourselves</h2>
            <p className="max-w-prose text-lg leading-relaxed text-ink-soft">
              2026 is the first MV Science Fair, so there is no shelf of past
              boards to show you. Nothing below is a real student&apos;s work.
              We built three at the level we would be glad to find on a table on
              September 26, using kitchen and classroom materials and questions
              from our own{" "}
              <Link
                href="/project-ideas"
                className="font-semibold text-coral-deep hover:underline"
              >
                project ideas
              </Link>{" "}
              list.
            </p>
            <p className="mt-4 max-w-prose leading-relaxed text-ink-soft">
              The numbers are invented, but they behave like real ones on
              purpose. Two of the three predictions turn out to be wrong, one
              result rises and then falls instead of climbing forever, and every
              conclusion names the weakest part of its own experiment. That is
              the part worth copying.
            </p>
          </div>
          <Magnifier className="h-auto w-24 shrink-0 sm:w-32" />
        </section>

        {/* The anatomy map */}
        <section className="reveal mt-16 border-t border-line pt-12 sm:mt-20 sm:pt-14">
          <h2 className="display-section">Where everything goes</h2>
          <p className="mt-3 max-w-prose text-ink-soft">
            Nine sections are required. A tri-fold reads left panel top to
            bottom, then the middle, then the right, so the story runs in that
            order: what you asked, what you did, what happened, what it means.
          </p>

          <div className="mt-8">
            <BoardDiagram
              spec={BOARD_ANATOMY}
              tone="blue"
              caption={ANATOMY_TITLE_NOTE}
            />
          </div>
        </section>

        {/* The three worked boards */}
        <section className="mt-16 border-t border-line pt-12 sm:mt-20 sm:pt-14">
          <h2 className="display-section reveal">Three finished boards</h2>
          <p className="reveal mt-3 max-w-prose text-ink-soft">
            One from each end of the range, and one in the middle. All three
            could be built at home in the time listed.
          </p>

          <div className="mt-10 space-y-16 sm:space-y-20">
            {EXAMPLE_BOARDS.map((example) => (
              <article key={example.slug} className="reveal">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span className={`chip chip--${CATEGORY_COLOR[example.category]}`}>
                    {example.grade}
                  </span>
                  <span className="text-[0.85rem] text-ink-faint">
                    {example.category}
                  </span>
                  <span className="text-[0.85rem] text-ink-faint">
                    · {example.effort}
                  </span>
                </div>

                <h3 className="display-section !text-[clamp(1.35rem,2.4vw,1.75rem)]">
                  {example.name}
                </h3>

                <div className="mt-6">
                  <BoardDiagram
                    spec={example.board}
                    tone={BOARD_TONE[example.slug as keyof typeof BOARD_TONE]}
                  />
                </div>

                <div className="mt-7 grid gap-8 md:grid-cols-[2fr_1fr]">
                  <div>
                    <h4 className="data-label">Why this one works</h4>
                    <ul className="mt-3 space-y-3">
                      {example.whyItWorks.map((reason) => (
                        <li
                          key={reason}
                          className="flex gap-3 leading-relaxed text-ink-soft"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-[0.6rem] h-[5px] w-[5px] shrink-0 rounded-full bg-ink-faint"
                          />
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="self-start rounded-2xl bg-paper-warm p-5">
                    <p className="text-[0.95rem] leading-relaxed text-ink-soft">
                      Want to run this one? The full write-up has the materials,
                      the first steps, and how to make it yours.
                    </p>
                    <Link
                      href={`/project-ideas/${example.ideaSlug}`}
                      className="mt-3 inline-flex items-center gap-1.5 text-[0.95rem] font-semibold text-coral-deep hover:underline"
                    >
                      See the project idea
                      <ArrowRight
                        className="h-4 w-4"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Habits, with the failure mode next to the fix */}
        <section className="reveal mt-16 border-t border-line pt-12 sm:mt-20 sm:pt-14">
          <h2 className="display-section">Six habits that show up on a board</h2>
          <p className="mt-3 max-w-prose text-ink-soft">
            Every one of these is visible from two metres away, which is roughly
            where a judge starts.
          </p>

          <ul className="mt-8 divide-y divide-line border-t border-line">
            {BOARD_HABITS.map((habit) => (
              <li key={habit.do} className="grid gap-2 py-5 sm:grid-cols-2 sm:gap-8">
                <p className="font-medium text-ink">{habit.do}</p>
                <p className="text-[0.95rem] leading-relaxed text-ink-faint">
                  Not: {habit.instead}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* Where the actual rules live */}
        <section className="reveal dotted-band mt-16 rounded-2xl border border-line p-8 sm:mt-20 sm:p-10">
          <h2 className="display-section">The rules, not the examples</h2>
          <p className="mt-3 max-w-prose text-ink-soft">
            Board size, what may come into the room, citations and the no-name
            rule are set out in full on Display &amp; Safety. Read that one
            before you buy a board.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/display-and-safety" className="btn-ghost">
              Display &amp; Safety
              <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            </Link>
            <Link href="/the-process" className="btn-ghost">
              How it works
              <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
