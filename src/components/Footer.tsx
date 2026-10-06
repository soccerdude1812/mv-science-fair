import Link from "next/link";
import { EVENT } from "@/lib/event";

const sitemap = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/gallery", label: "Photo gallery" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/archive", label: "2026 archive" },
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
              A student-led science fair for Mountain View families. We’re
              planning the next fair for spring.
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
            <p className="data-label mb-4">Get in touch</p>
            <ul className="space-y-2.5 text-[0.95rem] text-ink-soft">
              <li>
                Questions about the next fair?
              </li>
              <li>
                <a href={`mailto:${EVENT.contactEmail}`} className="font-semibold text-coral-deep hover:underline">
                  Email the organizers
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-line pt-6">
          <p className="text-[0.85rem] text-ink-faint">
            A student-led event organized by the {EVENT.organizer}. Not
            affiliated with or endorsed by the Mountain View Whisman School
            District. Amy Imai Elementary School is the venue only.
          </p>
        </div>
      </div>
    </footer>
  );
}
