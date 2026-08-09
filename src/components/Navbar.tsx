"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { APPLICATION_URL } from "@/lib/event";

/**
 * One-line light nav (68px). Three destinations + the single Apply CTA;
 * every other page is reachable from the footer sitemap. The mobile
 * sheet lists everything.
 */

const primaryLinks = [
  { href: "/the-process", label: "How it works" },
  { href: "/forms", label: "Forms" },
  { href: "/rules", label: "Rules" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/sponsors", label: "Sponsors" },
];

const sheetOnlyLinks = [
  { href: "/project-ideas", label: "Project ideas" },
  { href: "/display-and-safety", label: "Display & Safety" },
  { href: "/judges", label: "Judges" },
  { href: "/students-families", label: "Students & Families" },
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
            open back up on real desktop. Measured: without this the logo and
            the first link touch at exactly 768px. */}
        <div className="hidden items-center gap-0.5 md:flex lg:gap-1">
          {primaryLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`rounded-full px-2.5 py-2 text-[0.875rem] font-medium transition-colors lg:px-4 lg:text-[0.95rem] ${
                pathname === href
                  ? "bg-paper-warm text-ink"
                  : "text-ink-soft hover:bg-paper-warm hover:text-ink"
              }`}
            >
              {label}
            </Link>
          ))}
          <a
            href={APPLICATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary ml-2 !px-3.5 !py-2.5 text-[0.875rem] lg:ml-3 lg:!px-5 lg:text-[0.95rem]"
          >
            Apply now
          </a>
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
            <a
              href={APPLICATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-3 w-full"
            >
              Apply now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
