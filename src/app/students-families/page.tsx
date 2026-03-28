import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Students & Families",
  description:
    "Resources and guides for MVWSD Science Fair participants and their families.",
};

export default function StudentsFamiliesPage() {
  return (
    <>
      <PageHero
        title="Students & Families"
        subtitle="Everything you need to help your young scientist succeed at the MVWSD Science Fair."
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10 relative z-10">
        {/* Getting Started */}
        <div className="glass-card p-8 sm:p-10 border-t-2 border-t-neon-cyan">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="shrink-0 w-16 h-16 rounded-2xl bg-neon-cyan/10 text-neon-cyan flex items-center justify-center" aria-hidden="true">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-display font-bold text-text-bright mb-3">
                Getting Started
              </h2>
              <p className="text-lg text-text-primary leading-relaxed mb-4">
                Ready to begin your science fair journey? Our step-by-step guide
                walks you through everything from choosing a topic to presenting
                your final project.
              </p>
              <Link
                href="/the-process"
                className="btn-glow inline-flex items-center gap-2 px-6 py-3 bg-neon-cyan text-bg-deep font-semibold rounded-xl shadow-lg shadow-neon-cyan/20"
              >
                View The Process Guide
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* After Registration */}
        <div className="glass-card p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-10 h-10 rounded-lg bg-neon-amber/10 text-neon-amber flex items-center justify-center" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 4L12 13L2 4" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-display font-bold text-text-bright mb-2">
                After Registration
              </h2>
              <p className="text-text-secondary leading-relaxed">
                Once you&apos;ve registered, check your email for setup details
                and important information about next steps. The Science Fair
                Committee will send you confirmation and any additional
                instructions you need to get started on your project.
              </p>
            </div>
          </div>
        </div>

        {/* Resources */}
        <div>
          <h2 className="text-2xl font-display font-bold text-text-bright mb-6">Resources</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="p-6 glass-card-hover">
              <div className="w-10 h-10 rounded-lg bg-neon-cyan/10 text-neon-cyan flex items-center justify-center mb-4" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </div>
              <h3 className="font-display font-semibold text-text-bright mb-2">
                Planning Your Presentation
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Tips on creating an effective display board and preparing for
                your presentation to judges.
              </p>
              <p className="mt-3 text-xs text-neon-cyan font-medium">
                Available closer to the fair date
              </p>
            </div>

            <div className="p-6 glass-card-hover">
              <div className="w-10 h-10 rounded-lg bg-neon-purple/10 text-neon-purple flex items-center justify-center mb-4" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </svg>
              </div>
              <h3 className="font-display font-semibold text-text-bright mb-2">
                Judging Interview Questions
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Practice questions that judges commonly ask so you can prepare
                confident, thoughtful answers.
              </p>
              <p className="mt-3 text-xs text-neon-purple font-medium">
                Available closer to the fair date
              </p>
            </div>

            <div className="p-6 glass-card-hover">
              <div className="w-10 h-10 rounded-lg bg-neon-amber/10 text-neon-amber flex items-center justify-center mb-4" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="3" y1="15" x2="21" y2="15" />
                  <line x1="9" y1="3" x2="9" y2="21" />
                </svg>
              </div>
              <h3 className="font-display font-semibold text-text-bright mb-2">
                Judging Rubric
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                See exactly how judges will evaluate your project so you know
                what to focus on.
              </p>
              <p className="mt-3 text-xs text-neon-amber font-medium">
                Available closer to the fair date
              </p>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="glass-card p-6 sm:p-8">
          <h2 className="text-xl font-display font-bold text-text-bright mb-4">Quick Links</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              href="/display-and-safety"
              className="flex items-center gap-3 p-4 rounded-lg bg-white/[0.03] border border-white/5 hover:bg-neon-cyan/5 hover:border-neon-cyan/15 transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-neon-cyan/10 text-neon-cyan flex items-center justify-center shrink-0 group-hover:bg-neon-cyan/20 transition-colors" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </div>
              <div>
                <span className="font-medium text-text-bright text-sm">
                  Display & Safety Guidelines
                </span>
                <p className="text-xs text-text-secondary">
                  Board dimensions and safety rules
                </p>
              </div>
            </Link>

            <Link
              href="/forms"
              className="flex items-center gap-3 p-4 rounded-lg bg-white/[0.03] border border-white/5 hover:bg-neon-purple/5 hover:border-neon-purple/15 transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-neon-purple/10 text-neon-purple flex items-center justify-center shrink-0 group-hover:bg-neon-purple/20 transition-colors" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <div>
                <span className="font-medium text-text-bright text-sm">
                  All Forms
                </span>
                <p className="text-xs text-text-secondary">
                  Application, approval, and volunteer forms
                </p>
              </div>
            </Link>

            <Link
              href="/rules"
              className="flex items-center gap-3 p-4 rounded-lg bg-white/[0.03] border border-white/5 hover:bg-neon-amber/5 hover:border-neon-amber/15 transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-neon-amber/10 text-neon-amber flex items-center justify-center shrink-0 group-hover:bg-neon-amber/20 transition-colors" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                </svg>
              </div>
              <div>
                <span className="font-medium text-text-bright text-sm">
                  Rules & Guidelines
                </span>
                <p className="text-xs text-text-secondary">
                  All rulebooks and guidelines
                </p>
              </div>
            </Link>

            <Link
              href="/the-process"
              className="flex items-center gap-3 p-4 rounded-lg bg-white/[0.03] border border-white/5 hover:bg-neon-green/5 hover:border-neon-green/15 transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-neon-green/10 text-neon-green flex items-center justify-center shrink-0 group-hover:bg-neon-green/20 transition-colors" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="8" y1="6" x2="21" y2="6" />
                  <line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" />
                  <line x1="3" y1="12" x2="3.01" y2="12" />
                  <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
              </div>
              <div>
                <span className="font-medium text-text-bright text-sm">
                  The Full Process
                </span>
                <p className="text-xs text-text-secondary">
                  Step-by-step project guide
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Contact */}
        <div className="glass-card p-8 text-center border-t-2 border-t-neon-pink">
          <h2 className="text-2xl font-display font-bold text-text-bright mb-3">Questions?</h2>
          <p className="text-text-secondary mb-6 max-w-lg mx-auto">
            If you have any questions about the science fair, registration, or
            your project, don&apos;t hesitate to reach out.
          </p>
          <a
            href="mailto:sciencefair@mvwsd.org"
            className="btn-glow inline-flex items-center gap-2 px-6 py-3 bg-neon-cyan text-bg-deep font-semibold rounded-xl"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 4L12 13L2 4" />
            </svg>
            sciencefair@mvwsd.org
          </a>
        </div>
      </div>
    </>
  );
}
