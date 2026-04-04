"use client";

import { useEffect } from "react";

export function useScrollReveal() {
  useEffect(() => {
    // Use double-rAF to ensure DOM is fully painted and layout is complete
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.05, rootMargin: "0px 0px -30px 0px" }
        );

        const revealElements = document.querySelectorAll(
          ".reveal, .reveal-left, .reveal-right, .reveal-scale"
        );
        revealElements.forEach((el) => observer.observe(el));

        // Store ref for cleanup
        (window as unknown as Record<string, unknown>).__scrollRevealObserver = observer;
      });
    });

    return () => {
      const obs = (window as unknown as Record<string, unknown>).__scrollRevealObserver as IntersectionObserver | undefined;
      if (obs) obs.disconnect();
    };
  }, []);
}
