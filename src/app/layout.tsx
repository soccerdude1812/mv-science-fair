import type { Metadata } from "next";
import { Source_Serif_4, Outfit, JetBrains_Mono } from "next/font/google";
import ConditionalChrome from "@/components/ConditionalChrome";
import "./globals.css";
import { cn } from "@/lib/utils";
import { EVENT } from "@/lib/event";

/* Chalk Lab type stack (DESIGN.md): Source Serif 4 display,
   Outfit body/UI, JetBrains Mono for small data labels only. */

const sourceSerif = Source_Serif_4({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
});

const outfit = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  /* Absolute base for every generated URL, the social card included. Without
     it Next resolves og:image against VERCEL_URL, which is the per deployment
     hostname, not the address on the fliers. EVENT.siteUrl is the one place
     the public URL is written down. */
  metadataBase: new URL(EVENT.siteUrl),
  title: {
    default: "MV Science Fair 2026",
    template: "%s | MV Science Fair 2026",
  },
  description: `The 2026 MV Science Fair is ${EVENT.dateFull}, ${EVENT.timeFull}, at ${EVENT.venueName} (${EVENT.venueRoom}). Thirty-one projects by Mountain View students in grades 3 to 5, organized by the ${EVENT.organizer}. Free, and open to families.`,
  keywords: [
    "science fair",
    "MV Science Fair",
    "Mountain View science fair",
    "Mountain View High School",
    "Mountain View",
    "elementary school",
    "STEM",
    "science project",
    "Amy Imai Elementary",
    "September 26 2026",
  ],
  openGraph: {
    /* No title or description here on purpose. Anything set at the root wins
       over the route's own, so a hard-coded pair here made every page's card
       read "MV Science Fair 2026" with the home page's blurb, however specific
       the page was. Left unset, Next fills them from each route's own title
       (template applied) and description, which is the same reason DESIGN.md
       requires a distinct title per route. */
    type: "website",
    locale: "en_US",
    siteName: "MV Science Fair 2026",
    /* "./" resolves against the CURRENT pathname. An absolute URL here does
       not: it would stamp every route's og:url with the home page, and og:url
       is what Facebook and LinkedIn treat as the canonical identity of a
       shared link, so /fair-day and /sponsors would aggregate as the home
       page. Verified by curling three routes after a production build. */
    url: "./",
    /* The picture itself is src/app/opengraph-image.png, which Next turns into
       og:image plus its type and dimensions. Added 2026-09-20: until then the
       site declared no image at all, so iMessage, Slack and every other
       scraper fell back to the first photo in the markup, which is the first
       portrait in "The students behind it". A shared link to a children's
       science fair previewed as one organizer's face. */
  },
  twitter: {
    /* Without this the card renders as a thumbnail beside the text instead of
       the full width image, which is the whole point of drawing one. Title and
       description are left unset for the same reason as openGraph above. */
    card: "summary_large_image",
  },
};

/** Schema.org Event markup so search engines surface the date and venue directly. */
const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "MV Science Fair 2026",
  description:
    `A student-led science fair for grades 3-5 in Mountain View, organized by the ${EVENT.organizer}.`,
  startDate: EVENT.startISO,
  endDate: EVENT.endISO,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: `${EVENT.venueName}, ${EVENT.venueRoom}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: EVENT.venueStreet,
      addressLocality: EVENT.venueCity,
      addressRegion: EVENT.venueState,
      postalCode: EVENT.venueZip,
      addressCountry: "US",
    },
  },
  organizer: {
    "@type": "Organization",
    name: EVENT.organizer,
    alternateName: EVENT.organizerLong,
    email: EVENT.contactEmail,
  },
  /* Same drawn card the social scrapers get. Google's Event rich result wants
     an image and will otherwise pick one out of the page itself. */
  image: [`${EVENT.siteUrl}/opengraph-image.png`],
  isAccessibleForFree: true,
  /* Free admission, expressed as an Offer so search engines keep showing the
     event as something you can turn up to.
     Changed 2026-09-15: this used to describe ENTERING the fair, pointing at
     the application form and expiring at the Sept 13 deadline. Left alone it
     would have gone stale the moment applications closed and told Google the
     event was no longer available. It now describes ATTENDING, which is true
     until the fair itself ends. */
  offers: {
    "@type": "Offer",
    url: `${EVENT.siteUrl}/fair-day`,
    price: 0,
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    validThrough: EVENT.endISO,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      /* Next 16: restores instant snap-to-top on route navigation while
         keeping CSS smooth scroll for in-page anchors (version-16.md) */
      data-scroll-behavior="smooth"
      className={cn(
        "h-full antialiased",
        sourceSerif.variable,
        outfit.variable,
        jetbrainsMono.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:p-4 focus:bg-coral focus:text-white focus:top-0 focus:left-0 focus:font-bold"
        >
          Skip to main content
        </a>
        <ConditionalChrome>
          <main id="main-content" className="flex-1 relative z-10">
            {children}
          </main>
        </ConditionalChrome>
      </body>
    </html>
  );
}
