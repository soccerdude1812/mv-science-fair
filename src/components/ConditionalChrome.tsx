"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

/**
 * One chrome for every page. The home page used to carry its own private
 * nav and footer; in the Chalk Lab system the whole site shares this
 * shell. ScrollReveal powers the subpages' .reveal entrances; the home
 * page animates with motion/react and simply has no .reveal elements.
 */
export default function ConditionalChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ScrollReveal />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
