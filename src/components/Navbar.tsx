"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * One-line light nav (68px). Five destinations and the single Fair day CTA.
 * Every other page is reachable from the footer sitemap; the mobile sheet
 * lists everything.
 *
 * Rebuilt 2026-09-15, when applications closed:
 * - The CTA is now "Fair day" and points at an internal route, so it is a
 *   Link rather than the external anchor the application form needed.
 * - The Support disclosure is gone. Judges and Volunteer were promoted out of
 *   it into the top line because fair day is eleven days away and sign-ups sat
 *   at 2 and 0; Sponsors dropped to the footer sitemap because cold outreach is
 *   retired. Five short labels plus the pill measure narrower than the four
 *   long ones they replace, so the md-breakpoint squeeze the old layout fought
 *   does not come back.
 * - "How it works" is now "Get ready". Same route, because it is linked from
 *   outside; different promise, because the process is half done.
 */

const primaryLinks = [
  { href: "/the-process", label: "Get ready" },
  { href: "/mentors", label: "Mentors" },
  { href: "/rules", label: "Rules" },
  { href: "/judges", label: "Judges" },
  { href: "/volunteer", label: "Volunteer" },
];

const sheetOnlyLinks = [
  { href: "/display-and-safety", label: "Display & Safety" },
  { href: "/example-boards", label: "Example boards" },
  { href: "/project-ideas", label: "Project ideas" },
  { href: "/forms", label: "Forms" },
  { href: "/students-families", label: "Students & Families" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/team", label: "Our team" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const close = () => setOpen(false);

  // lock scroll while the sheet is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const navLinkClass = (active: boolean) =>
    `rounded-full px-2.5 py-2 text-[0.875rem] font-medium transition-colors lg:px-3.5 lg:text-[0.95rem] ${
      active
        ? "bg-paper-warm text-ink"
        : "text-ink-soft hover:bg-paper-warm hover:text-ink"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-md">
      <nav
        className="mx-auto flex h-[68px] max-w-6xl items-center justify-between px-4 sm:px-6"
        aria-label="Main"
      >
        <Link
          href="/"
          className="font-display text-[1.2rem] font-semibold tracking-tight text-ink lg:text-[1.35rem]"
        >
          MV Science Fair
        </Link>

        {/* Five links plus the CTA is a tight fit at the md breakpoint, so the
            chip padding and type step down between 768px and 1024px and only
            open back up on real desktop. */}
        <div className="hidden items-center gap-0.5 md:flex lg:gap-1">
          {primaryLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={navLinkClass(pathname === href)}
            >
              {label}
            </Link>
          ))}

          <Link
            href="/fair-day"
            className="btn-primary ml-2 !px-3.5 !py-2.5 text-[0.875rem] lg:ml-3 lg:!px-5 lg:text-[0.95rem]"
          >
            Fair day
          </Link>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full text-ink md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          >
            {open ? (
              <>
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </>
            ) : (
              <>
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="mobile-menu-enter border-t border-line bg-paper md:hidden">
          <div className="mx-auto max-w-6xl space-y-1 px-4 py-4">
            {/* The CTA leads the sheet rather than closing it: on a phone the
                most important destination should not be below seven links. */}
            <Link
              href="/fair-day"
              onClick={close}
              className="btn-primary mb-3 w-full"
            >
              Fair day details
            </Link>
            {[...primaryLinks, ...sheetOnlyLinks].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={close}
                className={`block rounded-2xl px-4 py-3 text-[1.05rem] font-medium ${
                  pathname === href
                    ? "bg-paper-warm text-ink"
                    : "text-ink-soft hover:bg-paper-warm"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
