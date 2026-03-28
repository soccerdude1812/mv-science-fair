"use client";

import { useState } from "react";

const timelineSteps = [
  {
    step: 1,
    title: "Interest Form",
    date: "Now Open",
    description: "Fill out the interest form to let us know you want to participate.",
    status: "active" as const,
    color: "neon-cyan",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
  },
  {
    step: 2,
    title: "Application Opens",
    date: "TBD",
    description: "Submit your project application with your topic, hypothesis, and team info.",
    status: "upcoming" as const,
    color: "neon-purple",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    step: 3,
    title: "Approval & Safety Review",
    date: "TBD",
    description: "Committee reviews applications and any required safety/ethics forms. You'll receive a confirmation email.",
    status: "upcoming" as const,
    color: "neon-green",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    step: 4,
    title: "Project Work Period",
    date: "TBD",
    description: "Conduct your experiments, collect data, and build your project with guidance from mentors.",
    status: "upcoming" as const,
    color: "neon-amber",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3h6v7l4 8H5l4-8V3z" />
        <line x1="9" y1="3" x2="15" y2="3" />
      </svg>
    ),
  },
  {
    step: 5,
    title: "Abstract Submission",
    date: "TBD",
    description: "Submit a one-paragraph abstract summarizing your project, methods, and results.",
    status: "upcoming" as const,
    color: "neon-pink",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    step: 6,
    title: "Display Board Preparation",
    date: "TBD",
    description: "Build your display board with all required sections: abstract, hypothesis, data, conclusion, and more.",
    status: "upcoming" as const,
    color: "neon-cyan",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    step: 7,
    title: "Science Fair Day",
    date: "TBD",
    description: "Present your project to judges and visitors. Celebrate your hard work and scientific discovery!",
    status: "upcoming" as const,
    color: "neon-amber",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
];

const colorVars: Record<string, { dot: string; line: string; bg: string; text: string; border: string; glow: string }> = {
  "neon-cyan":   { dot: "bg-neon-cyan",   line: "bg-neon-cyan/40",   bg: "bg-neon-cyan/10",   text: "text-neon-cyan",   border: "border-neon-cyan/30",   glow: "shadow-neon-cyan/20" },
  "neon-purple": { dot: "bg-neon-purple",  line: "bg-neon-purple/40", bg: "bg-neon-purple/10", text: "text-neon-purple",  border: "border-neon-purple/30", glow: "shadow-neon-purple/20" },
  "neon-green":  { dot: "bg-neon-green",   line: "bg-neon-green/40",  bg: "bg-neon-green/10",  text: "text-neon-green",   border: "border-neon-green/30",  glow: "shadow-neon-green/20" },
  "neon-amber":  { dot: "bg-neon-amber",   line: "bg-neon-amber/40",  bg: "bg-neon-amber/10",  text: "text-neon-amber",   border: "border-neon-amber/30",  glow: "shadow-neon-amber/20" },
  "neon-pink":   { dot: "bg-neon-pink",    line: "bg-neon-pink/40",   bg: "bg-neon-pink/10",   text: "text-neon-pink",    border: "border-neon-pink/30",   glow: "shadow-neon-pink/20" },
};

export default function Timeline({ compact = false }: { compact?: boolean }) {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-neon-cyan/30 via-neon-purple/20 to-neon-amber/30" aria-hidden="true" />

      <div className="space-y-0">
        {timelineSteps.map((step, i) => {
          const c = colorVars[step.color] || colorVars["neon-cyan"];
          const isActive = step.status === "active";
          const isExpanded = expandedStep === i;

          return (
            <div key={step.step} className="relative pl-16 sm:pl-20 pb-8 last:pb-0 group">
              {/* Dot on the line */}
              <div className={`absolute left-4 sm:left-6 top-1 flex items-center justify-center`}>
                <div
                  className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? `${c.dot} border-transparent shadow-lg ${c.glow} animate-pulse-glow`
                      : `bg-bg-card border-white/10 group-hover:${c.border} group-hover:shadow-md group-hover:${c.glow}`
                  }`}
                >
                  {isActive && (
                    <div className="w-2 h-2 rounded-full bg-bg-deep" />
                  )}
                </div>
              </div>

              {/* Content card */}
              <button
                onClick={() => setExpandedStep(isExpanded ? null : i)}
                className={`w-full text-left glass-card-hover p-4 sm:p-5 transition-all duration-300 ${
                  isActive ? `border ${c.border} shadow-lg ${c.glow}` : ""
                }`}
                aria-expanded={isExpanded || isActive}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  {/* Icon */}
                  <div className={`shrink-0 w-10 h-10 rounded-xl ${c.bg} ${c.text} flex items-center justify-center`}>
                    {step.icon}
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className={`font-display font-bold text-base sm:text-lg ${isActive ? "text-text-bright" : "text-text-primary"}`}>
                        {step.title}
                      </h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        isActive
                          ? `${c.bg} ${c.text} border ${c.border}`
                          : "bg-white/5 text-text-secondary border border-white/5"
                      }`}>
                        {step.date}
                      </span>
                    </div>

                    {/* Description — always visible if active or compact=false, toggle otherwise */}
                    <div className={`overflow-hidden transition-all duration-300 ${
                      isActive || isExpanded || !compact
                        ? "max-h-40 opacity-100 mt-2"
                        : "max-h-0 opacity-0"
                    }`}>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Expand chevron (compact mode only) */}
                  {compact && !isActive && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`shrink-0 text-text-secondary transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  )}
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
