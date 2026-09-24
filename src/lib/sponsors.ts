/**
 * This year's sponsors. Single source of truth for the wall on /sponsors.
 *
 * The bar for appearing here is deliberately high, and it is not "the tracker
 * says yes". Every entry below has BOTH halves of an agreement in writing in
 * the club inbox: the business named what it was giving, and the club wrote
 * back and accepted it. A verbal maybe, an offer we never answered, or an
 * acceptance the business never saw does not put a logo on a public page.
 *
 * Verified against the "Science Fair Sponsor Tracker" workbook and the club
 * Gmail thread by thread on 2026-09-20, then changed on Eeshan's call on
 * 2026-09-24:
 *
 * - Elate Link LLC added. Accepted as a digital media partner on Sept 12; the
 *   photo question Mr. Huynh raised on Sept 19 was settled on Sept 23, when
 *   Mr. Robell confirmed the application form's photo release is what we go
 *   by and there is no separate opt-out form. Mr. Huynh replied "Sounds good".
 * - Tori Atwell (The Agency) added. She agreed on Sept 22 to cover about $70
 *   of snacks, water, name tags and a prize, paid to the club personally
 *   rather than through the school account. Her URL is the agent page in her
 *   own email signature.
 * - Heyday and On Waverly removed on Eeshan's call.
 *
 * Still deliberately NOT here:
 *
 * - Santa Cruz Museum of Natural History offered a family membership on
 *   Aug 13 conditional on a Tax ID we do not have. Our answer is still an
 *   unsent draft, so there is no agreement yet, only an offer.
 * - Atlas Skateboarding is on the printed snack table sheet (closed the
 *   evening of Sept 21, 3 shirts and 3 hats) but was never added here.
 * - Tee Rabbit was removed on 2026-09-21. Their donation was printing for the
 *   volunteer shirts, and the 2026-09-21 planning meeting dropped volunteer
 *   shirts as too tight to run. Eeshan's call was to pull the card rather than
 *   credit a contribution that never happened. Put it back the moment they give
 *   something the fair actually uses.
 *
 * Add a sponsor here, never to the page directly, and mirror the change in
 * ~/.claude/tools/mv-signs/build.py, which prints the snack table sheet.
 *
 * `logoHeight` is the rendered height in px, chosen per logo rather than
 * shared, because a 9:1 wordmark and a square seal set to the same height do
 * not read as the same size. Wide lockups get less height, square marks get
 * more, and the shared cap is the 200px logo box width.
 */

export type Sponsor = {
  /** The business as it writes its own name. */
  name: string;
  /** What they are giving, in a few words, in the family's language. */
  gives: string;
  url: string;
  logo: string;
  /** Intrinsic file dimensions, for next/image aspect ratio. */
  width: number;
  height: number;
  /** Rendered height in px. See the note above. */
  logoHeight: number;
};

/**
 * Alphabetical. Sponsorship here is not tiered: a case of apples for the
 * morning and a month of classes get the same card and the same billing,
 * which is what the ask on this page promised.
 */
export const SPONSORS: Sponsor[] = [
  {
    name: "AoPS Academy Mountain View",
    gives: "A set of Beast Academy books",
    url: "https://aopsacademy.org/?campus=mountainview",
    logo: "/sponsors/aops-academy.svg",
    width: 450,
    height: 82,
    logoHeight: 34,
  },
  {
    name: "Campbell Museums",
    gives: "Museum passes",
    url: "https://www.campbellmuseums.com/",
    logo: "/sponsors/campbell-museums.png",
    width: 320,
    height: 320,
    logoHeight: 70,
  },
  {
    name: "DeLeon Realty",
    gives: "A prize basket, and a judge for the morning",
    url: "https://deleonrealty.com/",
    logo: "/sponsors/deleon-realty.svg",
    width: 535,
    height: 535,
    logoHeight: 72,
  },
  {
    name: "DeMartini Orchard",
    gives: "Fruit for everyone in the room",
    url: "https://demartiniorchard.com/",
    logo: "/sponsors/demartini-orchard.png",
    width: 127,
    height: 125,
    logoHeight: 66,
  },
  {
    name: "Drawn2Art Los Altos",
    gives: "A month of art classes",
    url: "https://www.drawn2artstudios.com/los-altos",
    logo: "/sponsors/drawn2art.png",
    width: 700,
    height: 106,
    logoHeight: 30,
  },
  {
    name: "Elate Link LLC",
    gives: "A social media recap of the fair",
    url: "https://elatelink.com/",
    logo: "/sponsors/elate-link.png",
    width: 640,
    height: 489,
    logoHeight: 72,
  },
  {
    name: "SAM Singapore Math Los Altos",
    gives: "A class pass",
    url: "https://seriouslyaddictivemathematics.us/losaltos",
    logo: "/sponsors/sam-singapore-math.png",
    width: 560,
    height: 318,
    logoHeight: 66,
  },
  {
    name: "The Pear Theatre",
    gives: "Tickets to a show",
    url: "https://www.thepear.org/",
    logo: "/sponsors/pear-theatre.png",
    width: 520,
    height: 269,
    logoHeight: 64,
  },
  {
    name: "The UPS Store Los Altos",
    gives: "Printed certificates and signs",
    url: "https://locations.theupsstore.com/ca/los-altos/171-main-st",
    logo: "/sponsors/ups-store.png",
    width: 371,
    height: 62,
    logoHeight: 32,
  },
  {
    name: "Tori Atwell, The Agency",
    gives: "Snacks, water and name tags",
    url: "https://www.theagencyre.com/agent/tori-atwell/",
    logo: "/sponsors/the-agency.svg",
    width: 120,
    height: 120,
    logoHeight: 64,
  },
];
