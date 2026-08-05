"use client";

import { useEffect } from "react";
import {
  useMotionValue,
  useSpring,
  useReducedMotion,
  type MotionValue,
} from "motion/react";

export type Look = { x: MotionValue<number>; y: MotionValue<number> };

/**
 * Shared pupil-tracking springs. All characters on a page share one Look,
 * so the whole cast glances in the same direction, which reads as a group
 * of characters reacting to the visitor rather than six separate gimmicks.
 *
 * Pointer position is normalized to the viewport center and clamped to a
 * few pixels of travel. Motion values bypass React renders entirely, and
 * under prefers-reduced-motion the pupils simply stay put.
 */
export function useLook(): Look {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 110, damping: 16 });
  const y = useSpring(my, { stiffness: 110, damping: 16 });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 4.6);
      my.set((e.clientY / window.innerHeight - 0.5) * 3.6);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my, reduce]);

  return { x, y };
}
