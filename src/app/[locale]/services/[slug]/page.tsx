import { WordText } from "@/components/motion/WordText";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, serviceBySlug } from "@/data/services";
import { concernBySlug } from "@/data/concerns";
import { discoveryLabels as d, serviceConcerns } from "@/data/service-discovery";
import { href } from "@/i18n/config";
import { format, getLocale, getMessages } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/metadata";
import { formatInr } from "@/lib/therapists";
import { ArrowIcon, Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageParts";
import { Ph } from "@/components/ui/Placeholder";
import { Container, Section } from "@/components/ui/Section";
import { ServiceGlyph } from "@/components/home/ServiceGlyph";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export const instant = false;

export async function generateMetadata({ params }: PageProps<"/[locale]/services/[slug]">) {
  const { slug } = await params;
  const locale = await getLocale();
  const service = Object.hasOwn(serviceBySlug, slug) ? serviceBySlug[slug] : undefined;
  if (!service) return {};
  return pageMetadata({ path: `/services/${slug}`, title: service.name[locale], description: service.summary[locale] });
}

export default async function ServicePage({ params }: PageProps<"/[locale]/services/[slug]">) {
  const { slug } = await params;
  const service = Object.hasOwn(serviceBySlug, slug) ? serviceBySlug[slug] : undefined;
  if (!service) notFound();
  const locale = await getLocale();
  const t = await getMessages();
  const s = t.servicesPage;
  const topics = (serviceConcerns[slug] ?? []).map((key) => concernBySlug[key]).filter(Boolean);

  return (
    <>
      <PageHero
        eyebrow={t.nav.services}
        title={service.name[locale]}
        lead={service.summary[locale]}
        crumbLabel={t.common.breadcrumb}
        crumbs={[{ label: t.common.home, href: href(locale) }, { label: t.nav.services, href: href(locale, "/services") }, { label: service.name[locale] }]}
      />
      <Section spacing="tight">
        <Container className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(18rem,0.8fr)] lg:gap-14">
          <div>
            <ServiceGlyph slug={slug} className="size-12" />
            <h2 className="mt-4 text-h2"><WordText>{service.audience[locale]}</WordText></h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-cocoa-soft"><WordText>{service.details[locale]}</WordText></p>
            <h2 className="mt-8 text-h3"><WordText>{d.topics[locale]}</WordText></h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {topics.map((topic) => (
                <li key={topic.slug}>
                  <Link href={href(locale, `/concerns/${topic.slug}`)} className="group flex h-full items-start justify-between gap-3 rounded-soft border border-cocoa/10 bg-cream-soft p-4 hover:bg-sand/50">
                    <span><span className="font-medium">{topic.name[locale]}</span><span className="mt-1 block text-xs leading-relaxed text-cocoa-soft">{topic.summary[locale]}</span></span>
                    <ArrowIcon className="mt-1 shrink-0 text-clay-deep" />
                  </Link>
                </li>
              ))}
            </ul>
            <h2 className="mt-8 text-h3"><WordText>{d.expect[locale]}</WordText></h2>
            <ul className="mt-4 space-y-3">
              {([1, 2, 3] as const).map((n) => <li key={n} className="border-l-2 border-sage pl-4"><h3 className="font-sans text-sm font-medium"><WordText>{s[`every${n}Title`]}</WordText></h3><p className="mt-1 text-sm text-cocoa-soft"><WordText>{s[`every${n}Body`]}</WordText></p></li>)}
            </ul>
            {service.requiresGuardianConsent ? (
              <aside className="mt-8 rounded-pebble bg-sand p-5 sm:p-6">
                <h2 className="text-h3"><WordText>{s.teensTitle}</WordText></h2>
                <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-cocoa-soft">{[s.teens1, s.teens2, s.teens3].map((line) => <li key={line}>{line}</li>)}</ol>
                <Link href={href(locale, "/legal/minor-protection")} className="text-link mt-4 inline-flex min-h-11 items-center text-sm">{s.teensLink}</Link>
              </aside>
            ) : null}
          </div>
          <aside className="rounded-[1.5rem] border border-cocoa/10 bg-cream-soft p-6 lg:sticky lg:top-28">
            <h2 className="text-h3"><WordText>{d.fees[locale]}</WordText></h2>
            <dl className="mt-5 divide-y divide-cocoa/10 text-sm">
              <div className="flex justify-between gap-4 py-3"><dt className="text-cocoa-soft">{s.duration}</dt><dd className="font-medium">{format(t.home.services.minutes, { n: service.durationMinutes })}</dd></div>
              <div className="flex justify-between gap-4 py-3"><dt className="text-cocoa-soft">{s.fee}</dt><dd className="text-right font-medium"><Ph>{service.priceInr == null ? t.home.services.price : formatInr(service.priceInr, locale)}</Ph><span className="block text-xs font-normal text-cocoa-soft">{s.perSession}</span></dd></div>
              <div className="flex justify-between gap-4 py-3"><dt className="text-cocoa-soft">{s.format}</dt><dd>{service.modes.map((mode) => t.home.services[mode]).join(" / ")}</dd></div>
            </dl>
            <p className="mt-3 text-xs text-cocoa-soft"><WordText>{t.home.hero.point1} · {t.home.hero.point3}</WordText></p>
            <Button href={href(locale, `/book?service=${slug}`)} className="mt-6 w-full" icon={<ArrowIcon />}>{s.book}</Button>
            <Link href={href(locale, "/therapists")} className="mt-3 inline-flex min-h-11 w-full items-center justify-center text-sm underline">{t.home.therapists.viewAll}</Link>
          </aside>
        </Container>
      </Section>
      <Section spacing="tight">
        <Container>
          <h2 className="text-h3"><WordText>{t.home.services.viewAll}</WordText></h2>
          <ul className="mt-4 flex flex-wrap gap-2">{services.filter((item) => item.slug !== slug).map((item) => <li key={item.slug}><Link href={href(locale, `/services/${item.slug}`)} className="inline-flex min-h-11 items-center rounded-full border border-cocoa/20 px-4 text-sm hover:bg-sand">{item.name[locale]}</Link></li>)}</ul>
        </Container>
      </Section>
    </>
  );
}
