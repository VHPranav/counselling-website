# [BRAND NAME] — website

Online counselling in Malayalam and English. Next.js 16 (App Router), TypeScript,
Tailwind CSS v4, Lenis for desktop smooth scroll; all other motion is CSS plus a few
small scroll/pointer handlers (no animation library). Every page is pre-rendered as static HTML
in both languages.

```bash
npm install
npm run dev          # http://localhost:3000 → redirects to /ml
npm run build        # production build
npm run lint
npm run typecheck
npm run i18n:check   # checks ml/en keys match, regenerates docs/ml-review.md
```

The design system page is at `/ml/styleguide` or `/en/styleguide` (hidden from search).

## Common changes

| To change… | Edit |
|---|---|
| Brand name, domain, email, WhatsApp, support hours | `src/config/site.ts` |
| Crisis helpline numbers | `src/config/safety.ts` |
| Colours, type sizes, radii, shadows | `src/app/globals.css` (the `@theme` block at the top) |
| Fonts | `src/app/fonts.ts` |
| Any interface text | `messages/en.json` and `messages/ml.json` (same keys in both) |
| Header / footer links | `src/components/layout/navigation.ts` |
| Therapists, services, prices, FAQs, concerns | `src/data/*` (added in Phase 3) |
| Blog posts, concern pages, legal pages | `content/**/{ml,en}/*.mdx` (added in Phases 3–5) |

Anything written in `[square brackets]` is a placeholder. It shows on the page with a
striped ochre highlight until you replace it.

## Languages

- URLs are `/ml/...` (default) and `/en/...`. `/` redirects to `/ml`.
- Built on Next.js's own i18n (`next/root-params`) rather than `next-intl`, so pages
  stay fully static and no translation code ships to the browser.
- After editing `messages/ml.json`, run `npm run i18n:check`. It fails if a key is
  missing in either language and rewrites `docs/ml-review.md`, which lists every
  Malayalam string for the proofreader. To mark strings as reviewed, add their keys to
  `docs/ml-review.status.json` with `"approved"`.

## Folder map

```
src/app/[locale]/        pages (one folder per route)
src/components/ui/       Button, Card, Chip, Field, Marquee, Section, Heading, Placeholder
src/components/layout/   Header, Footer, MobileMenu, LocaleToggle, CrisisNotice, SkipLink
src/components/motion/   Reveal, ParallaxScene, MotionBoot (Lenis, magnetic buttons, cursor)
src/components/home/     home page sections (Hero, MoodSelector, HowItWorks, Breathing…)
src/data/                moods, concerns, services, therapists (placeholders), FAQs
src/components/shapes/   organic SVGs: Blob, Pebble, BananaLeaf, PalmFrond, Ripple, Arch
src/config/              site + safety config
src/i18n/                locale config and message loading
messages/                interface copy (ml, en)
scripts/                 i18n-check
docs/                    Malayalam review tracker
```

## Motion

- Every animation uses transform/opacity only and stops under `prefers-reduced-motion`.
- Smooth scroll, magnetic buttons and the cursor ring load after the page is idle,
  and only on desktop with a mouse (`MotionBoot.tsx`). Touch phones get native scrolling.
- The breathing circle and testimonial marquee have pause buttons; the breathing circle also pauses when off screen.
- The "How it works" section pins with CSS `position: sticky` on desktop and is a plain list on mobile.

## Accessibility and contrast

Contrast notes are at the top of `globals.css`. In short: `--clay` is too light for
text or button backgrounds, so primary buttons use `--clay-deep`. Links on sand use
`--clay-deeper`. Focus rings are two-tone (ochre + cocoa) so they show on every
background. All motion stops under `prefers-reduced-motion`.
