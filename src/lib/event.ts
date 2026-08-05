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

  timeFull: "9:00 AM to 12:00 PM",
  timeShort: "9AM to 12PM",
  startISO: "2026-09-26T09:00:00-07:00",
  endISO: "2026-09-26T12:00:00-07:00",

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

  /** Applications reviewed on a rolling basis; hard close Friday, September 4, 2026. */
  applicationDeadline: "Friday, September 4, 2026",
  applicationDeadlineShort: "Sept 4",

  /**
   * Public inbox for all questions. Deliberately the club address, not a
   * personal one: it outlives any single officer and reads as an
   * organization to parents. Changed 2026-08-05 (was a personal Gmail).
   * The Google Forms carry the same address in their descriptions.
   */
  contactEmail: "stemresearchclubmvhs@gmail.com",
} as const;

/**
 * The application form is the single entry point for students. The old
 * interest form is retired: it existed to gauge demand before applications
 * opened, and is no longer linked anywhere on the site.
 */
export const APPLICATION_URL =
  "https://docs.google.com/forms/d/1Uys9ePwF965Nn722dpa3eSypNVK9tLp-J4PnvOGN4xg/viewform";
