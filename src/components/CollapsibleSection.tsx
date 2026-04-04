"use client";

import { useState } from "react";

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  icon?: React.ReactNode;
}

export default function CollapsibleSection({
  title,
  children,
  defaultOpen = false,
}: CollapsibleSectionProps) {
  // icon prop accepted for API compatibility but not rendered in dark minimal theme
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-border-subtle">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-3 py-4 px-1 text-left transition-colors"
        aria-expanded={isOpen}
      >
        <span className="flex-1 font-medium text-text-primary">
          {title}
        </span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`shrink-0 transition-all duration-300 ${
            isOpen ? "rotate-180 text-accent-indigo" : "text-text-muted"
          }`}
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Smooth expand/collapse via CSS grid rows */}
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.52,0.01,0,1)] ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pb-4 px-1 text-text-secondary leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
