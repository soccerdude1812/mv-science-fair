# Lessons

## [2026-08-11][chrome-pdf-drops-gradient-tiles] Chrome's print-to-PDF renders a tiled radial-gradient background erratically
**Mistake:** Reused the site's `radial-gradient(...) / background-size: 27px` notebook-dot ground on the print flier and checked only the PNG screenshot, which looked right.
**Root cause:** `--screenshot` and `--print-to-pdf` are different render paths. The PNG rasterizes the gradient tile per pixel; the PDF has to express it as a repeating pattern and got it wrong, dropping the dots across most of the page and scattering a few oversized blobs elsewhere. Proven by cropping the same patch of empty paper out of both and viewing them side by side: even dot grid in the PNG, bare cream in the PDF.
**Fix:** Emit the dots as explicit SVG `<circle>` elements (1240 of them on an 8.5x11 sheet, ~40KB) instead of a CSS pattern. Plain vector content that every renderer treats identically.
**Prevention:** A PNG screenshot is not evidence about the PDF. Verify each output format on its own, and prefer explicit geometry over any tiling/pattern mechanism in anything destined for print.

## [2026-08-11][qr-verify-from-artifact] jsQR fails on a small code inside a full-page render
**Mistake:** Verified the flier's QR codes by decoding the whole rendered page in one jsQR call. It returned 0 codes on artifacts whose codes are in fact perfectly scannable, which nearly triggered a pointless redesign of a working layout.
**Root cause:** jsQR binarizes the entire frame at once. When the code occupies a small share of a 1632x2112 render, the global threshold washes it out. Confirmed by rendering the same QR SVG alone at 400x400: decoded instantly.
**Fix:** Sweep tiles instead. Several window sizes (256/384/512/704), half-window stride, dedupe by decoded payload. `fliers/src/verify-qr.mjs`.
**Prevention:** Always decode QR codes back out of the FINAL artifact (PNG and the PDF rasterized), then fetch each decoded URL and assert on the page title. Checking the source SVG proves nothing about layout, scaling or rasterisation, and a dead code on a printed flier cannot be fixed after it goes on a wall.

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

## [2026-08-09][forms-sheet-linking] Google Forms response destination is not settable via API
**Mistake:** Assumed the Forms API could point a form's responses at an existing spreadsheet, so the master tracker was designed around API-created response tabs.
**Root cause:** `Form.linkedSheetId` is output-only in Forms API v1. There is no `setLinkedSheet` request, and the Sheets API has no form-attach request either. The only path is the Forms web UI.
**Fix:** Drove the UI with browser automation for all 7 forms. Working sequence: `/edit#responses` → click the Responses tab → click "Link to Sheets" (the first click after page load typically only focuses the button; expect two clicks) → "Select existing spreadsheet" → Select → **double-click** the file card in the Drive picker. A single click selects the file but the "Insert" action bar renders below the visible dialog region and cannot be clicked.
**Prevention:** For Forms work, assume anything about response *destination* or *accepting-responses UI state* is manual. What IS scriptable: `forms.setPublishSettings` (unpublish / stop accepting responses), `forms.get`, `forms.responses.list`, and renaming/moving the generated response tabs afterwards via the Sheets API.

## [2026-08-09][forms-delete-leaves-sheet-column] Deleting a Form question leaves an orphan column in the linked sheet
**Mistake:** Deleted the "Will your child need access to an electrical outlet?" question from the application form and assumed the linked response sheet would follow.
**Root cause:** Google keeps the response column in a form-linked sheet after its question is deleted, header and all. Verified by re-reading `RAW · Applications!A1:BB1` after the `deleteItem` batchUpdate: column Z survived with its original header. Forms maps columns by question ID, so the orphan is simply never written to again.
**Fix:** Left the orphan RAW column alone (deleting columns in a form-linked sheet risks the mapping) and deleted the corresponding column from the *working view* tab, which is where humans actually look.
**Prevention:** Any working view that references RAW columns by letter is coupled to form structure. After a question delete: re-read the RAW header row, fix the view, then re-read the Dashboard formulas. Sheets auto-adjusts A1 references on a column delete (verified: `Applicants!$R` → `$Q` across all six Dashboard counters) but does NOT adjust column letters inside `QUERY()` string arguments, which are text.

## [2026-08-09][build-does-not-lint] "Build clean" is not "lint clean" on Next 16 + Turbopack
**Mistake:** Shipped a `useEffect` that calls `setState` synchronously after verifying `npx tsc --noEmit` and `npm run build` both passed. `npm run lint` failed on it the whole time: `react-hooks/set-state-in-effect`.
**Root cause:** `next build` with Turbopack does not invoke eslint, so a build can be green while the repo's own lint gate is red. The two checks cover different things and neither implies the other.
**Fix:** Removed the effect entirely and closed the disclosure from explicit `onClick` handlers instead, which was also the correct fix for a real bug (see below). `npm run lint` now exits 0.
**Prevention:** The pre-PR gate is `npm run lint && npx tsc --noEmit && npm run build`, all three, every time. Never report "build clean" as evidence that a change is ready.

## [2026-08-09][pathname-effect-noop-nav] Closing a menu from a pathname effect breaks on same-page links
**Mistake:** Closed a nav dropdown with `useEffect(() => setSupportOpen(false), [pathname])`. Clicking the link for the page you are already on left the panel stuck open with `aria-expanded="true"`.
**Root cause:** A `Link` to the current route is a no-op navigation. `pathname` never changes, so a pathname-keyed effect never re-fires. Reproduced in the browser: on `/volunteer`, open the panel, click "Volunteer", panel still mounted.
**Fix:** `onClick={() => setSupportOpen(false)}` on each link, matching what the mobile sheet already did.
**Prevention:** Dismissing UI on navigation is an event, not derived state. Handle it where the click happens. Any menu test matrix must include "click the link for the page you are already on".

## [2026-08-09][subagent-pushed-to-main] A review subagent committed and pushed straight to main
**Mistake:** Dispatched the `code-reviewer` agent to review a branch. It checked out `main`, re-committed the branch's tree onto it, pushed to `origin/main`, and deleted the feature branch. No PR was ever opened. Confirmed from reflog: `checkout: moving from fix/nav-support-dropdown to main` followed by `commit:`.
**Root cause:** The `code-reviewer` agent definition grants `Bash`, `Write`, and `Edit`. A read-only-sounding task is not a read-only agent, and the review prompt did not forbid mutating git state.
**Fix:** Left the pushed commit in place; force-pushing `main` is gated. Shipped the follow-up fixes through a real PR instead.
**Prevention:** Review prompts must say explicitly: do not modify files, do not run any git command that writes (`commit`, `checkout`, `push`, `branch`, `reset`). Check `git branch --show-current` and `git log --oneline -1` after any subagent that had Bash.

## [2026-08-09][duplicate-drafts-got-sent] Fixing a bad artifact by creating a corrected copy got the bad one sent
**Mistake:** Found the wrong site URL in 10 sponsorship drafts. Instead of correcting them, I created 10 corrected duplicates and left the broken originals in the same Drafts list. The 8 originals that had recipients were the ones sent, so 8 cold emails went to real businesses carrying a dead link.
**Root cause:** Two near-identical sets of drafts with the same subject line, sorted by time, in a mailbox a human was about to act in. The correction was additive when it needed to be a replacement. I also reported "10 stale drafts" from memory; the mailbox actually held 2 stale drafts and 8 sent messages, which I only found by searching the whole account instead of `in:drafts`.
**Fix:** Sent threaded reply corrections to all 8 with the right URL, trashed the redundant drafts so exactly one draft exists per recipient, and recorded real send times in the Email Log, which had said "(not sent)" for all 8.
**Prevention:** Never leave a broken artifact beside its replacement. Fix in place, or delete/trash the broken one in the same action that creates the good one. When reporting mailbox state, search the whole account (`website-sigma-ochre`, no `in:` filter) rather than the folder you expect, and re-verify before telling the user what to delete.
**Also:** the stem-gws MCP can create drafts but cannot send. The `gws` CLI is authed as the personal account, not the club. Sending from the club inbox requires driving Gmail in Chrome, where the club account is `u/5` and `u/0` is a personal mailbox.
