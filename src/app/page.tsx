import Link from "next/link";
import QRCodeSection from "@/components/QRCodeSection";

const infoCards = [
  {
    label: "Date",
    value: "TBD",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    label: "Location",
    value: "TBD",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    label: "Eligible Grades",
    value: "3-5 Elementary",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
];

const navCards = [
  {
    href: "/forms",
    title: "Forms",
    desc: "Access all application and approval forms",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    href: "/the-process",
    title: "The Process",
    desc: "Step-by-step guide from idea to presentation",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="8" y1="6" x2="21" y2="6" />
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6" x2="3.01" y2="6" />
        <line x1="3" y1="12" x2="3.01" y2="12" />
        <line x1="3" y1="18" x2="3.01" y2="18" />
      </svg>
    ),
  },
  {
    href: "/rules",
    title: "Rules",
    desc: "Review all science fair rules and guidelines",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
      </svg>
    ),
  },
  {
    href: "/display-and-safety",
    title: "Display & Safety",
    desc: "Board dimensions, safety rules, and display tips",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    href: "/judges",
    title: "Judges",
    desc: "Learn about judging criteria and sign up to judge",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    href: "/volunteer",
    title: "Volunteer",
    desc: "Help make the science fair a success",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
  },
  {
    href: "/students-families",
    title: "Students & Families",
    desc: "Resources and guides for participants",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero-gradient text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            fill="none"
            className="absolute -top-10 -right-10 opacity-10 animate-spin-slow"
          >
            <circle cx="100" cy="100" r="12" fill="white" />
            <ellipse cx="100" cy="100" rx="80" ry="30" stroke="white" strokeWidth="2" fill="none" />
            <ellipse cx="100" cy="100" rx="80" ry="30" stroke="white" strokeWidth="2" fill="none" transform="rotate(60 100 100)" />
            <ellipse cx="100" cy="100" rx="80" ry="30" stroke="white" strokeWidth="2" fill="none" transform="rotate(120 100 100)" />
          </svg>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="white" className="absolute top-20 left-[10%] opacity-20 animate-pulse-glow">
            <path d="M12 2l2.09 6.26L20.18 9.27l-5.09 3.9L17.18 20 12 16.27 6.82 20l2.09-6.83L3.82 9.27l6.09-1.01z" />
          </svg>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white" className="absolute top-32 left-[30%] opacity-15 animate-pulse-glow delay-500">
            <path d="M12 2l2.09 6.26L20.18 9.27l-5.09 3.9L17.18 20 12 16.27 6.82 20l2.09-6.83L3.82 9.27l6.09-1.01z" />
          </svg>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white" className="absolute bottom-20 right-[15%] opacity-15 animate-pulse-glow delay-300">
            <path d="M12 2l2.09 6.26L20.18 9.27l-5.09 3.9L17.18 20 12 16.27 6.82 20l2.09-6.83L3.82 9.27l6.09-1.01z" />
          </svg>
          {/* Beaker */}
          <svg width="80" height="80" viewBox="0 0 60 60" fill="none" className="absolute bottom-10 left-[8%] opacity-10 animate-float">
            <path d="M22 8h16M24 8v18l-10 22h32L36 26V8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {/* DNA helix */}
          <svg width="40" height="120" viewBox="0 0 40 120" fill="none" className="absolute top-0 right-[40%] opacity-[0.07]">
            <path d="M10 0c0 20 20 20 20 40s-20 20-20 40 20 20 20 40" stroke="white" strokeWidth="2" fill="none" />
            <path d="M30 0c0 20-20 20-20 40s20 20 20 40-20 20-20 40" stroke="white" strokeWidth="2" fill="none" />
            <line x1="10" y1="10" x2="30" y2="10" stroke="white" strokeWidth="1" opacity="0.5" />
            <line x1="15" y1="30" x2="25" y2="30" stroke="white" strokeWidth="1" opacity="0.5" />
            <line x1="10" y1="50" x2="30" y2="50" stroke="white" strokeWidth="1" opacity="0.5" />
            <line x1="15" y1="70" x2="25" y2="70" stroke="white" strokeWidth="1" opacity="0.5" />
            <line x1="10" y1="90" x2="30" y2="90" stroke="white" strokeWidth="1" opacity="0.5" />
            <line x1="15" y1="110" x2="25" y2="110" stroke="white" strokeWidth="1" opacity="0.5" />
          </svg>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36 relative">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium text-cyan-200 mb-6 animate-fade-in-up">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="3" />
                <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
              Grades 3-5 Elementary School
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight animate-fade-in-up delay-100">
              MVWSD Science Fair{" "}
              <span className="text-highlight-light">2026</span>
            </h1>
            <p className="mt-6 text-xl sm:text-2xl text-indigo-100 leading-relaxed max-w-2xl animate-fade-in-up delay-200">
              Inspiring Young Scientists in Mountain View
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300">
              <a
                href="#interest"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-highlight text-primary font-bold rounded-xl hover:bg-highlight-light transition-colors shadow-lg"
              >
                Show Your Interest
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
              <Link
                href="/the-process"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-colors border border-white/20"
              >
                Learn How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome */}
      <section className="py-16 sm:py-20 science-pattern">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary">
              Welcome to the 2026 MVWSD Science Fair!
            </h2>
            <p className="mt-6 text-lg text-muted leading-relaxed">
              We&apos;re excited to inspire young scientists across the Mountain
              View Whisman School District. Grades 3-5 are eligible to
              participate. Whether you&apos;re curious about the natural world,
              technology, or anything in between, there&apos;s a place for you
              at the science fair!
            </p>
          </div>

          {/* Info Cards */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {infoCards.map((card) => (
              <div
                key={card.label}
                className="flex flex-col items-center text-center p-6 bg-white rounded-xl border border-slate-200 card-hover"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-accent flex items-center justify-center mb-4">
                  {card.icon}
                </div>
                <span className="text-sm font-medium text-muted uppercase tracking-wider">
                  {card.label}
                </span>
                <span className="mt-1 text-xl font-bold text-primary">
                  {card.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QR Code / Interest Form */}
      <QRCodeSection />

      {/* Quick Navigation */}
      <section className="py-16 sm:py-20 bg-surface-alt">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary">
              Explore the Science Fair
            </h2>
            <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
              Everything you need to know about participating, volunteering, or
              judging at the MVWSD Science Fair.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {navCards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group flex flex-col p-6 bg-white rounded-xl border border-slate-200 card-hover"
              >
                <div className="w-10 h-10 rounded-lg bg-indigo-50 text-accent flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-white transition-colors">
                  {card.icon}
                </div>
                <h3 className="font-semibold text-primary text-lg">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm text-muted leading-relaxed flex-1">
                  {card.desc}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent group-hover:gap-2 transition-all">
                  Learn more
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
