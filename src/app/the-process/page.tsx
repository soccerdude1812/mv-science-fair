import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import PageHero from "@/components/PageHero";
import CollapsibleSection from "@/components/CollapsibleSection";
import EventDetails from "@/components/EventDetails";
import { APPLICATION_URL } from "@/lib/event";
import Timeline from "@/components/Timeline";

function BulletList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="mt-3 space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span
            className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-coral"
            aria-hidden="true"
          />
          <span className="text-ink-soft">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function SectionHeading({ num, title }: { num: string; title: string }) {
  return (
    <div className="reveal mb-8 flex items-baseline gap-4">
      <span
        className="font-mono text-sm font-medium text-ink-faint"
        aria-hidden="true"
      >
        {num}
      </span>
      <h2 className="display-section">{title}</h2>
    </div>
  );
}

export default function TheProcessPage() {
  return (
    <>
      <PageHero
        title="The Process"
        subtitle="Your step-by-step guide from first question to fair day."
      />

      {/* Timeline roadmap */}
      <section className="dotted-band py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <EventDetails className="reveal mb-12" />
          <div className="reveal mb-12 text-center">
            <h2 className="display-section">Science Fair Roadmap</h2>
            <p className="mx-auto mt-3 max-w-xl text-ink-soft">
              Five milestones from application to fair day. Click any step for
              details.
            </p>
          </div>
          <Timeline />
        </div>
      </section>

      {/* ── Section 1: Before You Start ── */}
      <section className="border-t border-line py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading num="01" title="Before You Start" />

          <div className="reveal stagger-1">
            <CollapsibleSection title="Topic Selection" defaultOpen={false}>
              <p className="mb-2 font-display text-lg font-medium text-ink">
                The best projects come from your curiosity.
              </p>
              <p className="mb-6">
                What do you wonder about? What would you love to explore?
              </p>

              <h4 className="mb-2 text-base font-semibold">
                What excites you?
              </h4>
              <BulletList
                items={[
                  "What problems in the world do you wish you could solve?",
                  "What cool science topics have you heard about?",
                  "What have you loved learning about in school?",
                  "What jobs in science or technology interest you?",
                  "What are you passionate about outside of school?",
                ]}
              />
              <p className="mt-5">
                <strong className="text-ink">Tip:</strong> pick two or three
                ideas at first, so you have backups if one doesn&apos;t work
                out.
              </p>
              <p className="mt-4">
                Stuck?{" "}
                <Link
                  href="/project-ideas"
                  className="font-semibold text-coral-deep hover:underline"
                >
                  Browse twelve example projects
                </Link>{" "}
                with materials, steps, and ways to make each one your own.
              </p>

              <div className="mt-6 border-t border-line pt-5">
                <h4 className="mb-2 text-base font-semibold">
                  Every project follows a STEM method
                </h4>
                <p>
                  Use the{" "}
                  <strong className="text-ink">Scientific Method</strong>{" "}
                  (question → hypothesis → experiment → data → conclusion) or
                  the{" "}
                  <strong className="text-ink">
                    Engineering Design Process
                  </strong>{" "}
                  (problem → design → build → test → improve). Every project
                  must include at least 3 trials so results are reliable.
                </p>
              </div>

              <div className="mt-6 border-t border-line pt-5">
                <h4 className="mb-4 text-base font-semibold">
                  Your project fits one of four categories
                </h4>
                <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                  {[
                    {
                      name: "Life & Health Sciences",
                      desc: "People, plants, psychology, environment. No live animals, no nutrition or diet experiments.",
                      dot: "bg-green",
                    },
                    {
                      name: "Physical Science & Engineering",
                      desc: "Forces, motion, energy, machines, astronomy, inventions.",
                      dot: "bg-blue",
                    },
                    {
                      name: "Chemistry & Materials",
                      desc: "Reactions, mixtures, states of matter, testing materials.",
                      dot: "bg-marigold",
                    },
                    {
                      name: "Technology & Innovation",
                      desc: "Computers, coding, robotics, apps, problem-solving inventions.",
                      dot: "bg-coral",
                    },
                  ].map((cat) => (
                    <div key={cat.name} className="flex items-start gap-3">
                      <span
                        className={`mt-2 h-2 w-2 shrink-0 rounded-full ${cat.dot}`}
                        aria-hidden="true"
                      />
                      <div>
                        <p className="font-semibold text-ink">{cat.name}</p>
                        <p className="text-sm text-ink-faint">{cat.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-5">
                  Be sure to{" "}
                  <Link
                    href="/rules"
                    className="font-medium text-coral-deep hover:underline"
                  >
                    check the rules
                  </Link>{" "}
                  before settling on a topic.
                </p>
              </div>

              <div className="mt-6 border-t border-line pt-5">
                <h4 className="mb-1 text-base font-semibold">Ground rules</h4>
                <BulletList
                  items={[
                    <>
                      <strong className="text-ink">Solo or team:</strong> work
                      alone or in a team of up to 3 members.
                    </>,
                    <>
                      <strong className="text-ink">One project</strong> per
                      student or team.
                    </>,
                    <>
                      <strong className="text-ink">New work only:</strong> no
                      continuation projects. Every project must be new and
                      original for this year&apos;s fair.
                    </>,
                    <>
                      <strong className="text-ink">No live organisms:</strong>{" "}
                      no live animals, bacteria, mold, or any living creatures.
                    </>,
                    <>
                      <strong className="text-ink">Adult supervision:</strong>{" "}
                      a parent or guardian must supervise all experiments.
                    </>,
                  ]}
                />
              </div>
            </CollapsibleSection>
          </div>

          <div className="reveal stagger-2">
            <CollapsibleSection title="Planning Your Project">
              <p className="mb-2">
                Before you begin experimenting, think through these key
                elements:
              </p>
              <div className="divide-y divide-line">
                {[
                  {
                    title: "Safety",
                    desc: "Any safety concerns? Need approval forms? Address this first, before starting any work.",
                  },
                  {
                    title: "Research Question",
                    desc: "What specific question are you trying to answer?",
                  },
                  {
                    title: "Hypothesis",
                    desc: 'Your educated guess about the answer. Use "If... then... because..." format.',
                  },
                  {
                    title: "Materials",
                    desc: "List everything you'll need for your experiment.",
                  },
                  {
                    title: "Procedure",
                    desc: "Step-by-step instructions someone else could follow. Your experiment must include at least 3 trials so results can be verified.",
                  },
                  {
                    title: "Variables",
                    desc: "What you're changing (independent), measuring (dependent), and keeping the same (controlled).",
                  },
                  {
                    title: "Data Collection",
                    desc: "How will you record and organize your results?",
                  },
                ].map((item) => (
                  <div key={item.title} className="py-3">
                    <span className="font-semibold text-ink">
                      {item.title}:
                    </span>{" "}
                    <span>{item.desc}</span>
                  </div>
                ))}
              </div>
            </CollapsibleSection>
          </div>

          <div className="reveal stagger-3">
            <CollapsibleSection title="Mentors">
              <p>
                Mentors are high school student volunteers from the STEM and
                Research Club at Mountain View High School. They guide you
                through the scientific method, help you stay organized, and
                offer encouragement along the way.
              </p>
              <p className="mt-3 text-sm text-ink-faint">
                Typical commitment: about 1 to 2 hours per week.
              </p>
            </CollapsibleSection>
          </div>
        </div>
      </section>

      {/* ── Section 2: Apply to the Fair ── */}
      <section className="border-t border-line py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading num="02" title="Apply to the Fair" />

          <div className="reveal stagger-1">
            <CollapsibleSection
              title="Step 1: The Application Form"
              defaultOpen={false}
            >
              <p className="mb-6">
                One form covers registration, consent, and your project. About
                the project we ask two things: what it is, and how you plan to
                do it, 100 to 200 words each. Applications close Friday,
                September 4, 2026.
              </p>
              <a
                href={APPLICATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Apply now
              </a>
            </CollapsibleSection>
          </div>

          <div className="reveal stagger-2">
            <CollapsibleSection title="Step 2: Safety Forms, Only If We Ask">
              <p className="mb-2">
                <strong className="text-ink">
                  Don&apos;t submit these yourself.
                </strong>{" "}
                We review every application, and if your project needs one we
                email it to you during the approval round. Most projects need
                nothing extra. The two we may send:
              </p>
              <BulletList
                items={[
                  <>
                    <strong className="text-ink">
                      Human Participants Form:
                    </strong>{" "}
                    for projects that survey, interview, or test people.
                  </>,
                  <>
                    <strong className="text-ink">
                      Hazardous Materials Form:
                    </strong>{" "}
                    for projects using chemicals, electrical equipment, sharp
                    tools, or heat sources.
                  </>,
                ]}
              />
              <p className="mt-5">
                You can preview them on the{" "}
                <Link
                  href="/forms"
                  className="font-medium text-coral-deep hover:underline"
                >
                  Forms page
                </Link>
                , but wait for our email before filling one out.
              </p>
            </CollapsibleSection>
          </div>

          <div className="reveal stagger-3">
            <CollapsibleSection title="What Happens Next (Pre-Approval)">
              <p className="mb-4">
                After you submit, the Science Fair Committee reviews your
                project proposal.
              </p>
              <p className="border-t border-line pt-4">
                <strong className="text-ink">
                  Wait for a confirmation email before starting your
                  experiment.
                </strong>{" "}
                The committee needs to verify that your project meets all
                safety and ethical guidelines.
              </p>
            </CollapsibleSection>
          </div>
        </div>
      </section>

      {/* ── Section 3: During Your Project ── */}
      <section className="border-t border-line py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading num="03" title="During Your Project" />

          <div className="reveal stagger-1">
            <CollapsibleSection title="Research Logbook">
              <p className="mb-4 font-semibold text-coral-deep">
                Required: every student must keep a project logbook documenting
                planning, execution, results, and sources.
              </p>
              <p className="mb-4">
                Your logbook records your whole scientific journey. Keep
                date-stamped entries that include:
              </p>
              <ul className="grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                {[
                  "Brainstorming and initial ideas",
                  "Research notes and sources",
                  "Planning and procedure changes",
                  "Daily observations and data",
                  "Mistakes and what you learned from them",
                  "Photos and sketches",
                  "Reflections on your progress",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-coral"
                      aria-hidden="true"
                    />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </CollapsibleSection>
          </div>

          <div className="reveal stagger-2 mt-10">
            <h3 className="mb-3 text-lg font-semibold">Important reminders</h3>
            <BulletList
              items={[
                <>
                  <strong className="text-ink">
                    All work must be your own.
                  </strong>{" "}
                  Parents, mentors, and teachers can help guide you, but you
                  must do the work.
                </>,
                <>
                  <strong className="text-ink">
                    Be honest with your data.
                  </strong>{" "}
                  Record what actually happened, even if it was not what you
                  expected.
                </>,
              ]}
            />
          </div>
        </div>
      </section>

      {/* ── Section 4: After Data Collection ── */}
      <section className="border-t border-line py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading num="04" title="After Data Collection" />

          <div className="reveal stagger-1">
            <CollapsibleSection title="Data Analysis">
              <p className="mb-6">
                Data analysis doesn&apos;t need to be complicated. Three things
                to look at:
              </p>
              <div className="grid gap-6 sm:grid-cols-3">
                {[
                  {
                    title: "Average",
                    desc: "Add up your results and divide by the number of trials.",
                  },
                  {
                    title: "Compare",
                    desc: "Compare groups or conditions to see if there are differences.",
                  },
                  {
                    title: "Patterns",
                    desc: "Are results increasing, decreasing, or staying the same?",
                  },
                ].map((item) => (
                  <div key={item.title}>
                    <p className="mb-1 font-display font-semibold text-ink">
                      {item.title}
                    </p>
                    <p className="text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </CollapsibleSection>
          </div>

          <div className="reveal stagger-2">
            <CollapsibleSection title="Write Your Abstract">
              <p className="mb-2">
                An abstract is a one-paragraph summary of your whole project
                for your display board. It should include:
              </p>
              <BulletList
                items={[
                  <>
                    <strong className="text-ink">Why it matters:</strong> the
                    problem or question that inspired your project.
                  </>,
                  <>
                    <strong className="text-ink">What you did:</strong> your
                    experiment and methods, briefly.
                  </>,
                  <>
                    <strong className="text-ink">What you found:</strong> your
                    key results.
                  </>,
                  <>
                    <strong className="text-ink">Why results matter:</strong>{" "}
                    what your findings mean and why they are important.
                  </>,
                ]}
              />
              <p className="mt-5 border-t border-line pt-4">
                <strong className="text-ink">Tip:</strong> write your abstract
                in past tense, since your experiment is already complete.
              </p>
            </CollapsibleSection>
          </div>
        </div>
      </section>

      {/* ── Section 5: Your Display Board ── */}
      <section className="border-t border-line py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading num="05" title="Your Display Board" />

          <p className="reveal stagger-1 mb-8 max-w-2xl text-ink-soft">
            Your display board is the first thing judges see. Make it clear,
            organized, and engaging.
          </p>

          <div className="reveal stagger-2">
            <h4 className="mb-4 text-base font-semibold">
              Your board must include all of the following:
            </h4>
            <ul className="grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
              {[
                "Title",
                "Abstract",
                "Question or Problem",
                "Hypothesis or Design Goal",
                "Materials",
                "Procedure",
                "Data and Results",
                "Conclusion",
                "Citations / Bibliography",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <Check
                    size={16}
                    strokeWidth={2}
                    className="shrink-0 text-green"
                    aria-hidden="true"
                  />
                  <span className="text-ink-soft">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal stagger-3 mt-8 border-t border-line pt-6">
            <p className="mb-6 max-w-2xl">
              <strong className="font-semibold text-coral-deep">
                Do not put your name on the front of the board.
              </strong>{" "}
              <span className="text-ink-soft">
                Your name goes on the back only, to ensure fair judging.
              </span>
            </p>
            <Link href="/display-and-safety" className="btn-ghost">
              View Display & Safety Guidelines
              <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Section 6: Preparing for Judging ── */}
      <section
        id="judging"
        className="border-t border-line py-12 sm:py-16 md:py-20"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading num="06" title="Preparing for Judging" />

          <div className="reveal stagger-1">
            <CollapsibleSection title="Common Judging Questions">
              <p className="mb-2">
                Practice answering these before fair day:
              </p>
              <ol className="divide-y divide-line">
                {[
                  "Why did you choose this topic?",
                  "What is your research question and hypothesis?",
                  "Can you walk me through your experiment step by step?",
                  "What were your most important findings?",
                  "Did anything surprise you?",
                  "What would you do differently if you did this again?",
                  "What did you learn from this project?",
                  "How could your project help people in real life?",
                ].map((q, i) => (
                  <li key={i} className="flex items-start gap-4 py-3">
                    <span className="pt-0.5 font-mono text-sm font-medium text-ink-faint">
                      Q{i + 1}
                    </span>
                    <span>{q}</span>
                  </li>
                ))}
              </ol>
            </CollapsibleSection>
          </div>

          <div className="reveal stagger-2">
            <CollapsibleSection title="Judging Rubric">
              <p className="mb-6">
                Judges evaluate your project on six official criteria:
              </p>
              <div className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
                {[
                  {
                    area: "Scientific Thought",
                    desc: "Is the problem clearly stated? Is the hypothesis reasonable and testable? Are conclusions based on evidence?",
                  },
                  {
                    area: "Creativity",
                    desc: "Does the project show original thinking and a unique approach to the problem?",
                  },
                  {
                    area: "Thoroughness",
                    desc: "Is the research comprehensive? Were enough trials conducted and variables considered?",
                  },
                  {
                    area: "Skill",
                    desc: "Does the project demonstrate appropriate use of scientific methods, equipment, and analysis techniques?",
                  },
                  {
                    area: "Clarity",
                    desc: "Is the project clearly explained? Are the data, charts, and conclusions easy to understand?",
                  },
                  {
                    area: "Presentation",
                    desc: "Is the display board well-organized and visually appealing? Can the student explain their work effectively?",
                  },
                ].map((item) => (
                  <div key={item.area}>
                    <p className="font-display font-semibold text-ink">
                      {item.area}
                    </p>
                    <p className="mt-1 text-sm text-ink-faint">{item.desc}</p>
                  </div>
                ))}
              </div>
            </CollapsibleSection>
          </div>
        </div>
      </section>
    </>
  );
}
