import { href } from "@/i18n/config";
import { getLocale, getMessages } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/ui/PageParts";
import { Ph } from "@/components/ui/Placeholder";
import { Container, Heading, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Ripple } from "@/components/shapes/Shapes";

export async function generateMetadata() {
  const t = await getMessages();
  return pageMetadata({ path: "/business", title: t.businessPage.metaTitle, description: t.businessPage.metaDescription });
}

export default async function BusinessPage() {
  const locale = await getLocale();
  const t = await getMessages();
  const b = t.businessPage;
  const programmes = ([1, 2, 3, 4, 5] as const).map((n) => ({ title: b[`p${n}Title`], body: b[`p${n}Body`] }));

  return (
    <>
      <PageHero image="business"
        eyebrow={t.home.business.eyebrow}
        title={t.home.business.title}
        lead={t.home.business.lead}
        crumbLabel={t.common.breadcrumb}
        crumbs={[{ label: t.common.home, href: href(locale) }, { label: t.nav.business }]}
      />

      <Section spacing="tight">
        <Container>
          <Heading level={2}>{b.programmesTitle}</Heading>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {programmes.map((p, i) => (
              <Reveal as="li" key={p.title} delay={(i % 3) * 90} className="rounded-pebble bg-cream-soft p-6 ring-1 ring-cocoa/[0.08] sm:p-8">
                <span aria-hidden className="font-display text-h3 text-clay-deep">
                  0{i + 1}
                </span>
                <h3 className="mt-3 text-h4">{p.title}</h3>
                <p className="mt-2 text-cocoa-soft">
                  <Ph>{p.body}</Ph>
                </p>
              </Reveal>
            ))}
            <li className="flex items-center rounded-pebble bg-forest p-6 text-cream on-dark sm:p-8">
              <div>
                <h3 className="text-h4">{b.privacyTitle}</h3>
                <p className="mt-2 text-cream/85">{b.privacyBody}</p>
              </div>
            </li>
          </ul>
        </Container>
      </Section>

      <Section tone="sand" grain spacing="tight" className="overflow-hidden">
        <Ripple className="pointer-events-none absolute -right-20 top-6 w-96 text-cream/60" />
        <Container className="relative">
          <Heading level={2}>{b.howTitle}</Heading>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {[b.h1, b.h2, b.h3].map((step, i) => (
              <li key={step} className="flex gap-4">
                <span aria-hidden className="flex size-12 shrink-0 items-center justify-center rounded-full bg-cream-soft font-display text-h4">
                  {i + 1}
                </span>
                <p className="pt-2.5 text-lead">{step}</p>
              </li>
            ))}
          </ol>
          <p className="mt-10 text-sm">
            <Ph>{b.clientsNote}</Ph>
          </p>
        </Container>
      </Section>

      <Section spacing="tight" id="enquire" className="scroll-mt-20">
        <Container size="narrow">
          <Heading level={2}>{b.formTitle}</Heading>
          <p className="mt-3 text-cocoa-soft">
            <Ph>{b.formLead}</Ph>
          </p>
          <div className="mt-8">
            <EnquiryForm
              kind="business"
              locale={locale}
              t={t.enquiry}
              errors={{ required: t.booking.errorRequired, email: t.booking.errorEmail, phone: t.booking.errorPhone, contact: t.enquiry.errorContact, consent: t.booking.errorConsent, summary: t.booking.errorSummary }}
              privacyHref={href(locale, "/legal/privacy")}
              privacyLabel={t.footer.privacy}
            />
          </div>
        </Container>
      </Section>
    </>
  );
}
