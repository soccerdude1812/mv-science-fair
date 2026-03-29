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
  icon,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="clean-card overflow-hidden card-hover">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 p-5 text-left hover:bg-bg-light transition-colors"
        aria-expanded={isOpen}
      >
        {icon && (
          <span
            className="shrink-0 w-8 h-8 rounded-lg bg-accent-primary-light text-accent-primary flex items-center justify-center"
            aria-hidden="true"
          >
            {icon}
          </span>
        )}
        <span className="flex-1 font-display font-semibold text-text-heading text-lg">
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
          className={`shrink-0 text-text-muted transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-5 pb-5 pt-0 border-t border-border-default">
          <div className="pt-4 text-text-body leading-relaxed">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
