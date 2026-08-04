import { EVENT } from "@/lib/event";

/**
 * Compact date / time / venue banner. Used on subpages so families, judges, and
 * volunteers see the logistics without having to go back to the homepage.
 */
export default function EventDetails({
  className = "",
}: {
  className?: string;
}) {
  return (
    <section
      className={`rounded-2xl border border-border-subtle bg-bg-surface p-6 sm:p-8 ${className}`}
      aria-label="Event date, time, and location"
    >
      <div className="mb-5 flex items-center gap-2">
        <span
          className="inline-block h-1.5 w-1.5 rounded-full bg-accent-emerald"
          aria-hidden="true"
        />
        <h2 className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-text-secondary">
          Fair Day
        </h2>
      </div>

      <dl className="grid gap-6 sm:grid-cols-3">
        <div>
          <dt className="mb-1.5 text-xs font-medium uppercase tracking-wider text-text-muted">
            Date
          </dt>
          <dd className="font-display text-lg font-semibold leading-snug text-text-primary">
            {EVENT.dateMedium}
          </dd>
        </div>

        <div>
          <dt className="mb-1.5 text-xs font-medium uppercase tracking-wider text-text-muted">
            Time
          </dt>
          <dd className="font-display text-lg font-semibold leading-snug text-text-primary">
            {EVENT.timeFull}
          </dd>
        </div>

        <div>
          <dt className="mb-1.5 text-xs font-medium uppercase tracking-wider text-text-muted">
            Location
          </dt>
          <dd className="font-display text-lg font-semibold leading-snug text-text-primary">
            <a
              href={EVENT.venueMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-border-hover underline-offset-4 transition-colors hover:decoration-accent-cyan"
            >
              {EVENT.venueName}
            </a>
            <span className="mt-1 block text-sm font-normal text-text-secondary">
              {EVENT.venueRoom}
            </span>
            <span className="block text-sm font-normal text-text-secondary">
              {EVENT.venueAddress}
            </span>
          </dd>
        </div>
      </dl>
    </section>
  );
}
