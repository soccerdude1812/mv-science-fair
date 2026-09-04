"use client";

/**
 * Home page, Chalk Lab system. Minimal copy, one job: apply.
 * Section order and every copy rule come from DESIGN.md.
 *
 * Motion inventory (each answers "what does it communicate?"):
 * - Beaker tilts and pours as you scroll off the hero: hands the reader
 *   from the promise to the process (storytelling)
 * - Gears turn with scroll through How it works: progress through the
 *   steps (storytelling)
 * - Reveal entrances: reading order (hierarchy)
 * - Pupils track the pointer: the lab is alive (kid delight, cheap)
 * All scroll/pointer work uses motion values; everything degrades to
 * static under prefers-reduced-motion.
 */

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { useScroll, useTransform, useReducedMotion } from "motion/react";
import { EVENT, APPLICATION_URL } from "@/lib/event";
import { TEAM } from "@/lib/team";
import { Beaker, Gear, TestTube } from "@/components/lab/cast";
import { Reveal } from "@/components/lab/Reveal";
import { useLook } from "@/components/lab/useLook";

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
          <h1 className="display-hero">
            A science fair for curious kids.
          </h1>
          <p className="mt-6 max-w-[44ch] text-lg text-ink-soft">
            Free for Mountain View students in grades 3 to 5. Saturday,
            September 26 at Amy Imai Elementary.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href={APPLICATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Apply now
            </a>
            <Link href="/the-process" className="btn-ghost">
              How it works
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
  { label: "Who", lines: ["Grades 3 to 5", "Solo or in a team"] },
  {
    label: "Apply by",
    /* Mirrors the When tile: bold date on line one, the detail light beneath. */
    lines: [EVENT.applicationDeadline, `${EVENT.applicationDeadlineTime}, free to enter`],
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

/* ----------------------------------------------------- how it works ---- */

const STEPS = [
  {
    title: "Apply",
    body: `Tell us your idea in two short answers. Applications close ${EVENT.applicationDeadlineShort}.`,
  },
  {
    title: "Get the green light",
    body: "We review applications as they arrive and email you the go-ahead.",
  },
  {
    title: "Build and test",
    body: "Run your experiment, keep notes, and make your display board.",
  },
  {
    title: "Fair day",
    body: "Show your work to judges and neighbors on September 26.",
  },
];

function HowItWorks({ look }: { look: ReturnType<typeof useLook> }) {
  const ref = useRef<HTMLDivElement>(null);
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
            <h2 className="display-section">How it works</h2>
            <p className="mt-3 text-ink-soft">
              Four steps from idea to fair day.
            </p>
          </Reveal>
          {/* the meshed gear pair, turning with your progress */}
          <div className="relative mt-10 hidden h-60 md:block" aria-hidden="true">
            <Gear
              color="blue"
              rotate={bigRotate}
              look={look}
              className="absolute left-0 top-0 w-44"
            />
            <Gear
              color="marigold"
              rotate={smallRotate}
              look={look}
              className="absolute left-[8.25rem] top-[5.5rem] w-32"
            />
          </div>
        </div>

        <ol className="space-y-4">
          {STEPS.map(({ title, body }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <li className="card-soft flex gap-5 p-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-coral-soft font-display text-lg font-semibold text-coral-deep">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-body text-lg font-semibold text-ink">
                    {title}
                  </h3>
                  <p className="mt-1 text-[0.98rem] text-ink-soft">{body}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* -------------------------------------------------------- categories ---- */

const CATEGORIES = [
  {
    name: "Life & Health Sciences",
    desc: "People, plants, psychology, environment.",
    chip: "chip--green",
  },
  {
    name: "Physical Science & Engineering",
    desc: "Forces, motion, energy, machines, inventions.",
    chip: "chip--blue",
  },
  {
    name: "Chemistry & Materials",
    desc: "Reactions, mixtures, states of matter.",
    chip: "chip--coral",
  },
  {
    name: "Technology & Innovation",
    desc: "Coding, robotics, problem-solving inventions.",
    chip: "chip--marigold",
  },
];

function Categories({ look }: { look: ReturnType<typeof useLook> }) {
  return (
    <section className="dotted-band border-y border-line">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 sm:px-6 md:grid-cols-[0.4fr_1.6fr] md:py-24">
        <Reveal className="mx-auto w-32 md:w-full md:max-w-[160px]">
          <TestTube look={look} className="h-auto w-full" />
        </Reveal>
        <div>
          <Reveal>
            <h2 className="display-section">Pick what you wonder about</h2>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {CATEGORIES.map(({ name, desc, chip }, i) => (
              <Reveal key={name} delay={i * 0.06}>
                <div className="card-soft h-full p-5">
                  <span className={`chip ${chip} text-[0.9rem] font-semibold`}>
                    {name}
                  </span>
                  <p className="mt-3 text-[0.95rem] text-ink-soft">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- parents ---- */

const PARENT_NOTES = [
  {
    title: "It costs nothing",
    body: "Registration, judging, and fair day are all free.",
  },
  {
    title: "Safety is reviewed",
    body: "We read every project plan. If one needs a safety form, we email it to you. Nothing to figure out up front.",
  },
  {
    title: "Kids do the thinking",
    body: "Parents and mentors can help with tools and supplies, but the question and the work belong to the student.",
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
          Want the details? Read{" "}
          <Link
            href="/the-process"
            className="font-medium text-coral-deep hover:underline"
          >
            how it works
          </Link>{" "}
          or the{" "}
          <Link
            href="/rules"
            className="font-medium text-coral-deep hover:underline"
          >
            full rules
          </Link>
          .
        </p>
      </Reveal>
    </section>
  );
}

/* --------------------------------------------------------------- team ---- */

/**
 * Six faces between the parent answers and the apply band. A parent who has
 * just read that the fair is free and that we review safety is, right then,
 * wondering who "we" is. This answers it before the CTA rather than after.
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

        <ul className="mt-12 grid grid-cols-3 gap-x-5 gap-y-9 sm:gap-x-6 md:grid-cols-6">
          {TEAM.map(({ name, shortRole, photo }, i) => (
            <Reveal key={name} delay={i * 0.05}>
              <li>
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-card">
                  <Image
                    src={photo}
                    alt={name}
                    fill
                    sizes="(max-width: 768px) 30vw, 170px"
                    className="object-cover"
                  />
                </div>
                {/* Below sm the grid is 3-across on a ~104px column. text-balance
                    stops "Mentor & Volunteer" breaking to three lines with the
                    ampersand orphaned; the two-line floor on the name keeps the
                    role lines on one baseline when a name fits on one line and
                    its neighbours do not. Both are off from sm up. */}
                <p className="mt-3 min-h-[2.45rem] text-balance font-display text-[0.98rem] font-semibold leading-tight text-ink sm:min-h-0">
                  {name}
                </p>
                <p className="mt-1 text-balance text-[0.8rem] leading-snug text-ink-faint">
                  {shortRole}
                </p>
              </li>
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

/* -------------------------------------------------------- apply band ---- */

function ApplyBand() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
      <Reveal>
        <div className="grid items-center gap-10 rounded-2xl bg-coral-soft p-8 sm:p-12 md:grid-cols-[1.4fr_0.6fr]">
          <div>
            <h2 className="display-section">Bring your big question.</h2>
            <p className="mt-4 max-w-[48ch] text-ink-soft">
              Applying takes about ten minutes: what your project is, and how
              you plan to do it.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <a
                href={APPLICATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Apply now
              </a>
              <p className="text-[0.95rem] font-medium text-ink">
                Applications close {EVENT.applicationDeadlineFull}.
              </p>
            </div>
          </div>
          <div className="mx-auto">
            <div className="card-soft p-5">
              <QRCodeSVG
                value={APPLICATION_URL}
                size={140}
                level="M"
                bgColor="transparent"
                fgColor="#22211c"
                aria-label="QR code for the MV Science Fair application form"
              />
              <p className="data-label mt-4 text-center">Scan to apply</p>
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
      <HowItWorks look={look} />
      <Categories look={look} />
      <Parents />
      <Team />
      <ApplyBand />
    </>
  );
}
