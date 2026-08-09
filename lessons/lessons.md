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
