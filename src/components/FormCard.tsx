import { ArrowUpRight } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface FormCardProps {
  title: string;
  description: string;
  href: string;
  highlighted?: boolean;
  icon?: React.ReactNode;
}

export default function FormCard({
  title,
  description,
  href,
  highlighted = false,
  icon,
}: FormCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <Card
        className={cn(
          "bg-bg-surface border-border-subtle hover:border-border-hover transition-colors relative",
          highlighted && "border-border-hover"
        )}
      >
        {/* Arrow icon top-right */}
        <ArrowUpRight
          size={16}
          className="absolute top-4 right-4 text-text-muted group-hover:text-accent-indigo transition-colors duration-300"
          aria-hidden="true"
        />

        <CardHeader className="flex-row items-start gap-4 pr-10">
          {icon && (
            <div
              className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center bg-bg-elevated text-text-secondary"
              aria-hidden="true"
            >
              {icon}
            </div>
          )}
          <div className="min-w-0">
            <CardTitle className="font-semibold text-lg text-text-primary">
              {title}
              {highlighted && (
                <Badge
                  variant="secondary"
                  className="ml-2 text-[0.65rem] bg-accent-indigo/10 text-accent-indigo border-accent-indigo/20"
                >
                  Current Priority
                </Badge>
              )}
            </CardTitle>
            <CardDescription className="mt-1 text-sm text-text-secondary leading-relaxed">
              {description}
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    </a>
  );
}
