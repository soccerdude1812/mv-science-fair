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
 * Gmail thread by thread on 2026-09-20. Four names in that tracker's Yes
 * column are deliberately NOT here:
 *
 * - Santa Cruz Museum of Natural History offered a family membership on
 *   Aug 13 conditional on a Tax ID we do not have. Our answer is still an
 *   unsent draft, so there is no agreement yet, only an offer.
 * - Tori Atwell (The Agency) is still working out what the contribution is.
 *   Her last message asks what the cost would be. Nothing is settled.
 * - Atlas Skateboarding agreed to tees and a hat, then shipping stalled:
 *   they ask the recipient to cover postage or collect in San Mateo, and the
 *   last word in the thread is ours.
 * - Elate Link LLC was accepted as a digital media partner on Sept 12, but
 *   photographing students needs a consent process the advisor raised on
 *   Sept 19 and it is unresolved.
 *
 * When any of those four closes, add it here and the wall picks it up.
 * Do not add a sponsor to the page directly.
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
    name: "Heyday",
    gives: "California nature books",
    url: "https://www.heydaybooks.com/",
    logo: "/sponsors/heyday.png",
    width: 640,
    height: 234,
    logoHeight: 56,
  },
  {
    name: "On Waverly",
    gives: "A gift bag of books and swag",
    url: "https://www.onwaverly.com/",
    logo: "/sponsors/on-waverly.png",
    width: 700,
    height: 81,
    logoHeight: 23,
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
    name: "Tee Rabbit",
    gives: "Printing for the volunteer shirts",
    url: "https://www.teerabbit.com/",
    logo: "/sponsors/tee-rabbit.svg",
    width: 720,
    height: 174,
    logoHeight: 44,
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
];
