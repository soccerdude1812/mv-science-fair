/**
 * Single source of truth for event date, time, venue, and deadlines.
 *
 * Venue confirmed 2026-08-04. Address verified against imai.mvwsd.org/contact_us.
 * Note: Amy Imai Elementary is an MVWSD facility, but the fair is organized by the
 * MVHS STEM & Research Club and is NOT affiliated with or endorsed by MVWSD.
 * The venue is a location only — do not imply district sponsorship.
 */

export const EVENT = {
  /** Saturday, September 26, 2026 */
  dateFull: "Saturday, September 26, 2026",
  dateMedium: "Sat, September 26, 2026",
  dateShort: "Sat, Sept 26",
  dateNumeric: "2026-09-26",

  timeFull: "9:00 AM – 12:00 PM",
  timeShort: "9AM–12PM",
  startISO: "2026-09-26T09:00:00-07:00",
  endISO: "2026-09-26T12:00:00-07:00",

  venueName: "Amy Imai Elementary School",
  venueRoom: "Multi-Use Room (MUR)",
  venueShort: "Amy Imai Elementary — MUR",
  venueStreet: "253 Martens Ave",
  venueCity: "Mountain View",
  venueState: "CA",
  venueZip: "94040",
  venueAddress: "253 Martens Ave, Mountain View, CA 94040",
  venueMapUrl:
    "https://maps.google.com/?q=Amy+Imai+Elementary+School,+253+Martens+Ave,+Mountain+View,+CA+94040",

  /** Applications reviewed on a rolling basis; hard close Friday, September 4, 2026. */
  applicationDeadline: "Friday, September 4, 2026",
  applicationDeadlineShort: "Sept 4",

  contactEmail: "eeshankhandelwal123@gmail.com",
} as const;

/** Full milestone schedule, shared by the homepage process rail and the Timeline component. */
export const SCHEDULE = [
  {
    n: "01",
    title: "Interest Form",
    when: "Now Open",
    short: "Now Open",
    body: "Fill out the interest form to let us know you want to participate. This is the first signal we collect, and it unlocks everything that follows.",
  },
  {
    n: "02",
    title: "Applications Open",
    when: `Now – ${EVENT.applicationDeadlineShort}`,
    short: `Now – ${EVENT.applicationDeadlineShort}`,
    body: "Submit your project application with your topic, hypothesis, team members, and a short description. One form covers registration, consent, and project details. Applications close Friday, September 4 — but apply early: we review as applications arrive, and you can start building the moment you're approved.",
  },
  {
    n: "03",
    title: "Approval & Safety Review",
    when: "Rolling review",
    short: "Rolling",
    body: "The Science Fair Committee reviews each application as it arrives — usually within about three school days. If we need changes, we'll email you, and you resubmit for a quick second look. Wait for confirmation before starting your experiment.",
  },
  {
    n: "04",
    title: "Project Work Period",
    when: "Approval – Sept 18",
    short: "Approval – Sept 18",
    body: "Conduct your experiments, run at least three trials, collect data honestly, and keep a date-stamped logbook. You start as soon as you're approved, so earlier applications get more build time. Mentors are here to help — but the work is yours.",
  },
  {
    n: "05",
    title: "Display Board & Rehearsal",
    when: "Sept 19 – 25",
    short: "Sept 19 – 25",
    body: "Build your tri-fold board: title, abstract, question, hypothesis, materials, procedure, data, conclusion, and citations. Name on the back only — for fair judging. Practice presenting out loud before fair day.",
  },
  {
    n: "06",
    title: "Science Fair Day",
    when: `${EVENT.dateShort} · ${EVENT.timeShort}`,
    short: EVENT.dateShort,
    body: `Present to judges and visitors at ${EVENT.venueName} — ${EVENT.venueRoom}, ${EVENT.venueAddress}. Doors ${EVENT.timeFull}. Six criteria: scientific thought, creativity, thoroughness, skill, clarity, and presentation. Celebrate what you discovered.`,
  },
] as const;
