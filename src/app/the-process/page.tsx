import Link from "next/link";
import PageHero from "@/components/PageHero";
import CollapsibleSection from "@/components/CollapsibleSection";
import Timeline from "@/components/Timeline";

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5 mt-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent-indigo shrink-0" aria-hidden="true" />
          <span className="text-text-secondary">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function SectionNumber({ num, color }: { num: string; color: string }) {
  return (
    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold shrink-0 ${color}`}>
      {num}
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
      <section className="bg-bg-primary py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 reveal">
            <span className="badge badge-accent mb-4 inline-flex">Roadmap</span>
            <h2 className="text-2xl sm:text-3xl font-display font-semibold text-text-primary tracking-[-0.03em]">
              Science Fair Roadmap
            </h2>
            <p className="mt-3 text-text-secondary max-w-xl mx-auto">
              Follow these milestones from start to finish. Click any step for details.
            </p>
          </div>
          <Timeline />
        </div>
      </section>

      {/* Main content */}
      <div>
        {/* ── Section 1: Before Starting ── */}
        <section className="bg-bg-surface py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8 reveal">
              <SectionNumber num="01" color="bg-accent-indigo/10 text-accent-indigo" />
              <h2 className="text-2xl sm:text-3xl font-display font-semibold text-text-primary tracking-[-0.03em]">
                Before Starting Your Project
              </h2>
            </div>

            <div className="space-y-4">
              <div className="reveal stagger-1">
                <CollapsibleSection
                  title="Topic Selection"
                  defaultOpen={false}
                  icon={
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  }
                >
                  <p className="font-display font-medium text-text-primary text-lg mb-3">
                    The best projects come from YOUR curiosity!
                  </p>
                  <p className="mb-5 text-text-secondary">
                    Ask yourself: What do I wonder about? What would I love to explore?
                  </p>

                  {/* Start Here box */}
                  <div className="glass-card border-l-2 border-accent-indigo p-5 mb-5">
                    <h4 className="font-display font-semibold text-accent-indigo mb-2">
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

                  {/* Pro Tip box */}
                  <div className="glass-card border-l-2 border-accent-cyan p-4 mb-5">
                    <p className="font-display font-semibold text-accent-cyan">
                      Pro Tip:
                    </p>
                    <p className="text-text-secondary">
                      Pick 2 or 3 ideas at first. That way, if one doesn&apos;t work
                      out, you&apos;ve got backups!
                    </p>
                  </div>

                  {/* Category cards */}
                  <div className="mb-5">
                    <h4 className="font-display font-semibold text-text-primary mb-4">
                      Projects should fit into one of these four categories:
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {[
                        {
                          name: "Life & Health Sciences",
                          desc: "people, plants, psychology, environment",
                          color: "text-accent-emerald",
                          dot: "bg-accent-emerald",
                        },
                        {
                          name: "Physical Science & Engineering",
                          desc: "forces, motion, energy, machines, astronomy, inventions",
                          color: "text-accent-indigo",
                          dot: "bg-accent-indigo",
                        },
                        {
                          name: "Chemistry & Materials",
                          desc: "reactions, mixtures, states of matter, testing materials",
                          color: "text-accent-amber",
                          dot: "bg-accent-amber",
                        },
                        {
                          name: "Technology & Innovation",
                          desc: "computers, coding, robotics, apps, problem-solving inventions (must demonstrate a STEM method such as the engineering design process)",
                          color: "text-accent-purple",
                          dot: "bg-accent-purple",
                        },
                      ].map((cat) => (
                        <div
                          key={cat.name}
                          className="surface-card p-4 flex items-start gap-3"
                        >
                          <span className={`mt-1.5 w-2 h-2 rounded-full ${cat.dot} shrink-0`} aria-hidden="true" />
                          <div>
                            <span className={`font-semibold ${cat.color}`}>{cat.name}</span>
                            <span className="text-sm text-text-muted"> &mdash; {cat.desc}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="mb-4 text-text-secondary">
                    Be sure to{" "}
                    <Link href="/rules" className="text-accent-indigo font-medium hover:underline">
                      check the rules
                    </Link>{" "}
                    before settling on a topic.
                  </p>

                  {/* Important notes */}
                  <div className="glass-card border-l-2 border-accent-rose p-4 mb-3">
                    <p className="font-semibold text-accent-rose">
                      IMPORTANT: Individual or team participation is allowed (maximum 3 members per team).
                    </p>
                  </div>

                  <div className="glass-card border-l-2 border-accent-rose p-4">
                    <p className="font-semibold text-accent-rose">
                      No continuation projects are allowed. All projects must be new and original work for this year&apos;s science fair.
                    </p>
                  </div>
                </CollapsibleSection>
              </div>

              <div className="reveal stagger-2">
                <CollapsibleSection
                  title="Planning Your Project"
                  icon={
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  }
                >
                  <p className="mb-5 text-text-secondary">
                    Before you begin experimenting, make sure you&apos;ve thought through
                    these key elements:
                  </p>
                  <div className="grid gap-3">
                    {[
                      { title: "Safety", desc: "Are there any safety concerns? Do you need approval forms? Address this first before starting any work." },
                      { title: "Research Question", desc: "What specific question are you trying to answer?" },
                      { title: "Hypothesis", desc: 'Your educated guess about the answer. Use "If... then... because..." format.' },
                      { title: "Materials", desc: "List everything you'll need for your experiment." },
                      { title: "Procedure", desc: "Step-by-step instructions someone else could follow to repeat your experiment. Your experiment should include repetition (multiple trials) so results can be verified." },
                      { title: "Variables", desc: "Identify what you're changing (independent), measuring (dependent), and keeping the same (controlled)." },
                      { title: "Data Collection", desc: "How will you record and organize your results?" },
                    ].map((item) => (
                      <div
                        key={item.title}
                        className="surface-card p-4 flex items-start gap-3"
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
                          className="text-accent-indigo mt-0.5 shrink-0"
                          aria-hidden="true"
                        >
                          <polyline points="9 11 12 14 22 4" />
                          <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                        </svg>
                        <div>
                          <span className="font-semibold text-text-primary">
                            {item.title}:
                          </span>{" "}
                          <span className="text-text-secondary">{item.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CollapsibleSection>
              </div>

              <div className="reveal stagger-3">
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
                  <p className="mb-4 text-text-secondary">
                    Mentors can help guide you through the scientific process. Mentors are volunteers who provide support and encouragement throughout your project.
                  </p>
                  <div className="glass-card border-l-2 border-accent-indigo p-4">
                    <h4 className="font-display font-semibold text-text-primary mb-2">
                      Mentors
                    </h4>
                    <p className="text-sm text-text-secondary mb-2">
                      Volunteer mentors can help you with your project by guiding you through the scientific method, helping you stay organized, and offering encouragement along the way.
                    </p>
                    <p className="text-sm text-text-muted">
                      Mentors are high school student volunteers from the community.
                    </p>
                  </div>
                </CollapsibleSection>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 2: Apply to the Fair ── */}
        <section className="bg-bg-primary py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8 reveal">
              <SectionNumber num="02" color="bg-accent-cyan/10 text-accent-cyan" />
              <h2 className="text-2xl sm:text-3xl font-display font-semibold text-text-primary tracking-[-0.03em]">
                Apply to the Fair
              </h2>
            </div>

            <div className="space-y-4">
              <div className="reveal stagger-1">
                <CollapsibleSection
                  title="Step 1: Fill Out the Application Form"
                  defaultOpen={false}
                  icon={
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-cyan/20 text-accent-cyan text-xs font-bold shrink-0">
                      1
                    </span>
                  }
                >
                  <p className="mb-5 text-text-secondary">
                    Complete the Application &amp; Registration Form with your project
                    details, team members, consent, and project description. This is the only form you need to register and apply.
                  </p>
                  <a
                    href="https://docs.google.com/forms/d/1Uys9ePwF965Nn722dpa3eSypNVK9tLp-J4PnvOGN4xg/viewform"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-glow"
                  >
                    Open Application &amp; Registration Form
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                </CollapsibleSection>
              </div>

              <div className="reveal stagger-2">
                <CollapsibleSection
                  title="Step 2: Submit Additional Forms (If Required)"
                  icon={
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-cyan/20 text-accent-cyan text-xs font-bold shrink-0">
                      2
                    </span>
                  }
                >
                  <p className="mb-4 text-text-secondary">
                    Depending on your project, you may need to submit additional
                    approval forms:
                  </p>
                  <BulletList
                    items={[
                      "Human Participants Form -- if your project involves surveying, interviewing, or testing people",
                      "Hazardous Materials Form -- if your project uses chemicals, electrical equipment, sharp tools, or heat sources",
                    ]}
                  />
                  <p className="mt-5 text-text-secondary">
                    Visit the{" "}
                    <Link href="/forms" className="text-accent-indigo font-medium hover:underline">
                      Forms page
                    </Link>{" "}
                    for all required forms and details on when each is needed.
                  </p>
                </CollapsibleSection>
              </div>

              <div className="reveal stagger-3">
                <CollapsibleSection
                  title="What Happens Next (Pre-Approval)"
                  icon={
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  }
                >
                  <p className="mb-4 text-text-secondary">
                    After you submit your application, the Science Fair Committee
                    will review your project proposal.
                  </p>
                  <div className="glass-card border-l-2 border-accent-amber p-4">
                    <p className="font-display font-semibold text-accent-amber">Important:</p>
                    <p className="text-text-secondary">
                      You must wait for a confirmation email before starting your
                      experiment. The committee needs to verify that your project
                      meets all safety and ethical guidelines.
                    </p>
                  </div>
                </CollapsibleSection>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 3: During Your Project ── */}
        <section className="bg-bg-surface py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8 reveal">
              <SectionNumber num="03" color="bg-accent-purple/10 text-accent-purple" />
              <h2 className="text-2xl sm:text-3xl font-display font-semibold text-text-primary tracking-[-0.03em]">
                During Your Project
              </h2>
            </div>

            <div className="reveal stagger-1">
              <CollapsibleSection
                title="Research Logbook"
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                  </svg>
                }
              >
                {/* Required callout */}
                <div className="glass-card border-l-2 border-accent-rose p-4 mb-5">
                  <p className="font-semibold text-accent-rose">
                    REQUIRED — Students MUST maintain a project logbook documenting planning, execution, results, and sources.
                  </p>
                </div>

                <p className="mb-5 text-text-secondary">
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
                      className="surface-card p-3 flex items-center gap-3"
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
                        className="text-accent-purple shrink-0"
                        aria-hidden="true"
                      >
                        <polyline points="9 11 12 14 22 4" />
                        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                      </svg>
                      <span className="text-sm text-text-secondary">{item}</span>
                    </div>
                  ))}
                </div>
              </CollapsibleSection>
            </div>
          </div>
        </section>

        {/* ── Section 4: After Data Collection ── */}
        <section className="bg-bg-primary py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8 reveal">
              <SectionNumber num="04" color="bg-accent-amber/10 text-accent-amber" />
              <h2 className="text-2xl sm:text-3xl font-display font-semibold text-text-primary tracking-[-0.03em]">
                After Data Collection
              </h2>
            </div>

            <div className="space-y-4">
              <div className="reveal stagger-1">
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
                  <p className="mb-5 text-text-secondary">
                    For elementary school students, data analysis doesn&apos;t need
                    to be complicated! Here are some things to look at:
                  </p>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="glass-card p-5 text-center">
                      <p className="font-display font-bold text-accent-indigo text-lg mb-2">Average</p>
                      <p className="text-sm text-text-secondary">
                        Add up your results and divide by the number of trials to
                        find the average.
                      </p>
                    </div>
                    <div className="glass-card p-5 text-center">
                      <p className="font-display font-bold text-accent-cyan text-lg mb-2">Compare</p>
                      <p className="text-sm text-text-secondary">
                        Compare groups or conditions to see if there are differences
                        between them.
                      </p>
                    </div>
                    <div className="glass-card p-5 text-center">
                      <p className="font-display font-bold text-accent-amber text-lg mb-2">Patterns</p>
                      <p className="text-sm text-text-secondary">
                        Look for patterns: Are results increasing, decreasing, or
                        staying the same?
                      </p>
                    </div>
                  </div>
                </CollapsibleSection>
              </div>

              <div className="reveal stagger-2">
                <CollapsibleSection
                  title="Write Your Abstract"
                  icon={
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                    </svg>
                  }
                >
                  <p className="mb-4 text-text-secondary">
                    An abstract is a one-paragraph summary of your entire project that will go on your display board.
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
                  <div className="glass-card border-l-2 border-accent-cyan p-4 mt-5">
                    <p className="font-medium text-accent-cyan">
                      Tip: Write your abstract in past tense, since your experiment
                      is already complete.
                    </p>
                  </div>
                </CollapsibleSection>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 5: Display ── */}
        <section className="bg-bg-surface py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8 reveal">
              <SectionNumber num="05" color="bg-accent-rose/10 text-accent-rose" />
              <h2 className="text-2xl sm:text-3xl font-display font-semibold text-text-primary tracking-[-0.03em]">
                Display
              </h2>
            </div>

            <div className="glass-card p-6 sm:p-8 reveal stagger-1">
              <p className="text-lg mb-5 text-text-secondary">
                Your display board is the first thing judges see &mdash; make it
                clear, organized, and engaging!
              </p>

              <div className="mb-6">
                <h4 className="font-display font-semibold text-text-primary mb-4">
                  Your final presentation must include all of the following:
                </h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    "Abstract",
                    "Question/Problem",
                    "Hypothesis",
                    "Materials",
                    "Procedure",
                    "Data",
                    "Conclusion",
                    "Bibliography (if applicable)",
                  ].map((item) => (
                    <div key={item} className="surface-card p-3 flex items-center gap-3">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-rose shrink-0" aria-hidden="true">
                        <polyline points="9 11 12 14 22 4" />
                        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                      </svg>
                      <span className="text-sm text-text-secondary">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/display-and-safety"
                className="btn-ghost"
              >
                View Display & Safety Guidelines
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* ── Section 6: Preparing for Judging ── */}
        <section className="bg-bg-primary py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8 reveal">
              <SectionNumber num="06" color="bg-accent-emerald/10 text-accent-emerald" />
              <h2 className="text-2xl sm:text-3xl font-display font-semibold text-text-primary tracking-[-0.03em]">
                Preparing for Judging
              </h2>
            </div>

            <div className="space-y-4">
              <div className="reveal stagger-1">
                <CollapsibleSection
                  title="Common Judging Questions"
                  icon={
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                    </svg>
                  }
                >
                  <p className="mb-5 text-text-secondary">
                    Practice answering these questions to prepare for judging:
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
                        className="surface-card p-4 flex items-start gap-3"
                      >
                        <span className="text-accent-emerald font-bold shrink-0 font-display">
                          Q{i + 1}.
                        </span>
                        <span className="text-text-secondary">{q}</span>
                      </div>
                    ))}
                  </div>
                </CollapsibleSection>
              </div>

              <div className="reveal stagger-2">
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
                  <p className="mb-5 text-text-secondary">
                    Judges will evaluate your project based on these six official criteria:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
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
                        className="glass-card-hover p-5"
                      >
                        <p className="font-display font-semibold text-text-primary">{item.area}</p>
                        <p className="text-sm text-text-muted mt-1.5">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </CollapsibleSection>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
