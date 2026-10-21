import Link from "next/link";
import { notFound } from "next/navigation";
import { concernBySlug } from "@/data/concerns";
import { serviceBySlug } from "@/data/services";
import { therapists } from "@/data/therapists";
import { href } from "@/i18n/config";
import { format, getLocale, getMessages } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/metadata";
import { cardLabels, formatInr, toCardData } from "@/lib/therapists";
import { ArrowIcon, Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/PageParts";
import { Ph } from "@/components/ui/Placeholder";
import { Container, Heading, Section } from "@/components/ui/Section";
import { TherapistAvatar, TherapistCard } from "@/components/therapists/TherapistCard";
import { Ripple } from "@/components/shapes/Shapes";

export function generateStaticParams() {
  return therapists.map((th) => ({ slug: th.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/therapists/[slug]">) {
  const { slug } = await params;
  const locale = await getLocale();
  const th = therapists.find((x) => x.slug === slug);
  if (!th) return {};
  return pageMetadata({ path: `/therapists/${slug}`, title: th.name[locale], description: th.role[locale] });
}

// Every slug is listed in generateStaticParams, so each page is pre-rendered
// in full at build time. Reading params directly (no <Suspense>) ships the
// complete page with no placeholder swap. `instant = false` only tells the
// dev-mode validator that this is intended.
export const instant = false;

export default async function TherapistProfilePage({ params }: PageProps<"/[locale]/therapists/[slug]">) {
  const { slug } = await params;
  const th = therapists.find((x) => x.slug === slug);
  if (!th) notFound();
  const locale = await getLocale();
  const t = await getMessages();
  const p = t.therapistsPage;
  const card = toCardData(th, locale, t);
  const others = therapists
    .filter((x) => x.slug !== slug && x.concerns.some((c) => th.concerns.includes(c)))
    .slice(0, 3)
    .map((x) => toCardData(x, locale, t));
  const fee = th.priceFromInr == null ? t.home.services.price : format(t.home.therapists.from, { price: formatInr(th.priceFromInr, locale) });
  const bookHref = href(locale, `/book?therapist=${th.slug}`);

  return (
    <>
      <Section grain spacing="none" className="overflow-hidden pb-16 pt-8 sm:pb-20 sm:pt-12">
        <Ripple className="pointer-events-none absolute -right-20 bottom-0 w-[30rem] text-clay/20" />
        <Container className="relative">
          <Breadcrumbs
            label={t.common.breadcrumb}
            items={[
              { label: t.common.home, href: href(locale) },
              { label: t.nav.therapists, href: href(locale, "/therapists") },
              { label: card.name },
            ]}
          />
          <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,18rem)_1fr] md:items-end lg:gap-16">
            <TherapistAvatar tone={th.tone} photo={th.photo} preload sizes="(min-width: 768px) 18rem, 80vw" className="aspect-[4/5] w-full max-w-72 rounded-pebble shadow-warm-lg" />
            <div>
              <Heading level={1} size={1}>
                <Ph>{card.name}</Ph>
              </Heading>
              <p className="mt-3 text-lead text-cocoa-soft">
                <Ph>{card.role}</Ph>
              </p>
              <dl className="mt-8 grid max-w-xl grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3">
                <div>
                  <dt className="text-sm text-cocoa-soft">{t.common.languages}</dt>
                  <dd className="mt-0.5 font-medium">{card.languages}</dd>
                </div>
                <div>
                  <dt className="text-sm text-cocoa-soft">{t.home.therapists.next}</dt>
                  <dd className="mt-0.5 font-medium">{card.next}</dd>
                </div>
                <div>
                  <dt className="text-sm text-cocoa-soft">{p.fee}</dt>
                  <dd className="mt-0.5 font-medium">
                    <Ph>{fee}</Ph>
                  </dd>
                </div>
              </dl>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href={bookHref} size="lg" magnetic icon={<ArrowIcon />}>
                  {p.book}
                </Button>
                <Button href={href(locale, "/therapists")} size="lg" variant="secondary">
                  {p.back}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="sand" spacing="tight">
        <Container className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div>
            <Heading level={2} size={3}>
              {p.about}
            </Heading>
            <p className="mt-4 max-w-2xl text-lead text-cocoa-soft">
              <Ph>{th.bio[locale]}</Ph>
            </p>
            <h2 className="mt-10 text-h4">{p.credentialsTitle}</h2>
            <p className="mt-2 text-sm">
              <Ph>{card.credential}</Ph>
            </p>
            <p className="mt-2 text-sm text-cocoa-soft">
              <Ph>{p.credentialsBody}</Ph>
            </p>
          </div>
          <div className="space-y-8 rounded-pebble bg-cream-soft p-6 sm:p-8">
            <div>
              <h2 className="font-sans text-sm font-semibold text-moss">{p.focus}</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {th.concerns.map((c) => (
                  <li key={c}>
                    <Link href={href(locale, `/concerns/${c}`)} className="inline-flex min-h-10 items-center rounded-full bg-sand px-4 text-sm hover:bg-sand/70">
                      {concernBySlug[c]?.name[locale]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-sans text-sm font-semibold text-moss">{p.sessionTypes}</h2>
              <ul className="mt-3 space-y-1.5">
                {th.services.map((s) => (
                  <li key={s}>
                    <Link href={href(locale, `/services#${s}`)} className="link-underline">
                      {serviceBySlug[s]?.name[locale]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-sans text-sm font-semibold text-moss">{p.formats}</h2>
              <p className="mt-2">{th.modes.map((m) => t.home.services[m]).join(" / ")}</p>
            </div>
          </div>
        </Container>
      </Section>

      {others.length ? (
        <Section spacing="tight">
          <Container>
            <Heading level={2} size={3}>
              {p.other}
            </Heading>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((o) => (
                <li key={o.slug}>
                  <TherapistCard data={o} labels={cardLabels(t)} />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}
    </>
  );
}
