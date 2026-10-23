import { WordText } from "@/components/motion/WordText";
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
import "./Profile.css";

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
      <Section grain spacing="none" className="page-intro therapist-profile-intro overflow-hidden pb-12 pt-8 sm:pt-12">
        <Container className="relative">
          <Breadcrumbs
            label={t.common.breadcrumb}
            items={[
              { label: t.common.home, href: href(locale) },
              { label: t.nav.therapists, href: href(locale, "/therapists") },
              { label: card.name },
            ]}
          />
          <div className="therapist-profile-hero">
            <TherapistAvatar tone={th.tone} photo={th.photo} preload sizes="(min-width: 1024px) 40vw, (min-width: 640px) 45vw, 90vw" className="therapist-profile-portrait" />
            <div>
              <Heading level={1} size={1} className="therapist-profile-name">
                <Ph>{card.name}</Ph>
              </Heading>
              <p className="mt-3 text-lead text-cocoa-soft"><WordText>
                <Ph>{card.role}</Ph>
              </WordText></p>
              <p className="therapist-profile-introduction"><WordText><Ph>{th.bio[locale]}</Ph></WordText></p>
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

      <Section spacing="tight">
        <Container className="therapist-profile-layout">
          <div className="therapist-profile-content">
            <section aria-labelledby="profile-focus"><h2 id="profile-focus"><WordText>What we can <em>talk through.</em></WordText></h2><p><WordText>Explore the areas this practitioner works with. You can also begin in your own words.</WordText></p><ul className="therapist-profile-focus">{th.concerns.map((c) => <li key={c}><Link href={href(locale, `/concerns/${c}`)}>{concernBySlug[c]?.name[locale]} <span aria-hidden="true">↗</span></Link></li>)}</ul></section>
            <section aria-labelledby="profile-background"><h2 id="profile-background"><WordText>Professional <em>background.</em></WordText></h2><div className="therapist-profile-qualification"><Ph>{card.credential}</Ph></div></section>
            <section aria-labelledby="profile-sessions"><h2 id="profile-sessions"><WordText>Ways to work <em>together.</em></WordText></h2><ul className="therapist-profile-services">{th.services.map((slug) => { const service = serviceBySlug[slug]; return service ? <li key={slug}><div><h3><WordText><Link href={href(locale, `/services/${slug}`)}>{service.name[locale]}</Link></WordText></h3><span>{service.durationMinutes} minutes · {service.modes.filter((mode) => th.modes.includes(mode)).map((mode) => t.home.services[mode]).join(" / ")}</span></div><p><WordText>{service.details[locale]}</WordText></p>{service.requiresGuardianConsent ? <p className="therapist-profile-guardian"><WordText>For ages 13–17, with parent or guardian consent. Privacy and its limits are explained at the start.</WordText></p> : null}<Link href={href(locale, `/book?therapist=${th.slug}&service=${slug}`)} className="therapist-profile-text-link">Book this session <ArrowIcon /></Link></li> : null; })}</ul></section>
            <section aria-labelledby="profile-first"><h2 id="profile-first"><WordText>Your first <em>conversation.</em></WordText></h2><p><WordText>You can talk about what brings you here, ask questions and discuss what you would like to work on. You and your therapist can decide on the approach and any next steps together.</WordText></p><p><WordText>You don’t need to prepare the perfect explanation. Start with what feels comfortable.</WordText></p></section>
          </div>
          <aside className="therapist-profile-booking" aria-labelledby="profile-booking-title"><h2 id="profile-booking-title"><WordText>Make time <em>for yourself.</em></WordText></h2><p className="therapist-profile-booking-fee"><WordText><Ph>{fee}</Ph></WordText></p><dl><div><dt>{t.common.languages}</dt><dd>{card.languages}</dd></div><div><dt>{p.formats}</dt><dd>{th.modes.map((mode) => t.home.services[mode]).join(" / ")}</dd></div><div><dt>{t.home.therapists.next}</dt><dd>{card.next}</dd></div></dl><Button href={bookHref} icon={<ArrowIcon />}>{p.book}</Button><p className="therapist-profile-booking-note"><WordText>Choose your session and review the details before sending your request.</WordText></p></aside>
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
                  <TherapistCard data={o} labels={cardLabels(t)} compact />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}
    </>
  );
}
