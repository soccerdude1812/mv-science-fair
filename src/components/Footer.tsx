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
    <footer className="bg-primary text-white" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <svg
                width="28"
                height="28"
                viewBox="0 0 32 32"
                fill="none"
                className="text-accent-light"
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
                />
              </svg>
              <span className="font-bold text-lg">MVWSD Science Fair</span>
            </div>
            <p className="text-indigo-200 text-sm leading-relaxed">
              Inspiring young scientists across the Mountain View Whisman School
              District. Grades 3-5 elementary school students are eligible to
              participate.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-accent-light mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2" role="list">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-indigo-200 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-accent-light mb-4">
              Get Involved
            </h3>
            <ul className="space-y-2" role="list">
              {communityLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-indigo-200 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-accent-light mb-4">
              Contact
            </h3>
            <ul className="space-y-2" role="list">
              <li>
                <a
                  href="mailto:sciencefair@mvwsd.org"
                  className="text-indigo-200 hover:text-white text-sm transition-colors flex items-center gap-2"
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
            {/* Social placeholders */}
            <div className="flex gap-3 mt-4">
              <a
                href="#"
                className="text-indigo-300 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-indigo-300 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-indigo-300 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-indigo-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-indigo-300 text-sm">
            &copy; {new Date().getFullYear()} MVWSD Science Fair. All rights
            reserved.
          </p>
          <p className="text-indigo-400 text-xs">
            Mountain View Whisman School District
          </p>
        </div>
      </div>
    </footer>
  );
}
