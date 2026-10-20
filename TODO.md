# What we need from you

Everything below is a placeholder on the site today. Placeholders in `[brackets]`
are highlighted on the page so they can't slip through.

## Brand and contact
- [ ] Brand name → `src/config/site.ts` (`brandName`, `brandShort`)
- [ ] Domain → `src/config/site.ts` (`domain`) and `NEXT_PUBLIC_SITE_URL` on Vercel
- [ ] Logo (SVG). The leaf-and-ripple mark in the header is a stand-in.
- [ ] Support email, WhatsApp number, phone, support hours → `src/config/site.ts`
- [ ] Social links (optional)

## Safety (before launch)
- [ ] Re-confirm crisis numbers with official sources → `src/config/safety.ts`
  - Tele-MANAS **14416** / 1-800-891-4416: confirmed current in October 2026 news coverage
    (World Mental Health Day, Ministry of Health). Check the official Tele-MANAS site.
  - DISHA **1056**: consistently cited. The alternate **0471 2552056** appears in 2021 and
    2025 press but not on an official page. Confirm with NHM Kerala or drop it.
- [ ] Optional: crisis numbers for diaspora countries (UAE, UK, US, etc.)

## People and credentials (Phase 3)
- [ ] Real therapist profiles: name, photo, bio, languages, specialisations, price, consent to publish
- [ ] Credentials: RCI registration numbers, qualifications, memberships
- [ ] Real, consented testimonials (the marquee uses marked placeholders)

## Content and review
- [ ] Malayalam proofreading. Every string is listed in `docs/ml-review.md`
- [ ] Session prices → `src/data/services.ts` (`priceInr`, currently `[Price]`)
- [ ] Confirm session lengths: 50 min individual/teens/follow-up, 60 couples, 75 family are suggestions
- [ ] Confirm FAQ answers match your policies (`src/data/faqs.ts`), especially confidentiality and booking for someone else
- [ ] Decide: offer a free short intro call? (common in this market; not on the site yet)
- [ ] Photography, if any. The site uses illustrations only until then.
- [ ] Legal review of all policy drafts marked `[NEEDS LEGAL REVIEW]` (Phase 5)

## Integrations (Phase 4 onwards)
- [ ] Resend API key + the address that receives booking notifications
- [ ] Razorpay keys (test first, then live)
- [ ] Calendar or scheduling backend choice
- [ ] Analytics: Vercel Web Analytics (cookieless) at launch
- [ ] GitHub repo + Vercel project
