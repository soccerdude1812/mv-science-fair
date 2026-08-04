"use client";

import { useEffect } from "react";

const SELECTOR = [
  ".reveal:not([data-revealed])",
  ".reveal-left:not([data-revealed])",
  ".reveal-right:not([data-revealed])",
  ".reveal-scale:not([data-revealed])",
].join(",");

const ALL = ".reveal,.reveal-left,.reveal-right,.reveal-scale";

/**
 * Scroll-triggered reveal animations.
 *
 * This runs inside an effect rather than as an inline <script> on purpose.
 * The previous implementation injected a script that marked elements during
 * DOMContentLoaded — before React hydrated — so React's hydration pass found
 * DOM attributes that its server HTML didn't have and logged
 * "A tree hydrated but some attributes of the server rendered HTML didn't
 * match the client properties" on every page load. React 19 diffs data
 * attributes as well as className, so the fix is timing, not which attribute
 * we set: effects only run after the subtree has hydrated, so there is
 * nothing left to mismatch.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const reveal = (el: Element) => el.setAttribute("data-revealed", "");

    // Without IntersectionObserver, show everything rather than leaving the
    // page blank at opacity 0.
    if (typeof IntersectionObserver === "undefined") {
      document.querySelectorAll(ALL).forEach(reveal);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal(entry.target);
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -30px 0px" }
    );

    let queued = false;
    const scan = () => {
      queued = false;
      document.querySelectorAll(SELECTOR).forEach((el) => io.observe(el));
    };
    // Coalesce bursts of mutations into one scan per frame.
    const queueScan = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(scan);
    };

    scan();

    const mo = new MutationObserver(queueScan);
    mo.observe(document.documentElement, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  // Content is hidden by default and revealed by the observer above, so
  // without JavaScript the page would render blank. Force it visible.
  return (
    <noscript>
      <style>{`${ALL}{opacity:1!important;transform:none!important}`}</style>
    </noscript>
  );
}
