import PageHero from "@/components/PageHero";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function VolunteerPage() {
  return (
    <>
      <PageHero
        title="Volunteer"
        subtitle="Want to be a superhero? As a nonprofit, we need your help to make the MVHS Science Fair a success!"
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16 md:py-20 space-y-8 sm:space-y-10">
        {/* Call to Action Banner */}
        <Card className="reveal bg-bg-surface border-border-subtle">
          <CardContent className="p-8 sm:p-10">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-text-primary mb-4">
            Every Volunteer Makes a Difference
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl leading-relaxed">
            The MVHS Science Fair is a community-powered event. Whether you
            can spare a few hours on event day or want to mentor a student
            over several weeks, your contribution helps inspire the next
            generation of scientists.
          </p>
          </CardContent>
        </Card>

        <Separator className="my-0 bg-border-subtle" />

        {/* Volunteer Options */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Event-Day Volunteering */}
          <Card className="reveal stagger-1 bg-bg-surface border-border-subtle overflow-hidden flex flex-col">
            <div className="p-6 border-b border-border-subtle bg-accent-indigo/5">
              <div className="w-12 h-12 rounded-xl bg-accent-indigo/10 text-accent-indigo flex items-center justify-center mb-4" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <h3 className="text-xl font-display font-bold text-text-primary">Event-Day Volunteering</h3>
              <Badge variant="secondary" className="mt-2">
                Open to High School Students &amp; Community Members
              </Badge>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <p className="text-text-secondary leading-relaxed flex-1">
                Help with setup, registration, guiding visitors, managing the
                event flow, and cleanup. A great way to earn community service
                hours while supporting young scientists!
              </p>
              <div className="mt-6 space-y-3">
                {[
                  "Event setup and cleanup",
                  "Registration and check-in",
                  "Guiding visitors and families",
                ].map((task, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent-indigo shrink-0" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {task}
                  </div>
                ))}
              </div>
              <a
                href="https://docs.google.com/forms/d/1iuy7stpEJE6Espci9gCiEdNe06Cx0DR8I73fKNuyCbg/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white text-[#0A0A0F] font-semibold text-sm px-6 py-3 hover:opacity-90 transition-opacity mt-6 w-full min-h-[44px]"
              >
                Sign Up for Event Day
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>
          </Card>

          {/* Mentor Volunteering */}
          <Card className="reveal stagger-2 bg-bg-surface border-border-subtle overflow-hidden flex flex-col">
            <div className="p-6 border-b border-border-subtle bg-accent-cyan/5">
              <div className="w-12 h-12 rounded-xl bg-accent-cyan/10 text-accent-cyan flex items-center justify-center mb-4" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <line x1="19" y1="8" x2="19" y2="14" />
                  <line x1="22" y1="11" x2="16" y2="11" />
                </svg>
              </div>
              <h3 className="text-xl font-display font-bold text-text-primary">Mentor Volunteering</h3>
              <Badge variant="secondary" className="mt-2">
                Open to High School Students
              </Badge>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <p className="text-text-secondary leading-relaxed flex-1">
                Share your knowledge and experience by guiding a young scientist
                through their project. Help them develop research skills,
                understand the scientific method, and build confidence. The typical commitment is approximately 1–2 hours per week over the project period.
              </p>
              <div className="mt-6 space-y-3">
                {[
                  "Guide project development",
                  "Help with scientific method",
                  "Build student confidence",
                ].map((task, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent-cyan shrink-0" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {task}
                  </div>
                ))}
              </div>
              <div className="mt-6 mb-4 p-4 rounded-xl bg-bg-surface border border-border-subtle">
                <h4 className="font-display font-semibold text-text-primary text-sm mb-3">Mentor Responsibilities</h4>
                <div className="space-y-2">
                  {[
                    "Act as an advisor — guide and support, but the project must remain the student's own work",
                    "Never present ideas or content as if it were the student's own",
                    "Cannot attend or interfere during project judging",
                    "Must report any concerns about plagiarism, data fabrication, or unsafe conduct to the committee",
                    "Maintain professional boundaries and follow all school policies regarding contact with minors",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent-cyan shrink-0 mt-0.5" aria-hidden="true">
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
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white text-[#0A0A0F] font-semibold text-sm px-6 py-3 hover:opacity-90 transition-opacity mt-2 w-full min-h-[44px]"
              >
                Sign Up as Mentor
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>
          </Card>
        </div>

        <Separator className="my-0 bg-border-subtle" />

        {/* Why Volunteer */}
        <Card className="reveal bg-bg-surface border-border-subtle">
          <CardContent className="p-8">
          <h2 className="text-2xl font-display font-bold text-text-primary mb-6">
            Why Volunteer?
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-accent-rose/10 text-accent-rose flex items-center justify-center mx-auto mb-3" aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
              </div>
              <h3 className="font-display font-semibold text-text-primary mb-1">
                Inspire Young Minds
              </h3>
              <p className="text-sm text-text-secondary">
                Your encouragement can spark a lifelong love of science in a
                child.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-accent-indigo/10 text-accent-indigo flex items-center justify-center mx-auto mb-3" aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87" />
                  <path d="M16 3.13a4 4 0 010 7.75" />
                </svg>
              </div>
              <h3 className="font-display font-semibold text-text-primary mb-1">
                Build Community
              </h3>
              <p className="text-sm text-text-secondary">
                Connect with families, educators, and fellow science enthusiasts
                in Mountain View.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-accent-amber/10 text-accent-amber flex items-center justify-center mx-auto mb-3" aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="7" />
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                </svg>
              </div>
              <h3 className="font-display font-semibold text-text-primary mb-1">
                Earn Service Hours
              </h3>
              <p className="text-sm text-text-secondary">
                High school students can earn community service hours while
                making a real impact.
              </p>
            </div>
          </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
