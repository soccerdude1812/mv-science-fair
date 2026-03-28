import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Volunteer",
  description:
    "Volunteer at the MVWSD Science Fair! Help with event-day logistics or mentor a young scientist.",
};

export default function VolunteerPage() {
  return (
    <>
      <PageHero
        title="Volunteer"
        subtitle="Want to be a superhero? As a nonprofit, we need your help to make the MVWSD Science Fair a success!"
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10 relative z-10">
        {/* Call to Action Banner */}
        <div className="relative glass-card p-8 sm:p-10 overflow-hidden border-t-2 border-t-neon-cyan">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              fill="none"
              className="absolute -top-6 -right-6 opacity-[0.05]"
            >
              <path d="M60 10l15 30 33 5-24 23 6 33-30-16-30 16 6-33-24-23 33-5z" fill="var(--neon-cyan)" />
            </svg>
          </div>
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-display font-bold gradient-text mb-4">
              Every Volunteer Makes a Difference
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl leading-relaxed">
              The MVWSD Science Fair is a community-powered event. Whether you
              can spare a few hours on event day or want to mentor a student
              over several weeks, your contribution helps inspire the next
              generation of scientists.
            </p>
          </div>
        </div>

        {/* Volunteer Options */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Event-Day Volunteering */}
          <div className="glass-card overflow-hidden card-hover flex flex-col">
            <div className="bg-gradient-to-r from-neon-cyan/20 to-neon-cyan/5 p-6 border-b border-neon-cyan/10">
              <div className="w-12 h-12 rounded-xl bg-neon-cyan/20 text-neon-cyan flex items-center justify-center mb-4" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <h3 className="text-xl font-display font-bold text-text-bright">Event-Day Volunteering</h3>
              <p className="text-neon-cyan/80 text-sm mt-1">
                Open to High School Students &amp; Community Members
              </p>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <p className="text-text-secondary leading-relaxed flex-1">
                Help with setup, registration, guiding visitors, managing the
                event flow, and cleanup. A great way to earn community service
                hours while supporting young scientists!
              </p>
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2 text-sm text-text-primary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-neon-cyan shrink-0" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Event setup and cleanup
                </div>
                <div className="flex items-center gap-2 text-sm text-text-primary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-neon-cyan shrink-0" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Registration and check-in
                </div>
                <div className="flex items-center gap-2 text-sm text-text-primary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-neon-cyan shrink-0" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Guiding visitors and families
                </div>
              </div>
              <a
                href="https://docs.google.com/forms/d/1iuy7stpEJE6Espci9gCiEdNe06Cx0DR8I73fKNuyCbg/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glow mt-6 inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-neon-cyan text-bg-deep font-semibold rounded-xl"
              >
                Sign Up for Event Day
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Mentor Volunteering */}
          <div className="glass-card overflow-hidden card-hover flex flex-col">
            <div className="bg-gradient-to-r from-neon-purple/20 to-neon-purple/5 p-6 border-b border-neon-purple/10">
              <div className="w-12 h-12 rounded-xl bg-neon-purple/20 text-neon-purple flex items-center justify-center mb-4" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <line x1="19" y1="8" x2="19" y2="14" />
                  <line x1="22" y1="11" x2="16" y2="11" />
                </svg>
              </div>
              <h3 className="text-xl font-display font-bold text-text-bright">Mentor Volunteering</h3>
              <p className="text-neon-purple/80 text-sm mt-1">
                Open to High School Students
              </p>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <p className="text-text-secondary leading-relaxed flex-1">
                Share your knowledge and experience by guiding a young scientist
                through their project. Help them develop research skills,
                understand the scientific method, and build confidence.
              </p>
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2 text-sm text-text-primary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-neon-purple shrink-0" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Guide project development
                </div>
                <div className="flex items-center gap-2 text-sm text-text-primary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-neon-purple shrink-0" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Help with scientific method
                </div>
                <div className="flex items-center gap-2 text-sm text-text-primary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-neon-purple shrink-0" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Build student confidence
                </div>
              </div>
              <div className="mt-6 mb-4 p-4 rounded-lg bg-neon-purple/5 border border-neon-purple/10">
                <h4 className="font-display font-semibold text-text-bright text-sm mb-3">Mentor Responsibilities</h4>
                <div className="space-y-2">
                  {[
                    "Act as an advisor — guide and support, but the project must remain the student's own work",
                    "Never present ideas or content as if it were the student's own",
                    "Cannot attend or interfere during project judging",
                    "Must report any concerns about plagiarism, data fabrication, or unsafe conduct to the committee",
                    "Maintain professional boundaries and follow all school policies regarding contact with minors",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-neon-purple shrink-0 mt-0.5" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <a
                href="https://docs.google.com/forms/d/1Go59zVliqQohI9kTUKptz8PFpYWdTSJbQ5qzyY6b2yY/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glow mt-2 inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-neon-purple text-bg-deep font-semibold rounded-xl"
                style={{ boxShadow: undefined }}
              >
                Sign Up as Mentor
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Why Volunteer */}
        <div className="glass-card p-8 border-t-2 border-t-neon-amber">
          <h2 className="text-2xl font-display font-bold text-text-bright mb-6">
            Why Volunteer?
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-neon-pink/10 text-neon-pink flex items-center justify-center mx-auto mb-3" aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
              </div>
              <h3 className="font-display font-semibold text-text-bright mb-1">
                Inspire Young Minds
              </h3>
              <p className="text-sm text-text-secondary">
                Your encouragement can spark a lifelong love of science in a
                child.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-neon-cyan/10 text-neon-cyan flex items-center justify-center mx-auto mb-3" aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87" />
                  <path d="M16 3.13a4 4 0 010 7.75" />
                </svg>
              </div>
              <h3 className="font-display font-semibold text-text-bright mb-1">
                Build Community
              </h3>
              <p className="text-sm text-text-secondary">
                Connect with families, educators, and fellow science enthusiasts
                in Mountain View.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-neon-amber/10 text-neon-amber flex items-center justify-center mx-auto mb-3" aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="7" />
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                </svg>
              </div>
              <h3 className="font-display font-semibold text-text-bright mb-1">
                Earn Service Hours
              </h3>
              <p className="text-sm text-text-secondary">
                High school students can earn community service hours while
                making a real impact.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
