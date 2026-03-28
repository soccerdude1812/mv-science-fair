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
      className={`block rounded-xl p-6 card-hover transition-all ${
        highlighted
          ? "glass-card border-neon-pink/30 ring-1 ring-neon-pink/20 hover:border-neon-pink/50 hover:shadow-neon-pink/10 hover:shadow-lg"
          : "glass-card hover:border-neon-cyan/30 hover:shadow-neon-cyan/10 hover:shadow-lg"
      }`}
    >
      <div className="flex items-start gap-4">
        {icon && (
          <div
            className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
              highlighted
                ? "bg-neon-pink/20 text-neon-pink"
                : "bg-neon-cyan/10 text-neon-cyan"
            }`}
            aria-hidden="true"
          >
            {icon}
          </div>
        )}
        <div className="min-w-0">
          <h3
            className={`font-display font-semibold text-lg ${
              highlighted ? "text-neon-pink" : "text-text-bright"
            }`}
          >
            {title}
            {highlighted && (
              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-neon-pink/20 text-neon-pink border border-neon-pink/30 animate-pulse-glow">
                Current Priority
              </span>
            )}
          </h3>
          <p className="mt-1 text-sm text-text-secondary leading-relaxed">
            {description}
          </p>
          <span
            className={`inline-flex items-center gap-1.5 mt-3 text-sm font-medium transition-all group ${
              highlighted ? "text-neon-pink" : "text-neon-cyan"
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
              className="transition-transform group-hover:translate-x-1"
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
