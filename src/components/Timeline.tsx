"use client";

import { useState } from "react";

const timelineSteps = [
  {
    step: 1,
    title: "Interest Form",
    date: "Now Open",
    description:
      "Fill out the interest form to let us know you want to participate.",
    status: "active" as const,
  },
  {
    step: 2,
    title: "Application Opens",
    date: "TBD",
    description:
      "Submit your project application with your topic, hypothesis, and team info.",
    status: "upcoming" as const,
  },
  {
    step: 3,
    title: "Approval & Safety Review",
    date: "TBD",
    description:
      "Committee reviews applications and any required safety/ethics forms. You'll receive a confirmation email.",
    status: "upcoming" as const,
  },
  {
    step: 4,
    title: "Project Work Period",
    date: "TBD",
    description:
      "Conduct your experiments, collect data, and build your project with guidance from mentors.",
    status: "upcoming" as const,
  },
  {
    step: 5,
    title: "Display Board Preparation",
    date: "TBD",
    description:
      "Build your display board with all required sections: abstract, hypothesis, data, conclusion, and more.",
    status: "upcoming" as const,
  },
  {
    step: 6,
    title: "Science Fair Day",
    date: "TBD",
    description:
      "Present your project to judges and visitors. Celebrate your hard work and scientific discovery! The exact date and venue will be announced once we confirm interest.",
    status: "upcoming" as const,
  },
];

export default function Timeline({ compact = false }: { compact?: boolean }) {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  return (
    <div className="relative">
      {/* Vertical glowing gradient center line — desktop: center, mobile: left */}
      <div
        className="timeline-line max-md:left-6"
        aria-hidden="true"
      />

      <div className="space-y-8 md:space-y-12">
        {timelineSteps.map((step, i) => {
          const isActive = step.status === "active";
          const isUpcoming = step.status === "upcoming";
          const isExpanded = expandedStep === i;
          const isOdd = i % 2 === 0; // 0-indexed: even index = odd step = left side
          const showDescription = isActive || isExpanded || !compact;

          return (
            <div
              key={step.step}
              className="relative md:flex md:items-start"
            >
              {/* Desktop: card on left side (odd steps) */}
              <div
                className={`hidden md:block md:w-[calc(50%-2rem)] ${
                  isOdd ? "" : "md:order-3 md:invisible"
                }`}
              >
                {isOdd && (
                  <div className="flex justify-end">
                    <TimelineCard
                      step={step}
                      isActive={isActive}
                      isExpanded={isExpanded}
                      showDescription={showDescription}
                      compact={compact}
                      onToggle={() =>
                        setExpandedStep(isExpanded ? null : i)
                      }
                    />
                  </div>
                )}
              </div>

              {/* Node on the center line — desktop: center, mobile: left */}
              <div className="absolute left-6 md:left-1/2 md:relative md:mx-4 top-2 md:top-0 flex items-center justify-center md:shrink-0 z-10 -translate-x-1/2 md:translate-x-0">
                <div
                  className={`timeline-node ${
                    isActive ? "active" : ""
                  } ${isUpcoming ? "upcoming" : ""}`}
                />
              </div>

              {/* Desktop: card on right side (even steps) */}
              <div
                className={`hidden md:block md:w-[calc(50%-2rem)] ${
                  isOdd ? "md:order-3 md:invisible" : ""
                }`}
              >
                {!isOdd && (
                  <div className="flex justify-start">
                    <TimelineCard
                      step={step}
                      isActive={isActive}
                      isExpanded={isExpanded}
                      showDescription={showDescription}
                      compact={compact}
                      onToggle={() =>
                        setExpandedStep(isExpanded ? null : i)
                      }
                    />
                  </div>
                )}
              </div>

              {/* Mobile: card always on the right of the line */}
              <div className="md:hidden pl-10 sm:pl-12">
                <TimelineCard
                  step={step}
                  isActive={isActive}
                  isExpanded={isExpanded}
                  showDescription={showDescription}
                  compact={compact}
                  onToggle={() =>
                    setExpandedStep(isExpanded ? null : i)
                  }
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TimelineCard({
  step,
  isActive,
  isExpanded,
  showDescription,
  compact,
  onToggle,
}: {
  step: (typeof timelineSteps)[number];
  isActive: boolean;
  isExpanded: boolean;
  showDescription: boolean;
  compact: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className={`w-full max-w-md text-left glass-card-hover p-3 sm:p-5 transition-all duration-300 ${
        isActive
          ? "border-border-accent shadow-[0_0_20px_rgba(129,140,248,0.15)]"
          : ""
      }`}
      aria-expanded={isExpanded || isActive}
    >
      <div className="flex items-start gap-3">
        {/* Step number badge */}
        <span className="badge badge-accent shrink-0 text-xs tabular-nums">
          {step.step}
        </span>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="font-semibold text-text-primary text-base">
              {step.title}
            </h3>
            <span className="text-accent-indigo text-sm font-medium">
              {step.date}
            </span>
          </div>

          {/* Description with expand/collapse */}
          <div
            className={`overflow-hidden transition-all duration-300 ${
              showDescription
                ? "max-h-40 opacity-100 mt-2"
                : "max-h-0 opacity-0"
            }`}
          >
            <p className="text-sm text-text-secondary leading-relaxed">
              {step.description}
            </p>
          </div>
        </div>

        {/* Expand chevron (compact mode, non-active steps only) */}
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
            className={`shrink-0 text-text-muted transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        )}
      </div>
    </button>
  );
}
