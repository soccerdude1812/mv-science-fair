import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { APPLICATION_URL, EVENT } from "@/lib/event";
import { PROJECT_IDEAS, getIdea } from "@/lib/projectIdeas";

interface Params {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PROJECT_IDEAS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const idea = getIdea(slug);
  if (!idea) return { title: "Project idea not found" };
  return {
    title: idea.question,
    description: idea.teaser,
  };
}

const SAFETY_FORM_HREF = "/forms";

export default async function ProjectIdeaPage({ params }: Params) {
  const { slug } = await params;
  const idea = getIdea(slug);
  if (!idea) notFound();

  return (
    <>
      {/* Hero: the question is the headline, because the question is the project */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
          <Link
            href="/project-ideas"
            className="text-[0.95rem] font-medium text-ink-soft hover:text-ink hover:underline"
          >
            ← All project ideas
          </Link>

          <div className="mt-7 mb-6 h-1 w-12 rounded-full bg-coral" aria-hidden="true" />

          <h1 className="display-hero !text-[clamp(1.9rem,4vw,2.9rem)]">
            {idea.question}
          </h1>

          <p className="mt-5 max-w-2xl text-lg text-ink-soft">{idea.teaser}</p>

          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
            <div>
              <dt className="data-label mb-1">Category</dt>
              <dd className="font-medium text-ink">{idea.category}</dd>
            </div>
            <div>
              <dt className="data-label mb-1">Difficulty</dt>
              <dd className="font-medium text-ink">{idea.difficulty}</dd>
            </div>
            <div>
              <dt className="data-label mb-1">Time</dt>
              <dd className="font-medium text-ink">{idea.time}</dd>
            </div>
          </dl>
        </div>
      </section>

      <div className="mx-auto max-w-3xl space-y-12 px-4 py-12 sm:space-y-16 sm:px-6 sm:py-16 lg:px-8">
        {/* The idea */}
        <section className="reveal">
          <h2 className="display-section mb-4">What you are really asking</h2>
          <p className="max-w-prose text-lg leading-relaxed text-ink-soft">
            {idea.bigIdea}
          </p>
        </section>

        {/* Materials */}
        <section className="reveal">
          <h2 className="display-section mb-6">What you will need</h2>
          <ul className="space-y-3">
            {idea.youWillNeed.map((item) => (
              <li key={item} className="flex gap-3 leading-relaxed text-ink-soft">
                <span
                  className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-coral"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Steps */}
        <section className="reveal">
          <h2 className="display-section mb-6">How to start</h2>
          <ol className="space-y-5">
            {idea.howToStart.map((step, i) => (
              <li key={step} className="flex gap-4">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-paper-warm font-mono text-[0.85rem] font-semibold text-ink">
                  {i + 1}
                </span>
                <p className="leading-relaxed text-ink-soft">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Measurement */}
        <section className="reveal rounded-2xl border border-line bg-card p-7 sm:p-8">
          <h2 className="mb-3 font-display text-xl font-semibold text-ink">
            What to measure
          </h2>
          <p className="max-w-prose leading-relaxed text-ink-soft">
            {idea.whatToMeasure}
          </p>
        </section>

        {/* Variations */}
        <section className="reveal">
          <h2 className="display-section mb-3">Make it your own</h2>
          <p className="mb-6 max-w-prose leading-relaxed text-ink-soft">
            Doing exactly what is written above is a fine project. Doing one of
            these instead is a better one, because it is a question nobody
            handed you.
          </p>
          <ul className="divide-y divide-line border-t border-line">
            {idea.makeItYours.map((twist) => (
              <li key={twist} className="py-4 leading-relaxed text-ink-soft">
                {twist}
              </li>
            ))}
          </ul>
        </section>

        {/* Safety and paperwork */}
        {(idea.headsUp || idea.extraForm) && (
          <section className="reveal rounded-2xl border border-line bg-paper-warm p-7 sm:p-8">
            <h2 className="mb-3 font-display text-xl font-semibold text-ink">
              Heads up
            </h2>
            {idea.headsUp && (
              <p className="max-w-prose leading-relaxed text-ink-soft">
                {idea.headsUp}
              </p>
            )}
            {idea.extraForm && (
              <p className="mt-4 leading-relaxed text-ink-soft">
                Form you would need:{" "}
                <Link
                  href={SAFETY_FORM_HREF}
                  className="font-semibold text-coral-deep hover:underline"
                >
                  {idea.extraForm}
                </Link>
                . We only send it once your project is approved, so do not fill
                it in yet.
              </p>
            )}
          </section>
        )}

        {/* Apply */}
        <section className="reveal dotted-band rounded-2xl border border-line p-8 text-center sm:p-10">
          <h2 className="display-section mb-3">Want to do this one?</h2>
          <p className="mx-auto mb-8 max-w-xl text-lg text-ink-soft">
            Applications close {EVENT.applicationDeadlineFull}. You do not need
            results yet, just the question you want to answer.
          </p>
          <a
            href={APPLICATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Apply now
          </a>
        </section>

        <div className="reveal border-t border-line pt-8 text-center">
          <Link
            href="/project-ideas"
            className="font-medium text-coral-deep hover:underline"
          >
            ← Back to all project ideas
          </Link>
        </div>
      </div>
    </>
  );
}
