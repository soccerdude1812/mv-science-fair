import PageHero from "@/components/PageHero";

export default function JudgesPage() {
  return (
    <>
      <PageHero
        title="Become a Judge"
        subtitle="Help evaluate and inspire the next generation of scientists! Your feedback can shape a young person's love for science."
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-10">
        {/* Who Can Judge */}
        <section className="reveal glass-card p-8">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="shrink-0 w-16 h-16 rounded-2xl bg-accent-amber/10 text-accent-amber flex items-center justify-center" aria-hidden="true">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-display font-bold text-text-primary mb-3">
                Who Can Judge?
              </h2>
              <p className="text-lg text-text-secondary leading-relaxed">
                We&apos;re looking for <strong className="text-text-primary">teachers, professionals, and community members</strong>{" "}
                with an interest in science, technology, engineering, or
                mathematics and a passion for mentorship. Whether you&apos;re a
                professional scientist, an engineer, a teacher, or simply someone
                who loves science, we&apos;d love to have you join us!
              </p>
            </div>
          </div>
        </section>

        {/* Sign Up CTA */}
        <section className="reveal gradient-border p-8 sm:p-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-text-primary mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg text-text-secondary mb-8 max-w-xl mx-auto">
            Sign up to be a judge and help evaluate student projects. Your
            expertise and encouragement can inspire a young scientist.
          </p>
          <a
            href="https://docs.google.com/forms/d/14Yo2IgS-PAsYNIFac4pzJRdTMX6xEnjtGslqGtAx6TQ/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow text-lg px-8 py-4"
          >
            Sign Up to Judge
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </section>

        {/* What to Expect */}
        <section className="reveal">
          <h2 className="text-2xl font-display font-bold text-text-primary mb-6">
            What to Expect
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="glass-card-hover p-6">
              <div className="w-10 h-10 rounded-lg bg-accent-indigo/10 text-accent-indigo flex items-center justify-center mb-4" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
                </svg>
              </div>
              <h3 className="font-display font-semibold text-text-primary text-lg mb-2">
                Training Provided
              </h3>
              <p className="text-text-secondary leading-relaxed">
                All judges receive training materials and rubrics in advance, so
                you&apos;ll know exactly how to evaluate projects fairly and
                constructively.
              </p>
            </div>

            <div className="glass-card-hover p-6">
              <div className="w-10 h-10 rounded-lg bg-accent-cyan/10 text-accent-cyan flex items-center justify-center mb-4" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="3" y1="15" x2="21" y2="15" />
                  <line x1="9" y1="3" x2="9" y2="21" />
                </svg>
              </div>
              <h3 className="font-display font-semibold text-text-primary text-lg mb-2">
                Rubrics Provided
              </h3>
              <p className="text-text-secondary leading-relaxed">
                Standardized rubrics ensure consistent evaluation across all
                projects and categories. You&apos;ll evaluate scientific thought,
                creativity, thoroughness, skill, clarity, and presentation.
              </p>
            </div>

            <div className="glass-card-hover p-6">
              <div className="w-10 h-10 rounded-lg bg-accent-amber/10 text-accent-amber flex items-center justify-center mb-4" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <h3 className="font-display font-semibold text-text-primary text-lg mb-2">
                Category Judging Schedule
              </h3>
              <p className="text-text-secondary leading-relaxed">
                TBD &mdash; The detailed schedule for category judging will be
                shared closer to the event date. You&apos;ll be assigned to
                specific categories based on your background.
              </p>
            </div>

            <div className="glass-card-hover p-6">
              <div className="w-10 h-10 rounded-lg bg-accent-rose/10 text-accent-rose flex items-center justify-center mb-4" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="7" />
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                </svg>
              </div>
              <h3 className="font-display font-semibold text-text-primary text-lg mb-2">
                Special Awards Judging
              </h3>
              <p className="text-text-secondary leading-relaxed">
                TBD &mdash; Special awards judging schedule will be announced.
                These awards recognize outstanding achievement in specific areas
                like innovation, environmental impact, and more.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
