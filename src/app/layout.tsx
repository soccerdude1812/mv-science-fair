import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const nunito = Nunito({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "MVWSD Science Fair 2026",
    template: "%s | MVWSD Science Fair 2026",
  },
  description:
    "Inspiring young scientists in Mountain View! The 2026 MVWSD Science Fair is open to grades 3-5 elementary school students in the Mountain View Whisman School District.",
  keywords: [
    "science fair",
    "MVWSD",
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
      className={`${fredoka.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg-deep text-text-primary">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:p-4 focus:bg-neon-cyan focus:text-bg-deep focus:top-0 focus:left-0 focus:font-bold"
        >
          Skip to main content
        </a>
        {/* Starfield background */}
        <div className="stars" aria-hidden="true" />
        <Navbar />
        <main id="main-content" className="flex-1 relative">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
