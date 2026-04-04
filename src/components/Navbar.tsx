"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/the-process", label: "The Process" },
  { href: "/forms", label: "Forms" },
  { href: "/rules", label: "Rules" },
  { href: "/display-and-safety", label: "Display & Safety" },
  { href: "/judges", label: "Judges" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/students-families", label: "Students & Families" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 bg-bg-primary/80 backdrop-blur-xl ${
        scrolled
          ? "border-b border-border-subtle shadow-[0_1px_12px_rgba(0,0,0,0.4)]"
          : "border-b border-transparent"
      }`}
    >
      <nav
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <div className="flex h-16 items-center justify-between">
          {/* Logo / Site Name */}
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0 group"
            aria-label="MVWSD Science Fair home"
          >
            <span className="gradient-text font-display font-bold text-lg tracking-[-0.02em]">
              MVWSD
            </span>
            <span className="hidden sm:inline text-text-muted text-sm font-medium">
              Science Fair
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link px-3 py-2 ${
                  pathname === link.href ? "active" : ""
                }`}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-surface transition-colors"
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {isOpen ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div
            id="mobile-nav"
            className="lg:hidden fixed inset-0 top-16 z-50 bg-bg-primary/95 backdrop-blur-xl"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col gap-1 p-6 border-t border-border-subtle">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-xl text-[0.925rem] font-medium transition-colors ${
                    pathname === link.href
                      ? "text-accent-indigo bg-accent-indigo/10"
                      : "text-text-secondary hover:text-text-primary hover:bg-bg-surface"
                  }`}
                  aria-current={pathname === link.href ? "page" : undefined}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
