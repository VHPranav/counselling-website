import Image from "next/image";
import Link from "next/link";
import backwatersDawn from "@/assets/images/backwaters-dawn.jpg";
import monsoonWindow from "@/assets/images/monsoon-window.jpg";
import { siteConfig } from "@/config/site";
import { concernBySlug } from "@/data/concerns";
import { faqs } from "@/data/faqs";
import { moods } from "@/data/moods";
import { services } from "@/data/services";
import { matchTherapists, therapists } from "@/data/therapists";
import { href, type Locale } from "@/i18n/config";
import { format, getLocale, getMessages, type Messages } from "@/i18n/dictionaries";
import { cardLabels, formatInr, toCardData } from "@/lib/therapists";
import { pageMetadata } from "@/lib/metadata";
import { ArrowIcon, Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Marquee } from "@/components/ui/Marquee";
import { FaqList } from "@/components/ui/PageParts";
import { Ph } from "@/components/ui/Placeholder";
import { Container, Eyebrow, Heading, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { BananaLeaf, Ripple } from "@/components/shapes/Shapes";
import { Breathing } from "@/components/home/Breathing";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { MoodSelector, type MoodOption } from "@/components/home/MoodSelector";
import { ServiceGlyph } from "@/components/home/ServiceGlyph";
import { TherapistCard } from "@/components/therapists/TherapistCard";

export function generateMetadata() {
  return pageMetadata({ path: "/" });
}

export default async function HomePage() {
  const locale = await getLocale();
  const t = await getMessages();
  const h = t.home;

  return (
    <>
      <Hero locale={locale} t={h.hero} />
      <MoodSection locale={locale} t={t} />
      <ServicesSection locale={locale} t={t} />
      <HowItWorks
        eyebrow={h.how.eyebrow}
        title={h.how.title}
        steps={([1, 2, 3, 4] as const).map((n) => ({
          title: h.how[`step${n}Title`],
          body: h.how[`step${n}Body`],
          label: format(h.how.stepLabel, { n }),
        }))}
      />
      <TherapistsSection locale={locale} t={t} />
      <BreathSection t={h.breath} />
      <TestimonialsSection t={h.testimonials} />
      <FaqSection locale={locale} t={t} />
      <BusinessSection locale={locale} t={h.business} />
      <FinalCta locale={locale} t={t} />
    </>
  );
}

function SectionHeader({ eyebrow, title, lead, className }: { eyebrow: string; title: string; lead?: string; className?: string }) {
  return (
    <Reveal className={className}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <Heading level={2} className="mt-4 max-w-3xl">
        {title}
      </Heading>
      {lead ? <p className="mt-4 max-w-2xl text-lead text-cocoa-soft [.on-dark_&]:text-cream/80">{lead}</p> : null}
    </Reveal>
  );
}

function MoodSection({ locale, t }: { locale: Locale; t: Messages }) {
  const m = t.home.mood;
  const options: MoodOption[] = moods.map((mood) => ({
    id: mood.id,
    label: mood.label[locale],
    response: mood.response[locale],
    concerns: mood.concerns
      .map((slug) => concernBySlug[slug])
      .filter(Boolean)
      .map((c) => ({ slug: c.slug, name: c.name[locale], summary: c.summary[locale], href: href(locale, `/concerns/${c.slug}`) })),
    therapists: matchTherapists(mood.concerns, 2).map((th) => toCardData(th, locale, t)),
  }));
  return (
    <Section id="mood" tone="sand" grain className="scroll-mt-16 overflow-hidden">
      <Ripple className="pointer-events-none absolute -right-20 top-10 w-[28rem] text-cream/70" />
      <Container className="relative">
        <SectionHeader eyebrow={m.eyebrow} title={m.title} lead={m.lead} />
        <div className="mt-10">
          <MoodSelector
            moods={options}
            labels={m}
            cardLabels={cardLabels(t)}
            bookHref={href(locale, "/book")}
            matchHref={href(locale, "/book?match=1")}
          />
        </div>
      </Container>
    </Section>
  );
}

function ServicesSection({ locale, t }: { locale: Locale; t: Messages }) {
  const s = t.home.services;
  // Bento layout: two wide cards, then three.
  const spans = ["lg:col-span-3", "lg:col-span-3", "lg:col-span-2", "lg:col-span-2", "lg:col-span-2"];
  return (
    <Section>
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader eyebrow={s.eyebrow} title={s.title} />
          <Link href={href(locale, "/services")} className="text-link shrink-0 font-medium">
            {s.viewAll}
          </Link>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:gap-5">
          {services.map((svc, i) => (
            <Reveal as="li" key={svc.slug} delay={(i % 3) * 90} className={spans[i]}>
              <Card href={href(locale, `/services#${svc.slug}`)} tone={i < 2 ? "sand" : "cream"} className="group flex h-full flex-col">
                <div className="flex items-start justify-between gap-4">
                  <ServiceGlyph slug={svc.slug} className="size-12 sm:size-14" />
                  <ArrowIcon className="text-clay-deep transition-transform duration-300 group-hover:translate-x-1" />
                </div>
                <h3 className="mt-6 text-h3">{svc.name[locale]}</h3>
                <p className="mt-1 text-sm font-medium text-moss">{svc.audience[locale]}</p>
                <p className="mt-3 text-cocoa-soft">{svc.summary[locale]}</p>
                <p className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-6 text-sm">
                  <span>{format(s.minutes, { n: svc.durationMinutes })}</span>
                  <span aria-hidden className="text-cocoa/30">·</span>
                  <span>{svc.modes.map((mode) => s[mode]).join(" / ")}</span>
                  <span aria-hidden className="text-cocoa/30">·</span>
                  <span className="font-medium">
                    <Ph>{svc.priceInr == null ? s.price : formatInr(svc.priceInr, locale)}</Ph>
                  </span>
                </p>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

function TherapistsSection({ locale, t }: { locale: Locale; t: Messages }) {
  const tt = t.home.therapists;
  const preview = therapists.slice(0, 4).map((th) => toCardData(th, locale, t));
  return (
    <Section tone="sand" grain className="overflow-hidden">
      <BananaLeaf className="pointer-events-none absolute -left-10 bottom-0 w-36 rotate-[20deg] text-moss/15 lg:w-52" />
      <Container className="relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader eyebrow={tt.eyebrow} title={tt.title} lead={tt.lead} />
          <Button href={href(locale, "/therapists")} variant="secondary" className="shrink-0 self-start md:self-auto">
            {tt.viewAll}
          </Button>
        </div>
        {/* Swipeable row on mobile, grid on desktop */}
        <ul className="-mx-4 mt-12 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-4 sm:scroll-px-6 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0 lg:pb-0">
          {preview.map((data, i) => (
            <Reveal as="li" key={data.slug} delay={i * 90} className="w-[78%] shrink-0 snap-start xs:w-[60%] sm:w-[45%] lg:w-auto">
              <TherapistCard data={data} labels={cardLabels(t)} />
            </Reveal>
          ))}
        </ul>
        <p className="mt-8 text-sm text-cocoa-soft">
          <Ph>{tt.credentialsNote}</Ph>
        </p>
      </Container>
    </Section>
  );
}

function BreathSection({ t }: { t: Messages["home"]["breath"] }) {
  return (
    <Section id="breathe" tone="sage" className="scroll-mt-16 overflow-hidden">
      {/* Dawn on the backwaters (generated in Google Flow). The open water on the
          left sits under the text; the canoe and palms frame the breathing circle. */}
      <Image
        src={backwatersDawn}
        alt=""
        fill
        placeholder="blur"
        sizes="100vw"
        className="object-cover object-[70%_50%]"
      />
      <div aria-hidden className="absolute inset-0 bg-cream/70 md:bg-transparent md:bg-gradient-to-r md:from-cream/85 md:via-cream/45 md:to-cream/10" />
      <Container className="relative grid items-center gap-12 md:grid-cols-2">
        <SectionHeader eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
        <Breathing labels={t} />
      </Container>
    </Section>
  );
}

function TestimonialsSection({ t }: { t: Messages["home"]["testimonials"] }) {
  return (
    <Section className="overflow-hidden">
      <Container>
        <SectionHeader eyebrow={t.eyebrow} title={t.title} />
        <p className="mt-3 text-sm text-cocoa-soft">{t.note}</p>
      </Container>
      <Marquee className="mt-12" label={t.title} seconds={70} pauseLabel={t.pause} playLabel={t.play}>
        {[1, 2, 3, 4, 5].map((n) => (
          <figure key={n} className="flex w-[19rem] shrink-0 flex-col justify-between rounded-pebble bg-sand p-7 sm:w-[24rem]">
            <svg viewBox="0 0 32 24" width="32" height="24" aria-hidden className="text-clay">
              <path d="M0 24V14C0 6 4 1 12 0v5c-4 1-6 4-6 8h6v11H0Zm18 0V14c0-8 4-13 12-14v5c-4 1-6 4-6 8h6v11H18Z" fill="currentColor" />
            </svg>
            <blockquote className="mt-5 font-display text-h4 leading-snug">
              <Ph>{format(t.quote, { n })}</Ph>
            </blockquote>
            <figcaption className="mt-6 text-sm text-cocoa-soft">
              <Ph>{t.who}</Ph>
            </figcaption>
          </figure>
        ))}
      </Marquee>
    </Section>
  );
}

function FaqSection({ locale, t }: { locale: Locale; t: Messages }) {
  const f = t.home.faq;
  return (
    <Section tone="sand">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div>
          <SectionHeader eyebrow={f.eyebrow} title={f.title} />
          <Link href={href(locale, "/faq")} className="text-link mt-6 inline-block font-medium">
            {f.viewAll}
          </Link>
        </div>
        <FaqList items={faqs.filter((q) => q.home).map((q) => ({ q: q.question[locale], a: q.answer[locale] }))} />
      </Container>
    </Section>
  );
}

function BusinessSection({ locale, t }: { locale: Locale; t: Messages["home"]["business"] }) {
  const items = [
    { title: t.workTitle, body: t.workBody },
    { title: t.campusTitle, body: t.campusBody },
  ];
  return (
    <Section tone="forest" className="overflow-hidden">
      <Ripple className="pointer-events-none absolute -right-24 -top-10 w-[36rem] text-sage/20" />
      <BananaLeaf className="pointer-events-none absolute -bottom-16 left-[8%] w-32 rotate-[-18deg] text-moss/35" />
      <Container className="relative grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-end">
        <div className="min-w-0">
          <SectionHeader eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
          <Button href={href(locale, "/business")} variant="light" className="mt-8" icon={<ArrowIcon />}>
            {t.cta}
          </Button>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {items.map((it, i) => (
            <Reveal as="li" key={it.title} delay={i * 120}>
              <Card tone="forest" className="h-full">
                <h3 className="text-h3">{it.title}</h3>
                <p className="mt-3 text-cream/80">{it.body}</p>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

function FinalCta({ locale, t }: { locale: Locale; t: Messages }) {
  const c = t.home.cta;
  const hasWhatsApp = /^\d+$/.test(siteConfig.contact.whatsapp);
  return (
    <Section id="get-started" spacing="none" className="scroll-mt-16 overflow-hidden pt-20 sm:pt-28 lg:flex lg:min-h-[44rem] lg:items-center lg:py-28">
      <Container size="wide" className="relative z-10">
        <Reveal className="lg:max-w-[46%]">
          <Heading level={2} size={1}>
            {c.title}
          </Heading>
          <p className="mt-5 max-w-xl text-lead text-cocoa-soft">{c.lead}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href={href(locale, "/book")} size="lg" magnetic icon={<ArrowIcon />}>
              {c.primary}
            </Button>
            <Button href={href(locale, "/contact")} size="lg" variant="secondary" className="bg-cream/60 backdrop-blur-sm">
              {c.secondary}
            </Button>
          </div>
          <p className="mt-8 text-sm text-cocoa-soft">
            {hasWhatsApp ? (
              <a href={`https://wa.me/${siteConfig.contact.whatsapp}`} className="text-link" rel="noopener">
                {c.whatsapp}
              </a>
            ) : (
              <>
                {c.whatsapp} <Ph>{siteConfig.contact.phoneDisplay}</Ph>
              </>
            )}
          </p>
          <p className="mt-3 max-w-md text-sm text-cocoa-soft">{c.someone}</p>
        </Reveal>
      </Container>
      {/* Monsoon window with chai (generated in Google Flow). Mobile: a rounded
          photo under the text. Desktop: full-bleed, plain wall under the text. */}
      <div className="relative mx-4 mb-20 mt-12 aspect-[4/3] overflow-hidden rounded-pebble sm:mx-6 sm:mb-28 lg:absolute lg:inset-0 lg:m-0 lg:aspect-auto lg:rounded-none">
        <Image
          src={monsoonWindow}
          alt=""
          fill
          placeholder="blur"
          sizes="(min-width: 1024px) 100vw, calc(100vw - 2rem)"
          className="object-cover object-[70%_70%] lg:object-[100%_85%]"
        />
        <div aria-hidden className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgb(246_240_230/0.94)_0%,rgb(246_240_230/0.8)_40%,rgb(246_240_230/0.2)_62%,transparent_80%)] lg:block" />
      </div>
    </Section>
  );
}
