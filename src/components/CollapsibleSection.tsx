"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export default function CollapsibleSection({
  title,
  children,
  defaultOpen = false,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible
      defaultOpen={defaultOpen}
      onOpenChange={setIsOpen}
      className="border-b border-line"
    >
      <CollapsibleTrigger className="w-full flex items-center justify-between gap-3 py-4 px-1 text-left cursor-pointer transition-colors hover:text-ink">
        <span className="flex-1 font-medium text-ink">{title}</span>
        <ChevronDown
          size={20}
          strokeWidth={2}
          className={cn(
            "shrink-0 transition-transform duration-300",
            isOpen ? "rotate-180 text-ink" : "text-ink-faint"
          )}
          aria-hidden="true"
        />
      </CollapsibleTrigger>

      <CollapsibleContent>
        <div className="pt-2 pb-7 px-1 text-ink-soft leading-relaxed">
          {children}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
