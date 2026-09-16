"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Standard entrance for home-page content (DESIGN.md motion spec):
 * rise 16px + fade, 0.55s, ease [0.16,1,0.3,1], fire once at 30%
 * visibility. Communicates reading order, nothing else.
 *
 * `as` exists for one reason: wrapping an <li> in a <div> breaks the list for a
 * screen reader. A <ul> may only contain <li>, so `<Reveal>` inside a list has
 * to BE the list item rather than wrap it. Passing as="li" renders motion.li and
 * the markup stays a real list. (Caught by axe on 2026-09-15: the home page was
 * reporting 2 broken lists and 10 orphaned list items, which is every step in
 * "What is left to do" and every face in the team row.)
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li";
}) {
  const reduce = useReducedMotion();
  const Motion = as === "li" ? motion.li : motion.div;
  return (
    <Motion
      className={className}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Motion>
  );
}
