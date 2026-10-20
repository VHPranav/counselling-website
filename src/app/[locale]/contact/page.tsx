import { siteConfig } from "@/config/site";
import { href } from "@/i18n/config";
import { getLocale, getMessages } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/metadata";
import { CrisisNotice } from "@/components/layout/CrisisNotice";
import { PageHero } from "@/components/ui/PageParts";
import { Ph } from "@/components/ui/Placeholder";
import { Container, Heading, Section } from "@/components/ui/Section";
import { EnquiryForm } from "@/components/forms/EnquiryForm";

export async function generateMetadata() {
  const t = await getMessages();
  return pageMetadata({ path: "/contact", title: t.contactPage.metaTitle, description: t.contactPage.metaDescription });
}

export default async function ContactPage() {
  const locale = await getLocale();
  const t = await getMessages();
  const c = t.contactPage;
  const { contact } = siteConfig;
  const whatsapp = /^\d{8,15}$/.test(contact.whatsapp) ? contact.whatsapp : null;
  const emailReal = !contact.email.startsWith("[");

  return (
    <>
      <PageHero
        title={c.title}
        lead={c.lead}
        crumbLabel={t.common.breadcrumb}
        crumbs={[{ label: t.common.home, href: href(locale) }, { label: t.nav.contact }]}
      />
      <Section spacing="tight">
        <Container className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            <Heading level={2} size={3}>
              {c.formTitle}
            </Heading>
            <p className="mt-2 text-sm text-cocoa-soft">
              <Ph>{c.reply}</Ph>
            </p>
            <div className="mt-8">
              <EnquiryForm
                kind="contact"
                locale={locale}
                t={t.enquiry}
                errors={{ required: t.booking.errorRequired, email: t.booking.errorEmail, phone: t.booking.errorPhone, contact: t.enquiry.errorContact, consent: t.booking.errorConsent, summary: t.booking.errorSummary }}
                privacyHref={href(locale, "/legal/privacy")}
                privacyLabel={t.footer.privacy}
              />
            </div>
          </div>
          <aside className="space-y-6 lg:pt-14">
            <div className="rounded-pebble bg-sand p-6 sm:p-8">
              <h2 className="text-h4">{c.directTitle}</h2>
              <dl className="mt-5 space-y-4">
                <div>
                  <dt className="text-sm text-cocoa-soft">{t.footer.whatsapp}</dt>
                  <dd className="mt-0.5 font-medium">
                    {whatsapp ? (
                      <a href={`https://wa.me/${whatsapp}`} className="text-link" rel="noopener">
                        {contact.phoneDisplay}
                      </a>
                    ) : (
                      <Ph>{contact.phoneDisplay}</Ph>
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-cocoa-soft">{t.footer.email}</dt>
                  <dd className="mt-0.5 font-medium">
                    {emailReal ? (
                      <a href={`mailto:${contact.email}`} className="text-link">
                        {contact.email}
                      </a>
                    ) : (
                      <Ph>{contact.email}</Ph>
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-cocoa-soft">{t.footer.hours}</dt>
                  <dd className="mt-0.5 font-medium">
                    <Ph>{contact.hours[locale]}</Ph>
                  </dd>
                </div>
              </dl>
            </div>
            <CrisisNotice locale={locale} t={t} />
          </aside>
        </Container>
      </Section>
    </>
  );
}
