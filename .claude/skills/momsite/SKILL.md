---
name: momsite
description: Context and guardrails for the Anupama Mohanram / Limelight & Leaf static website (Mom_web). Use when editing this repo's HTML/CSS/JS, splitting pages, fixing the contact form, adding legal pages, or doing UI/mobile polish.
---

# Limelight & Leaf website (Mom_web)

## What this is
A **static, no-build** site (plain HTML/CSS/JS) deployed to **GitHub Pages** at
`anupamamd.com` (see `CNAME`). Brand: **Limelight & Leaf** (Anupama Mohanram, MD —
physician, coach, speaker). Palette is warm cream / sage / gold; serif headlines
(Cormorant Garamond), sans body (DM Sans). The vibe is **authentic, editorial, warm —
NOT a tech-startup look.**

## Hard rules
- **No build tools, no frameworks, no npm.** Keep it static so GitHub Pages just works.
- **Never touch `CNAME`.**
- **Shared nav/footer live once** in `assets/partials.js` (injected via JS template
  strings, NOT `fetch()`), so pages stay in sync and work even over `file://`.
- **All CSS lives once** in `assets/styles.css`. Don't reintroduce per-page `<style>` blocks.
- Preview with a real server (`python3 -m http.server 8000`), never trust `file://` for
  final checks.
- Develop on branch `claude/modest-cori-u4od1v`. Commit in logical chunks. **Do not open a
  PR unless explicitly asked.**

## Contact form (IMPORTANT)
- Destination email: **anupama@anupamamd.com**.
- The legacy `formspree.io/<email>` URL format is dead — must use `formspree.io/f/<ID>`.
- The owner supplies the form ID later. Use placeholder
  `https://formspree.io/f/REPLACE_WITH_FORM_ID` plus a setup comment and a
  `mailto:anupama@anupamamd.com` fallback. Keep the AJAX success-message UX.

## Structure
Pages: `index.html` (landing), `coaching.html` (coaching + challenges + **testimonials**),
`speaking.html`, `about.html`, `contact.html`, and `legal/{privacy,terms,cookies,disclaimer}.html`.
Testimonials belong on the **coaching** page, not home. Legal pages live in `legal/` and
use `../` relative paths for assets and links.

## Page skeleton
Every page links `assets/styles.css`, includes the three partial placeholders
(`<header id="site-nav">`, `<div id="mobile-menu-mount">`, `<footer id="site-footer">`),
and loads `assets/partials.js` then `assets/main.js` at the end of `<body>` (partials
first so main.js can wire up the injected nav).

## Footer
Bottom line must read `© 2026 Limelight & Leaf`. Include a Legal column linking the 4
legal pages. Legal pages use generated template text marked "not legal advice — review
with counsel."

## UI / gradients
Use gradients **only** where they add intent: hero accent, CTA bands, buttons, section
dividers. Keep body copy, cards, and testimonials flat for readability. Stay within the
existing CSS-variable palette.

## Always check
- Mobile: every grid collapses to one column ≤900px; no horizontal scroll; mobile menu
  links to real pages and closes on nav.
- Each page: unique `<title>` + meta description, viewport tag, alt text, active nav state.
- No broken internal links after the page split.
- Instagram handle is standardized to `@anupamamd` in `assets/partials.js` — confirm with
  owner before changing.
