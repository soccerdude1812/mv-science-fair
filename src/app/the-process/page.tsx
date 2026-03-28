import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CollapsibleSection from "@/components/CollapsibleSection";
import Timeline from "@/components/Timeline";

export const metadata: Metadata = {
  title: "The Process",
  description:
    "Step-by-step guide to the MVWSD Science Fair process, from choosing a topic to presenting your project.",
};

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 mt-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2">
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-neon-cyan shrink-0" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function StepBadge({ step }: { step: number }) {
  return (
    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-neon-cyan text-bg-deep text-sm font-bold shrink-0 shadow-lg shadow-neon-cyan/20">
      {step}
    </span>
  );
}

export default function TheProcessPage() {
  return (
    <>
      <PageHero
        title="The Process"
        subtitle="Your step-by-step guide from curiosity to science fair presentation. Follow these stages to build an amazing project!"
      />

      {/* Timeline Roadmap */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-display font-bold gradient-text">
            Science Fair Roadmap
          </h2>
          <p className="mt-3 text-text-secondary max-w-xl mx-auto">
            Follow these milestones from start to finish. Click any step for details.
          </p>
        </div>
        <Timeline />
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-6 relative z-10">
        {/* Before Starting */}
        <div>
          <h2 className="text-2xl font-display font-bold text-text-bright mb-4 flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-neon-cyan/10 text-neon-cyan flex items-center justify-center shrink-0" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </span>
            Before Starting Your Project
          </h2>

          <div className="space-y-4">
            <CollapsibleSection
              title="Topic Selection"
              defaultOpen
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              }
            >
              <p className="font-display font-medium text-text-bright text-lg mb-3">
                The best projects come from YOUR curiosity!
              </p>
              <p className="mb-4">
                Ask yourself: What do I wonder about? What would I love to explore?
              </p>

              <div className="bg-neon-cyan/5 border border-neon-cyan/10 rounded-lg p-5 mb-4">
                <h4 className="font-display font-semibold text-neon-cyan mb-2">
                  Start Here: What Excites You?
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
              </div>

              <div className="bg-neon-amber/5 border border-neon-amber/15 rounded-lg p-5 mb-4 border-l-4 border-l-neon-amber">
                <p className="font-display font-semibold text-neon-amber">
                  Pro Tip:
                </p>
                <p className="text-text-secondary">
                  Pick 2 or 3 ideas at first. That way, if one doesn&apos;t work
                  out, you&apos;ve got backups!
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-display font-semibold text-text-bright mb-3">
                  Projects should fit into one of these four categories:
                </h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-neon-green/5 border border-neon-green/10">
                    <span className="mt-0.5 w-2 h-2 rounded-full bg-neon-green shrink-0" aria-hidden="true" />
                    <div>
                      <span className="font-semibold text-text-bright">Life &amp; Health Sciences</span>
                      <span className="text-sm text-text-secondary"> &mdash; people, animals, plants, nutrition, psychology, environment</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-neon-cyan/5 border border-neon-cyan/10">
                    <span className="mt-0.5 w-2 h-2 rounded-full bg-neon-cyan shrink-0" aria-hidden="true" />
                    <div>
                      <span className="font-semibold text-text-bright">Physical Science &amp; Engineering</span>
                      <span className="text-sm text-text-secondary"> &mdash; forces, motion, energy, machines, astronomy, inventions</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-neon-purple/5 border border-neon-purple/10">
                    <span className="mt-0.5 w-2 h-2 rounded-full bg-neon-purple shrink-0" aria-hidden="true" />
                    <div>
                      <span className="font-semibold text-text-bright">Chemistry &amp; Materials</span>
                      <span className="text-sm text-text-secondary"> &mdash; reactions, mixtures, states of matter, testing materials</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-neon-amber/5 border border-neon-amber/10">
                    <span className="mt-0.5 w-2 h-2 rounded-full bg-neon-amber shrink-0" aria-hidden="true" />
                    <div>
                      <span className="font-semibold text-text-bright">Technology &amp; Innovation</span>
                      <span className="text-sm text-text-secondary"> &mdash; computers, coding, robotics, apps, problem-solving inventions</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mb-2">
                Be sure to{" "}
                <Link href="/rules" className="text-neon-cyan font-medium hover:underline">
                  check the rules
                </Link>{" "}
                before settling on a topic.
              </p>

              <div className="bg-neon-pink/5 border border-neon-pink/15 rounded-lg p-4 border-l-4 border-l-neon-pink mb-4">
                <p className="font-semibold text-neon-pink">
                  IMPORTANT: Individual or team participation is allowed (maximum 2 members per team).
                </p>
              </div>

              <div className="bg-neon-amber/5 border border-neon-amber/15 rounded-lg p-4 border-l-4 border-l-neon-amber">
                <p className="font-display font-semibold text-neon-amber">
                  Continuation Projects:
                </p>
                <p className="text-text-secondary">
                  Continuation projects (projects that build on work from a previous year) must show clear evidence of significant new development and difference from the previous work.
                </p>
              </div>
            </CollapsibleSection>

            <CollapsibleSection
              title="Planning Your Project"
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              }
            >
              <p className="mb-4">
                Before you begin experimenting, make sure you&apos;ve thought through
                these key elements:
              </p>
              <div className="grid gap-3">
                {[
                  { title: "Research Question", desc: "What specific question are you trying to answer?" },
                  { title: "Hypothesis", desc: 'Your educated guess about the answer. Use "If... then... because..." format.' },
                  { title: "Materials", desc: "List everything you'll need for your experiment." },
                  { title: "Procedure", desc: "Step-by-step instructions someone else could follow to repeat your experiment." },
                  { title: "Variables", desc: "Identify what you're changing (independent), measuring (dependent), and keeping the same (controlled)." },
                  { title: "Data Collection", desc: "How will you record and organize your results?" },
                  { title: "Safety", desc: "Are there any safety concerns? Do you need approval forms?" },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-3 p-3 bg-white/[0.03] rounded-lg border border-white/5"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-neon-cyan mt-0.5 shrink-0"
                      aria-hidden="true"
                    >
                      <polyline points="9 11 12 14 22 4" />
                      <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                    </svg>
                    <div>
                      <span className="font-semibold text-text-bright">
                        {item.title}:
                      </span>{" "}
                      <span className="text-text-secondary">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CollapsibleSection>

            <CollapsibleSection
              title="Mentors"
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87" />
                  <path d="M16 3.13a4 4 0 010 7.75" />
                </svg>
              }
            >
              <p className="mb-4">
                Mentors can help guide you through the scientific process. There
                are several types of mentors:
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { type: "Parent Mentor", desc: "A parent or guardian who helps you stay organized and supports your project at home.", color: "neon-cyan" },
                  { type: "Professional Mentor", desc: "A scientist, engineer, or professional who can provide expert guidance in your topic area.", color: "neon-purple" },
                  { type: "Other Volunteer Mentors", desc: "Other community volunteers, such as high school students or college students, who can help you with your project.", color: "neon-green" },
                ].map((mentor) => (
                  <div
                    key={mentor.type}
                    className={`p-4 rounded-lg bg-${mentor.color}/5 border border-${mentor.color}/10`}
                  >
                    <h4 className="font-display font-semibold text-text-bright mb-2">
                      {mentor.type}
                    </h4>
                    <p className="text-sm text-text-secondary">{mentor.desc}</p>
                  </div>
                ))}
              </div>
            </CollapsibleSection>
          </div>
        </div>

        {/* Apply to the Fair */}
        <div>
          <h2 className="text-2xl font-display font-bold text-text-bright mb-4 flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-neon-purple/10 text-neon-purple flex items-center justify-center shrink-0" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="12" y1="18" x2="12" y2="12" />
                <line x1="9" y1="15" x2="15" y2="15" />
              </svg>
            </span>
            Apply to the Fair
          </h2>

          <div className="space-y-4">
            <CollapsibleSection
              title="Step 1: Fill Out the Application Form"
              defaultOpen
              icon={<StepBadge step={1} />}
            >
              <p className="mb-4">
                Complete the Science Fair Application Form with your project
                details, team members, and project description.
              </p>
              <a
                href="https://docs.google.com/forms/d/1Uys9ePwF965Nn722dpa3eSypNVK9tLp-J4PnvOGN4xg/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glow inline-flex items-center gap-2 px-5 py-2.5 bg-neon-cyan text-bg-deep font-semibold rounded-lg"
              >
                Open Application Form
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </CollapsibleSection>

            <CollapsibleSection
              title="Step 2: Submit Additional Forms (If Required)"
              icon={<StepBadge step={2} />}
            >
              <p className="mb-4">
                Depending on your project, you may need to submit additional
                approval forms:
              </p>
              <BulletList
                items={[
                  "Human Participants Form -- if your project involves surveying, interviewing, or testing people",
                  "Bioagent Safety Form -- if your project involves living organisms or biological samples",
                  "Hazardous Materials Form -- if your project uses chemicals, electrical equipment, sharp tools, or heat sources",
                ]}
              />
              <p className="mt-4">
                Visit the{" "}
                <Link href="/forms" className="text-neon-cyan font-medium hover:underline">
                  Forms page
                </Link>{" "}
                for all required forms and details on when each is needed.
              </p>
            </CollapsibleSection>

            <CollapsibleSection
              title="What Happens Next (Pre-Approval)"
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              }
            >
              <p className="mb-3">
                After you submit your application, the Science Fair Committee
                will review your project proposal.
              </p>
              <div className="bg-neon-amber/5 border border-neon-amber/15 rounded-lg p-4 border-l-4 border-l-neon-amber">
                <p className="font-display font-semibold text-neon-amber">Important:</p>
                <p className="text-text-secondary">
                  You must wait for a confirmation email before starting your
                  experiment. The committee needs to verify that your project
                  meets all safety and ethical guidelines.
                </p>
              </div>
            </CollapsibleSection>
          </div>
        </div>

        {/* During Your Project */}
        <div>
          <h2 className="text-2xl font-display font-bold text-text-bright mb-4 flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-neon-green/10 text-neon-green flex items-center justify-center shrink-0" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
                <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
              </svg>
            </span>
            During Your Project
          </h2>

          <CollapsibleSection
            title="Research Logbook"
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
              </svg>
            }
          >
            <div className="bg-neon-pink/5 border border-neon-pink/15 rounded-lg p-4 mb-4 border-l-4 border-l-neon-pink">
              <p className="font-semibold text-neon-pink">
                REQUIRED — Students MUST maintain a project logbook documenting planning, execution, results, and sources.
              </p>
            </div>
            <p className="mb-4">
              A research logbook is a detailed record of your entire scientific
              journey. Keep date-stamped entries that include:
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                "Brainstorming and initial ideas",
                "Research notes and sources",
                "Planning and procedure changes",
                "Daily observations and data",
                "Mistakes and what you learned from them",
                "Photos and sketches",
                "Reflections on your progress",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-white/[0.03] border border-white/5"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-neon-cyan shrink-0"
                    aria-hidden="true"
                  >
                    <polyline points="9 11 12 14 22 4" />
                    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                  </svg>
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </CollapsibleSection>
        </div>

        {/* After Data Collection */}
        <div>
          <h2 className="text-2xl font-display font-bold text-text-bright mb-4 flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-neon-amber/10 text-neon-amber flex items-center justify-center shrink-0" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
              </svg>
            </span>
            After Data Collection
          </h2>

          <div className="space-y-4">
            <CollapsibleSection
              title="Data Analysis"
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="20" x2="18" y2="10" />
                  <line x1="12" y1="20" x2="12" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="14" />
                </svg>
              }
            >
              <p className="mb-4">
                For elementary school students, data analysis doesn&apos;t need
                to be complicated! Here are some things to look at:
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-neon-cyan/5 border border-neon-cyan/10 text-center">
                  <p className="font-display font-bold text-neon-cyan text-lg mb-1">Average</p>
                  <p className="text-sm text-text-secondary">
                    Add up your results and divide by the number of trials to
                    find the average.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-neon-purple/5 border border-neon-purple/10 text-center">
                  <p className="font-display font-bold text-neon-purple text-lg mb-1">Compare</p>
                  <p className="text-sm text-text-secondary">
                    Compare groups or conditions to see if there are differences
                    between them.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-neon-amber/5 border border-neon-amber/10 text-center">
                  <p className="font-display font-bold text-neon-amber text-lg mb-1">Patterns</p>
                  <p className="text-sm text-text-secondary">
                    Look for patterns: Are results increasing, decreasing, or
                    staying the same?
                  </p>
                </div>
              </div>
            </CollapsibleSection>

            <CollapsibleSection
              title="Submit an Abstract"
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              }
            >
              <p className="mb-4">
                An abstract is a one-paragraph summary of your entire project.
                It should include:
              </p>
              <BulletList
                items={[
                  "Why it matters -- What problem or question inspired your project?",
                  "What you did -- Briefly describe your experiment and methods.",
                  "What you found -- Summarize your key results.",
                  "Why results matter -- Explain what your findings mean and why they are important.",
                ]}
              />
              <div className="mt-4 bg-neon-cyan/5 border border-neon-cyan/10 rounded-lg p-4 border-l-4 border-l-neon-cyan">
                <p className="font-medium text-neon-cyan">
                  Tip: Write your abstract in past tense, since your experiment
                  is already complete.
                </p>
              </div>
            </CollapsibleSection>
          </div>
        </div>

        {/* Display */}
        <div>
          <h2 className="text-2xl font-display font-bold text-text-bright mb-4 flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-neon-pink/10 text-neon-pink flex items-center justify-center shrink-0" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </span>
            Display
          </h2>

          <div className="p-6 glass-card">
            <p className="text-lg mb-4 text-text-primary">
              Your display board is the first thing judges see &mdash; make it
              clear, organized, and engaging!
            </p>

            <div className="mb-6">
              <h4 className="font-display font-semibold text-text-bright mb-3">
                Your final presentation must include all of the following:
              </h4>
              <div className="grid sm:grid-cols-2 gap-2">
                {[
                  "Abstract",
                  "Question/Problem",
                  "Hypothesis",
                  "Materials",
                  "Procedure",
                  "Data",
                  "Conclusion",
                  "Bibliography",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neon-pink shrink-0" aria-hidden="true">
                      <polyline points="9 11 12 14 22 4" />
                      <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                    </svg>
                    <span className="text-sm text-text-primary">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/display-and-safety"
              className="btn-glow-pink inline-flex items-center gap-2 px-5 py-2.5 bg-neon-pink text-bg-deep font-semibold rounded-lg"
            >
              View Display & Safety Guidelines
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Preparing for Judging */}
        <div>
          <h2 className="text-2xl font-display font-bold text-text-bright mb-4 flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-neon-amber/10 text-neon-amber flex items-center justify-center shrink-0" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </span>
            Preparing for Judging
          </h2>

          <div className="space-y-4">
            <CollapsibleSection
              title="Common Judging Interview Questions"
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </svg>
              }
            >
              <p className="mb-4">
                Practice answering these questions to be ready for your judging
                interview:
              </p>
              <div className="space-y-3">
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
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 bg-white/[0.03] rounded-lg border border-white/5"
                  >
                    <span className="text-neon-cyan font-bold shrink-0">
                      Q{i + 1}.
                    </span>
                    <span>{q}</span>
                  </div>
                ))}
              </div>
            </CollapsibleSection>

            <CollapsibleSection
              title="Judging Rubric"
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="3" y1="15" x2="21" y2="15" />
                  <line x1="9" y1="3" x2="9" y2="21" />
                </svg>
              }
            >
              <p className="mb-4">
                Judges will evaluate your project based on these six official criteria:
              </p>
              <div className="grid gap-3">
                {[
                  { area: "Scientific Thought", desc: "Is the problem clearly stated? Is the hypothesis reasonable and testable? Are conclusions based on evidence?" },
                  { area: "Creativity", desc: "Does the project show original thinking and a unique approach to the problem?" },
                  { area: "Thoroughness", desc: "Is the research comprehensive? Were enough trials conducted and variables considered?" },
                  { area: "Skill", desc: "Does the project demonstrate appropriate use of scientific methods, equipment, and analysis techniques?" },
                  { area: "Clarity", desc: "Is the project clearly explained? Are the data, charts, and conclusions easy to understand?" },
                  { area: "Presentation", desc: "Is the display board well-organized and visually appealing? Can the student explain their work effectively?" },
                ].map((item) => (
                  <div
                    key={item.area}
                    className="p-4 rounded-lg bg-neon-purple/5 border border-neon-purple/10"
                  >
                    <p className="font-display font-semibold text-text-bright">{item.area}</p>
                    <p className="text-sm text-text-secondary mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </CollapsibleSection>
          </div>
        </div>
      </div>
    </>
  );
}
