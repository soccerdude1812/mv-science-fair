import Link from "next/link";
import { EVENT, APPLICATION_URL } from "@/lib/event";

const sitemap = [
  { href: "/", label: "Home" },
  { href: "/the-process", label: "How it works" },
  { href: "/rules", label: "Rules" },
  { href: "/forms", label: "Forms" },
  { href: "/display-and-safety", label: "Display & Safety" },
  { href: "/judges", label: "Judges" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/students-families", label: "Students & Families" },
  { href: "/sponsors", label: "Sponsors" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper-warm">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-display text-xl font-semibold text-ink">
              MV Science Fair
            </p>
            <p className="mt-3 max-w-[36ch] text-[0.95rem] text-ink-soft">
              A free science fair for Mountain View kids in grades 3 to 5,
              run by high school student volunteers.
            </p>
            <a
              href={`mailto:${EVENT.contactEmail}`}
              className="mt-4 inline-block text-[0.95rem] font-medium text-coral-deep hover:underline"
            >
              {EVENT.contactEmail}
            </a>
          </div>

          <nav aria-label="Site pages">
            <p className="data-label mb-4">Pages</p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {sitemap.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[0.95rem] text-ink-soft hover:text-ink hover:underline"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="data-label mb-4">The event</p>
            <ul className="space-y-2.5 text-[0.95rem] text-ink-soft">
              <li>
                {EVENT.dateFull}
                <br />
                {EVENT.timeFull}
              </li>
              <li>
                <a
                  href={EVENT.venueMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ink hover:underline"
                >
                  {EVENT.venueName}, {EVENT.venueRoom}
                  <br />
                  {EVENT.venueAddress}
                </a>
              </li>
              <li>
                Applications close{" "}
                <span className="font-semibold text-coral-deep">
                  {EVENT.applicationDeadline}
                </span>
              </li>
              <li>
                <a
                  href={APPLICATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-coral-deep hover:underline"
                >
                  Apply now
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-line pt-6">
          <p className="text-[0.85rem] text-ink-faint">
            A student-led event organized by the STEM & Research Club at
            Mountain View High School. Not affiliated with or endorsed by the
            Mountain View Whisman School District. Amy Imai Elementary School
            is the venue only.
          </p>
        </div>
      </div>
    </footer>
  );
}
