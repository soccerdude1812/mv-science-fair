import Link from "next/link";

const quickLinks = [
  { href: "/the-process", label: "The Process" },
  { href: "/forms", label: "Forms" },
  { href: "/rules", label: "Rules" },
  { href: "/display-and-safety", label: "Display & Safety" },
];

const communityLinks = [
  { href: "/judges", label: "Become a Judge" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/students-families", label: "Students & Families" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border-default" role="contentinfo">
      <div className="bg-bg-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 32 32"
                  fill="none"
                  className="text-accent-primary"
                  aria-hidden="true"
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
                <span className="font-display font-bold text-lg text-text-heading">
                  MVWSD Science Fair
                </span>
              </div>
              <p className="text-text-muted text-sm leading-relaxed">
                Inspiring young scientists across the Mountain View Whisman School
                District. Grades 3-5 elementary school students are eligible to
                participate.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-text-heading mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2.5" role="list">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-text-muted hover:text-accent-primary text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Community */}
            <div>
              <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-text-heading mb-4">
                Get Involved
              </h3>
              <ul className="space-y-2.5" role="list">
                {communityLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-text-muted hover:text-accent-primary text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-text-heading mb-4">
                Contact
              </h3>
              <ul className="space-y-2.5" role="list">
                <li>
                  <a
                    href="mailto:sciencefair@mvwsd.org"
                    className="text-text-muted hover:text-accent-primary text-sm transition-colors flex items-center gap-2"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M22 4L12 13L2 4" />
                    </svg>
                    sciencefair@mvwsd.org
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-10 pt-6 border-t border-border-default flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-text-muted text-sm">
              &copy; {new Date().getFullYear()} MVWSD Science Fair. All rights
              reserved.
            </p>
            <p className="text-text-muted/60 text-xs">
              Mountain View Whisman School District
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
