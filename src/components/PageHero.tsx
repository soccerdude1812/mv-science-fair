interface PageHeroProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export default function PageHero({ title, subtitle, children }: PageHeroProps) {
  return (
    <section className="hero-gradient text-white relative overflow-hidden">
      {/* Decorative science elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Atom */}
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          className="absolute -top-4 -right-4 opacity-10 animate-spin-slow"
        >
          <circle cx="60" cy="60" r="8" fill="white" />
          <ellipse cx="60" cy="60" rx="50" ry="18" stroke="white" strokeWidth="1.5" fill="none" />
          <ellipse cx="60" cy="60" rx="50" ry="18" stroke="white" strokeWidth="1.5" fill="none" transform="rotate(60 60 60)" />
          <ellipse cx="60" cy="60" rx="50" ry="18" stroke="white" strokeWidth="1.5" fill="none" transform="rotate(120 60 60)" />
        </svg>
        {/* Stars */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="white"
          className="absolute top-12 left-[15%] opacity-20 animate-pulse-glow"
        >
          <path d="M12 2l2.09 6.26L20.18 9.27l-5.09 3.9L17.18 20 12 16.27 6.82 20l2.09-6.83L3.82 9.27l6.09-1.01z" />
        </svg>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="white"
          className="absolute bottom-8 left-[25%] opacity-15 animate-pulse-glow delay-300"
        >
          <path d="M12 2l2.09 6.26L20.18 9.27l-5.09 3.9L17.18 20 12 16.27 6.82 20l2.09-6.83L3.82 9.27l6.09-1.01z" />
        </svg>
        {/* Beaker */}
        <svg
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
          className="absolute bottom-4 right-[20%] opacity-10 animate-float"
        >
          <path d="M22 8h16M24 8v18l-10 22h32L36 26V8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M18 42c0 0 6-4 12-4s12 4 12 4" stroke="white" strokeWidth="1.5" fill="none" />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight animate-fade-in-up">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-lg sm:text-xl text-indigo-100 max-w-2xl animate-fade-in-up delay-200">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-6 animate-fade-in-up delay-300">{children}</div>}
      </div>
    </section>
  );
}
