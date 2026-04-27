"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScienceBackground from "@/components/ScienceBackground";
import ScrollReveal from "@/components/ScrollReveal";

export default function ConditionalChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (isHome) {
    return <>{children}</>;
  }

  return (
    <>
      <ScienceBackground />
      <ScrollReveal />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
