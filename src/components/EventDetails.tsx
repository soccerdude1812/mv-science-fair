import { EVENT } from "@/lib/event";

/**
 * Compact date / time / venue banner. Used on subpages so families,
 * judges, and volunteers see the logistics without going back home.
 *
 * `arrival` adds the participant arrival window under the time. It is opt-in
 * rather than always-on because judges and volunteers keep their own schedules,
 * and telling them to turn up at 8:00 would simply be wrong.
 */
export default function EventDetails({
  className = "",
  arrival = false,
}: {
  className?: string;
  arrival?: boolean;
}) {
  return (
    <section
      className={`card-soft p-6 sm:p-8 ${className}`}
      aria-label="Event date, time, and location"
    >
      <dl className="grid gap-6 sm:grid-cols-3">
        <div>
          <dt className="data-label mb-1.5">Date</dt>
          <dd className="font-semibold leading-snug text-ink">
            {EVENT.dateFull}
          </dd>
        </div>

        <div>
          <dt className="data-label mb-1.5">Time</dt>
          <dd className="font-semibold leading-snug text-ink">
            {EVENT.timeFull}
            {arrival && (
              <span className="mt-1 block text-sm font-normal text-ink-soft">
                Arrival and setup {EVENT.arrivalWindowFull}
              </span>
            )}
          </dd>
        </div>

        <div>
          <dt className="data-label mb-1.5">Location</dt>
          <dd className="leading-snug">
            <a
              href={EVENT.venueMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-ink underline decoration-line underline-offset-4 hover:decoration-coral"
            >
              {EVENT.venueName}
            </a>
            <span className="mt-1 block text-sm text-ink-soft">
              {EVENT.venueRoom}, {EVENT.venueAddress}
            </span>
          </dd>
        </div>
      </dl>
    </section>
  );
}
