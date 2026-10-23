# Thanal — a smaller, more human counselling website

## Brief and non-negotiables

Thanal is a multi-practitioner online counselling platform. Build an original design informed by the clarity of Koott's audience-led journeys, not a copy of its composition, wording, assets, claims, ratings or branding.

- Keep the current hero composition, including its 4:5 portrait and both moving text paths. Latest user instruction: restore full viewport height (100vh, with 100svh for mobile viewport stability), including navigation.
- Retain the interactive “How are you feeling today?” section and vertically centered left column.
- Place “Four small steps, at your own pace” immediately after the team section.
- Keep reviews as a user-controlled carousel.
- No pinned multi-screen sequences or large decorative sections.
- Keep the homepage around 5,000–6,000 px at a 1280 × 720 desktop viewport, rather than the former ~13,000 px.

## Reference audit — 22 October 2026

Reviewed https://www.koott.in/ and the live XML sitemap through the browser because the web reader could not retrieve XML:

- https://www.koott.in/sitemap.xml — nine child sitemaps: blog posts, blog categories, two member profile maps, booking services, events, jobs, pricing plans and public pages.
- https://www.koott.in/pages-sitemap.xml — audience journeys (individual, couples, teens), concern-specific pages, therapist booking, workshops, community, business, contact, policies and location pages.
- Service/concern families include individual wellbeing; couples and family; teenagers; relationships and communication; emotional wellbeing; specialist clinical treatment; psychiatry; assessments.

Useful patterns: clear audience entry points, topic links, practitioner profiles and direct booking. Avoid the dense navigation, repeated promotional blocks, competitive superlatives, generic location pages, and sprawling service inventory.

### Adaptation to Thanal

Thanal already has individual therapy, couples therapy, teen counselling, family therapy and follow-up sessions. Surface these clearly, with a dedicated page for each instead of only anchors in a long services page. Keep the ten existing concern guides discoverable and organize them by service. Service pages link to related concerns and booking with the correct service preselected.

Do not advertise psychiatry, diagnostic assessments, emergency intervention or additional specialist treatments merely because they appear on the reference. These need a confirmed practitioner roster and service specification. Keep proposed future topics in this document rather than publishing unsupported offers.

Possible later additions after client/practitioner confirmation: premarital counselling, relationship communication, postpartum support, intimacy counselling and psychological assessments. Their routes should be added to the sitemap only when substantive content and a qualified service are ready.

## Original visual direction: a quiet place to begin

Warm paper, forest green, soft peach and sage; existing Thanal serif headings paired with small, readable sans-serif text. Thin borders, restrained shadows, 20–28 px corner radii. Use photography in audience entry cards and team portraits rather than repeated full-width image blocks. Small numbered section markers establish rhythm. Space between sections: 40–64 px desktop, 32–40 px mobile. No clinical badges, fabricated ratings or unverified outcomes.

## Homepage sequence

1. **Existing hero — full viewport height.** Preserve its composition; only restore the user-requested 100vh height.
2. **Mood selector:** a warm, light panel with the existing weather icons. Copy vertically centered on the left, options on the right; accessible selected states and existing matching results remain functional.
3. **Ways to begin:** four image-backed audience cards: Individual, Couples, Teens, Family. Plain summaries, compact supporting benefit line, links to dedicated service pages. A short topic directory provides access to all existing concerns.
4. **Meet your team:** editorial heading and short multi-practitioner introduction, four compact portrait cards, profile links and a view-all action.
5. **Four small steps:** a compact forest-green band with four visible numbered steps; no scroll animation or tall photo sequence.
6. **Reviews:** a soft peach section, consistent cream quote cards, a visible counter and arrow controls; swiping and keyboard navigation retained. Demo quotes identified as examples.
7. **FAQs:** split heading/contact prompt and compact accordion. Answer practical booking, language and privacy questions.
8. **Closing invitation:** small contact/booking strip; compact footer with service, concern and policy links.

## Service information architecture

- `/en/services`: concise service directory and grouped concerns.
- `/en/services/individual`
- `/en/services/couples`
- `/en/services/teens`
- `/en/services/family`
- `/en/services/follow-up`
- `/en/concerns/[slug]`: ten direct topic pages, linked from a desktop/mobile Concerns disclosure and the homepage topic directory. The former `/en/concerns` card index redirects to `/en#services` and is removed from the sitemap.
- Existing therapist, booking, business, community, blog and legal routes retained.

Service detail layout: short introduction; audience and format; what the session supports; related concern links; fee/duration summary from the same shared data used by booking; booking CTA with service query; clear guardian-consent guidance for teens. Unknown slugs return 404. New service URLs included in the generated sitemap with canonical metadata.

## Behaviour and accessibility

Native links for navigation, native details/summary for FAQs, labelled controls, keyboard focus, minimum 44 px touch targets. No autoplaying reviews. Respect reduced motion. Keep medical/health concerns out of WhatsApp prefilled messages and analytics. No new contact numbers or service claims copied from reference sites.

## Verification

Typecheck, ESLint, translation parity, whitespace checks. Inspect desktop and 390 px mobile, confirm no horizontal overflow, complete service link coverage, correct sitemap entries, teen consent and preselected booking behaviour, review controls, mood results, 404s, section order, and preserved hero markup. The only newly authorized hero stylesheet change is restoring 100svh from the earlier 48rem cap. Record final measurements below after implementation.

## Implementation record

Homepage at 1280 × 720: approximately 5,255 px (formerly ~13,038 px), about 60% shorter. Eight sections. Team is immediately followed by four visible steps. Hero markup preserved; its only subsequent CSS change restores the requested full viewport height. Five individual service pages and their canonical/sitemap entries verified. Teen booking preselection and guardian-consent text verified.

### Concern-page refinement

Additional user request: use Koott's anxiety landing page as structural inspiration while prioritizing psychologist bookings and keeping text concise. Thanal now uses a compact split introduction with a prominent practitioner anchor; matched practitioners immediately below; direct practitioner booking actions; six short sign cards for written guides; practical FAQs and a collapsed long-form guide. Existing clinical copy remains intact. No copied outcome statistics, endorsements, ratings, pricing or specialist offers. This shared layout applies to all ten concern routes. The anxiety page is approximately 2,894 px including the footer before expanding long-form content.

### Navigation refinement

Concerns is a native disclosure in the desktop navigation with direct links and short summaries for the existing ten topics. It closes on outside click, Escape, route change and link activation. Mobile navigation provides an equivalent expandable topic group. The former card index now redirects to the homepage topic directory; it is not listed in the sitemap. Footer and concern breadcrumbs avoid the removed index.

### Verification results

- Full-height hero measured at exactly 900 px in a 1440 × 900 viewport and 844 px in a 390 × 844 viewport.
- Homepage section order confirmed; four steps immediately follow the team.
- Desktop and mobile layouts checked; no horizontal page overflow at 390 px.
- Desktop Concerns disclosure opens, links directly to topics and dismisses with Escape.
- Mobile Concerns disclosure expands; choosing a topic navigates and closes the dialog.
- Old concerns index verified redirecting to `/en#services`.
- Five service routes, canonical links, and generated sitemap entries verified; invalid slugs render the noindex 404.
- Teen booking correctly preselects the service and includes guardian-consent information.
- Anxiety cards link to booking with the selected practitioner; primary anchor positions the list below the header.
- Long-form concern content expands/collapses. Mobile practitioners use a swipeable row to reduce height.
- Mood selection produces results without adding concern data to the URL. Reviews advance and update their counter.
- Removed stale links to the breathing circle after its homepage section was removed.
- Typecheck, ESLint and translation parity pass; existing unused-code warnings remain in LocaleToggle.
- Production build remains unverified; details below.

### Anchor alignment

Removed the duplicated JavaScript anchor offset. Lenis already reads the document scroll padding; section anchors now use that shared header clearance so primary booking links bring practitioners into view.

### Production build

`next build` remained at “Creating an optimized production build” without further output and was stopped. Do not treat production compilation as verified. Typecheck, ESLint (existing LocaleToggle warnings only), translation parity and browser-route checks pass.


### Concern pages — expanded section structure (23 October 2026)

Reviewed https://www.koott.in/anxiety-treatment again. Concern pages now follow a booking-led sequence: split hero, practitioner cards, four steps, reasons to choose Thanal, relevant session fees, preview stories, educational overview, signs, when to seek support, different experiences, therapy goals, starting resources, FAQs and final booking CTA. Original topic-specific summaries cover all ten concerns. Sections use compact grids and alternating cream, sage and blush backgrounds, with no eyebrow labels. Existing longer guides remain optional disclosures.

Uses only current Thanal services and fee data. No competitor ratings, outcome percentages, clinicians, psychiatry offers or package prices were adopted. Stories remain explicitly illustrative and render only in demo mode. Clinical descriptions do not promise results or diagnose visitors.

Reference checks for educational wording: https://www.nimh.nih.gov/health/topics/anxiety-disorders ; https://www.nimh.nih.gov/health/topics/psychotherapies ; https://www.nice.org.uk/guidance/cg31/chapter/Recommendations ; https://www.nhs.uk/conditions/insomnia/ ; https://www.nhs.uk/conditions/sleep-apnoea/ . These are information references, not a claim of clinical review by Thanal.


### Reference screenshots and palette refinement (23 October)

The concern process section now uses four stacked bordered cards on the left and a 4:5 native video preview on the right. The following Why Thanal section uses a portrait on the left and four ivory benefit cards on a forest background. The site's existing preview clip and portrait are used; a client-specific explainer can replace the preview later.

Section/surface palette is limited to warm cream (#f6f0e6), soft ivory (#fbf8f2), pale sage (#e8eadf), and forest (#2f3a2c). Removed independent peach, pink, tan and multiple card washes from homepage and concern sections; legacy sand/blush surface tokens map to this palette. Text and interactive accents retain their contrast colours.

### Psychologist directory refinement (23 October)

Reference: https://www.koott.in/book-malayali-psychologists . Removed the full-screen photo introduction from the therapists directory. A compact sage introduction leads into one responsive filter toolbar, followed by two-column profile cards with a portrait, role, qualifications, language, short approach, concern tags, fee, availability, profile link and direct practitioner booking. Mobile uses a single card column and a two-column filter toolbar. Existing local-only filter state and matching help remain; no competitor names, fees, qualifications or live availability claims were copied. Sample profile notice remains visible.

Directory cards refined to the requested reference composition: portrait and profile link at top left; identity, qualification, languages and fee alongside; shared sage panel below for the short introduction, availability and green booking button. Exactly two cards per row on desktop, one on narrow mobile screens. Verified six cards, local filtering and clear/empty states, direct practitioner booking, and no mobile horizontal overflow. Concern routes verified across all ten topics with populated signs, experiences and session options. Homepage and concern sections expose exactly four opaque background values; home hero remains one viewport tall. Typecheck and lint pass with only the existing LocaleToggle warnings.

### Services page redesign plan (23 October)

Replace the repeated directory plus separate fee table with a compact editorial service chooser. Cream introduction with a small sage matching panel; four two-column service cards combining portrait imagery, audience, duration, format and fee with separate explore/book actions; one forest follow-up strip; three short practical FAQs. Keep the four-surface palette, no eyebrows, and existing service anchors, detail routes and booking preselection. This is an original Thanal layout informed by Koott's audience-led discovery and transparent booking details. The homepage mood copy will be centered in its left column, without the inline safety message or lock icon, as requested.

### Services chooser implementation

The new services page is about 2,493 px tall at 1280 × 720, with four editorial service cards in two columns, integrated fees and booking, a matching invitation, compact follow-up band and three FAQs. The exact same `ServiceChooser` is used on the homepage at the user's request, preserving its services anchor and linking directly to the appropriate service detail and preselected booking flow. Desktop and 390 px mobile checks confirm four cards, correct booking URLs and no horizontal overflow. Mood's left content is centered horizontally and vertically; the inline crisis text and lock icon were removed from that component only. Typecheck, ESLint and whitespace checks pass (existing LocaleToggle warnings remain).

### Continuous navigation/hero background

All inner-page hero templates now extend their own background behind the floating navbar, with matching added top padding to preserve content clearance. Applied to the shared PageHero and bespoke therapist, concern and service introductions. Checked eleven representative inner routes, including image heroes, on desktop and a narrow viewport; no horizontal overflow. Homepage hero remains independent and full viewport height.

### Directory simplification

Removed all therapist-directory filters and their client state; the directory now renders the full roster on the server. Added a separate View profile text action beside booking inside every card. Removed the requested practitioner preview/fee notice from the therapist listing and concern pages. Verified six cards, six profile text actions, no filter controls and no remaining visible copy of that notice.

### Larger practitioner profiles

Profile detail pages now feature a 4:5 portrait approximately 514 px wide at a 1280 px viewport (previously capped at 288 px), larger identity text, and the practitioner's existing biography in the introduction. Added focus-area links, a qualification panel, detailed session-type cards using existing service data, first-session guidance, and a sticky booking summary. Session links preserve both practitioner and service. Related profiles use compact cards. Shared seamless navigation background is applied. Verified 390 px mobile without overflow, booking preselection, typecheck and lint (existing warnings only).


### Text and card entrance motion

Shared, once-per-visit viewport reveals now cover section headings, introductory copy and service/practitioner/support cards, including content added during client navigation. Text uses a 650 ms blur-and-rise entrance; cards scale uniformly from 94% at the top-left corner over 720 ms with a small capped stagger. Nested content follows its parent entrance. Existing hero word animations remain. Browser-native animations avoid a new GSAP dependency, retain readable content without JS, cancel for reduced motion, and finish on keyboard focus. Lenis smooth wheel scrolling is enabled across pointer types with native touch scrolling retained. Clean reload verified without new runtime errors, and Lenis presence confirmed in the document. No persistent inline transforms or hidden content remain after animation.


### Word-by-word blur text

Updated text entrances to the requested React Bits Blur Text style (https://reactbits.dev/text-animations/blur-text). Text is split during React rendering into inline word spans, preserving whitespace, emphasis and links without imperative DOM splitting. Words resolve from 10 px blur with a small upward movement, staggered at 80 ms for headings and 30 ms for paragraphs, with total stagger capped for readability. Existing whole-line fades are disabled where word spans are present. Card corner scaling remains unchanged. Checked the anxiety heading (six independently animated words), its lead (17 words), clean browser logs, mobile wrapping, and the homepage's preserved 100vh height.

### Scroll position on navigation

A shared route scroll reset starts each new page at scroll position zero and cancels any remaining Lenis momentum. Browser scroll restoration is manual. Explicit section hashes remain intact; verified the mood link lands 96 px below the navigation, and navigation onward to the services and therapists pages starts at the top. Booking steps retain their local state because the reset is tied to page pathname changes.

### Booking motion and focus refinement

Booking step changes use a brief 220 ms entrance without blur, with subtle 320 ms corner scaling on choice cards. Page-intro word reveals are faster here; form controls stay immediately readable. The step-focus effect now tracks actual step changes so development effect replay cannot focus the heading on initial load. Step navigation cancels Lenis momentum before positioning the form below the navbar. A shared rule removes focus outlines/shadows from programmatic reading targets (main, headings and alert summaries with tabindex=-1), while retaining indicators for links, buttons and inputs. Verified reload focus remains on the body and the next-step heading has no outline or shadow.

### Heading versus paragraph motion

Reference checks: Framer's Text Effects lesson (https://www.framer.com/academy/lessons/text-effects) and GSAP SplitText documentation (https://gsap.com/docs/v3/Plugins/SplitText/). Headings retain the word-by-word blur-up sequence; paragraphs and subtext now reveal by rendered line, with every word in a line sharing the same delay and gentler 5 px blur / 10 px rise over 520 ms. Font readiness is checked before observation, line groups are measured at reveal time for the current breakpoint, and active motion settles immediately on resize. Added text spans to remaining page and MDX text renderers for consistency. Booking keeps its faster intro timings and its form controls remain exempt. Card top-left scale entrances are unchanged.


### Practitioner cards: Thanal interpretation of Oppam

Shared homepage, directory and related-profile cards now include voice-introduction players. Recordings are not yet supplied: players display disabled “Coming soon” placeholders, as requested; adding a voiceIntroSrc enables playback, seeking and one recording at a time. The homepage displays six profiles in three columns on wide desktop, two on tablet and one on mobile. The directory retains two desktop columns.

The composition intentionally differs from the reference: inset arch portraits, serif names, rounded cream shells, simple divided facts, a full-width voice strip, and a separate profile/book action row. Sage, pale yellow and blush accents follow each practitioner's existing tone, adding variety within cards while retaining the existing section backgrounds. Profile and booking links preserve the selected practitioner. No competitor portraits, recordings, fees or credentials are reused.
