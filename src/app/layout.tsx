import type { Metadata } from "next";
import { Inter, Geist, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import ConditionalChrome from "@/components/ConditionalChrome";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const interBody = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "MVHS Science Fair 2026",
    template: "%s | MVHS Science Fair 2026",
  },
  description:
    "Inspiring young scientists in Mountain View! The 2026 MVHS Science Fair, organized by the Mountain View High School STEM & Research Club, is open to grades 3-5 elementary school students.",
  keywords: [
    "science fair",
    "MVHS",
    "Mountain View High School",
    "Mountain View",
    "elementary school",
    "STEM",
    "science project",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", inter.variable, interBody.variable, "font-sans", geist.variable, instrumentSerif.variable, jetbrainsMono.variable)}
    >
      <body className="min-h-full flex flex-col bg-transparent text-text-secondary">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:p-4 focus:bg-accent-indigo focus:text-bg-deep focus:top-0 focus:left-0 focus:font-bold"
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
