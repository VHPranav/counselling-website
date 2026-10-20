import Link from "next/link";
import { notFound } from "next/navigation";
import { href } from "@/i18n/config";
import { format, getLocale, getMessages, type Messages } from "@/i18n/dictionaries";
import { isLegalSlug, legalSlugs, loadLegal, type LegalSlug } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/ui/PageParts";
import { Ph } from "@/components/ui/Placeholder";
import { Container, Heading, Section } from "@/components/ui/Section";

const titleKey: Record<LegalSlug, keyof Messages["footer"]> = {
  privacy: "privacy",
  terms: "terms",
  refunds: "refund",
  "therapy-agreement": "agreement",
  "minor-protection": "minors",
};

export function generateStaticParams() {
  return legalSlugs.map((slug) => ({ slug }));
}

// All slugs are pre-rendered at build time (see the note in concerns/[slug]).
export const instant = false;

export async function generateMetadata({ params }: PageProps<"/[locale]/legal/[slug]">) {
  const { slug } = await params;
  if (!isLegalSlug(slug)) return {};
  const t = await getMessages();
  // Drafts stay out of search results until they've been reviewed.
  return pageMetadata({ path: `/legal/${slug}`, title: t.footer[titleKey[slug]], noIndex: true });
}

export default async function LegalPage({ params }: PageProps<"/[locale]/legal/[slug]">) {
  const { slug } = await params;
  if (!isLegalSlug(slug)) notFound();
  const locale = await getLocale();
  const t = await getMessages();
  const l = t.legalPage;
  const { Content, meta } = await loadLegal(locale, slug);
  const title = t.footer[titleKey[slug]];
  const updated = new Intl.DateTimeFormat(locale === "ml" ? "ml-IN" : "en-IN", { dateStyle: "long" }).format(new Date(meta.updated));

  return (
    <Section grain spacing="none" className="pb-20 pt-8 sm:pt-12">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-16">
        <div className="min-w-0 max-w-3xl">
          <Breadcrumbs label={t.common.breadcrumb} items={[{ label: t.common.home, href: href(locale) }, { label: t.footer.legal }, { label: title }]} />
          <p role="note" className="mt-8 rounded-soft bg-ochre/20 p-4 text-sm font-medium ring-1 ring-ochre/60">
            <Ph>{l.reviewBanner}</Ph>
          </p>
          <Heading level={1} size={1} className="mt-8">
            {title}
          </Heading>
          <p className="mt-3 text-sm text-cocoa-soft">{format(l.updated, { date: updated })}</p>
          <article className="mt-10">
            <Content />
          </article>
          <p className="mt-12 text-sm text-cocoa-soft">
            <Ph>{l.versionNote}</Ph>
          </p>
        </div>
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <nav aria-labelledby="other-policies" className="rounded-pebble bg-sand p-6">
            <h2 id="other-policies" className="font-sans text-sm font-semibold">
              {l.otherPolicies}
            </h2>
            <ul className="mt-3 space-y-1">
              {legalSlugs.map((s) => (
                <li key={s}>
                  <Link
                    href={href(locale, `/legal/${s}`)}
                    aria-current={s === slug ? "page" : undefined}
                    className="inline-flex min-h-10 items-center text-sm hover:underline aria-[current=page]:font-semibold aria-[current=page]:text-clay-deeper"
                  >
                    {t.footer[titleKey[s]]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </Container>
    </Section>
  );
}
