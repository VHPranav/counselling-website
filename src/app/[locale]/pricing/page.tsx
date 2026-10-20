import Link from "next/link";
import { faqs } from "@/data/faqs";
import { services } from "@/data/services";
import { href } from "@/i18n/config";
import { format, getLocale, getMessages } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/metadata";
import { formatInr } from "@/lib/therapists";
import { Button } from "@/components/ui/Button";
import { CtaBand, FaqList, PageHero } from "@/components/ui/PageParts";
import { Ph } from "@/components/ui/Placeholder";
import { Container, Heading, Section } from "@/components/ui/Section";

export async function generateMetadata() {
  const t = await getMessages();
  return pageMetadata({ path: "/pricing", title: t.pricingPage.metaTitle, description: t.pricingPage.metaDescription });
}

export default async function PricingPage() {
  const locale = await getLocale();
  const t = await getMessages();
  const p = t.pricingPage;
  const s = t.servicesPage;
  const included = ([1, 2, 3, 4] as const).map((n) => ({ title: s[`every${n}Title`], body: s[`every${n}Body`] }));

  return (
    <>
      <PageHero
        title={p.title}
        lead={p.lead}
        crumbLabel={t.common.breadcrumb}
        crumbs={[{ label: t.common.home, href: href(locale) }, { label: t.nav.pricing }]}
      />
      <Section spacing="tight">
        <Container size="narrow">
          <div className="overflow-hidden rounded-pebble ring-1 ring-cocoa/10">
            <table className="w-full text-left">
              <caption className="sr-only">{p.metaTitle}</caption>
              <thead className="bg-sand text-sm">
                <tr>
                  <th scope="col" className="px-5 py-4 font-semibold">
                    {p.service}
                  </th>
                  <th scope="col" className="px-5 py-4 font-semibold">
                    {p.duration}
                  </th>
                  <th scope="col" className="px-5 py-4 text-right font-semibold">
                    {p.fee}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cocoa/10 bg-cream-soft">
                {services.map((svc) => (
                  <tr key={svc.slug}>
                    <th scope="row" className="px-5 py-4 font-normal">
                      <Link href={href(locale, `/services#${svc.slug}`)} className="font-medium hover:underline">
                        {svc.name[locale]}
                      </Link>
                      <span className="block text-sm text-cocoa-soft">{svc.audience[locale]}</span>
                    </th>
                    <td className="whitespace-nowrap px-5 py-4 text-sm">{format(t.home.services.minutes, { n: svc.durationMinutes })}</td>
                    <td className="whitespace-nowrap px-5 py-4 text-right font-medium">
                      <Ph>{svc.priceInr == null ? t.home.services.price : formatInr(svc.priceInr, locale)}</Ph>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-cocoa-soft">{p.note}</p>
          <p className="mt-2 text-sm">
            <Ph>{p.international}</Ph>
          </p>
          <Button href={href(locale, "/book")} size="lg" className="mt-8">
            {t.nav.book}
          </Button>
        </Container>
      </Section>

      <Section tone="sand" grain spacing="tight">
        <Container>
          <Heading level={2} size={3}>
            {p.included}
          </Heading>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {included.map((i) => (
              <li key={i.title} className="rounded-soft bg-cream-soft p-5">
                <p className="font-medium">{i.title}</p>
                <p className="mt-1 text-sm text-cocoa-soft">
                  <Ph>{i.body}</Ph>
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section spacing="tight">
        <Container size="narrow">
          <Heading level={2} size={3}>
            {p.faqTitle}
          </Heading>
          <FaqList
            className="mt-6"
            items={faqs.filter((q) => q.category === "payments").map((q) => ({ q: q.question[locale], a: <Ph>{q.answer[locale]}</Ph> }))}
          />
          <Link href={href(locale, "/legal/refunds")} className="text-link mt-6 inline-block">
            {p.refundLink}
          </Link>
        </Container>
      </Section>

      <CtaBand
        title={s.notSure}
        body={s.notSureBody}
        primary={{ href: href(locale, "/book?match=1"), label: s.matchMe }}
        secondary={{ href: href(locale, "/services"), label: t.home.services.viewAll }}
      />
    </>
  );
}
