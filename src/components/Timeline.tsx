"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { EVENT } from "@/lib/event";

/**
 * The five milestones, with where the fair actually is right now.
 *
 * Statuses are hand-set, not computed from the clock: they were moved on
 * 2026-09-15 when applications closed and all 31 approved projects entered the
 * build. If you are reading this after fair day, every step is `done`. A date
 * comparison would be tidier and would also silently mark step 3 finished at
 * midnight on some arbitrary day nobody chose, so this stays a decision rather
 * than an arithmetic.
 */
const timelineSteps = [
  {
    step: 1,
    title: "Apply",
    date: `Closed ${EVENT.applicationDeadlineShort}`,
    description: `Applications closed ${EVENT.applicationDeadlineFull}. Thirty-two projects came in and thirty-one were approved. If you applied and have not had a decision by email, write to us.`,
    status: "done" as const,
  },
  {
    step: 2,
    title: "Approval & Safety Review",
    date: "Done",
    description:
      "We reviewed each application as it arrived and emailed every family the go-ahead, along with notes on the project itself. Projects involving human participants or hazardous materials were sent the extra safety form at that point.",
    status: "done" as const,
  },
  {
    step: 3,
    title: "Project Work Period",
    date: "Now",
    description:
      "Run your experiment, collect your data, and keep your logbook up to date. At least three trials of everything, and write down the runs that go wrong: those are results too. Mentors are available all the way through.",
    status: "active" as const,
  },
  {
    step: 4,
    title: "Display Board & Rehearsal",
    date: "Now to fair day",
    description:
      "Build your display board with all nine required sections: title, abstract, question, hypothesis, materials, procedure, data, conclusion, citations. Then practise presenting out loud, standing up, to a real person.",
    status: "active" as const,
  },
  {
    step: 5,
    title: "Science Fair Day",
    date: `${EVENT.dateShort} · ${EVENT.timeShort}`,
    description: `Arrive between ${EVENT.arrivalWindowFull} to check in and set up your board, so you are ready when doors open at 9:00. Then present your project to judges and visitors at ${EVENT.venueName}, ${EVENT.venueRoom}, ${EVENT.venueAddress}.`,
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
          const isDone = step.status === "done";
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
                    isDone={isDone}
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
                      : isDone
                        ? "border-green bg-green"
                        : "border-line-strong bg-card"
                  }`}
                />
              </div>

              <div className="hidden md:flex md:justify-start">
                {!isOdd && (
                  <TimelineCard
                    step={step}
                    isActive={isActive}
                    isDone={isDone}
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
                  isDone={isDone}
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
  isDone,
  isExpanded,
  showDescription,
  compact,
  onToggle,
}: {
  step: (typeof timelineSteps)[number];
  isActive: boolean;
  isDone: boolean;
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
      /* Report what is actually on screen. `isExpanded || isActive` lied for
         every non-active step in the default (non-compact) mode, where the
         description is always rendered: a screen reader was told "collapsed"
         about text it could already read. Now three steps are `done` or
         `upcoming`, so that was most of the roadmap. */
      aria-expanded={showDescription}
    >
      <div className="flex items-start gap-3">
        {/* Step number badge. Green means this milestone is behind us, which is
            the one piece of state a family scanning the roadmap most wants. */}
        <span
          className={`inline-flex shrink-0 items-center rounded-full px-[0.85rem] py-[0.3rem] text-[0.8125rem] font-semibold tabular-nums ${
            isDone
              ? "bg-green-soft text-green"
              : "bg-coral-soft text-coral-deep"
          }`}
        >
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

          {/* Description with expand/collapse.
              Rows of 1fr/0fr animate to the text's natural height, so a longer
              step cannot be clipped. The fixed max-h-40 this replaces was
              silently cutting the tail off step 5 on narrow screens. */}
          <div
            className={`grid overflow-hidden transition-all duration-300 ${
              showDescription
                ? "grid-rows-[1fr] opacity-100 mt-2"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <p className="min-h-0 overflow-hidden text-sm text-ink-soft leading-relaxed">
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
