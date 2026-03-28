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
      className={`block rounded-xl p-6 card-hover border ${
        highlighted
          ? "border-accent bg-cyan-50 ring-2 ring-accent/20"
          : "border-slate-200 bg-white hover:border-accent/30"
      }`}
    >
      <div className="flex items-start gap-4">
        {icon && (
          <div
            className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
              highlighted ? "bg-accent text-white" : "bg-indigo-50 text-primary"
            }`}
            aria-hidden="true"
          >
            {icon}
          </div>
        )}
        <div className="min-w-0">
          <h3
            className={`font-semibold text-lg ${
              highlighted ? "text-accent" : "text-primary"
            }`}
          >
            {title}
            {highlighted && (
              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-highlight text-primary">
                Current Priority
              </span>
            )}
          </h3>
          <p className="mt-1 text-sm text-muted leading-relaxed">
            {description}
          </p>
          <span
            className={`inline-flex items-center gap-1 mt-3 text-sm font-medium ${
              highlighted ? "text-accent" : "text-primary"
            }`}
          >
            Open Form
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </span>
        </div>
      </div>
    </a>
  );
}
