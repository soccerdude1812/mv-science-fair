interface PageHeroProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

/**
 * Subpage header, Chalk Lab system: serif display on paper, a short coral
 * rule as the only ornament. No glows, no gradients.
 */
export default function PageHero({ title, subtitle, children }: PageHeroProps) {
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="mb-7 h-1 w-12 rounded-full bg-coral" aria-hidden="true" />
        <h1 className="display-hero !text-[clamp(2.2rem,4.5vw,3.4rem)]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-lg text-ink-soft">{subtitle}</p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
