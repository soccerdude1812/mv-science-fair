import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export default function PageHero({ title, subtitle, children }: PageHeroProps) {
  return (
    <section className="relative bg-bg-primary border-b border-border-subtle overflow-hidden">
      {/* Subtle ambient glow */}
      <div
        className="absolute top-0 left-1/4 w-96 h-64 rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(129,140,248,0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-24 md:py-32">
        {/* Accent line */}
        <Separator className="w-12 h-1 bg-accent-indigo mb-8" />

        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-semibold tracking-[-0.03em] text-text-primary animate-fade-in-up">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-5 text-lg text-text-secondary max-w-2xl leading-relaxed animate-fade-in-up [animation-delay:150ms]">
            {subtitle}
          </p>
        )}

        {children && (
          <div className="mt-8 animate-fade-in-up [animation-delay:300ms]">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
