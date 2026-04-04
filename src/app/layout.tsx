import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import ScienceBackground from "@/components/ScienceBackground";
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
      className={cn("h-full", "antialiased", inter.variable, interBody.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col bg-transparent text-text-secondary">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:p-4 focus:bg-accent-indigo focus:text-bg-deep focus:top-0 focus:left-0 focus:font-bold"
        >
          Skip to main content
        </a>
        <ScienceBackground />
        <ScrollReveal />
        <Navbar />
        <main id="main-content" className="flex-1 relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
