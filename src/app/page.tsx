"use client";

import { useEffect, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

const FORM_URL =
  "https://docs.google.com/forms/d/1O1DXH_eq0GQIcTJcLQlrcusY5I7xKejzBw_p3WHIVao/viewform";
const APPLICATION_URL =
  "https://docs.google.com/forms/d/1Uys9ePwF965Nn722dpa3eSypNVK9tLp-J4PnvOGN4xg/viewform";

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

// Icons (inline SVG, mirroring prototype)
const I = {
  arrow: (p: React.SVGProps<SVGSVGElement>) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  ),
  arrowRight: (p: React.SVGProps<SVGSVGElement>) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  ext: (p: React.SVGProps<SVGSVGElement>) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  ),
  check: (p: React.SVGProps<SVGSVGElement>) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  chevron: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  doc: (p: React.SVGProps<SVGSVGElement>) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  ),
  shield: (p: React.SVGProps<SVGSVGElement>) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  warn: (p: React.SVGProps<SVGSVGElement>) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  users: (p: React.SVGProps<SVGSVGElement>) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  star: (p: React.SVGProps<SVGSVGElement>) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  heart: (p: React.SVGProps<SVGSVGElement>) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  ),
  monitor: (p: React.SVGProps<SVGSVGElement>) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  book: (p: React.SVGProps<SVGSVGElement>) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
    </svg>
  ),
  bolt: (p: React.SVGProps<SVGSVGElement>) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
};

// Deterministic pseudo-random so SSR and client agree.
const frac = (n: number) => {
  const v = Math.sin(n) * 43758.5453;
  return v - Math.floor(v);
};

const r3 = (n: number) => Number(n.toFixed(3));

function Particles({ count = 22 }: { count?: number }) {
  const seeds = Array.from({ length: count }).map((_, i) => ({
    left: r3(frac(i * 12.9898) * 100),
    delay: r3(frac(i * 78.233) * 22),
    duration: r3(18 + frac(i * 39.346) * 14),
    size: r3(2 + frac(i * 93.989) * 3),
    hue: ["", "orange", "violet", "emerald"][i % 4],
  }));
  return (
    <div className="ambient-particles" aria-hidden="true">
      {seeds.map((s, i) => (
        <span
          key={i}
          className={`particle ${s.hue}`}
          style={{
            left: `${s.left}%`,
            bottom: `-10px`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setShown(true), delay);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [delay]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Comp: any = Tag;
  return (
    <Comp ref={ref} className={`reveal ${shown ? "in" : ""} ${className}`}>
      {children}
    </Comp>
  );
}

function Nav() {
  const items: [string, string][] = [
    ["Welcome", "welcome"],
    ["Categories", "categories"],
    ["Process", "process"],
    ["Forms", "forms"],
    ["Rules", "rules"],
    ["Display", "display"],
    ["Volunteer", "volunteer"],
  ];
  return (
    <nav className="nav" aria-label="primary">
      <div className="nav-brand">
        <span className="nav-brand-mark">M</span>
        <span>
          MVHS
          <span style={{ color: "var(--sf-ink-3)", fontWeight: 400, marginLeft: 6 }}>
            Science Fair
          </span>
        </span>
      </div>
      <div className="nav-links">
        {items.map(([label, id]) => (
          <button key={id} className="nav-link" onClick={() => scrollTo(id)}>
            {label}
          </button>
        ))}
      </div>
      <a className="nav-cta" href={FORM_URL} target="_blank" rel="noopener noreferrer">
        Show Interest
        <I.arrow />
      </a>
    </nav>
  );
}

function Hero() {
  const tiltRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = tiltRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(1200px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 8).toFixed(2)}deg)`;
    };
    const onLeave = () => {
      el.style.transform = "";
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section className="hero">
      <div>
        <Reveal className="hero-tag">
          <span className="hero-tag-dot"></span>
          <span>Interest Form Now Open · Grades 3–5</span>
        </Reveal>
        <Reveal as="h1" className="hero-title" delay={120}>
          A field guide for
          <br />
          <em>young scientists.</em>
          <span className="badge-year">EST · 2026</span>
        </Reveal>
        <Reveal as="p" className="hero-sub" delay={220}>
          The MVHS Science Fair — hosted by the Mountain View High School STEM &amp; Research
          Club — invites elementary explorers across Mountain View to investigate, build,
          and discover. Curiosity is the only prerequisite.
        </Reveal>

        <Reveal className="hero-meta" delay={300}>
          <div className="hero-meta-item">
            <div className="hero-meta-label">Date</div>
            <div className="hero-meta-value">TBD</div>
          </div>
          <div className="hero-meta-item">
            <div className="hero-meta-label">Location</div>
            <div className="hero-meta-value">TBD</div>
          </div>
          <div className="hero-meta-item">
            <div className="hero-meta-label">Eligible</div>
            <div className="hero-meta-value">Grades 3–5</div>
          </div>
        </Reveal>

        <Reveal className="hero-cta-row" delay={380}>
          <a className="sf-btn sf-btn-primary" href={FORM_URL} target="_blank" rel="noopener noreferrer">
            Show Your Interest <I.arrow className="btn-arrow" />
          </a>
          <button className="sf-btn sf-btn-ghost" onClick={() => scrollTo("process")}>
            How it works <I.arrowRight className="btn-arrow" />
          </button>
        </Reveal>
      </div>

      <Reveal delay={200}>
        <div className="qr-console" ref={tiltRef}>
          <div className="qr-console-head">
            <span>SPECIMEN · INTEREST FORM</span>
            <div className="leds">
              <span className="led on" title="link"></span>
              <span className="led warn" title="ready"></span>
              <span className="led on" title="ok"></span>
            </div>
          </div>

          <div className="qr-tile">
            <span className="qr-corner tl"></span>
            <span className="qr-corner tr"></span>
            <span className="qr-corner bl"></span>
            <span className="qr-corner br"></span>
            <QRCodeSVG value={FORM_URL} size={260} fgColor="#0e1320" bgColor="#ffffff" level="H" />
            <span className="qr-scanline"></span>
          </div>

          <div className="qr-cap">
            <div className="qr-cap-title">
              <b>Scan to show interest</b>
            </div>
            <a href={FORM_URL} target="_blank" rel="noopener noreferrer">
              open form ↗
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Marquee() {
  const items = [
    "Curiosity → Question → Hypothesis → Experiment → Data → Conclusion",
    "Grades 3–5 · Open to elementary students across Mountain View",
    "Organized by the STEM & Research Club at Mountain View High School",
    "Mentors available · Judges welcome · Volunteers needed",
  ];
  const all = [...items, ...items];
  return (
    <div className="tape" aria-hidden="true">
      <div className="tape-track">
        {all.map((s, i) => (
          <span key={i}>
            <span className="dot"></span>
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

function Welcome() {
  return (
    <section className="section" id="welcome">
      <div className="section-head">
        <span className="section-num">§ 01</span>
        <div>
          <div className="section-eyebrow">About the fair</div>
          <h2 className="section-title">
            Welcome to the <em>2026</em> MVHS Science Fair.
          </h2>
        </div>
      </div>
      <div className="welcome">
        <Reveal className="welcome-body">
          <p>
            We&apos;re excited to <strong>inspire young scientists</strong> across
            Mountain View.
          </p>
          <p>
            Whether you&apos;re curious about the natural world, technology, or anything
            in between — there&apos;s a place for you at the fair.
          </p>
          <p style={{ fontSize: 16, fontFamily: "var(--sf-font-sans)", color: "var(--sf-ink-3)" }}>
            Organized by the STEM and Research Club at Mountain View High School.
          </p>
        </Reveal>
        <Reveal className="welcome-side" delay={120}>
          <h4>At a glance</h4>
          <div className="welcome-stat">
            <span className="welcome-stat-label">Eligible Grades</span>
            <span className="welcome-stat-value">3–5</span>
          </div>
          <div className="welcome-stat">
            <span className="welcome-stat-label">Team Size</span>
            <span className="welcome-stat-value">1–3</span>
          </div>
          <div className="welcome-stat">
            <span className="welcome-stat-label">Min. Trials</span>
            <span className="welcome-stat-value">3</span>
          </div>
          <div className="welcome-stat">
            <span className="welcome-stat-label">Categories</span>
            <span className="welcome-stat-value">4</span>
          </div>
          <div className="welcome-stat">
            <span className="welcome-stat-label">Event Day</span>
            <span className="welcome-stat-value">TBD</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const CATS = [
  { sym: "Lh", num: "01", name: "Life & Health Sciences", desc: "People, plants, psychology, environment. No live animals or nutrition/diet experiments.", color: "var(--sf-emerald)" },
  { sym: "Pe", num: "02", name: "Physical Science & Engineering", desc: "Forces, motion, energy, machines, astronomy, inventions.", color: "var(--sf-cyan)" },
  { sym: "Cm", num: "03", name: "Chemistry & Materials", desc: "Reactions, mixtures, states of matter, testing materials.", color: "var(--sf-orange)" },
  { sym: "Ti", num: "04", name: "Technology & Innovation", desc: "Computers, coding, robotics, apps, problem-solving inventions.", color: "var(--sf-violet)" },
];

function Categories() {
  return (
    <section className="section" id="categories">
      <div className="section-head">
        <span className="section-num">§ 02</span>
        <div>
          <div className="section-eyebrow">Pick your specimen</div>
          <h2 className="section-title">
            Project <em>categories.</em>
          </h2>
          <p className="section-sub">
            Choose a category that matches your curiosity. Every great experiment begins with a
            question you actually care about.
          </p>
        </div>
      </div>
      <div className="cats">
        {CATS.map((c, i) => (
          <Reveal key={c.num} delay={i * 80}>
            <div className="cat" style={{ ["--cat-color" as string]: c.color } as React.CSSProperties}>
              <span className="cat-num">{c.num}</span>
              <div className="cat-symbol">{c.sym}</div>
              <div className="cat-name">{c.name}</div>
              <div className="cat-desc">{c.desc}</div>
              <div className="cat-orbital"></div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const STEPS = [
  { n: "01", title: "Interest Form", when: "Now Open", body: "Fill out the interest form to let us know you want to participate. This is the first signal we collect, and it unlocks everything that follows." },
  { n: "02", title: "Application Opens", when: "TBD", body: "Submit your project application with your topic, hypothesis, team members, and a short description. One form covers registration, consent, and project details." },
  { n: "03", title: "Approval & Safety Review", when: "TBD", body: "The Science Fair Committee reviews each application against safety and ethics guidelines. Wait for confirmation before starting your experiment — you'll get an email." },
  { n: "04", title: "Project Work Period", when: "TBD", body: "Conduct your experiments, run at least three trials, collect data honestly, and keep a date-stamped logbook. Mentors are here to help — but the work is yours." },
  { n: "05", title: "Display Board Prep", when: "TBD", body: "Build your tri-fold board: title, abstract, question, hypothesis, materials, procedure, data, conclusion, and citations. Name on the back only — for fair judging." },
  { n: "06", title: "Science Fair Day", when: "TBD", body: "Present to judges and visitors. Six criteria: scientific thought, creativity, thoroughness, skill, clarity, and presentation. Celebrate what you discovered. The exact date and venue will be announced once we confirm interest." },
];

function Process() {
  const [active, setActive] = useState(0);
  const [tick, setTick] = useState(0);
  const set = (i: number) => {
    setActive(i);
    setTick((t) => t + 1);
  };
  return (
    <section className="section" id="process">
      <div className="section-head">
        <span className="section-num">§ 03</span>
        <div>
          <div className="section-eyebrow">The journey</div>
          <h2 className="section-title">
            From spark of <em>curiosity</em> to fair-day presentation.
          </h2>
          <p className="section-sub">Six stages, in order. Click any step to inspect.</p>
        </div>
      </div>

      <div className="journey">
        <div className="journey-rail">
          {STEPS.map((s, i) => (
            <button
              key={i}
              className={`journey-step ${i === active ? "active" : ""}`}
              onClick={() => set(i)}
            >
              <span className="journey-step-num">{s.n}</span>
              <span className="journey-step-content">
                <span className="journey-step-title">{s.title}</span>
                <span className="journey-step-when">{s.when}</span>
              </span>
            </button>
          ))}
        </div>
        <div key={tick} className="journey-detail tick">
          <div className="journey-detail-head">
            <span>STAGE / {String(active + 1).padStart(2, "0")} of 06</span>
            <span>READOUT · LIVE</span>
          </div>
          <div className="journey-detail-num">{STEPS[active].n}</div>
          <h3 className="journey-detail-title">{STEPS[active].title}</h3>
          <span className="journey-detail-when">{STEPS[active].when}</span>
          <p className="journey-detail-body">{STEPS[active].body}</p>
          <div className="journey-progress">
            {STEPS.map((_, i) => (
              <span key={i} className={i <= active ? "done" : ""}></span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type FormItem = { title: string; desc: string; href: string; featured?: boolean; icon: React.ReactNode };

const FORMS: { main: FormItem[]; risk: FormItem[]; helpers: FormItem[] } = {
  main: [
    { title: "Interest Form", desc: "Show your interest in the 2026 MVHS Science Fair! This is the first step.", href: FORM_URL, featured: true, icon: <I.star /> },
    { title: "Application & Registration Form", desc: "Project details, parental consent, photo release, and liability waiver — everything in one place.", href: APPLICATION_URL, icon: <I.doc /> },
  ],
  risk: [
    { title: "Human Participation Approval", desc: "Required if your project involves surveys, interviews, or testing people.", href: "https://docs.google.com/forms/d/12x3JQnRFlzUU86kUAPY_eyoPJ33u0h5tUsIFXcRCAjM/viewform", icon: <I.users /> },
    { title: "Hazardous Materials & Safety", desc: "Required if your project uses chemicals, electrical equipment, sharp tools, or heat sources.", href: "https://docs.google.com/forms/d/1Jk1m1QwhiiDPHf-ZZ8C4D6FglqJB9aUStY8G4OlHpmk/viewform", icon: <I.warn /> },
  ],
  helpers: [
    { title: "Judge Sign-Up", desc: "Interested in judging projects? Training and rubrics are provided in advance.", href: "https://docs.google.com/forms/d/14Yo2IgS-PAsYNIFac4pzJRdTMX6xEnjtGslqGtAx6TQ/viewform", icon: <I.star /> },
    { title: "Event-Day Volunteering", desc: "Help out on the day of the fair. Open to high school students and community members.", href: "https://docs.google.com/forms/d/1iuy7stpEJE6Espci9gCiEdNe06Cx0DR8I73fKNuyCbg/viewform", icon: <I.heart /> },
    { title: "Mentor Volunteer Interest", desc: "High school students: share your knowledge by mentoring a young scientist.", href: "https://docs.google.com/forms/d/1Go59zVliqQohI9kTUKptz8PFpYWdTSJbQ5qzyY6b2yY/viewform", icon: <I.users /> },
    { title: "High School Mentor Request", desc: "Parents: request a high-school student mentor to guide your child.", href: "https://docs.google.com/forms/d/1KctjqLpK1bSmvTULL0OjStBtLDaBQhSY_xb-NmvyxOg/viewform", icon: <I.users /> },
  ],
};

function FormCard({ title, desc, href, featured, icon }: FormItem) {
  return (
    <a className={`form-card ${featured ? "featured" : ""}`} href={href} target="_blank" rel="noopener noreferrer">
      <span className="form-card-icon">{icon}</span>
      <div className="form-card-body">
        <div className="form-card-title">{title}</div>
        <div className="form-card-desc">{desc}</div>
      </div>
      <I.ext className="form-card-arrow" />
    </a>
  );
}

const sectionLabel: React.CSSProperties = {
  fontFamily: "var(--sf-font-mono)",
  fontSize: 12,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "var(--sf-ink-3)",
  margin: "0 0 14px",
};

function Forms() {
  return (
    <section className="section" id="forms">
      <div className="section-head">
        <span className="section-num">§ 04</span>
        <div>
          <div className="section-eyebrow">Paperwork, organized</div>
          <h2 className="section-title">
            Forms & <em>sign-ups.</em>
          </h2>
          <p className="section-sub">
            Start with the Interest Form. Submit risk/approval forms only if your project requires them.
          </p>
        </div>
      </div>

      <Reveal>
        <h3 style={sectionLabel}>Main forms</h3>
        <div style={{ display: "grid", gap: 12, marginBottom: 32 }}>
          {FORMS.main.map((f) => (
            <FormCard key={f.title} {...f} />
          ))}
        </div>
      </Reveal>

      <Reveal delay={80}>
        <h3 style={sectionLabel}>Risk / approval forms</h3>
        <div style={{ display: "grid", gap: 12, marginBottom: 32 }}>
          {FORMS.risk.map((f) => (
            <FormCard key={f.title} {...f} />
          ))}
        </div>
      </Reveal>

      <Reveal delay={140}>
        <h3 style={sectionLabel}>Volunteer & judge</h3>
        <div style={{ display: "grid", gap: 12 }}>
          {FORMS.helpers.map((f) => (
            <FormCard key={f.title} {...f} />
          ))}
        </div>
      </Reveal>

      <Reveal delay={200}>
        <div className="callout warn" style={{ marginTop: 28 }}>
          <strong>Submission order:</strong> ① Interest Form first, ② Application & Registration when applications open, ③ Safety forms only if needed. Mentor request is optional and can be made anytime.
        </div>
      </Reveal>
    </section>
  );
}

const RULE_DOCS = [
  { title: "MVHS Science Fair Rules", desc: "The comprehensive rulebook covering eligibility, project categories, timelines, and general guidelines.", href: "https://docs.google.com/document/d/15SAahb5817DqSySY_MRZs1WQ0aFv-XnKye_OrsofJPc/edit", icon: <I.book />, tone: "" },
  { title: "Human Participant Rules", desc: "Guidelines for projects involving human subjects — surveys, interviews, behavioral observations.", href: "https://docs.google.com/document/d/12Y22HRdQ2ahjSZOgzAxBorjPfrTsH42qnb5A4sQ2J6U/edit", icon: <I.users />, tone: "cyan" },
  { title: "Hazardous Materials Rules", desc: "Safety rules for projects involving chemicals, electrical equipment, sharp tools, or heat sources.", href: "https://docs.google.com/document/d/18L9rhZy4CaveZ4F5KMN6-bMuaOcy0kNvsH0rKvqq_k8/edit", icon: <I.warn />, tone: "amber" },
  { title: "Mentor Rulebook", desc: "Guidelines and expectations for mentors supporting science fair participants.", href: "https://docs.google.com/document/d/1okIJtfiGXKSROUCFSIXBvdnN4pctZPD77df_KyQ8Uqs/edit", icon: <I.users />, tone: "violet" },
];

const TOPIC_BULLETS = [
  "What problems in the world do you wish you could solve?",
  "What cool science topics have you heard about?",
  "What have you loved learning about in school?",
  "What jobs in science or technology interest you?",
  "What are you passionate about outside of school?",
];

const PLAN_TILES = [
  { name: "Safety", desc: "Are there any safety concerns? Do you need approval forms? Address this first." },
  { name: "Research Question", desc: "What specific question are you trying to answer?" },
  { name: "Hypothesis", desc: "Your educated guess. Use \"If… then… because…\" format." },
  { name: "Materials", desc: "List everything you'll need for your experiment." },
  { name: "Procedure", desc: "Step-by-step. Must include at least 3 trials so results can be verified." },
  { name: "Variables", desc: "Identify what you change (independent), measure (dependent), and keep the same (controlled)." },
  { name: "Data Collection", desc: "How will you record and organize results?" },
];

const RUBRIC = [
  { name: "Scientific Thought", desc: "Is the problem clearly stated? Is the hypothesis reasonable and testable?" },
  { name: "Creativity", desc: "Does the project show original thinking and a unique approach?" },
  { name: "Thoroughness", desc: "Is the research comprehensive? Were enough trials and variables considered?" },
  { name: "Skill", desc: "Appropriate use of scientific methods, equipment, and analysis." },
  { name: "Clarity", desc: "Are the data, charts, and conclusions easy to understand?" },
  { name: "Presentation", desc: "Is the board well-organized and visually appealing?" },
];

const ruleToneStyle = (tone: string): React.CSSProperties => {
  switch (tone) {
    case "cyan":
      return { background: "var(--sf-cyan-soft)", color: "var(--sf-cyan)", borderColor: "oklch(78% 0.12 200 / 0.35)" };
    case "amber":
      return { background: "oklch(80% 0.13 80 / 0.14)", color: "var(--sf-amber)", borderColor: "oklch(80% 0.13 80 / 0.35)" };
    case "violet":
      return { background: "oklch(72% 0.14 295 / 0.14)", color: "var(--sf-violet)", borderColor: "oklch(72% 0.14 295 / 0.35)" };
    default:
      return { background: "var(--sf-orange-soft)", color: "var(--sf-orange)", borderColor: "var(--sf-orange-line)" };
  }
};

function Expand({
  num,
  title,
  children,
  defaultOpen = false,
}: {
  num: string;
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`expand ${open ? "open" : ""}`}>
      <button className="expand-head" onClick={() => setOpen((o) => !o)}>
        <span className="expand-num">{num}</span>
        <span>{title}</span>
        <I.chevron className="expand-arrow" />
      </button>
      <div className="expand-body">
        <div>{children}</div>
      </div>
    </div>
  );
}

function Rules() {
  return (
    <section className="section" id="rules">
      <div className="section-head">
        <span className="section-num">§ 05</span>
        <div>
          <div className="section-eyebrow">Read before you build</div>
          <h2 className="section-title">
            Rules & <em>guidelines.</em>
          </h2>
          <p className="section-sub">
            Understand the rules first — it makes planning easier and protects everyone.
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gap: 12, marginBottom: 36 }}>
        {RULE_DOCS.map((r, i) => (
          <Reveal key={r.title} delay={i * 60}>
            <a className="form-card" href={r.href} target="_blank" rel="noopener noreferrer">
              <span className="form-card-icon" style={ruleToneStyle(r.tone)}>
                {r.icon}
              </span>
              <div className="form-card-body">
                <div className="form-card-title">{r.title}</div>
                <div className="form-card-desc">{r.desc}</div>
              </div>
              <I.ext className="form-card-arrow" />
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <h3 style={{ ...sectionLabel, margin: "24px 0 14px" }}>Plan your project</h3>
        <Expand num="01" title="Topic Selection — start with what excites you" defaultOpen>
          <p style={{ color: "var(--sf-ink-2)" }}>
            The best projects come from{" "}
            <strong style={{ color: "var(--sf-ink)" }}>your curiosity</strong>. Ask yourself:
          </p>
          <ul style={{ paddingLeft: 18, color: "var(--sf-ink-2)" }}>
            {TOPIC_BULLETS.map((b) => (
              <li key={b} style={{ margin: "6px 0" }}>
                {b}
              </li>
            ))}
          </ul>
          <div className="callout info">
            <strong>Pro tip:</strong> pick 2–3 ideas at first. If one doesn&apos;t work out, you&apos;ve got backups.
          </div>
          <div className="callout">
            <strong>STEM Method Required:</strong> every project must follow the Scientific Method or the Engineering Design Process, with at least 3 trials.
          </div>
          <div className="callout danger">
            <strong>Important:</strong> 1–3 members per team. No continuation projects. One project per student/team. No live organisms. A parent or guardian must supervise all experiments.
          </div>
        </Expand>

        <Expand num="02" title="Planning your project — checklist">
          <div className="tile-row">
            {PLAN_TILES.map((t) => (
              <div className="tile" key={t.name}>
                <div className="tile-name">{t.name}</div>
                <div className="tile-desc">{t.desc}</div>
              </div>
            ))}
          </div>
        </Expand>

        <Expand num="03" title="Research logbook — required">
          <div className="callout danger">
            <strong>REQUIRED:</strong> students must maintain a date-stamped logbook documenting planning, execution, results, and sources.
          </div>
          <div className="tile-row">
            {[
              "Brainstorming and initial ideas",
              "Research notes and sources",
              "Planning and procedure changes",
              "Daily observations and data",
              "Mistakes and what you learned",
              "Photos and sketches",
              "Reflections on your progress",
            ].map((t) => (
              <div className="tile" key={t}>
                <div className="tile-desc">{t}</div>
              </div>
            ))}
          </div>
        </Expand>

        <Expand num="04" title="Judging rubric — six official criteria">
          <div className="tile-row">
            {RUBRIC.map((r) => (
              <div className="tile" key={r.name}>
                <div className="tile-name">{r.name}</div>
                <div className="tile-desc">{r.desc}</div>
              </div>
            ))}
          </div>
        </Expand>
      </Reveal>
    </section>
  );
}

const DISPLAY_RULES = [
  { n: 1, title: "No electricity available", body: "Only battery-operated demonstrations are permitted.", icon: <I.bolt />, dims: false },
  { n: 2, title: "No materials may be distributed", body: "No samples, handouts, or items may be given to judges. Everything stays at your display.", icon: <I.warn />, dims: false },
  { n: 3, title: "Table display with size limits", body: "All projects sit on a table. We recommend a tri-fold board (~36\" × 48\"). Setup must not exceed:", icon: <I.monitor />, dims: true },
  { n: 4, title: "Must stand upright", body: "Projects must stand on their own without toppling. Stable. Secure.", icon: <I.shield />, dims: false },
  { n: 5, title: "Acknowledgments: text only, no logos", body: "No company logos, brand images, or graphics in the acknowledgments section.", icon: <I.doc />, dims: false },
  { n: 6, title: "No hazardous materials at the venue", body: "Use photos, diagrams, or video to showcase materials that can't safely travel.", icon: <I.warn />, dims: false },
  { n: 7, title: "Complete citations required", body: "Cite every photograph, image, chart, table, and graph: author, title, date, and URL or publication.", icon: <I.book />, dims: false },
  { n: 8, title: "No name on the front of the board", body: "Your name goes on the back only — to ensure fair, unbiased judging.", icon: <I.users />, dims: false },
];

const BOARD_REQ = [
  "Title",
  "Abstract",
  "Question or Problem",
  "Hypothesis or Design Goal",
  "Materials",
  "Procedure",
  "Data and Results",
  "Conclusion",
  "Citations / Bibliography",
];

function Display() {
  return (
    <section className="section" id="display">
      <div className="section-head">
        <span className="section-num">§ 06</span>
        <div>
          <div className="section-eyebrow">Display & safety</div>
          <h2 className="section-title">
            Build a board judges <em>can read.</em>
          </h2>
          <p className="section-sub">Eight rules + a clear required-content list. Stick to these and you&apos;re set.</p>
        </div>
      </div>

      <div style={{ display: "grid", gap: 12 }}>
        {DISPLAY_RULES.map((r, i) => (
          <Reveal key={r.n} delay={i * 40}>
            <div className="panel">
              <div className="panel-head">
                <span className="panel-icon">{r.icon}</span>
                <div className="panel-title">
                  #{r.n} · {r.title}
                </div>
              </div>
              <div className="panel-body">{r.body}</div>
              {r.dims && (
                <div className="dims">
                  <div className="dim">
                    <div className="dim-num orange">66&quot;</div>
                    <div className="dim-label">Max Height (from table)</div>
                  </div>
                  <div className="dim">
                    <div className="dim-num cyan">30&quot;</div>
                    <div className="dim-label">Max Depth</div>
                  </div>
                  <div className="dim">
                    <div className="dim-num amber">48&quot;</div>
                    <div className="dim-label">Max Width</div>
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={80}>
        <div className="panel" style={{ marginTop: 28 }}>
          <div className="panel-head">
            <span className="panel-icon cyan">
              <I.check />
            </span>
            <div className="panel-title">Required board content</div>
          </div>
          <div className="checklist">
            {BOARD_REQ.map((b) => (
              <div className="checklist-item" key={b}>
                <I.check />
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Volunteer() {
  return (
    <section className="section" id="volunteer">
      <div className="section-head">
        <span className="section-num">§ 07</span>
        <div>
          <div className="section-eyebrow">Get involved</div>
          <h2 className="section-title">
            Judges, mentors, <em>volunteers.</em>
          </h2>
          <p className="section-sub">The fair runs on community. Pick your role — every contribution matters.</p>
        </div>
      </div>

      <div className="panel-row">
        <Reveal>
          <div className="panel">
            <div className="panel-head">
              <span className="panel-icon">
                <I.star />
              </span>
              <div className="panel-title">Become a Judge</div>
            </div>
            <div className="panel-body">
              <p>Teachers, professionals, and community members with a passion for STEM and mentorship. Training and rubrics are provided in advance.</p>
              <div className="callout info">
                <strong>Six criteria:</strong> scientific thought, creativity, thoroughness, skill, clarity, and presentation.
              </div>
              <a className="sf-btn sf-btn-primary" href="https://docs.google.com/forms/d/14Yo2IgS-PAsYNIFac4pzJRdTMX6xEnjtGslqGtAx6TQ/viewform" target="_blank" rel="noopener noreferrer" style={{ marginTop: 8 }}>
                Sign Up to Judge <I.ext className="btn-arrow" />
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="panel">
            <div className="panel-head">
              <span className="panel-icon cyan">
                <I.heart />
              </span>
              <div className="panel-title">Event-Day Volunteering</div>
            </div>
            <div className="panel-body">
              <p>Help with setup, registration, guiding visitors, event flow, and cleanup. Open to high school students and community members.</p>
              <ul>
                <li>Event setup and cleanup</li>
                <li>Registration and check-in</li>
                <li>Guiding visitors and families</li>
              </ul>
              <a className="sf-btn sf-btn-ghost" href="https://docs.google.com/forms/d/1iuy7stpEJE6Espci9gCiEdNe06Cx0DR8I73fKNuyCbg/viewform" target="_blank" rel="noopener noreferrer" style={{ marginTop: 8 }}>
                Sign up for event day <I.ext className="btn-arrow" />
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="panel">
            <div className="panel-head">
              <span className="panel-icon violet">
                <I.users />
              </span>
              <div className="panel-title">Mentor Volunteering</div>
            </div>
            <div className="panel-body">
              <p>High school students: share your knowledge by guiding a young scientist. Typical commitment: 1–2 hours per week over the project period.</p>
              <div className="callout">
                <strong>Mentors advise — they don&apos;t do the work.</strong> Never present ideas as the student&apos;s own. Cannot attend judging. Report concerns to the committee.
              </div>
              <a className="sf-btn sf-btn-ghost" href="https://docs.google.com/forms/d/1Go59zVliqQohI9kTUKptz8PFpYWdTSJbQ5qzyY6b2yY/viewform" target="_blank" rel="noopener noreferrer" style={{ marginTop: 8 }}>
                Sign up as mentor <I.ext className="btn-arrow" />
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={160}>
          <div className="panel">
            <div className="panel-head">
              <span className="panel-icon emerald">
                <I.users />
              </span>
              <div className="panel-title">Request a Mentor</div>
            </div>
            <div className="panel-body">
              <p>Parents: request a high-school student mentor to guide your child through their science fair project.</p>
              <a className="sf-btn sf-btn-ghost" href="https://docs.google.com/forms/d/1KctjqLpK1bSmvTULL0OjStBtLDaBQhSY_xb-NmvyxOg/viewform" target="_blank" rel="noopener noreferrer" style={{ marginTop: 8 }}>
                Request mentor <I.ext className="btn-arrow" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function QuickNav() {
  const items = [
    { num: "01", name: "The Process", desc: "Step-by-step guide from idea to presentation.", id: "process" },
    { num: "02", name: "Forms", desc: "Application, approval, volunteer, and judge forms.", id: "forms" },
    { num: "03", name: "Rules", desc: "All rulebooks and guidelines.", id: "rules" },
    { num: "04", name: "Display & Safety", desc: "Board dimensions, safety rules, display tips.", id: "display" },
  ];
  return (
    <section className="section">
      <div className="section-head">
        <span className="section-num">§ 08</span>
        <div>
          <div className="section-eyebrow">Jump to anything</div>
          <h2 className="section-title">
            Everything you <em>need.</em>
          </h2>
        </div>
      </div>
      <div className="quick-grid">
        {items.map((it, i) => (
          <Reveal key={it.num} delay={i * 60}>
            <button className="quick-card" onClick={() => scrollTo(it.id)}>
              <div className="quick-card-num">{`// ${it.num}`}</div>
              <div className="quick-card-name">{it.name}</div>
              <div className="quick-card-desc">{it.desc}</div>
              <div className="quick-card-arrow">
                explore <I.arrowRight />
              </div>
            </button>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <span className="nav-brand-mark">M</span>
              <span style={{ fontWeight: 600 }}>
                MVHS{" "}
                <span style={{ color: "var(--sf-ink-3)", fontWeight: 400 }}>Science Fair</span>
              </span>
            </div>
            <p style={{ color: "var(--sf-ink-3)", fontSize: 13, lineHeight: 1.6, maxWidth: 340 }}>
              Inspiring young scientists across Mountain View. Organized by the
              STEM &amp; Research Club at Mountain View High School.
            </p>
          </div>
          <div>
            <h5>Quick Links</h5>
            <ul>
              <li><a onClick={() => scrollTo("process")}>The Process</a></li>
              <li><a onClick={() => scrollTo("forms")}>Forms</a></li>
              <li><a onClick={() => scrollTo("rules")}>Rules</a></li>
              <li><a onClick={() => scrollTo("display")}>Display & Safety</a></li>
            </ul>
          </div>
          <div>
            <h5>Get Involved</h5>
            <ul>
              <li><a href="https://docs.google.com/forms/d/14Yo2IgS-PAsYNIFac4pzJRdTMX6xEnjtGslqGtAx6TQ/viewform" target="_blank" rel="noopener noreferrer">Become a Judge</a></li>
              <li><a href="https://docs.google.com/forms/d/1iuy7stpEJE6Espci9gCiEdNe06Cx0DR8I73fKNuyCbg/viewform" target="_blank" rel="noopener noreferrer">Volunteer</a></li>
              <li><a href="https://docs.google.com/forms/d/1Go59zVliqQohI9kTUKptz8PFpYWdTSJbQ5qzyY6b2yY/viewform" target="_blank" rel="noopener noreferrer">Mentor</a></li>
            </ul>
          </div>
          <div>
            <h5>Contact</h5>
            <ul>
              <li style={{ color: "var(--sf-ink-3)", fontSize: 13 }}>Contact email coming soon.</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 MVHS Science Fair</span>
          <span>A student-led event by the MVHS STEM &amp; Research Club. Not affiliated with or endorsed by MVWSD.</span>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="sf-lab sf-lab--root">
      <div className="lab-grid"></div>
      <div className="lab-noise"></div>
      <Particles />
      <Nav />
      <div className="app">
        <Hero />
        <Marquee />
        <Welcome />
        <Categories />
        <Process />
        <Forms />
        <Rules />
        <Display />
        <Volunteer />
        <QuickNav />
      </div>
      <Footer />
    </div>
  );
}
