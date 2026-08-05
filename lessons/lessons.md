# Lessons

## [2026-08-05][motion-svg-origin] Motion forces transform-box: fill-box on SVG
**Mistake:** Set `transformOrigin`/`transform-box: view-box` in CSS for a motion.g rotating around an exact viewBox point (the beaker's pour lip); Motion silently overrode both, so the stream rotated around the wrong point and never appeared where expected.
**Root cause:** motion/react manages transform-origin itself for SVG elements and applies `transform-box: fill-box`; plain CSS on the same element loses.
**Fix:** Express the anchor through Motion's `originX`/`originY` props as FRACTIONS of the element's bbox (verified via getBBox in the browser), not px, not CSS.
**Prevention:** Any motion.* SVG element that must rotate/scale around a specific point: compute bbox → fractional origin, and verify with getComputedStyle in the browser before trusting it.

## [2026-08-05][next16-smooth-scroll] Next 16 stopped overriding scroll-behavior: smooth on navigation
**Mistake:** Added `html { scroll-behavior: smooth }` for anchor links; every client-side route change then visibly smooth-scrolled to top.
**Root cause:** Next 16 no longer auto-overrides the CSS during SPA transitions (documented in upgrading/version-16.md).
**Fix:** `data-scroll-behavior="smooth"` on the `<html>` element restores instant snap on nav while keeping smooth in-page anchors.
**Prevention:** AGENTS.md is right: read `node_modules/next/dist/docs/` before assuming v14/15 behavior.

## [2026-08-04][jsx-wrap-grep] JSX line-wrapping defeats single-line greps
**Mistake:** Declared a copy string removed because `grep -rn "three school days" src/` returned nothing; the phrase survived, wrapped across JSX lines, and shipped.
**Root cause:** JSX formatters break sentences mid-phrase; single-line grep can't see across the break.
**Fix:** Grep the RENDERED HTML (curl the route) for copy audits; that's what audit_site.sh does.
**Prevention:** Copy-level audits run against rendered output, never only source.
