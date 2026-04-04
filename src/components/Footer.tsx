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
    <footer className="bg-bg-deep border-t border-border-subtle" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="gradient-text font-display font-bold text-lg tracking-[-0.02em]">
                MVWSD
              </span>
              <span className="text-text-muted text-sm font-medium">
                Science Fair
              </span>
            </div>
            <p className="text-text-muted text-sm leading-relaxed max-w-xs">
              Inspiring young scientists across the Mountain View Whisman School
              District. Grades 3-5 elementary school students are eligible to
              participate.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-xs uppercase tracking-[0.08em] text-text-secondary mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5" role="list">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-muted hover:text-text-primary text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-display font-semibold text-xs uppercase tracking-[0.08em] text-text-secondary mb-4">
              Get Involved
            </h3>
            <ul className="space-y-2.5" role="list">
              {communityLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-muted hover:text-text-primary text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-xs uppercase tracking-[0.08em] text-text-secondary mb-4">
              Contact
            </h3>
            <ul className="space-y-2.5" role="list">
              <li>
                <a
                  href="mailto:sciencefair@mvwsd.org"
                  className="text-text-muted hover:text-accent-indigo text-sm transition-colors inline-flex items-center gap-2"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="shrink-0 opacity-60"
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
        <div className="mt-12 pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-sm">
            &copy; {new Date().getFullYear()} MVWSD Science Fair. All rights
            reserved.
          </p>
          <p className="text-text-muted/50 text-xs">
            Mountain View Whisman School District
          </p>
        </div>
      </div>
    </footer>
  );
}
