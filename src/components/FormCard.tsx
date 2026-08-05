import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormCardProps {
  title: string;
  description: string;
  href: string;
  className?: string;
}

/**
 * Link card for an external Google Form. Chalk Lab pattern: white card,
 * hairline border, warm shadow, coral accents on hover.
 */
export default function FormCard({
  title,
  description,
  href,
  className,
}: FormCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "card-soft group relative block p-6 transition-[border-color,box-shadow] duration-200 hover:border-line-strong hover:shadow-[var(--shadow-md)]",
        className,
      )}
    >
      <ArrowUpRight
        size={16}
        strokeWidth={2}
        aria-hidden="true"
        className="absolute right-5 top-5 text-ink-faint transition-colors duration-200 group-hover:text-coral"
      />
      <h3 className="pr-8 text-lg font-semibold transition-colors duration-200 group-hover:text-coral-deep">
        {title}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
        {description}
      </p>
    </a>
  );
}
