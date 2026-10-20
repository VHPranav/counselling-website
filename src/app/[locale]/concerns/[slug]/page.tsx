import Link from "next/link";
import { notFound } from "next/navigation";
import { concernBySlug, concerns } from "@/data/concerns";
import { matchTherapists } from "@/data/therapists";
import { href } from "@/i18n/config";
import { getLocale, getMessages } from "@/i18n/dictionaries";
import { loadConcernGuide } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { cardLabels, toCardData } from "@/lib/therapists";
import { ArrowIcon, Button } from "@/components/ui/Button";
import { CtaBand, FaqList, PageHero } from "@/components/ui/PageParts";
import { Ph } from "@/components/ui/Placeholder";
import { Container, Heading, Section } from "@/components/ui/Section";
import { TherapistCard } from "@/components/therapists/TherapistCard";

export function generateStaticParams() {
  return concerns.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/concerns/[slug]">) {
  const { slug } = await params;
  const locale = await getLocale();
  const concern = concernBySlug[slug];
  if (!concern) return {};
  return pageMetadata({ path: `/concerns/${slug}`, title: concern.name[locale], description: concern.summary[locale] });
}

// Every slug is listed in generateStaticParams, so each page is pre-rendered
// in full at build time. Reading params directly (no <Suspense>) ships the
// complete page with no placeholder swap. `instant = false` only tells the
// dev-mode validator that this is intended.
export const instant = false;

export default async function ConcernPage({ params }: PageProps<"/[locale]/concerns/[slug]">) {
  const { slug } = await params;
  const concern = concernBySlug[slug];
  if (!concern) notFound();
  const locale = await getLocale();
  const t = await getMessages();
  const c = t.concernsPage;
  const guide = await loadConcernGuide(locale, slug);
  const name = concern.name[locale];
  const related = concerns.filter((x) => x.slug !== slug).slice(0, 6);
  const therapists = matchTherapists([slug], 3).map((th) => toCardData(th, locale, t));

  // FAQPage structured data for search engines (written guides only).
  const jsonLd = guide?.meta.faq.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        inLanguage: locale,
        mainEntity: guide.meta.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  return (
    <>
      {jsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      ) : null}
      <PageHero
        eyebrow={t.nav.concerns}
        title={name}
        lead={guide?.meta.intro ?? concern.summary[locale]}
        crumbLabel={t.common.breadcrumb}
        crumbs={[
          { label: t.common.home, href: href(locale) },
          { label: t.nav.concerns, href: href(locale, "/concerns") },
          { label: name },
        ]}
      />

      <Section spacing="tight">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
          <article className="min-w-0 max-w-3xl">
            {guide ? (
              <>
                <section aria-labelledby="signs" className="rounded-pebble bg-sand p-6 sm:p-8">
                  <h2 id="signs" className="text-h3">
                    {c.signsTitle}
                  </h2>
                  <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {guide.meta.signs.map((sign) => (
                      <li key={sign} className="flex gap-3 rounded-soft bg-cream-soft p-4 text-sm">
                        <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden className="mt-1.5 shrink-0 text-moss">
                          <path d="M6 1c3 2 4 5 3 7.5C8.3 10 7 11 6 11s-2.3-1-3-2.5C2 6 3 3 6 1Z" fill="currentColor" />
                        </svg>
                        {sign}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm text-cocoa-soft">{c.signsNote}</p>
                </section>
                <div className="mt-12">
                  <guide.Content />
                </div>
              </>
            ) : (
              <>
                <p className="rounded-soft bg-sand/70 p-5 text-cocoa-soft">
                  <Ph>{c.scaffoldNote}</Ph>
                </p>
                <h2 className="mt-12 text-h3">{c.genericHelpTitle}</h2>
                <p className="mt-4 text-cocoa-soft">{c.genericHelp}</p>
              </>
            )}
          </article>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-pebble bg-forest p-6 text-cream on-dark grain grain-light">
              <h2 className="text-h4">{c.ctaTitle}</h2>
              <p className="mt-2 text-sm text-cream/80">{c.ctaBody}</p>
              <div className="mt-5 flex flex-col gap-2.5">
                <Button href={href(locale, "/book")} variant="light" icon={<ArrowIcon />}>
                  {c.book}
                </Button>
                <Link href={href(locale, "/book?match=1")} className="inline-flex min-h-11 items-center justify-center text-sm underline underline-offset-4 hover:text-white">
                  {c.match}
                </Link>
              </div>
            </div>
          </aside>
        </Container>
      </Section>

      {guide?.meta.faq.length ? (
        <Section tone="sand" spacing="tight">
          <Container className="grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
            <Heading level={2}>{c.faqTitle}</Heading>
            <FaqList items={guide.meta.faq} />
          </Container>
        </Section>
      ) : null}

      {therapists.length ? (
        <Section spacing="tight">
          <Container>
            <Heading level={2} size={3}>
              {c.therapistsTitle}
            </Heading>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {therapists.map((th) => (
                <li key={th.slug}>
                  <TherapistCard data={th} labels={cardLabels(t)} />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      <Section spacing="tight" className="pt-0">
        <Container>
          <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.12em] text-moss [:lang(ml)_&]:normal-case [:lang(ml)_&]:tracking-normal">
            {c.related}
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={href(locale, `/concerns/${r.slug}`)}
                  className="inline-flex min-h-11 items-center rounded-full bg-cream-soft px-5 ring-1 ring-inset ring-cocoa/20 transition hover:-translate-y-0.5 hover:ring-cocoa/50"
                >
                  {r.name[locale]}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBand
        title={c.ctaTitle}
        body={c.ctaBody}
        primary={{ href: href(locale, "/book"), label: c.book }}
        secondary={{ href: href(locale, "/therapists"), label: t.home.therapists.viewAll }}
      />
    </>
  );
}
