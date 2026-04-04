import Link from "next/link";
import QRCodeSection from "@/components/QRCodeSection";
import Timeline from "@/components/Timeline";

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

const categoryCards = [
  {
    title: "Life & Health Sciences",
    desc: "Projects related to people, plants, psychology, or the environment.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        <path d="M17 8a2 2 0 00-2 2" />
      </svg>
    ),
  },
  {
    title: "Physical Science & Engineering",
    desc: "Projects involving forces, motion, energy, machines, astronomy, or inventions.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" />
        <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    ),
  },
  {
    title: "Chemistry & Materials",
    desc: "Projects about reactions, mixtures, states of matter, or testing different materials.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 3h6v7l4 8H5l4-8V3z" />
        <line x1="9" y1="3" x2="15" y2="3" />
        <path d="M7 18c0 0 2 3 5 3s5-3 5-3" />
      </svg>
    ),
  },
  {
    title: "Technology & Innovation",
    desc: "Projects involving computers, coding, robotics, apps, or problem-solving inventions. These projects must demonstrate a STEM method such as the engineering design process.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="9" y1="18" x2="15" y2="18" />
        <line x1="10" y1="22" x2="14" y2="22" />
        <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 018.91 14" />
        <circle cx="12" cy="5" r="1" fill="currentColor" stroke="none" />
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
      <section className="bg-bg-light border-b border-border-default">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 lg:gap-16">
            {/* Left: text content */}
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-primary-light text-sm font-medium text-accent-primary mb-6 animate-fade-in-up">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="3" />
                  <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
                Grades 3-5 Elementary School
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight leading-tight text-text-heading animate-fade-in-up delay-100">
                MVWSD Science Fair{" "}
                <span className="text-accent-primary">2026</span>
              </h1>
              <p className="mt-6 text-xl sm:text-2xl text-text-body leading-relaxed max-w-2xl animate-fade-in-up delay-200">
                Inspiring Young Scientists in Mountain View
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300">
                <a
                  href="https://docs.google.com/forms/d/1O1DXH_eq0GQIcTJcLQlrcusY5I7xKejzBw_p3WHIVao/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-accent-primary text-white font-bold rounded-xl shadow-sm hover:bg-accent-primary-hover transition-colors"
                >
                  Show Your Interest
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
                <Link
                  href="/the-process"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-text-heading font-semibold rounded-xl hover:bg-bg-muted transition-colors border border-border-default"
                >
                  Learn How It Works
                </Link>
              </div>
            </div>

            {/* Right: QR code */}
            <div className="shrink-0 animate-fade-in-up delay-200">
              <QRCodeSection />
            </div>
          </div>
        </div>
      </section>

      {/* Welcome */}
      <section className="py-16 sm:py-20 section-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-heading">
              Welcome to the 2026 MVWSD Science Fair!
            </h2>
            <p className="mt-6 text-lg text-text-body leading-relaxed">
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
                className="flex flex-col items-center text-center p-6 clean-card-hover"
              >
                <div className="w-12 h-12 rounded-xl bg-accent-primary-light text-accent-primary flex items-center justify-center mb-4">
                  {card.icon}
                </div>
                <span className="text-sm font-medium text-text-muted uppercase tracking-wider">
                  {card.label}
                </span>
                <span className="mt-1 text-xl font-display font-bold text-text-heading">
                  {card.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Categories */}
      <section className="py-16 sm:py-20 section-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-heading">
              Project Categories
            </h2>
            <p className="mt-4 text-lg text-text-body max-w-2xl mx-auto">
              Choose a category that matches your interests and curiosity.
              Every great experiment starts with a question you care about!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {categoryCards.map((card) => (
              <div
                key={card.title}
                className="flex flex-col p-6 clean-card-hover border-l-4 border-l-accent-primary"
              >
                <div className="w-12 h-12 rounded-xl bg-accent-primary-light text-accent-primary flex items-center justify-center mb-4">
                  {card.icon}
                </div>
                <h3 className="font-display font-bold text-text-heading text-lg">{card.title}</h3>
                <p className="mt-2 text-sm text-text-body leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 sm:py-20 section-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-heading">
              Your Journey
            </h2>
            <p className="mt-4 text-lg text-text-body max-w-2xl mx-auto">
              From first spark of curiosity to presenting at the fair — here&apos;s
              every step along the way.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Timeline compact />
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-16 sm:py-20 section-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-heading">
              Explore the Science Fair
            </h2>
            <p className="mt-4 text-lg text-text-body max-w-2xl mx-auto">
              Everything you need to know about participating, volunteering, or
              judging at the MVWSD Science Fair.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {navCards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group flex flex-col p-6 clean-card-hover"
              >
                <div className="w-10 h-10 rounded-lg bg-accent-primary-light text-accent-primary flex items-center justify-center mb-4 transition-all">
                  {card.icon}
                </div>
                <h3 className="font-display font-semibold text-text-heading text-lg">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm text-text-body leading-relaxed flex-1">
                  {card.desc}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-primary group-hover:gap-2.5 transition-all">
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
