interface PageHeroProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export default function PageHero({ title, subtitle, children }: PageHeroProps) {
  return (
    <section className="bg-bg-light border-b border-border-default">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-text-heading animate-fade-in-up">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-lg sm:text-xl text-text-body max-w-2xl animate-fade-in-up delay-200">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-6 animate-fade-in-up delay-300">{children}</div>}
      </div>
    </section>
  );
}
