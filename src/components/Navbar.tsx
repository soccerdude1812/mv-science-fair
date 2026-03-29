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

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 bg-white ${
        scrolled
          ? "border-b border-border-default shadow-sm"
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
            className="flex items-center gap-2.5 text-text-heading font-bold text-lg shrink-0 group"
            aria-label="MVWSD Science Fair home"
          >
            {/* Simple atom icon */}
            <div className="relative w-8 h-8" aria-hidden="true">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                className="text-accent-primary"
              >
                <circle cx="16" cy="16" r="3" fill="currentColor" />
                <ellipse
                  cx="16"
                  cy="16"
                  rx="12"
                  ry="5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                  opacity="0.5"
                />
                <ellipse
                  cx="16"
                  cy="16"
                  rx="12"
                  ry="5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                  transform="rotate(60 16 16)"
                  opacity="0.5"
                />
                <ellipse
                  cx="16"
                  cy="16"
                  rx="12"
                  ry="5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                  transform="rotate(120 16 16)"
                  opacity="0.5"
                />
              </svg>
            </div>
            <span className="hidden sm:inline font-display group-hover:text-accent-primary transition-colors">
              MVWSD Science Fair
            </span>
            <span className="sm:hidden font-display group-hover:text-accent-primary transition-colors">
              MVWSD
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link-underline px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-accent-primary bg-accent-primary-light"
                    : "text-text-body hover:text-accent-primary hover:bg-bg-light"
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
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-lg text-text-body hover:text-accent-primary hover:bg-bg-light transition-colors"
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {isOpen ? (
              <svg
                width="24"
                height="24"
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
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div
            id="mobile-nav"
            className="lg:hidden fixed inset-0 top-16 z-50 bg-white"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col gap-1 p-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3.5 rounded-xl text-base font-medium transition-colors ${
                    pathname === link.href
                      ? "bg-accent-primary-light text-accent-primary"
                      : "text-text-body hover:text-accent-primary hover:bg-bg-light"
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
