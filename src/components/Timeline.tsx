"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { EVENT } from "@/lib/event";

const timelineSteps = [
  {
    step: 1,
    title: "Apply",
    date: `Now to ${EVENT.applicationDeadlineShort}`,
    description:
      `One form covers registration, consent, and your project: what it is and how you plan to do it, 100 to 200 words each. Applications close ${EVENT.applicationDeadlineFull}. Apply early, since you can start building as soon as you're approved.`,
    status: "active" as const,
  },
  {
    step: 2,
    title: "Approval & Safety Review",
    date: "Rolling review",
    description:
      "We review each application as it arrives. If changes are needed we email you, and you resubmit for a quick second look. If your project involves human participants or hazardous materials, this is when we send the extra safety form.",
    status: "upcoming" as const,
  },
  {
    step: 3,
    title: "Project Work Period",
    date: "After approval",
    description:
      "Conduct your experiments, collect data, and build your project with guidance from mentors. You start as soon as you're approved, so earlier applications get more build time.",
    status: "upcoming" as const,
  },
  {
    step: 4,
    title: "Display Board & Rehearsal",
    date: "Before fair day",
    description:
      "Build your display board with all required sections: abstract, hypothesis, data, conclusion, and more. Practice presenting out loud before fair day.",
    status: "upcoming" as const,
  },
  {
    step: 5,
    title: "Science Fair Day",
    date: `${EVENT.dateShort} · 9 AM to 12 PM`,
    description: `Present your project to judges and visitors at ${EVENT.venueName}, ${EVENT.venueRoom}, ${EVENT.venueAddress}. Celebrate your hard work and scientific discovery!`,
    status: "upcoming" as const,
  },
];

export default function Timeline({ compact = false }: { compact?: boolean }) {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  return (
    <div className="relative">
      {/* Vertical hairline. Desktop: center; mobile: left rail. */}
      <div
        className="timeline-line absolute inset-y-0 left-6 w-px -translate-x-1/2 md:left-1/2"
        aria-hidden="true"
      />

      <div className="space-y-8 md:space-y-12">
        {timelineSteps.map((step, i) => {
          const isActive = step.status === "active";
          const isExpanded = expandedStep === i;
          const isOdd = i % 2 === 0; // 0-indexed: even index = odd step = left side
          const showDescription = isActive || isExpanded || !compact;

          return (
            <div
              key={step.step}
              className="relative md:grid md:grid-cols-[1fr_auto_1fr] md:items-start md:gap-6"
            >
              {/* Desktop: odd steps left of the line, even steps right */}
              <div className="hidden md:flex md:justify-end">
                {isOdd && (
                  <TimelineCard
                    step={step}
                    isActive={isActive}
                    isExpanded={isExpanded}
                    showDescription={showDescription}
                    compact={compact}
                    onToggle={() => setExpandedStep(isExpanded ? null : i)}
                  />
                )}
              </div>

              {/* Node, sitting exactly on the hairline */}
              <div className="absolute left-6 top-2 z-10 -translate-x-1/2 md:static md:translate-x-0 md:pt-2">
                <div
                  className={`h-3.5 w-3.5 rounded-full border ${
                    isActive
                      ? "border-coral bg-coral"
                      : "border-line-strong bg-card"
                  }`}
                />
              </div>

              <div className="hidden md:flex md:justify-start">
                {!isOdd && (
                  <TimelineCard
                    step={step}
                    isActive={isActive}
                    isExpanded={isExpanded}
                    showDescription={showDescription}
                    compact={compact}
                    onToggle={() => setExpandedStep(isExpanded ? null : i)}
                  />
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
      className={`w-full max-w-md rounded-lg border bg-card p-4 sm:p-5 text-left transition-colors duration-300 ${
        isActive
          ? "border-coral"
          : "border-line hover:border-line-strong"
      }`}
      aria-expanded={isExpanded || isActive}
    >
      <div className="flex items-start gap-3">
        {/* Step number badge */}
        <span className="badge-accent shrink-0 tabular-nums">
          {step.step}
        </span>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="font-semibold text-ink text-base">
              {step.title}
            </h3>
            <span className="font-mono text-xs font-medium text-ink-faint">
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
            <p className="text-sm text-ink-soft leading-relaxed">
              {step.description}
            </p>
          </div>
        </div>

        {/* Expand chevron (compact mode, non-active steps only) */}
        {compact && !isActive && (
          <ChevronDown
            size={16}
            strokeWidth={2}
            className={`shrink-0 text-ink-faint transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          />
        )}
      </div>
    </button>
  );
}
