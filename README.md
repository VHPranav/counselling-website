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
| Therapists, services, prices, FAQs, concerns, moods | `src/data/*.ts` |
| Concern guides | `content/concerns/{ml,en}/<slug>.mdx`, registered in `src/lib/content.ts` (see `content/concerns/README.md`) |
| Journal posts | `content/blog/{ml,en}/<slug>.mdx`, registered in `src/lib/content.ts` |
| Legal policies | `content/legal/{ml,en}/<slug>.mdx` (drafts, marked for legal review) |
| Workshops | `src/data/workshops.ts` (past events hide automatically on the next deploy) |

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

## Booking

The flow lives at `/[locale]/book` (service → therapist or "match me" → date & time →
details & consent) and ends at `/[locale]/book/confirmed?ref=XXXXXX`.

- **Links can pre-fill it:** `/ml/book?service=couples`, `?therapist=therapist-2`, `?match=1`.
- **No health information is collected,** stored, logged or put in a URL. Concerns and
  notes are for the session itself.
- **Validation** is one zod schema (`src/lib/booking/schema.ts`), checked in the browser
  and again on the server (`src/app/[locale]/book/actions.ts`).
- **Teens (13–17)** get a guardian section and guardian consent; the server rejects teen
  bookings without it.
- **Notifications:** set `RESEND_API_KEY`, `BOOKING_NOTIFY_TO` and `BOOKING_EMAIL_FROM`
  (see `.env.example`) to email the team and the client. Without them the site runs in
  demo mode: it logs only the booking reference and the confirmation page says so.
- **Times** are generated in IST and shown in the visitor's own time zone.

### Booking backend

The UI only talks to the `BookingProvider` interface in `src/lib/booking/types.ts`.
Today that's `mock-provider.ts`, which generates demo availability and stores nothing.
To go live:

1. Write a provider that reads real availability (e.g. Google Calendar or Cal.com) and
   saves bookings to a database, holding the slot while the client pays.
2. Return it from `getBookingProvider()` in `src/lib/booking/index.ts`.
3. Implement `PaymentProvider` with Razorpay and send the payment link from
   `submitBooking` (or after a team member confirms).

No component changes are needed.

## Writing MDX content

- Any `[text in square brackets]` in MDX paragraphs and lists is highlighted as a placeholder.
- `<CrisisCallout>Lead-in sentence</CrisisCallout>` adds a dark box with tap-to-call helplines.
- `<Helplines />` writes the helplines inline ("Tele-MANAS (14416) or DISHA (1056)").
- Both read numbers from `src/config/safety.ts`; never type helpline numbers into content.

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
