# Phase 6 audit

Date: 21 October 2026. Production build (`next build` + `next start`), measured locally.

## How it was measured

- **Lighthouse 12, mobile**, devtools throttling (Slow 4G, 4× CPU slowdown), on all 23
  pages × 2 languages = 46 URLs.
- **Keyboard-only** walkthrough: skip link, header, language toggle, mobile menu, mood
  selector, booking flow (radio groups, arrow keys, step focus), forms.
- **Reduced motion** forced on in headless Chrome: home, FAQ, workshops, journal.
- **390px overflow scan** of all 46 URLs (no horizontal scroll anywhere).
- **Contrast** checked against WCAG AA; palette changes are documented in `globals.css`.

## Results

| Target (from the brief) | Result |
|---|---|
| Performance ≥ 90 (mobile) | 92–99 on every page; median 99 |
| Accessibility 100 | 100 on all 46 pages |
| SEO 100 | 100 on every indexable page (see note) |
| LCP < 2.5s on 4G | 1.7–1.9s typical (see note on one 2.7s reading) |
| No layout shift | CLS ≤ 0.04 everywhere (0.1 is the "good" limit) |
| Reduced motion respected | Yes: everything renders, nothing animates |
| Keyboard accessible | Yes |

**Notes**

- **SEO 66** on the booking confirmation page and the legal drafts is intentional: they
  are marked `noindex` (private page; drafts awaiting legal review).
- **LCP readings on this machine alternate** between about 1.7s and exactly 2.7s for the
  identical page (first paint shifts by a full second). One page,
  `/en/concerns/relationships`, caught a 2.7s reading in the full run and scored 92.
  Re-runs of the same pages give 1.6–1.8s. Confirm with PageSpeed Insights on the
  deployed domain, which also gives real-user (field) data once traffic builds up.

## Per-page scores

| Page | Perf | A11y | Best practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| `/en` | 99 | 100 | 100 | 100 | 1.7 s | 0 | 10 ms |
| `/en/about` | 99 | 100 | 100 | 100 | 1.7 s | 0.002 | 10 ms |
| `/en/blog` | 99 | 100 | 100 | 100 | 1.7 s | 0 | 0 ms |
| `/en/blog/first-session` | 99 | 100 | 100 | 100 | 1.7 s | 0 | 10 ms |
| `/en/blog/talking-to-family` | 99 | 100 | 100 | 100 | 1.7 s | 0 | 10 ms |
| `/en/book` | 98 | 100 | 100 | 100 | 1.7 s | 0 | 10 ms |
| `/en/book/confirmed?ref=…` | 99 | 100 | 100 | 66 | 1.7 s | 0.015 | 10 ms |
| `/en/business` | 99 | 100 | 100 | 100 | 1.7 s | 0 | 10 ms |
| `/en/community` | 99 | 100 | 100 | 100 | 1.7 s | 0 | 0 ms |
| `/en/concerns` | 99 | 100 | 100 | 100 | 1.7 s | 0 | 10 ms |
| `/en/concerns/anxiety` | 99 | 100 | 100 | 100 | 1.7 s | 0 | 0 ms |
| `/en/concerns/depression` | 99 | 100 | 100 | 100 | 1.7 s | 0 | 10 ms |
| `/en/concerns/relationships` | 92 | 100 | 100 | 100 | 2.7 s | 0 | 0 ms |
| `/en/concerns/sleep` | 99 | 100 | 100 | 100 | 1.7 s | 0 | 0 ms |
| `/en/concerns/work-stress` | 99 | 100 | 100 | 100 | 1.7 s | 0 | 0 ms |
| `/en/contact` | 99 | 100 | 100 | 100 | 1.7 s | 0.019 | 10 ms |
| `/en/faq` | 99 | 100 | 100 | 100 | 1.7 s | 0 | 10 ms |
| `/en/legal/minor-protection` | 99 | 100 | 100 | 66 | 1.7 s | 0.001 | 10 ms |
| `/en/legal/privacy` | 99 | 100 | 100 | 66 | 1.7 s | 0.003 | 10 ms |
| `/en/pricing` | 99 | 100 | 100 | 100 | 1.7 s | 0 | 0 ms |
| `/en/services` | 99 | 100 | 100 | 100 | 1.7 s | 0 | 0 ms |
| `/en/therapists` | 99 | 100 | 100 | 100 | 1.7 s | 0 | 0 ms |
| `/en/therapists/therapist-1` | 99 | 100 | 100 | 100 | 1.7 s | 0 | 0 ms |
| `/ml` | 97 | 100 | 100 | 100 | 1.9 s | 0.001 | 90 ms |
| `/ml/about` | 99 | 100 | 100 | 100 | 1.7 s | 0 | 40 ms |
| `/ml/blog` | 99 | 100 | 100 | 100 | 1.7 s | 0.033 | 40 ms |
| `/ml/blog/first-session` | 99 | 100 | 100 | 100 | 1.7 s | 0 | 40 ms |
| `/ml/blog/talking-to-family` | 99 | 100 | 100 | 100 | 1.7 s | 0.026 | 40 ms |
| `/ml/book` | 98 | 100 | 100 | 100 | 1.7 s | 0.038 | 30 ms |
| `/ml/book/confirmed?ref=…` | 99 | 100 | 100 | 66 | 1.7 s | 0.016 | 30 ms |
| `/ml/business` | 99 | 100 | 100 | 100 | 1.7 s | 0 | 40 ms |
| `/ml/community` | 99 | 100 | 100 | 100 | 1.7 s | 0 | 30 ms |
| `/ml/concerns` | 95 | 100 | 100 | 100 | 1.8 s | 0 | 230 ms |
| `/ml/concerns/anxiety` | 99 | 100 | 100 | 100 | 1.8 s | 0.007 | 60 ms |
| `/ml/concerns/depression` | 98 | 100 | 100 | 100 | 1.8 s | 0.007 | 60 ms |
| `/ml/concerns/relationships` | 99 | 100 | 100 | 100 | 1.7 s | 0.005 | 50 ms |
| `/ml/concerns/sleep` | 99 | 100 | 100 | 100 | 1.7 s | 0 | 40 ms |
| `/ml/concerns/work-stress` | 99 | 100 | 100 | 100 | 1.7 s | 0.005 | 50 ms |
| `/ml/contact` | 99 | 100 | 100 | 100 | 1.7 s | 0 | 40 ms |
| `/ml/faq` | 99 | 100 | 100 | 100 | 1.7 s | 0 | 30 ms |
| `/ml/legal/minor-protection` | 99 | 100 | 100 | 66 | 1.7 s | 0 | 40 ms |
| `/ml/legal/privacy` | 99 | 100 | 100 | 66 | 1.7 s | 0 | 40 ms |
| `/ml/pricing` | 99 | 100 | 100 | 100 | 1.7 s | 0.035 | 40 ms |
| `/ml/services` | 98 | 100 | 100 | 100 | 1.8 s | 0 | 60 ms |
| `/ml/therapists` | 99 | 100 | 100 | 100 | 1.7 s | 0 | 40 ms |
| `/ml/therapists/therapist-1` | 99 | 100 | 100 | 100 | 1.7 s | 0.011 | 40 ms |

## Fixed during this audit

- Contrast: decorative programme numbers on For organisations (`--clay` → `--clay-deep`).
- 404s: unknown top-level paths (e.g. `/xyz`) showed Next.js's unstyled 404. Paths without
  a language now redirect to `/ml/…`, which serves the styled 404 with a 404 status.
- Social images: inner pages were missing `og:image` (page-level Open Graph replaced
  the inherited image). Now set explicitly for every page.
- Header: current section is highlighted and announced (`aria-current`).
- Earlier phases: Malayalam font swap causing layout shift (body font now
  `display: optional`), long Malayalam words overflowing on phones, paper-grain SVG
  filter replaced by a 12 KB PNG, page transitions aborting during load.

## Known limitations / fix list

| # | Item | Why it's open | Priority |
|---|---|---|---|
| 1 | Unknown concern/therapist/blog slugs return status 200 (with the 404 page and `noindex`) | Streaming has already started when `notFound()` runs. Harmless for SEO because of `noindex`; a Proxy could return a true 404 but would run on every request. | Low |
| 2 | Social share image is English-only | The image renderer can't shape Malayalam conjuncts. A designed static PNG with Malayalam text could replace it. | Low |
| 3 | Malayalam weekday names use the one-letter form in the booking date picker | Full names don't fit seven columns at 390px; full dates are shown below. | Low |
| 4 | First visit on a slow connection may show the system Malayalam font for body text | Trade-off for zero layout shift (`display: optional`). On Android the system font is also Noto. | Low |
| 5 | Lighthouse "unused/legacy JavaScript" (~25 KB / ~13 KB) | Framework baseline; no meaningful win available without trade-offs. | Low |
| 6 | Real-device and field testing | Only emulated here. Test on a mid-range Android phone on mobile data, and with TalkBack and VoiceOver. | Before launch |
| 7 | Native-speaker Malayalam review, legal review, real therapists, booking backend | Content and integrations, tracked in `TODO.md`. | Before launch |
