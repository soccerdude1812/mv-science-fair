import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { Lightbulb } from "@/components/lab/cast";
import { APPLICATION_URL } from "@/lib/event";
import {
  CATEGORIES,
  PROJECT_IDEAS,
  ideasByCategory,
  type Difficulty,
} from "@/lib/projectIdeas";

export const metadata: Metadata = {
  title: "Project ideas",
  description:
    "Twelve example science fair projects for grades 3 to 5, with what you need, how to start, and how to make each one your own.",
};

/** Pigment tokens only. Coral stays reserved for CTAs, per DESIGN.md. */
const DIFFICULTY_STYLE: Record<Difficulty, string> = {
  Starter: "bg-green-soft text-ink",
  "Step up": "bg-blue-soft text-ink",
  Stretch: "bg-marigold-soft text-ink",
};

export default function ProjectIdeasPage() {
  return (
    <>
      <PageHero
        title="Project ideas"
        subtitle="Twelve real projects you could start this weekend. Pick one, then change it until it is yours."
      />

      <div className="mx-auto max-w-5xl space-y-14 px-4 py-12 sm:space-y-20 sm:px-6 sm:py-16 md:py-20 lg:px-8">
        {/* How to use this */}
        <section className="reveal flex flex-col-reverse items-start gap-8 sm:flex-row sm:items-center sm:gap-12">
          <div className="flex-1">
            <h2 className="display-section mb-4">These are starting points</h2>
            <p className="max-w-prose text-lg leading-relaxed text-ink-soft">
              You do not have to pick one of these. They are here so you can see
              what a good question looks like. The best projects usually start
              as one of these and then go somewhere unexpected, which is why
              every idea has a{" "}
              <strong className="font-semibold text-ink">
                make it your own
              </strong>{" "}
              section at the bottom.
            </p>
            <p className="mt-4 max-w-prose leading-relaxed text-ink-soft">
              Judges are not looking for the fanciest topic. They are looking
              for a clear question, a fair test, and honest results. A careful
              paper towel experiment beats a rushed volcano every time.
            </p>
          </div>
          <Lightbulb className="w-24 shrink-0 sm:w-32 h-auto" />
        </section>

        {/* Catalog */}
        {CATEGORIES.map((category) => {
          const ideas = ideasByCategory(category);
          if (ideas.length === 0) return null;
          return (
            <section key={category} className="reveal">
              <h2 className="display-section mb-2">{category}</h2>
              <p className="mb-8 text-ink-faint">
                {ideas.length} ideas, and one of the four categories on the
                application form.
              </p>

              <ul className="grid gap-5 sm:grid-cols-2">
                {ideas.map((idea) => (
                  <li key={idea.slug}>
                    <Link
                      href={`/project-ideas/${idea.slug}`}
                      className="group flex h-full flex-col rounded-2xl border border-line bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-coral focus-visible:-translate-y-0.5 focus-visible:border-coral"
                      style={{ boxShadow: "var(--shadow-sm)" }}
                    >
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-full px-2.5 py-1 text-[0.75rem] font-semibold ${DIFFICULTY_STYLE[idea.difficulty]}`}
                        >
                          {idea.difficulty}
                        </span>
                        <span className="text-[0.8rem] text-ink-faint">
                          {idea.time}
                        </span>
                        {idea.extraForm && (
                          <span className="text-[0.8rem] text-ink-faint">
                            · extra form
                          </span>
                        )}
                      </div>

                      <h3 className="mb-2 font-display text-[1.2rem] font-semibold leading-snug text-ink">
                        {idea.question}
                      </h3>
                      <p className="mb-5 flex-1 leading-relaxed text-ink-soft">
                        {idea.teaser}
                      </p>

                      <span className="text-[0.95rem] font-semibold text-coral-deep">
                        See how to do it{" "}
                        <span
                          aria-hidden="true"
                          className="inline-block transition-transform group-hover:translate-x-0.5"
                        >
                          →
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

        {/* Apply */}
        <section className="reveal dotted-band rounded-2xl border border-line p-8 text-center sm:p-10">
          <h2 className="display-section mb-3">Found one you like?</h2>
          <p className="mx-auto mb-8 max-w-xl text-lg text-ink-soft">
            You do not need a finished project to apply. Tell us the question
            you want to answer and we will take it from there.
          </p>
          <a
            href={APPLICATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Apply now
          </a>
          <p className="mt-6 text-[0.95rem] text-ink-soft">
            Not sure how the whole thing works?{" "}
            <Link
              href="/the-process"
              className="font-medium text-coral-deep hover:underline"
            >
              Read the process guide
            </Link>
            .
          </p>
        </section>

        <p className="reveal text-center text-[0.9rem] text-ink-faint">
          {PROJECT_IDEAS.length} ideas and counting. Have a better one? Email us
          and we will add it.
        </p>
      </div>
    </>
  );
}
