"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { APPLICATION_URL } from "@/lib/event";

/**
 * One-line light nav (68px). Four student-facing destinations, a Support
 * disclosure for the two "help us run this" pages, and the single Apply CTA.
 * Every other page is reachable from the footer sitemap; the mobile sheet
 * lists everything.
 *
 * Support is a disclosure (button + region), not an ARIA menu. Its contents
 * are plain links, so the native tab order already does the right thing and
 * menu roles would only take keyboard behaviour away from the browser.
 */

const primaryLinks = [
  { href: "/the-process", label: "How it works" },
  { href: "/forms", label: "Forms" },
  { href: "/rules", label: "Rules" },
  { href: "/project-ideas", label: "Project ideas" },
];

const supportLinks = [
  {
    href: "/volunteer",
    label: "Volunteer",
    blurb: "Judge, mentor, or help on fair day",
  },
  {
    href: "/sponsors",
    label: "Sponsors",
    blurb: "Fund supplies, snacks, and awards",
  },
];

const sheetOnlyLinks = [
  { href: "/display-and-safety", label: "Display & Safety" },
  { href: "/judges", label: "Judges" },
  { href: "/students-families", label: "Students & Families" },
];

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-transform duration-200 ${open ? "-rotate-180" : ""}`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const pathname = usePathname();
  const close = () => setOpen(false);

  const supportRef = useRef<HTMLDivElement>(null);
  const supportButtonRef = useRef<HTMLButtonElement>(null);
  const supportActive = supportLinks.some(({ href }) => pathname === href);

  // lock scroll while the sheet is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // a completed navigation means both surfaces have done their job
  useEffect(() => {
    setOpen(false);
    setSupportOpen(false);
  }, [pathname]);

  // pointerdown, not click: a press that starts outside should dismiss even if
  // it ends on something else entirely
  useEffect(() => {
    if (!supportOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!supportRef.current?.contains(e.target as Node)) setSupportOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setSupportOpen(false);
      supportButtonRef.current?.focus();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [supportOpen]);

  const navLinkClass = (active: boolean) =>
    `rounded-full px-2.5 py-2 text-[0.875rem] font-medium transition-colors lg:px-4 lg:text-[0.95rem] ${
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

        {/* Four links, the Support disclosure, and the CTA is a tight fit at the
            md breakpoint, so the chip padding and type step down between 768px
            and 1024px and only open back up on real desktop. Measured: without
            this the logo and the first link touch at exactly 768px. */}
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

          <div
            ref={supportRef}
            className="relative"
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                setSupportOpen(false);
              }
            }}
          >
            <button
              ref={supportButtonRef}
              type="button"
              id="support-menu-button"
              aria-expanded={supportOpen}
              aria-controls="support-menu"
              onClick={() => setSupportOpen((v) => !v)}
              className={`flex items-center gap-1.5 ${navLinkClass(
                supportActive || supportOpen,
              )}`}
            >
              Support
              <Chevron open={supportOpen} />
            </button>

            {supportOpen && (
              <div
                id="support-menu"
                aria-labelledby="support-menu-button"
                className="nav-dropdown-enter absolute right-0 top-full mt-2 w-[17rem] overflow-hidden rounded-2xl border border-line bg-paper p-1.5"
                style={{ boxShadow: "var(--shadow-lg)" }}
              >
                {supportLinks.map(({ href, label, blurb }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`block rounded-xl px-3.5 py-3 transition-colors ${
                      pathname === href ? "bg-paper-warm" : "hover:bg-paper-warm"
                    }`}
                  >
                    <span className="block text-[0.95rem] font-semibold text-ink">
                      {label}
                    </span>
                    <span className="mt-0.5 block text-[0.8rem] leading-snug text-ink-faint">
                      {blurb}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

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

            {/* Same grouping as the desktop disclosure, flattened: on a phone a
                nested toggle is one more tap for no gain. */}
            <p className="data-label px-4 pt-4 pb-1">Support</p>
            {supportLinks.map(({ href, label }) => (
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
