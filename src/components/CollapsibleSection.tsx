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
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white card-hover">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 p-5 text-left hover:bg-slate-50 transition-colors"
        aria-expanded={isOpen}
      >
        {icon && (
          <span className="shrink-0 w-8 h-8 rounded-lg bg-indigo-50 text-primary flex items-center justify-center" aria-hidden="true">
            {icon}
          </span>
        )}
        <span className="flex-1 font-semibold text-primary text-lg">
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
          className={`shrink-0 text-muted transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-5 pb-5 pt-0 border-t border-slate-100">
          <div className="pt-4 text-slate-700 leading-relaxed">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
