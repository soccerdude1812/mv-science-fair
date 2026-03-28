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
        {/* Large orbital atom */}
        <svg
          width="160"
          height="160"
          viewBox="0 0 160 160"
          fill="none"
          className="absolute -top-8 -right-8 opacity-[0.08] animate-spin-slow"
        >
          <circle cx="80" cy="80" r="8" fill="var(--neon-cyan)" />
          <ellipse cx="80" cy="80" rx="65" ry="22" stroke="var(--neon-cyan)" strokeWidth="1" fill="none" />
          <ellipse cx="80" cy="80" rx="65" ry="22" stroke="var(--neon-purple)" strokeWidth="1" fill="none" transform="rotate(60 80 80)" />
          <ellipse cx="80" cy="80" rx="65" ry="22" stroke="var(--neon-cyan)" strokeWidth="1" fill="none" transform="rotate(120 80 80)" />
        </svg>

        {/* Glowing dots */}
        <div className="absolute top-12 left-[15%] w-2 h-2 rounded-full bg-neon-cyan/30 animate-pulse-glow" />
        <div className="absolute top-20 left-[35%] w-1.5 h-1.5 rounded-full bg-neon-purple/40 animate-pulse-glow delay-300" />
        <div className="absolute bottom-16 left-[25%] w-1 h-1 rounded-full bg-neon-green/30 animate-pulse-glow delay-500" />
        <div className="absolute bottom-10 right-[20%] w-2 h-2 rounded-full bg-neon-amber/20 animate-pulse-glow delay-200" />
        <div className="absolute top-8 right-[30%] w-1.5 h-1.5 rounded-full bg-neon-pink/25 animate-pulse-glow delay-700" />

        {/* Floating beaker */}
        <svg
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
          className="absolute bottom-6 right-[18%] opacity-[0.06] animate-float"
        >
          <path d="M22 8h16M24 8v18l-10 22h32L36 26V8" stroke="var(--neon-cyan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        {/* Orbital ring decoration */}
        <svg
          width="80"
          height="40"
          viewBox="0 0 80 40"
          fill="none"
          className="absolute top-1/2 left-[5%] opacity-[0.05] animate-float-reverse"
        >
          <ellipse cx="40" cy="20" rx="38" ry="18" stroke="var(--neon-purple)" strokeWidth="1" fill="none" />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight animate-fade-in-up gradient-text">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-lg sm:text-xl text-text-secondary max-w-2xl animate-fade-in-up delay-200">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-6 animate-fade-in-up delay-300">{children}</div>}
      </div>
    </section>
  );
}
