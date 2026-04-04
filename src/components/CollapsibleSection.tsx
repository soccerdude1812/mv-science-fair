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
  icon?: React.ReactNode;
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
      className="border-b border-border-subtle"
    >
      <CollapsibleTrigger className="w-full flex items-center justify-between gap-3 py-4 px-1 text-left transition-colors cursor-pointer">
        <span className="flex-1 font-medium text-text-primary">{title}</span>
        <ChevronDown
          size={20}
          className={cn(
            "shrink-0 transition-transform duration-300",
            isOpen ? "rotate-180 text-text-primary" : "text-text-muted"
          )}
          aria-hidden="true"
        />
      </CollapsibleTrigger>

      <CollapsibleContent>
        <div className="pt-4 pb-6 px-1 text-text-secondary leading-relaxed">
          {children}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
