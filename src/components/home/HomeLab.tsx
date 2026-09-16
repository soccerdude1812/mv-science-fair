"use client";

/**
 * Home page, Chalk Lab system. Minimal copy, one idea per section.
 * Section order and every copy rule come from DESIGN.md.
 *
 * REBUILT 2026-09-15. The page had one job, "get families to apply before
 * Sept 13", and that job is finished: 32 applications, 31 approved projects,
 * applications shut. Painting over the apply band would have left an
 * apply-shaped page, so the order was rebuilt around the morning of the 26th
 * and the eleven days of work in front of it. What changed:
 * - Hero, fact strip and closing band all point at /fair-day instead of the
 *   application form. The QR code goes to the fair day page, not the form.
 * - "How it works" (apply, get approved, build, fair day) became "What is left
 *   to do", because every reader of this page is already approved.
 * - The categories section is gone. "Pick what you wonder about" is dead copy
 *   when all 31 projects are chosen; the test tube it used moved to the help
 *   band, which is a better home for it anyway.
 * - Two new bands: help (the owner asked for it) and recruitment (judges and
 *   event-day volunteers stood at 2 and 0 with eleven days left).
 *
 * Motion inventory (each answers "what does it communicate?"):
 * - Beaker tilts and pours as you scroll off the hero: hands the reader
 *   from the promise to the work (storytelling)
 * - Gears turn with scroll through the steps: progress through what is
 *   left (storytelling)
 * - Reveal entrances: reading order (hierarchy)
 * - Pupils track the pointer: the lab is alive (kid delight, cheap)
 * All scroll/pointer work uses motion values; everything degrades to
 * static under prefers-reduced-motion.
 */

import { useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { useScroll, useTransform, useReducedMotion } from "motion/react";
import { EVENT, MENTOR_REQUEST_URL } from "@/lib/event";
import { TEAM } from "@/lib/team";
import { Beaker, Gear, TestTube, Lightbulb } from "@/components/lab/cast";
import { Reveal } from "@/components/lab/Reveal";
import { useLook } from "@/components/lab/useLook";

/** Where the fair day CTA points, and what the home QR code encodes. */
const FAIR_DAY_PATH = "/fair-day";
const FAIR_DAY_URL = `${EVENT.siteUrl}${FAIR_DAY_PATH}`;

/* ------------------------------------------------------------- hero ---- */

function Hero({ look }: { look: ReturnType<typeof useLook> }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // The pour happens in the FIRST third of scroll, while the beaker is
  // still fully on screen: the glass rolls to 60 degrees while its
  // liquid stays level, so the surface only REACHES the spout at about
  // 52 degrees. The stream starts exactly there (progress ~0.175),
  // flows while the glass holds its tilt, and retracts as it rights.
  const tilt = useTransform(
    scrollYProgress,
    [0.02, 0.18, 0.32, 0.46],
    [0, 60, 60, 0],
  );
  const pour = useTransform(
    scrollYProgress,
    [0.175, 0.26, 0.34, 0.42],
    [0, 1, 1, 0],
  );

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-20 pt-14 sm:px-6 md:grid-cols-[1.1fr_0.9fr] md:pb-28 md:pt-20">
        <div>
          <p className="data-label mb-5">
            {EVENT.dateShort} · {EVENT.timeShort}
          </p>
          <h1 className="display-hero">Show them what you found out.</h1>
          <p className="mt-6 max-w-[46ch] text-lg text-ink-soft">
            The MV Science Fair is {EVENT.dateFull}, at {EVENT.venueName}.
            Scientists set up from 8, doors open at 9.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link href={FAIR_DAY_PATH} className="btn-primary">
              Fair day details
            </Link>
            <Link href="/the-process" className="btn-ghost">
              Get your board ready
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-56 sm:w-64 md:w-80">
          <div className={reduce ? undefined : "lab-bob"}>
            <Beaker
              look={look}
              tilt={reduce ? undefined : tilt}
              pour={reduce ? undefined : pour}
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------- fact strip ---- */

const FACTS: { label: string; lines: (string | { text: string; href: string })[] }[] = [
  { label: "When", lines: [EVENT.dateFull, EVENT.timeFull] },
  {
    label: "Where",
    lines: [
      EVENT.venueName,
      { text: `${EVENT.venueRoom}, ${EVENT.venueStreet}`, href: EVENT.venueMapUrl },
    ],
  },
  {
    label: "Scientists arrive",
    /* Participant-only window. Visitors are told 9:00, and the tile says so
       rather than leaving a parent to work out which time is theirs. */
    lines: [EVENT.arrivalWindowFull, "Check in and set up your board"],
  },
  {
    label: "Everyone else",
    lines: ["Doors open at 9:00 AM", "Free, and open to families"],
  },
];

function FactStrip() {
  return (
    <section className="border-y border-line bg-card">
      <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-line px-4 sm:grid-cols-2 sm:divide-y-0 sm:px-6 lg:grid-cols-4 lg:divide-x">
        {FACTS.map(({ label, lines }, i) => (
          <Reveal key={label} delay={i * 0.06} className="py-6 sm:px-6 sm:py-8 first:pl-0">
            <p className="data-label">{label}</p>
            {lines.map((line, j) =>
              typeof line === "string" ? (
                <p
                  key={j}
                  className={
                    j === 0
                      ? "mt-2 font-semibold text-ink"
                      : "text-[0.95rem] text-ink-soft"
                  }
                >
                  {line}
                </p>
              ) : (
                <a
                  key={j}
                  href={line.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-[0.95rem] text-ink-soft underline decoration-line underline-offset-4 hover:text-ink"
                >
                  {line.text}
                </a>
              ),
            )}
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------------------------- what is left ---- */

const STEPS = [
  {
    title: "Finish the experiment",
    body: "Three trials minimum, and write down the runs that go wrong. Those count.",
  },
  {
    title: "Make sense of your numbers",
    body: "Average each group, draw one chart, and write the one sentence it proves.",
  },
  {
    title: "Build the board",
    body: "All nine sections, title readable across the room, your name on the back only.",
  },
  {
    title: "Say it out loud",
    body: "Practise the first thirty seconds on a real person, standing up.",
  },
];

function WhatIsLeft({ look }: { look: ReturnType<typeof useLook> }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bigRotate = useTransform(scrollYProgress, [0, 1], [0, 150]);
  // meshed pair: the small gear counter-rotates faster (radius ratio)
  const smallRotate = useTransform(scrollYProgress, [0, 1], [8, 8 - 225]);

  return (
    <section ref={ref} className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
      <div className="grid gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
        <div className="md:sticky md:top-28 md:self-start">
          <Reveal>
            <h2 className="display-section">What is left to do</h2>
            <p className="mt-3 text-ink-soft">
              Four things between here and the 26th.
            </p>
          </Reveal>
          {/* the meshed gear pair, turning with your progress */}
          <div className="relative mt-10 hidden h-60 md:block" aria-hidden="true">
            {/* Gated on `reduce`, like the hero's beaker. useScroll and
                useTransform keep producing values under prefers-reduced-motion
                all by themselves, so a scroll-linked transform only freezes if
                something explicitly declines to pass it. Undefined leaves each
                gear at its resting angle. */}
            <Gear
              color="blue"
              rotate={reduce ? undefined : bigRotate}
              look={look}
              className="absolute left-0 top-0 w-44"
            />
            <Gear
              color="marigold"
              rotate={reduce ? undefined : smallRotate}
              look={look}
              className="absolute left-[8.25rem] top-[5.5rem] w-32"
            />
          </div>
        </div>

        <ol className="space-y-4">
          {STEPS.map(({ title, body }, i) => (
            <Reveal
              key={title}
              delay={i * 0.08}
              as="li"
              className="card-soft flex gap-5 p-6"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-coral-soft font-display text-lg font-semibold text-coral-deep">
                {i + 1}
              </span>
              <div>
                <h3 className="font-body text-lg font-semibold text-ink">
                  {title}
                </h3>
                <p className="mt-1 text-[0.98rem] text-ink-soft">{body}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={0.2} className="md:col-start-2">
          <p className="text-ink-soft">
            Each one, step by step, on{" "}
            <Link
              href="/the-process"
              className="font-medium text-coral-deep hover:underline"
            >
              the get ready guide
            </Link>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ stuck ---- */

const STUCK_POINTS = [
  { label: "Your poster", chip: "chip--coral" },
  { label: "Experimentation", chip: "chip--green" },
  { label: "Your numbers", chip: "chip--blue" },
  { label: "Talking to a judge", chip: "chip--marigold" },
];

function Stuck({ look }: { look: ReturnType<typeof useLook> }) {
  return (
    <section className="dotted-band border-y border-line">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 sm:px-6 md:grid-cols-[0.4fr_1.6fr] md:py-24">
        <Reveal className="mx-auto w-28 md:w-full md:max-w-[150px]">
          <TestTube look={look} className="h-auto w-full" />
        </Reveal>
        <div>
          <Reveal>
            <h2 className="display-section">Stuck on something?</h2>
            <p className="mt-4 max-w-[52ch] text-lg text-ink-soft">
              Everyone gets stuck in one of four places. There is a fix for each,
              and a high schooler who will sit down with you if it does not work.
            </p>
          </Reveal>
          <div className="mt-7 flex flex-wrap gap-2.5">
            {STUCK_POINTS.map(({ label, chip }, i) => (
              <Reveal key={label} delay={i * 0.05}>
                <span className={`chip ${chip} text-[0.9rem] font-semibold`}>
                  {label}
                </span>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/mentors" className="btn-ghost">
                See the fixes
              </Link>
              <a
                href={MENTOR_REQUEST_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-coral-deep hover:underline"
              >
                Or request a mentor
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- parents ---- */

const PARENT_NOTES = [
  {
    title: "It costs nothing",
    body: "Entry, judging and the morning itself are free, for scientists and for visitors alike.",
  },
  {
    title: "The project stays home",
    body: "Boards, data and photographs come to the fair. Nothing is switched on, poured, or launched in the room.",
  },
  {
    title: "Stay as long as you like",
    body: "You are welcome for the whole morning, and walking the room to see the other projects is half the point.",
  },
];

function Parents() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
      <Reveal>
        <h2 className="display-section">Parents, the short version</h2>
      </Reveal>
      <div className="mt-10 grid gap-8 md:grid-cols-3">
        {PARENT_NOTES.map(({ title, body }, i) => (
          <Reveal key={title} delay={i * 0.07}>
            <div className="border-t-2 border-ink pt-5">
              <h3 className="font-body text-lg font-semibold text-ink">
                {title}
              </h3>
              <p className="mt-2 text-[0.98rem] text-ink-soft">{body}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.2}>
        <p className="mt-10 text-ink-soft">
          The whole morning, hour by hour, is on{" "}
          <Link
            href={FAIR_DAY_PATH}
            className="font-medium text-coral-deep hover:underline"
          >
            the fair day page
          </Link>
          , and the display rules are on{" "}
          <Link
            href="/display-and-safety"
            className="font-medium text-coral-deep hover:underline"
          >
            display and safety
          </Link>
          .
        </p>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------- recruitment ---- */

/**
 * Added 2026-09-15 on the owner's call. This band is not decoration: on the day
 * it was written the fair had 31 projects, 2 judge sign-ups and 0 event-day
 * volunteers, eleven days out. Both pages already existed and were buried in a
 * nav dropdown nobody opened.
 */
const HELP_WAYS = [
  {
    href: "/judges",
    title: "Judge a category",
    body: "One morning. You get the rubric and training beforehand, and no judging experience is needed. Teachers, professionals and neighbours all welcome.",
    cta: "How judging works",
  },
  {
    href: "/volunteer",
    title: "Help run the room",
    body: "Setup, check-in, pointing families at the right table, and cleanup. High schoolers and community members both.",
    cta: "Volunteer roles",
  },
];

function HelpOnFairDay() {
  return (
    <section className="border-y border-line bg-card">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
        <div className="grid gap-10 md:grid-cols-[1fr_0.9fr] md:items-center md:gap-16">
          <div>
            <Reveal>
              <h2 className="display-section">Help on fair day</h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="mt-4 max-w-[52ch] text-lg text-ink-soft">
                Thirty-one projects need judges to hear them and hands to run
                the room. Both take one Saturday morning, and we are short of
                both.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="mx-auto w-28 md:w-full md:max-w-[170px]">
            <Lightbulb className="h-auto w-full" />
          </Reveal>
        </div>

        <div className="mt-11 grid gap-5 md:grid-cols-2">
          {HELP_WAYS.map(({ href, title, body, cta }, i) => (
            <Reveal key={href} delay={i * 0.08}>
              <Link
                href={href}
                className="group flex h-full flex-col rounded-2xl border border-line p-6 transition-colors hover:border-line-strong sm:p-7"
              >
                <h3 className="font-body text-lg font-semibold text-ink">
                  {title}
                </h3>
                <p className="mt-2 flex-1 text-[0.98rem] text-ink-soft">
                  {body}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 font-medium text-coral-deep">
                  {cta}
                  <span
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- team ---- */

/**
 * Six faces between the parent answers and the closing band. A parent who has
 * just read that the fair is free and that the project stays home is, right
 * then, wondering who "we" is. This answers it before the CTA rather than after.
 *
 * Deliberately lighter than /team: no cards, no chips, one short role line.
 * The home page is an index, not a directory, and the full titles are one
 * click away. Roster comes from src/lib/team.ts so the two never drift.
 */
function Team() {
  return (
    <section className="dotted-band border-y border-line">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
        <Reveal>
          <h2 className="display-section">The students behind it</h2>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mt-4 max-w-2xl text-lg text-ink-soft">
            We read every application, write the feedback ourselves, and set
            the room up on fair day.
          </p>
        </Reveal>

        <ul className="mt-12 grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-6">
          {TEAM.map(({ name, role, photo }, i) => (
            <Reveal key={name} delay={i * 0.05} as="li">
              <>
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-card">
                  <Image
                    src={photo}
                    alt={name}
                    fill
                    sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, 170px"
                    className="object-cover"
                  />
                </div>
                {/* Full titles, so the columns have to be wide enough for them:
                    two across on a phone, not three. text-balance keeps a title
                    that wraps from stranding one word on its own last line. */}
                <p className="mt-3 text-balance font-display text-[0.98rem] font-semibold leading-tight text-ink">
                  {name}
                </p>
                <p className="mt-1 min-h-[2.2rem] text-balance text-[0.8rem] leading-snug text-ink-faint">
                  {role}
                </p>
              </>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.2}>
          <p className="mt-11 text-ink-soft">
            <Link
              href="/team"
              className="font-medium text-coral-deep hover:underline"
            >
              Meet the team
            </Link>{" "}
            or{" "}
            <Link
              href="/volunteer"
              className="font-medium text-coral-deep hover:underline"
            >
              join us
            </Link>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- countdown ---- */

/**
 * Calendar days between today and fair day, computed on the client only.
 *
 * It HAS to be client-side. This page is statically rendered, so a number
 * counted at build time would freeze at whatever it was when Vercel last
 * deployed and then sit there being confidently wrong, which is the sort of
 * figure that outlives everyone who could have noticed it.
 *
 * useSyncExternalStore rather than useState plus useEffect: the server snapshot
 * is null and the client snapshot is the real count, so the server render and
 * the hydrating render agree by construction instead of by luck, and there is
 * no setState-in-an-effect cascade. The subscribe function is deliberately
 * inert, because nothing external ever changes: the value is read once per
 * render and a viewer who leaves the tab open across midnight sees a stale
 * count, which costs nothing and is cheaper than an interval nobody clears.
 *
 * It lives in the closing band and nowhere higher, because a value that appears
 * one frame after hydration should not sit in the hero where the shift is seen.
 */
const subscribeToNothing = () => () => {};

function computeDaysToFair(): number {
  const fair = new Date(EVENT.startISO);
  // Compare local calendar days, not elapsed hours: "11 days" should tick over
  // at midnight the way a person counts, not at 9am when the fair starts.
  const fairMidnight = new Date(
    fair.getFullYear(),
    fair.getMonth(),
    fair.getDate(),
  );
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((fairMidnight.getTime() - today.getTime()) / 86_400_000);
}

function useDaysToFair(): number | null {
  return useSyncExternalStore(
    subscribeToNothing,
    computeDaysToFair,
    () => null,
  );
}

function CountdownChip() {
  const days = useDaysToFair();
  if (days === null || days < 0) return null;

  const text =
    days === 0 ? "Today" : days === 1 ? "Tomorrow" : `${days} days to go`;

  return <span className="badge-accent">{text}</span>;
}

/* ----------------------------------------------------- fair day band ---- */

function FairDayBand() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
      <Reveal>
        <div className="grid items-center gap-10 rounded-2xl bg-coral-soft p-8 sm:p-12 md:grid-cols-[1.4fr_0.6fr]">
          <div>
            <div className="mb-5 min-h-[1.9rem]">
              <CountdownChip />
            </div>
            <h2 className="display-section">See you on the 26th.</h2>
            <p className="mt-4 max-w-[48ch] text-ink-soft">
              {EVENT.dateFull}, {EVENT.timeFull}, at {EVENT.venueName},{" "}
              {EVENT.venueRoom}. Scientists arrive from 8.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Link href={FAIR_DAY_PATH} className="btn-primary">
                Fair day details
              </Link>
              <a
                href={EVENT.venueMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.95rem] font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-coral"
              >
                {EVENT.venueAddress}
              </a>
            </div>
          </div>
          <div className="mx-auto">
            <div className="card-soft p-5">
              <QRCodeSVG
                value={FAIR_DAY_URL}
                size={140}
                level="M"
                bgColor="transparent"
                fgColor="#22211c"
                aria-label="QR code for the MV Science Fair fair day page"
              />
              <p className="data-label mt-4 text-center">Scan for fair day</p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------- page ---- */

export default function HomeLab() {
  const look = useLook();
  return (
    <>
      <Hero look={look} />
      <FactStrip />
      <WhatIsLeft look={look} />
      <Stuck look={look} />
      <Parents />
      <HelpOnFairDay />
      <Team />
      <FairDayBand />
    </>
  );
}
