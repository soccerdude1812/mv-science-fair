import type { Metadata } from "next";
import HomeLab from "@/components/home/HomeLab";

export const metadata: Metadata = {
  title: "Previous home page",
  description: "The original 2026 fair preparation home page, preserved in the archive.",
};

export default function PreviousHomePage() {
  return <HomeLab />;
}
