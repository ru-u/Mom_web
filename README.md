# Limelight & Leaf — anupamamd.com

Static personal-brand website for **Anupama Mohanram, MD** (brand: *Limelight & Leaf*) —
physician, certified life coach, and speaker. Deployed via **GitHub Pages** to
`anupamamd.com` (see [`CNAME`](CNAME)).

No build step, no frameworks, no npm — just HTML, CSS, and a little vanilla JS.

## Structure

```
index.html          Home / landing page
about.html          About Anupama
coaching.html       Coaching offer + challenges + testimonials
speaking.html       Speaking topics + inquire CTA
contact.html        Contact form + contact info
legal/
  privacy.html      Privacy Policy        (template text — review with counsel)
  terms.html        Terms of Service      (template text — review with counsel)
  cookies.html      Cookie Policy         (template text — review with counsel)
  disclaimer.html   Disclaimer            (template text — review with counsel)
404.html            Custom not-found page (GitHub Pages serves automatically)
assets/
  styles.css        ALL styles (single source of truth)
  partials.js       Shared nav + footer, injected via JS template strings
  main.js           Nav scroll, reveal-on-scroll, mobile menu, contact form
  favicon.svg       Site icon
intro.jpeg greeting.jpeg speaker.jpeg     Images (kept in repo root)
sitemap.xml robots.txt CNAME
```

### Shared nav & footer

Every page has these placeholders that `assets/partials.js` fills in on load:

```html
<header id="site-nav"></header>
<div id="mobile-menu-mount"></div>
<footer id="site-footer"></footer>
```

The markup is built from JS template strings (not `fetch()`), so it works on GitHub Pages
and over `file://`. Edit the nav/footer once in `assets/partials.js`.

## ⚠️ Contact form — action required

The form on `contact.html` posts to a **placeholder** Formspree endpoint and will **not**
deliver email until set up:

1. Create a free form at <https://formspree.io> using `anupama@anupamamd.com` as the
   destination, and confirm the verification email.
2. Copy the endpoint (looks like `https://formspree.io/f/abcdwxyz`).
3. In [`contact.html`](contact.html), replace `REPLACE_WITH_FORM_ID` in the form's `action`
   with that ID.

Until then, visitors who submit are asked to email `anupama@anupamamd.com` directly, and a
visible `mailto:` fallback is shown near the form.

> **Note:** the old `formspree.io/<email>` URL format is deprecated and silently fails —
> always use the `formspree.io/f/<ID>` format.

## To confirm with the owner

- **Instagram handle** is standardized to `@anupamamd` (`instagram.com/anupamamd`) in
  `assets/partials.js` and `contact.html`. The original site had conflicting values —
  confirm the correct handle and update `SOCIAL.instagram` in `assets/partials.js`.
- **Governing law** placeholder in `legal/terms.html` (`[STATE/JURISDICTION]`).

## Local preview

Use a real server (not `file://`) so relative paths and partial injection behave like
production:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy

Push to the default branch; GitHub Pages serves it. Do not edit `CNAME`.
