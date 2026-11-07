# Bootstrap Migration Implementation Plan

> Execute the approved two-step migration in this chat. Use the verification-before-completion and requesting-code-review skills before completion.

**Goal:** Upgrade local Bootstrap 3.3.7 through 3.4.1 to 5.3.8 while preserving the Serbian and English site's design and interactions.

**Architecture:** Keep the static HTML site and shared CSS. Vendor official distributions; retain only the existing Glyphicons font and its icon CSS separately when Bootstrap 5 replaces Bootstrap 3. Replace the shared jQuery scrolling/reveal behavior with a small vanilla JavaScript file.

**Tech Stack:** Static HTML, CSS, JavaScript, Bootstrap 3.4.1 checkpoint then Bootstrap 5.3.8.

**Spec:** User-approved two-step design in this chat.

## Global Constraints
- Work on bootstrap-migration; no push or merge.
- Preserve copy, images, orange theme, fonts, section order and 768px column breakpoint.
- Keep Bootstrap, its JavaScript and icon assets local.
- Google Maps integration is a known pre-existing issue, outside this migration.

## Step 1: Compatible upgrade to 3.4.1
- [x] Save a 3.3.7 reference for visual comparison.
- [x] Download the official 3.4.1 CSS, JavaScript, source maps, fonts and license.
- [x] Update both HTML paths and vendor documentation; remove superseded Bootstrap files.
- [x] Compare desktop/mobile layout and test collapse, carousel and modal behavior.
- [x] Commit the verified checkpoint separately.

## Step 2: Migration to 5.3.8
- [ ] Vendor official 5.3.8 CSS and JavaScript bundle with source maps and license.
- [ ] Extract the existing Glyphicons font rules into a standalone local icon stylesheet.
- [ ] Convert navigation to navbar-expand-md, columns to col-md-*, panels to cards, thumbnails to project cards, carousel items/controls/indicators, modal close buttons and data-bs-* attributes.
- [ ] Preserve dimensions, typography and spacing through scoped site CSS; keep Bootstrap's modal stacking above the navbar.
- [ ] Replace inline jQuery scrolling/reveal code with shared scripts/site.js; remove the jQuery dependency and unused Bootstrap 3 assets.
- [ ] Verify both languages at desktop and mobile widths; verify anchor navigation, initial/hash-load reveals, collapse, modal opening/closing, carousel and local asset resolution.
- [ ] Request code review, resolve substantive findings, update vendor documentation and commit separately.
