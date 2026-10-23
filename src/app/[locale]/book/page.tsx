import { WordText } from "@/components/motion/WordText";
import { Suspense } from "react";
import { services } from "@/data/services";
import { therapists } from "@/data/therapists";
import { href } from "@/i18n/config";
import { format, getLocale, getMessages } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/metadata";
import { formatInr } from "@/lib/therapists";
import { CrisisNotice } from "@/components/layout/CrisisNotice";
import { Breadcrumbs } from "@/components/ui/PageParts";
import { Container, Heading, Section } from "@/components/ui/Section";
import { BookingFlow, type FlowService, type FlowTherapist } from "@/components/booking/BookingFlow";

export async function generateMetadata() {
  const t = await getMessages();
  return pageMetadata({ path: "/book", title: t.booking.metaTitle, description: t.booking.metaDescription });
}

export default async function BookPage() {
  const locale = await getLocale();
  const t = await getMessages();
  const b = t.booking;

  const flowServices: FlowService[] = services.map((s) => ({
    slug: s.slug,
    name: s.name[locale],
    audience: s.audience[locale],
    summary: s.summary[locale],
    minutes: format(t.home.services.minutes, { n: s.durationMinutes }),
    price: s.priceInr == null ? t.home.services.price : formatInr(s.priceInr, locale),
    modes: s.modes,
    teen: Boolean(s.requiresGuardianConsent),
  }));
  const flowTherapists: FlowTherapist[] = therapists.map((th) => ({
    slug: th.slug,
    name: th.name[locale],
    role: th.role[locale],
    languages: th.languages,
    languagesLabel: th.languages.map((l) => t.common[l]).join(", "),
    services: th.services,
    modes: th.modes,
    tone: th.tone,
    photo: th.photo,
    price: th.priceFromInr == null ? t.home.services.price : formatInr(th.priceFromInr, locale),
  }));

  return (
    <>
      <Section grain spacing="none" className="page-intro pb-20 pt-8 sm:pt-12">
        <Container size="wide">
          <Breadcrumbs label={t.common.breadcrumb} items={[{ label: t.common.home, href: href(locale) }, { label: b.title }]} />
          <Heading level={1} size={1} className="mt-8">
            {b.title}
          </Heading>
          <p className="mt-3 max-w-2xl text-lead text-cocoa-soft"><WordText>{b.lead}</WordText></p>
          <div className="mt-10">
            {/* The flow reads ?service= / ?therapist= / ?match= from the URL, so it sits in Suspense. */}
            <Suspense fallback={<div className="min-h-[60vh] rounded-pebble bg-sand/40" aria-busy="true" />}>
              <BookingFlow
                locale={locale}
                t={b}
                common={{ ml: t.common.ml, en: t.common.en, optional: t.common.optional }}
                modeLabels={{ video: t.home.services.video, audio: t.home.services.audio }}
                services={flowServices}
                therapists={flowTherapists}
                links={{
                  terms: href(locale, "/legal/terms"),
                  agreement: href(locale, "/legal/therapy-agreement"),
                  privacy: href(locale, "/legal/privacy"),
                  minors: href(locale, "/legal/minor-protection"),
                  contact: href(locale, "/contact"),
                  confirmed: href(locale, "/book/confirmed"),
                }}
                policyLabels={{
                  terms: t.footer.terms,
                  agreement: t.footer.agreement,
                  privacy: t.footer.privacy,
                  minors: t.footer.minors,
                  contact: t.nav.contact,
                }}
              />
            </Suspense>
          </div>
        </Container>
      </Section>
      <Section tone="cream" spacing="tight" className="pt-0">
        <Container size="wide">
          <CrisisNotice locale={locale} t={t} />
        </Container>
      </Section>
    </>
  );
}
