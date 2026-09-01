import type { Metadata } from "next";
import { Source_Serif_4, Outfit, JetBrains_Mono } from "next/font/google";
import ConditionalChrome from "@/components/ConditionalChrome";
import "./globals.css";
import { cn } from "@/lib/utils";
import { EVENT, APPLICATION_URL } from "@/lib/event";

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
  title: {
    default: "MV Science Fair 2026",
    template: "%s | MV Science Fair 2026",
  },
  description: `Inspiring young scientists in Mountain View! The 2026 MV Science Fair is ${EVENT.dateFull}, ${EVENT.timeFull}, at ${EVENT.venueName} (${EVENT.venueRoom}). Organized by the Mountain View High School STEM & Research Club, open to grades 3-5. Applications close ${EVENT.applicationDeadline}.`,
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
    title: "MV Science Fair 2026",
    description: `${EVENT.dateFull} · ${EVENT.timeFull} · ${EVENT.venueName}, ${EVENT.venueAddress}. Open to grades 3-5. Applications close ${EVENT.applicationDeadline}.`,
    type: "website",
    locale: "en_US",
  },
};

/** Schema.org Event markup so search engines surface the date and venue directly. */
const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "MV Science Fair 2026",
  description:
    "A student-led science fair for grades 3-5 in Mountain View, organized by the Mountain View High School STEM & Research Club.",
  startDate: EVENT.startISO,
  endDate: EVENT.endISO,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: `${EVENT.venueName} — ${EVENT.venueRoom}`,
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
    name: "Mountain View High School STEM & Research Club",
    email: EVENT.contactEmail,
  },
  isAccessibleForFree: true,
  /* Free registration, expressed as an Offer so search engines can show the
     application window and stop surfacing the event once entries have closed. */
  offers: {
    "@type": "Offer",
    url: APPLICATION_URL,
    price: 0,
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    validThrough: EVENT.applicationDeadlineISO,
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
