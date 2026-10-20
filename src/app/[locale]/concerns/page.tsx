import Link from "next/link";
import { concerns } from "@/data/concerns";
import { href } from "@/i18n/config";
import { getLocale, getMessages } from "@/i18n/dictionaries";
import { hasConcernGuide } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { ArrowIcon } from "@/components/ui/Button";
import { CtaBand, PageHero } from "@/components/ui/PageParts";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";

export async function generateMetadata() {
  const t = await getMessages();
  return pageMetadata({ path: "/concerns", title: t.concernsPage.metaTitle, description: t.concernsPage.metaDescription });
}

export default async function ConcernsPage() {
  const locale = await getLocale();
  const t = await getMessages();
  const c = t.concernsPage;
  return (
    <>
      <PageHero
        eyebrow={c.eyebrow}
        title={c.title}
        lead={c.lead}
        crumbLabel={t.common.breadcrumb}
        crumbs={[{ label: t.common.home, href: href(locale) }, { label: t.nav.concerns }]}
      />
      <Section spacing="tight">
        <Container>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {concerns.map((concern, i) => {
              const written = hasConcernGuide(locale, concern.slug);
              return (
                <Reveal as="li" key={concern.slug} delay={(i % 3) * 80}>
                  <Link
                    href={href(locale, `/concerns/${concern.slug}`)}
                    className="group flex h-full flex-col rounded-pebble bg-cream-soft p-6 ring-1 ring-cocoa/[0.08] transition-[transform,box-shadow] duration-500 ease-[var(--ease-soft)] hover:-translate-y-1 hover:shadow-warm-lg"
                  >
                    <span aria-hidden className={`mb-5 block h-1.5 w-12 rounded-full ${written ? "bg-clay" : "bg-sage"}`} />
                    <h2 className="text-h4">{concern.name[locale]}</h2>
                    <p className="mt-2 text-cocoa-soft">{concern.summary[locale]}</p>
                    <span className="mt-auto flex items-center gap-2 pt-6 text-sm font-medium text-clay-deep">
                      {c.readGuide}
                      <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </ul>
        </Container>
      </Section>
      <CtaBand
        title={c.notListed}
        body={c.notListedBody}
        primary={{ href: href(locale, "/book"), label: c.book }}
        secondary={{ href: href(locale, "/book?match=1"), label: c.match }}
      />
    </>
  );
}
