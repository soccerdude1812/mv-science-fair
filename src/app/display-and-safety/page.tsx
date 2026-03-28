import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Display & Safety",
  description:
    "Display requirements and safety guidelines for MVWSD Science Fair projects including board dimensions and presentation rules.",
};

const rules = [
  {
    number: 1,
    title: "No Electricity Available",
    description:
      "No electrical outlets will be provided at the venue. Your project must function without external power. If you need to demonstrate something electronic, consider using batteries or providing a video/photos instead.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    accentColor: "neon-amber",
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
    accentColor: "neon-pink",
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
    accentColor: "neon-cyan",
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
    accentColor: "neon-green",
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
    accentColor: "neon-purple",
    dimensions: false,
  },
  {
    number: 6,
    title: "Complete Citations Required",
    description:
      "Complete citations must be present for all photographs, images, charts, tables, and graphs used in your display. Give proper credit to your sources.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
        <line x1="12" y1="6" x2="12" y2="13" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    accentColor: "neon-cyan",
    dimensions: false,
  },
];

export default function DisplayAndSafetyPage() {
  return (
    <>
      <PageHero
        title="Display & Safety"
        subtitle="Important guidelines to ensure your project display is safe, organized, and meets all requirements."
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
        {/* Intro */}
        <div className="glass-card p-6 mb-8">
          <p className="text-lg text-text-primary leading-relaxed">
            Your display board is the first impression judges will have of your
            project. Follow these guidelines to make sure it&apos;s safe,
            within the required dimensions, and presents your work in the best
            possible way.
          </p>
        </div>

        {/* Rules */}
        <div className="space-y-5">
          {rules.map((rule) => (
            <div
              key={rule.number}
              className="glass-card p-6"
              style={{ borderLeftWidth: '4px', borderLeftColor: `var(--${rule.accentColor})` }}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-${rule.accentColor}/10 text-${rule.accentColor}`}
                  aria-hidden="true"
                >
                  {rule.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display font-bold text-text-bright text-lg flex items-center gap-2">
                    <span className={`text-${rule.accentColor}`}>#{rule.number}</span>
                    {rule.title}
                  </h3>
                  <p className="mt-2 text-text-primary leading-relaxed">
                    {rule.description}
                  </p>

                  {rule.dimensions && (
                    <div className="mt-4 grid grid-cols-3 gap-3">
                      <div className="text-center p-4 rounded-lg bg-neon-cyan/5 border border-neon-cyan/10">
                        <p className="text-3xl font-display font-bold text-neon-cyan">
                          66&quot;
                        </p>
                        <p className="text-sm text-text-secondary mt-1">
                          Max Height
                        </p>
                        <p className="text-xs text-text-secondary/60">
                          (from table)
                        </p>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-neon-purple/5 border border-neon-purple/10">
                        <p className="text-3xl font-display font-bold text-neon-purple">
                          30&quot;
                        </p>
                        <p className="text-sm text-text-secondary mt-1">Max Depth</p>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-neon-amber/5 border border-neon-amber/10">
                        <p className="text-3xl font-display font-bold text-neon-amber">
                          48&quot;
                        </p>
                        <p className="text-sm text-text-secondary mt-1">Max Width</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Reference */}
        <div className="mt-12 glass-card p-8 border-t-2 border-t-neon-cyan">
          <h2 className="text-2xl font-display font-bold text-text-bright mb-6">Quick Reference Checklist</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Display fits on a table (no floor displays)",
              "Height: 66\" or less from table surface",
              "Depth: 30\" or less",
              "Width: 48\" or less",
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
                  className="text-neon-green shrink-0"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-text-primary">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
