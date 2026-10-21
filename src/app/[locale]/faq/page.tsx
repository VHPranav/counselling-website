import { faqs } from "@/data/faqs";
import type { Faq } from "@/data/types";
import { href } from "@/i18n/config";
import { getLocale, getMessages } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/metadata";
import { CtaBand, FaqList, PageHero } from "@/components/ui/PageParts";
import { Ph } from "@/components/ui/Placeholder";
import { Container, Heading, Section } from "@/components/ui/Section";

export async function generateMetadata() {
  const t = await getMessages();
  return pageMetadata({ path: "/faq", title: t.faqPage.metaTitle, description: t.faqPage.metaDescription });
}

const order: Faq["category"][] = ["getting-started", "sessions", "privacy", "payments"];

export default async function FaqPage() {
  const locale = await getLocale();
  const t = await getMessages();
  const f = t.faqPage;

  // FAQPage structured data. Placeholder answers (with [brackets]) are left out.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    mainEntity: faqs
      .filter((q) => !q.answer[locale].includes("["))
      .map((q) => ({ "@type": "Question", name: q.question[locale], acceptedAnswer: { "@type": "Answer", text: q.answer[locale] } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <PageHero image="faq"
        title={f.title}
        lead={f.lead}
        crumbLabel={t.common.breadcrumb}
        crumbs={[{ label: t.common.home, href: href(locale) }, { label: t.nav.faq }]}
      >
        <nav className="mt-8 flex flex-wrap gap-2" aria-label={f.metaTitle}>
          {order.map((cat) => (
            <a key={cat} href={`#${cat}`} className="inline-flex min-h-11 items-center rounded-full bg-cream-soft px-5 text-sm ring-1 ring-inset ring-cocoa/20 hover:ring-cocoa/50">
              {f[cat]}
            </a>
          ))}
        </nav>
      </PageHero>
      <Section spacing="tight">
        <Container size="narrow" className="space-y-14">
          {order.map((cat) => {
            const items = faqs.filter((q) => q.category === cat);
            if (!items.length) return null;
            return (
              <section key={cat} id={cat} aria-labelledby={`${cat}-title`} className="scroll-mt-28">
                <Heading level={2} size={3} id={`${cat}-title`}>
                  {f[cat]}
                </Heading>
                <FaqList className="mt-5" items={items.map((q) => ({ q: q.question[locale], a: <Ph>{q.answer[locale]}</Ph> }))} />
              </section>
            );
          })}
        </Container>
      </Section>
      <CtaBand title={f.askTitle} body={f.askBody} primary={{ href: href(locale, "/contact"), label: f.ask }} secondary={{ href: href(locale, "/book"), label: t.nav.book }} />
    </>
  );
}
