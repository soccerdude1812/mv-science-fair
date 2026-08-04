/**
 * Single source of truth for event date, time, venue, and deadlines.
 *
 * Venue confirmed 2026-08-04. Address verified against imai.mvwsd.org/contact_us.
 * Naming: the event is the "MV Science Fair". Not "MVHS Science Fair", not
 * "MVWSD Science Fair". MVHS/Mountain View High School may still appear as the
 * ORGANIZER (the STEM & Research Club runs it), just never in the event name.
 *
 * MVWSD appears in exactly two places on purpose: the footer non-affiliation
 * disclaimer, and the liability waiver in the application form. Amy Imai is an
 * MVWSD facility, so the district is named there as venue owner. Nowhere else.
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

/**
 * The application form is the single entry point for students. The old
 * interest form is retired: it existed to gauge demand before applications
 * opened, and is no longer linked anywhere on the site.
 */
export const APPLICATION_URL =
  "https://docs.google.com/forms/d/1Uys9ePwF965Nn722dpa3eSypNVK9tLp-J4PnvOGN4xg/viewform";

/** Full milestone schedule, shared by the homepage process rail and the Timeline component. */
export const SCHEDULE = [
  {
    n: "01",
    title: "Apply",
    when: `Open now – ${EVENT.applicationDeadlineShort}`,
    short: `Now – ${EVENT.applicationDeadlineShort}`,
    body: "Submit your application with your topic, hypothesis, team members, and a short description. One form covers registration, consent, and project details. Applications close Friday, September 4 — but apply early: we review as applications arrive, and you can start building the moment you're approved.",
  },
  {
    n: "02",
    title: "Approval & Safety Review",
    when: "Rolling review",
    short: "Rolling",
    body: "The Science Fair Committee reviews each application as it arrives — usually within about three school days. If we need changes, we'll email you, and you resubmit for a quick second look. Wait for confirmation before starting your experiment.",
  },
  {
    n: "03",
    title: "Project Work Period",
    when: "Approval – Sept 18",
    short: "Approval – Sept 18",
    body: "Conduct your experiments, run at least three trials, collect data honestly, and keep a date-stamped logbook. You start as soon as you're approved, so earlier applications get more build time. Mentors are here to help — but the work is yours.",
  },
  {
    n: "04",
    title: "Display Board & Rehearsal",
    when: "Sept 19 – 25",
    short: "Sept 19 – 25",
    body: "Build your tri-fold board: title, abstract, question, hypothesis, materials, procedure, data, conclusion, and citations. Name on the back only — for fair judging. Practice presenting out loud before fair day.",
  },
  {
    n: "05",
    title: "Science Fair Day",
    when: `${EVENT.dateShort} · ${EVENT.timeShort}`,
    short: EVENT.dateShort,
    body: `Present to judges and visitors at ${EVENT.venueName} — ${EVENT.venueRoom}, ${EVENT.venueAddress}. The fair runs ${EVENT.timeFull}. Six criteria: scientific thought, creativity, thoroughness, skill, clarity, and presentation. Celebrate what you discovered.`,
  },
] as const;
