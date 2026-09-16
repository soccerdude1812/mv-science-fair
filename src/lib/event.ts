/**
 * Single source of truth for event date, time, venue, and deadlines.
 *
 * Venue confirmed 2026-08-04. Address verified against imai.mvwsd.org/contact_us.
 * Naming: the event is the "MV Science Fair". Not "MVHS Science Fair", not
 * "MVWSD Science Fair". MVHS may still appear as the ORGANIZER, just never in
 * the event name.
 *
 * The organizer is the "MVHS STEM & Research Club", one spelling everywhere, as
 * of 2026-08-31: the club completed its school re-registration, so the MVHS
 * attribution is now an official one rather than a description of where its
 * members happen to go to school. It had been written four different ways.
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

  timeFull: "9:00 AM to 12:00 PM",
  timeShort: "9AM to 12PM",
  startISO: "2026-09-26T09:00:00-07:00",
  endISO: "2026-09-26T12:00:00-07:00",

  /**
   * Participants arrive and set up in the hour before doors open, so every
   * board is standing and every student is ready when the first visitor walks
   * in at 9:00.
   *
   * This is a PARTICIPANT window, not a public one. Judges have their own
   * check-in time and visitors are told 9:00, so it appears only on the
   * surfaces students and families read, never in the schema.org start time or
   * the general "when is the fair" copy. `EventDetails` gates it behind an
   * opt-in `arrival` prop for that reason.
   *
   * Source of truth, and it is not a guess: every project approval letter the
   * club sent through 2026-09-13 closes with "Saturday, September 26, 2026,
   * 9:00 AM to 12:00 PM (arrival and setup 8 to 9 AM)". Thirty-one families
   * already hold that sentence in writing. It was written on 2026-09-01 and
   * published to the site on 2026-09-15, which is the whole reason this
   * constant exists: for two weeks the window lived in outbound email and
   * nowhere a family could look it up.
   */
  arrivalWindowFull: "8:00 AM to 9:00 AM",
  arrivalWindowShort: "8AM to 9AM",
  arrivalStartISO: "2026-09-26T08:00:00-07:00",

  /**
   * The organizing club. One spelling, used everywhere: site copy, form
   * descriptions, the printed fliers and outbound email. `organizerLong` exists
   * only for schema.org's alternateName, so a parent searching "Mountain View
   * High School science fair" still finds the event.
   */
  organizer: "MVHS STEM & Research Club",
  organizerLong: "Mountain View High School STEM & Research Club",

  venueName: "Amy Imai Elementary School",
  venueRoom: "Multi-Use Room (MUR)",
  venueShort: "Amy Imai Elementary, MUR",
  venueStreet: "253 Martens Ave",
  venueCity: "Mountain View",
  venueState: "CA",
  venueZip: "94040",
  venueAddress: "253 Martens Ave, Mountain View, CA 94040",
  venueMapUrl:
    "https://maps.google.com/?q=Amy+Imai+Elementary+School,+253+Martens+Ave,+Mountain+View,+CA+94040",

  /**
   * Applications reviewed on a rolling basis; hard close Sunday, September 13,
   * 2026 at 11:59 PM. Extended from Friday, September 4 on 2026-08-31 to widen
   * the window. The fair itself does not move: it is still September 26.
   *
   * The cutoff time is part of the deadline now, not decoration. It is stated
   * wherever the deadline appears as a sentence, so a family reading the site
   * on the 13th can tell they still have the day.
   */
  applicationDeadline: "Sunday, September 13, 2026",
  applicationDeadlineShort: "Sept 13",
  applicationDeadlineTime: "11:59 PM",
  applicationDeadlineFull: "Sunday, September 13, 2026 at 11:59 PM",
  /** Local cutoff instant, for schema.org and anything that needs a real date. */
  applicationDeadlineISO: "2026-09-13T23:59:00-07:00",

  /**
   * Public inbox for all questions. Deliberately the club address, not a
   * personal one: it outlives any single officer and reads as an
   * organization to parents. Changed 2026-08-05 (was a personal Gmail).
   * The Google Forms carry the same address in their descriptions.
   */
  contactEmail: "stemresearchclubmvhs@gmail.com",

  /**
   * The live site. Recorded here on 2026-08-09 because it was NOT written
   * down anywhere in the repo and the GitHub repo `homepageUrl` field points
   * at a stale, unrelated Vercel project (website-sigma-ochre.vercel.app),
   * which is exactly the kind of thing that ends up pasted into an outbound
   * sponsorship email. Anything that needs the public URL reads it here.
   */
  siteUrl: "https://mvsciencefair.vercel.app",
} as const;

/**
 * The application form. CLOSED as of 2026-09-13 at 11:59 PM, with 32
 * submissions and 31 approved projects.
 *
 * It is kept as a constant, and deliberately NOT linked as a call to action
 * anywhere, because two things are both true: the window is over, and the URL
 * is printed on a flier and sitting in inboxes, so the site still has to be
 * able to talk about the form in the past tense. `/forms` names it, marks it
 * closed, and does not link it. If you are about to add an href to this
 * constant, you are almost certainly reopening something that is shut.
 *
 * Known loose end as of 2026-09-15: the Google Form itself was still accepting
 * responses two days after the deadline. The site no longer sends anyone there,
 * but a late submission from an old link would land in the tracker unannounced.
 * Closing it is a decision for the organizers, not for this file.
 */
export const APPLICATION_URL =
  "https://docs.google.com/forms/d/1Uys9ePwF965Nn722dpa3eSypNVK9tLp-J4PnvOGN4xg/viewform";

/**
 * Mentor request form, for parents asking for a high school mentor. Promoted
 * to a shared constant on 2026-08-11: it used to be linked from /forms only,
 * so a family that went application form to approval email never saw it.
 *
 * Since 2026-09-15 it also anchors `/mentors`, and the offer it carries there
 * is deliberately smaller than the one it carried in August. Before the
 * deadline it meant "a high schooler for one to two hours a week through your
 * whole project"; with eleven days left it means one or two sessions before the
 * 26th on a specific stuck point. Same form, honest framing, because the
 * reservoir is thin: one mentor is carrying two projects and is the only cover
 * for Physical Science & Engineering. Mentors are high school student
 * volunteers, never teachers or other adults.
 */
export const MENTOR_REQUEST_URL =
  "https://docs.google.com/forms/d/1KctjqLpK1bSmvTULL0OjStBtLDaBQhSY_xb-NmvyxOg/viewform";

/**
 * Sponsor interest form. Added 2026-08-09 alongside /sponsors, so businesses
 * reached by outreach have somewhere to land that is not a bare mailto.
 * Responses flow into the master tracker workbook in Drive.
 */
export const SPONSOR_INTEREST_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScvF2zszjJrKxpSN_-3LPg9UqpoVCemxUoDGK65HuPoB06Aww/viewform";
