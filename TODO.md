# Launch checklist: what we need from you

Everything below is a placeholder or a decision on the site today. Placeholders in
`[square brackets]` are highlighted on the page (striped ochre) so they can't slip
through. Search the code for `[` to find any stragglers.

## 1. Must have before launch

### Brand and contact
- [ ] Brand name → `src/config/site.ts` (`brandName`, `brandShort`)
- [ ] Domain → `src/config/site.ts` (`domain`) and `NEXT_PUBLIC_SITE_URL` on Vercel
- [ ] Logo (SVG). The leaf-and-ripple mark is a stand-in (`BrandMark` in `src/components/shapes/Shapes.tsx`, `src/app/icon.svg`)
- [ ] Support email, WhatsApp number, phone, support hours → `src/config/site.ts` (a real WhatsApp number switches on the WhatsApp buttons)

### Safety
- [ ] Re-confirm crisis numbers with official sources → `src/config/safety.ts`
  - Tele-MANAS **14416** / 1-800-891-4416: confirmed current in October 2026 news coverage (World Mental Health Day, Ministry of Health). Check the official Tele-MANAS site.
  - DISHA **1056**: consistently cited. The alternate **0471 2552056** appears in 2021 and 2025 press but not on an official page. Confirm with NHM Kerala or drop it.
  - CHILDLINE **1098** in `content/legal/*/minor-protection.mdx`: it has been merging into 112. Verify.
- [ ] Optional: crisis numbers for diaspora countries (UAE, UK, US…)

### People and credentials
- [ ] Real therapist profiles with consent to publish: name, role, photo, bio, languages, concerns, services, formats, fee, availability → `src/data/therapists.ts`
- [ ] Credentials: RCI registration numbers, qualifications, memberships, supervision → therapist data + `aboutPage.trust*` in `messages/*.json`
- [ ] Real, consented testimonials, or remove the section (`TestimonialsSection` in `src/app/[locale]/page.tsx`)

### Legal (needs a lawyer)
- [ ] Review all five drafts in `content/legal/{en,ml}/`: entity name, address, Grievance Officer, retention periods, security measures, liability, jurisdiction, safeguarding lead, verification method for guardians
- [ ] Decide which language version is authoritative (`legalPage.versionNote`)
- [ ] After review: remove `noIndex: true` in `src/app/[locale]/legal/[slug]/page.tsx`, add the legal pages to `src/app/sitemap.ts`, and remove the review banner (`legalPage.reviewBanner`)
- [ ] Confirm the booking page's "What happens to your details" promises match the Privacy Policy (`booking.privacy1–4`)

### Fees and policies
- [ ] Session prices → `src/data/services.ts` (`priceInr`), and therapist fees → `priceFromInr`
- [ ] Confirm session lengths (50 min individual/teens/follow-up, 60 couples, 75 family are suggestions)
- [ ] Reschedule window (`[24 hours]`: `servicesPage.every4Body`, FAQ "cancel", Refund Policy)
- [ ] Confirm FAQ answers match your policies (`src/data/faqs.ts`): confidentiality, changing therapist, booking for someone else, payment methods, paying from abroad, data security
- [ ] International pricing, if different (`pricingPage.international`)

### Integrations
- [ ] Resend API key, a verified sender domain, and the inbox for booking requests (`.env.example`). Until then the booking and enquiry forms run in demo mode and say so.
- [ ] Promised confirmation time (`[X hours]`: `confirmed.next1`) and reply times (`contactPage.reply`, `businessPage.formLead`)

### Testing on real devices
- [ ] Try the full site on a mid-range Android phone on mobile data, and with TalkBack (Android) and VoiceOver (iPhone). Only emulated testing has been done (`docs/audit.md`).

### Malayalam
- [ ] Native-speaker proofreading of every string (`docs/ml-review.md`, 600+ strings) and every Malayalam MDX file (listed at the bottom of the same file). Mark approved keys in `docs/ml-review.status.json`.

## 2. Should have soon after launch
- [ ] Real booking backend: calendar availability, a database and slot holds (README → "Booking backend")
- [ ] Razorpay (test keys first, then live) via the `PaymentProvider` interface
- [ ] Bot protection on forms (a honeypot is in; consider Cloudflare Turnstile)
- [ ] Analytics: set `NEXT_PUBLIC_ANALYTICS=vercel` and enable Vercel Web Analytics (cookieless)
- [ ] Concern guides still on the template: grief, trauma, parenting, anger, OCD, sleep (`content/concerns/`)
- [ ] About page: founder story, team (`aboutPage.story2`, `aboutPage.teamNote`)
- [ ] For organisations: in-person availability, client logos and case studies (`businessPage`)
- [ ] Real workshops (`src/data/workshops.ts`, three marked samples today) and a registration flow
- [ ] Journal: author names and credentials (`content/blog/*/*.mdx` → `author`), more articles
- [ ] Measure real-world speed after deploying: PageSpeed Insights on the live domain (see `docs/audit.md`)

## 3. Decisions
- [ ] Offer a free short intro call? (common in this market; not on the site)
- [ ] Photography? The site uses illustrations only until real, consented photos are supplied
- [ ] Separate inbox for business/contact enquiries (`ENQUIRY_NOTIFY_TO`)

## Done
- [x] GitHub repo: https://github.com/VHPranav/counselling-website
