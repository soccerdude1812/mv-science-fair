import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { Gear } from "@/components/lab/cast";
import { EVENT } from "@/lib/event";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Our team",
  description: `The high school students who run the MV Science Fair, organized by the ${EVENT.organizer}.`,
};

/**
 * Who runs the fair, Chalk Lab system.
 *
 * This is the one page on the site that carries photography. DESIGN.md
 * otherwise says the hand-drawn cast is the imagery, and that rule still
 * holds everywhere else: a team page is the single place where a parent is
 * owed real faces rather than a doodle, so the exception is written into
 * DESIGN.md rather than left as silent drift.
 *
 * Portraits come from the MV Physics & Astronomy Club site (mvhsastro.org),
 * re-cropped to a common 4:5 frame with the eye line at 40% so six photos
 * taken in six different places read as one row.
 *
 * Mr. Simon Huynh, faculty advisor, is deliberately not listed yet. He has
 * been asked whether he wants to be and which photo to use, and he goes in
 * only once he says yes. The ADVISOR block below is the whole change.
 */

type Member = {
  name: string;
  role: string;
  photo: string;
  tone: "marigold" | "blue" | "green";
};

const TEAM: Member[] = [
  {
    name: "Eeshan Khandelwal",
    role: "Project Organizer & Club Vice-President",
    photo: "/team/eeshan.jpg",
    tone: "marigold",
  },
  {
    name: "Aryan Khanna",
    role: "Club President",
    photo: "/team/aryan_khanna.jpg",
    tone: "marigold",
  },
  {
    name: "Tristan Schaefer",
    role: "Outreach Relations",
    photo: "/team/tristan.jpg",
    tone: "blue",
  },
  {
    name: "David Cho",
    role: "Student Mentor & Volunteer",
    photo: "/team/david.jpg",
    tone: "green",
  },
  {
    name: "Neel Chhatrala",
    role: "Student Mentor & Volunteer",
    photo: "/team/neel.jpg",
    tone: "green",
  },
  {
    name: "Vidu Senadheera",
    role: "Student Mentor & Volunteer",
    photo: "/team/vidu.jpg",
    tone: "green",
  },
];

// Once Mr. Huynh confirms, add him here and render the block below.
// const ADVISOR: Member = {
//   name: "Simon Huynh",
//   role: "Faculty Advisor",
//   photo: "/team/simon.jpg",
//   tone: "blue",
// };

const chipClass = {
  marigold: "chip chip--marigold",
  blue: "chip chip--blue",
  green: "chip chip--green",
} as const;

function PersonCard({ member, index }: { member: Member; index: number }) {
  return (
    <li
      className={`reveal stagger-${(index % 3) + 1} card-soft flex h-full flex-col overflow-hidden p-3`}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-paper-warm">
        <Image
          src={member.photo}
          alt={member.name}
          fill
          sizes="(max-width: 640px) 44vw, (max-width: 768px) 30vw, 300px"
          className="object-cover"
        />
      </div>
      {/* A fixed floor under the name and chip. Without it a role that wraps
          to two lines makes its whole grid row taller than the next one. */}
      <div className="flex min-h-[5.25rem] flex-1 flex-col px-2 pb-2 pt-4">
        <h3 className="font-display text-[1.15rem] font-semibold leading-tight text-ink">
          {member.name}
        </h3>
        {/* Two columns on a phone leave a long role wrapping to three ragged
            lines, so below sm the chip becomes a full-width role band and only
            hugs its text once there is room for one line. */}
        <span
          className={`${chipClass[member.tone]} mt-3 self-stretch justify-center text-center text-xs leading-snug sm:self-start sm:justify-start sm:text-left`}
        >
          {member.role}
        </span>
      </div>
    </li>
  );
}

export default function TeamPage() {
  return (
    <>
      <PageHero
        title="Our team"
        subtitle={`The MV Science Fair is planned, run, and judged by high school students from the ${EVENT.organizer}.`}
      />

      <div className="mx-auto max-w-5xl space-y-14 px-4 py-10 sm:px-6 sm:py-16 md:py-20 lg:px-8">
        {/* Why a page of faces exists at all */}
        <section className="reveal flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <h2 className="display-section">Students, all the way down</h2>
            <p className="mt-4 text-lg text-ink-soft">
              We read every application, write the feedback ourselves, and set
              the room up on fair day. Here is who that is.
            </p>
          </div>
          <Gear className="w-28 shrink-0 h-auto" />
        </section>

        {/* The people */}
        <section aria-labelledby="crew-heading">
          <h2 id="crew-heading" className="sr-only">
            Team members
          </h2>
          <ul className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3">
            {TEAM.map((member, i) => (
              <PersonCard key={member.name} member={member} index={i} />
            ))}
          </ul>
          <p className="reveal mt-6 text-[0.9rem] text-ink-faint">
            Mentors are high school student volunteers. They guide a student
            through the scientific method for about one to two hours a week,
            and they are free and completely optional.
          </p>
        </section>

        {/* Join us */}
        <section className="reveal card-soft p-7 sm:p-9">
          <p className="data-label mb-3">Join us</p>
          <h2 className="display-section">There is room for you here</h2>
          <p className="mt-4 max-w-2xl text-lg text-ink-soft">
            High schoolers and community members can help on fair day. High
            school students can also mentor a young scientist for the weeks
            before it.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/volunteer" className="btn-primary">
              See both volunteer roles
              <ArrowRight size={17} strokeWidth={2} aria-hidden="true" />
            </Link>
            <a href={`mailto:${EVENT.contactEmail}`} className="btn-ghost">
              Email us a question
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
