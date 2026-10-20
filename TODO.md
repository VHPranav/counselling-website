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
- [ ] Reschedule window shown on Services (`[24 hours]` in `messages/*.json` → `servicesPage.every4Body`)
- [ ] Guides still to write: grief, trauma, parenting, anger, OCD, sleep (they use the template until then)
- [ ] Decide: offer a free short intro call? (common in this market; not on the site yet)
- [ ] Photography, if any. The site uses illustrations only until then.
- [ ] Legal review of all five policy drafts in `content/legal/{en,ml}/` (each is marked `[NEEDS LEGAL REVIEW]` and full of `[placeholders]`: entity name, address, Grievance Officer, retention periods, security measures, liability, jurisdiction, safeguarding lead)
- [ ] After legal review: remove `noIndex: true` in `src/app/[locale]/legal/[slug]/page.tsx` and the review banner text in `messages/*.json` → `legalPage.reviewBanner`
- [ ] Verify CHILDLINE 1098 is still in service (it has been merging into 112) — `content/legal/*/minor-protection.mdx`
- [ ] Decide which language version of the policies is authoritative (`legalPage.versionNote`)
- [ ] About page: founder story, team, therapist vetting process, memberships, supervision (`messages/*.json` → `aboutPage`)
- [ ] For organisations: reply time, in-person availability, client logos/case studies (`businessPage`)
- [ ] Real workshops in `src/data/workshops.ts` (three marked samples today); a real registration flow
- [ ] Journal author names and credentials (`content/blog/*/*.mdx` → `author`)
- [ ] Contact page reply time (`contactPage.reply`); optional separate `ENQUIRY_NOTIFY_TO` inbox

## Integrations (Phase 4 onwards)
- [ ] Resend API key, a verified sender domain, and the inbox that receives booking requests (`.env.example`)
- [ ] Confirmation time promised to clients (`[X hours]` in `confirmed.next1`)
- [ ] Real booking backend: calendar availability + database + slot holds (see README → Booking backend)
- [ ] Bot protection on the booking form (honeypot is in; consider Cloudflare Turnstile)
- [ ] Confirm the "What happens to your details" promises on the booking page match your Privacy Policy
- [ ] WhatsApp number in `src/config/site.ts` (enables the "Message us on WhatsApp" buttons)
- [ ] Razorpay keys (test first, then live)
- [ ] Calendar or scheduling backend choice
- [ ] Analytics: Vercel Web Analytics (cookieless) at launch
- [ ] GitHub repo + Vercel project
