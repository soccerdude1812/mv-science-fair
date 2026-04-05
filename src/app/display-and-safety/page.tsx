import PageHero from "@/components/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const rules = [
  {
    number: 1,
    title: "No Electricity Available",
    description:
      "No electricity is available at the venue. Only battery-operated demonstrations are permitted at the fair.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    dimensions: false,
  },
  {
    number: 2,
    title: "No Materials May Be Distributed",
    description:
      "No project materials, samples, handouts, or other items may be given to or distributed to judges during the evaluation. Everything must stay at your display.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
      </svg>
    ),
    dimensions: false,
  },
  {
    number: 3,
    title: "Table Display with Size Limits",
    description:
      "All projects will sit on a table (no floor-standing displays allowed). Your project may not exceed the following dimensions:",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    dimensions: true,
  },
  {
    number: 4,
    title: "Must Stand Upright",
    description:
      "Projects MUST be capable of standing upright without toppling, even against normal indoor air currents. Make sure your display is stable and secure before the fair.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    dimensions: false,
  },
  {
    number: 5,
    title: "Acknowledgments: Text Only, No Logos",
    description:
      "Acknowledgments must be in one section of your poster or board. They must be text-only -- no company logos, brand images, or other graphics in the acknowledgments section.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    dimensions: false,
  },
  {
    number: 6,
    title: "No Hazardous Materials at the Venue",
    description:
      "Hazardous substances may NOT be brought to the fair venue. Note: Live organisms and biohazardous materials are not permitted in any science fair projects. Use photographs, diagrams, or video demonstrations to showcase your work. Only battery-operated demonstrations are permitted.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    dimensions: false,
  },
  {
    number: 7,
    title: "Complete Citations Required",
    description:
      'Complete citations must be present for all photographs, images, charts, tables, and graphs used in your display. A citation should include: the author or creator, the title of the source, the date it was published or accessed, and the URL or publication name. For example: "Smith, J. (2025). Plant Growth Rates. Science for Kids Magazine, p. 12." or "NASA. (2024). Solar System Overview. Retrieved from nasa.gov/solarsystem." Give proper credit to all your sources.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
        <line x1="12" y1="6" x2="12" y2="13" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    dimensions: false,
  },
];

const accentColors = [
  "text-accent-indigo",
  "text-accent-cyan",
  "text-accent-purple",
  "text-accent-amber",
  "text-accent-emerald",
  "text-accent-rose",
  "text-accent-indigo",
];

export default function DisplayAndSafetyPage() {
  return (
    <>
      <PageHero
        title="Display & Safety"
        subtitle="Important guidelines to ensure your project display is safe, organized, and meets all requirements."
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16 md:py-20">
        {/* Intro */}
        <Card className="reveal bg-bg-surface border-border-subtle mb-10">
          <CardContent className="p-8">
          <p className="text-lg text-text-secondary leading-relaxed">
            Your display board is the first impression judges will have of your
            project. Follow these guidelines to make sure it&apos;s safe,
            within the required dimensions, and presents your work in the best
            possible way.
          </p>
          </CardContent>
        </Card>

        {/* Rules */}
        <div className="space-y-5">
          {rules.map((rule, i) => (
            <Card
              key={rule.number}
              className="reveal bg-bg-surface border-border-subtle border-l-4 border-l-accent-indigo"
            >
              <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div
                  className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-bg-surface ${accentColors[i]}`}
                  aria-hidden="true"
                >
                  {rule.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display font-bold text-text-primary text-lg flex items-center gap-2">
                    <span className={accentColors[i]}>#{rule.number}</span>
                    {rule.title}
                  </h3>
                  <p className="mt-2 text-text-secondary leading-relaxed">
                    {rule.description}
                  </p>

                  {rule.dimensions && (
                    <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
                      <div className="text-center p-2.5 sm:p-4 rounded-xl bg-accent-indigo/10 border border-accent-indigo/20">
                        <p className="text-xl sm:text-3xl font-display font-bold text-accent-indigo">
                          66&quot;
                        </p>
                        <p className="text-xs sm:text-sm text-text-secondary mt-1">
                          Max Height
                        </p>
                        <p className="text-[10px] sm:text-xs text-text-muted">
                          (from table)
                        </p>
                      </div>
                      <div className="text-center p-2.5 sm:p-4 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20">
                        <p className="text-xl sm:text-3xl font-display font-bold text-accent-cyan">
                          30&quot;
                        </p>
                        <p className="text-xs sm:text-sm text-text-secondary mt-1">Max Depth</p>
                      </div>
                      <div className="text-center p-2.5 sm:p-4 rounded-xl bg-accent-amber/10 border border-accent-amber/20">
                        <p className="text-xl sm:text-3xl font-display font-bold text-accent-amber">
                          48&quot;
                        </p>
                        <p className="text-xs sm:text-sm text-text-secondary mt-1">Max Width</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Separator className="my-8 bg-border-subtle" />

        {/* Required Board Content */}
        <Card className="reveal bg-bg-surface border-border-subtle border-t-2 border-t-accent-indigo">
          <CardContent className="p-8">
          <h2 className="text-2xl font-display font-bold text-text-primary mb-4">Required Board Content</h2>
          <p className="text-text-secondary mb-5">Your display board must include:</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Abstract",
              "Research Question/Problem",
              "Hypothesis",
              "Materials",
              "Procedure",
              "Data & Results",
              "Conclusion",
              "Bibliography (if applicable)",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-accent-indigo shrink-0"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-text-secondary">{item}</span>
              </div>
            ))}
          </div>
          </CardContent>
        </Card>

        {/* Quick Reference */}
        <Card className="reveal mt-8 bg-bg-surface border-border-subtle border-t-2 border-t-accent-cyan">
          <CardContent className="p-8">
          <h2 className="text-2xl font-display font-bold text-text-primary mb-6">Quick Reference Checklist</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Display fits on a table (no floor displays)",
              'Height: 66" or less from table surface',
              'Depth: 30" or less',
              'Width: 48" or less',
              "Display stands upright on its own",
              "No electrical connections needed",
              "No materials to hand out to judges",
              "Acknowledgments are text-only (no logos)",
              "All images and data have citations",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-accent-cyan shrink-0"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-text-secondary">{item}</span>
              </div>
            ))}
          </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
