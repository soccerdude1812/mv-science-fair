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
      className={`group relative block glass-card-hover p-6 transition-all duration-300 ${
        highlighted
          ? "glass-card border-border-hover"
          : ""
      }`}
    >
      {/* Arrow icon top-right */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute top-4 right-4 text-text-muted group-hover:text-accent-indigo transition-colors duration-300"
        aria-hidden="true"
      >
        <line x1="7" y1="17" x2="17" y2="7" />
        <polyline points="7 7 17 7 17 17" />
      </svg>

      <div className="flex items-start gap-4 pr-6">
        {icon && (
          <div
            className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center bg-bg-elevated text-text-secondary"
            aria-hidden="true"
          >
            {icon}
          </div>
        )}
        <div className="min-w-0">
          <h3 className="font-semibold text-lg text-text-primary">
            {title}
            {highlighted && (
              <span className="ml-2 badge badge-accent text-[0.65rem]">
                Current Priority
              </span>
            )}
          </h3>
          <p className="mt-1 text-sm text-text-secondary leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </a>
  );
}
