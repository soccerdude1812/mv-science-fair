"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Standard entrance for home-page content (DESIGN.md motion spec):
 * rise 16px + fade, 0.55s, ease [0.16,1,0.3,1], fire once at 30%
 * visibility. Communicates reading order, nothing else.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
