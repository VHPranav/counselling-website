import { WordText } from "@/components/motion/WordText";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { concernBySlug } from "@/data/concerns";
import { faqs } from "@/data/faqs";
import { demoTestimonials } from "@/data/demo";
import { moods } from "@/data/moods";
import { matchTherapists, therapists } from "@/data/therapists";
import { href, type Locale } from "@/i18n/config";
import { format, getLocale, getMessages, type Messages } from "@/i18n/dictionaries";
import { cardLabels, toCardData } from "@/lib/therapists";
import { pageMetadata } from "@/lib/metadata";
import { ArrowIcon, Button } from "@/components/ui/Button";
import { FaqList } from "@/components/ui/PageParts";
import { Ph } from "@/components/ui/Placeholder";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Hero } from "@/components/home/Hero";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { HowItWorks } from "@/components/home/HowItWorks";
import { MoodSelector, type MoodOption } from "@/components/home/MoodSelector";
import { ServiceChooser } from "@/components/services/ServiceChooser";
import { discoveryLabels as d } from "@/data/service-discovery";
import "./Home.css";
import { TherapistAvatar } from "@/components/therapists/TherapistCard";

export function generateMetadata() {
  return pageMetadata({ path: "/" });
}

export default async function HomePage() {
  const locale = await getLocale();
  const t = await getMessages();
  const h = t.home;

  return (
    <>
      <Hero locale={locale} t={h.hero} flow={h.flow} team={therapists} />
      <MoodSection locale={locale} t={t} />
      <ServiceChooser locale={locale} />
      <TherapistsSection locale={locale} t={t} />
      <HowItWorks
        eyebrow={h.how.eyebrow}
        title={h.how.title}
        steps={([1, 2, 3, 4] as const).map((n) => ({
          title: h.how[`step${n}Title`],
          body: h.how[`step${n}Body`],
          label: format(h.how.stepLabel, { n }),
        }))}
      />
      <TestimonialsSection locale={locale} t={h.testimonials} f={h.flow} />
      <FaqSection locale={locale} t={t} />
      <FinalCta locale={locale} t={t} />
    </>
  );
}

/** Big serif title with an italic second phrase (Wispr-style). */
function MegaTitle({ top, italic, className, as: Tag = "h2" }: { top: string; italic: string; className?: string; as?: "h2" | "h3" }) {
  return (
    <Tag className={`text-mega-sm text-balance ${className ?? ""}`}>
      <WordText>{top} <em>{italic}</em></WordText>
    </Tag>
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
    <Section id="mood" spacing="tight" className="thanal-mood mx-3 mt-6 scroll-mt-0 overflow-clip rounded-[2rem] sm:mx-4">
      <Container>
        <MoodSelector
          moods={options}
          labels={m}
          cardLabels={cardLabels(t)}
          bookHref={href(locale, "/book")}
          matchHref={href(locale, "/book?match=1")}
          heading={
            <Reveal>

              <MegaTitle top={t.home.flow.moodTop} italic={t.home.flow.moodItalic} className="mx-auto" />
            </Reveal>
          }
        />
      </Container>
    </Section>
  );
}

function TherapistsSection({ locale, t }: { locale: Locale; t: Messages }) {
  const tt = t.home.therapists;
  const preview = therapists.slice(0, 4).map((th) => toCardData(th, locale, t));
  return (
    <Section id="team" spacing="tight" className="thanal-team overflow-hidden">
      <Container className="relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">

            <MegaTitle top={d.teamTitle[locale]} italic={d.teamItalic[locale]} className="mt-3" />
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-cocoa-soft"><WordText>{d.teamLead[locale]}</WordText></p>
          </div>
          <Button href={href(locale, "/therapists")} variant="secondary" className="shrink-0 self-start md:self-auto">
            {tt.viewAll}
          </Button>
        </div>
        <ul className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {preview.map((data, i) => (
            <Reveal as="li" key={data.slug} delay={i * 60}>
              <article className="thanal-practitioner group relative h-full">
                <TherapistAvatar tone={data.tone} photo={data.photo} className="aspect-[4/3] w-full rounded-[1.25rem]!" sizes="(min-width: 1024px) 22vw, 44vw" />
                <h3 className="mt-4 font-sans text-sm font-semibold leading-snug tracking-normal"><WordText>
                  <Link href={data.href} className="after:absolute after:inset-0 after:rounded-[1.25rem] after:content-['']"><Ph>{data.name}</Ph></Link>
                </WordText></h3>
                <p className="mt-1 text-xs text-clay-deep"><WordText><Ph>{data.role}</Ph></WordText></p>
                <p className="mt-2 text-xs leading-relaxed text-cocoa-soft"><WordText><Ph>{data.credential}</Ph></WordText></p>
                <p className="mt-3 border-t border-cocoa/10 pt-3 text-xs text-cocoa-soft"><WordText>{data.languages}</WordText></p>
                <p className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs font-medium"><WordText>
                  <Ph>{data.price}</Ph><span aria-hidden="true" className="text-clay-deep">{tt.viewProfile} →</span>
                </WordText></p>
              </article>
            </Reveal>
          ))}
        </ul>
        <p className="mt-5 max-w-2xl text-xs text-cocoa-soft"><WordText>
          <Ph>{tt.credentialsNote}</Ph>
        </WordText></p>
      </Container>
    </Section>
  );
}

function TestimonialsSection({ locale, t, f }: { locale: Locale; t: Messages["home"]["testimonials"]; f: Messages["home"]["flow"] }) {
  // Demo mode: fictional sample quotes. Otherwise: clearly marked placeholders.
  const items = siteConfig.demoMode
    ? demoTestimonials.map((d) => ({ quote: d.quote[locale], who: d.who[locale] }))
    : [1, 2, 3, 4, 5].map((n) => ({ quote: format(t.quote, { n }), who: t.who }));
  return (
    <section className="thanal-reviews mx-3 my-6 overflow-hidden rounded-[2rem] py-10 sm:mx-4 sm:py-14">
      <Container size="wide">
        <Reveal className="text-center">

          <MegaTitle top={f.testiTop} italic={f.testiItalic} className="mx-auto mt-3 max-w-3xl" />
          <p className="mt-3 text-xs text-cocoa-soft"><WordText>{siteConfig.demoMode ? d.sampleReviews[locale] : t.note}</WordText></p>
        </Reveal>
        <TestimonialsCarousel
          items={items}
          label={`${f.testiTop} ${f.testiItalic}`}
          previousLabel={t.previous}
          nextLabel={t.next}
        />
      </Container>
    </section>
  );
}

function FaqSection({ locale, t }: { locale: Locale; t: Messages }) {
  const f = t.home.faq;
  const fl = t.home.flow;
  const items = faqs.filter((q) => q.home).map((q) => ({ q: q.question[locale], a: q.answer[locale] }));
  return (
    <Section id="faq" spacing="tight">
      <Container className="grid items-start gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28">

          <MegaTitle top={fl.faqTop} italic={fl.faqItalic} className="mt-3" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-cocoa-soft"><WordText>{d.faqLead[locale]}</WordText></p>
          <Link href={href(locale, "/contact")} className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-clay-deeper underline">{t.home.cta.secondary} <ArrowIcon /></Link>
        </div>
        <div>
          <FaqList items={items.slice(0, 5)} />
          <Link href={href(locale, "/faq")} className="text-link mt-5 inline-flex min-h-11 items-center text-sm">{f.viewAll}</Link>
        </div>
      </Container>
    </Section>
  );
}

function FinalCta({ locale, t }: { locale: Locale; t: Messages }) {
  const c = t.home.cta;
  const fl = t.home.flow;
  return (
    <section id="get-started" className="mx-3 my-6 scroll-mt-0 rounded-[2rem] bg-sand px-6 py-10 sm:mx-4 sm:rounded-[2.5rem] sm:py-12">
      <Container className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
        <div className="max-w-xl">
          <MegaTitle top={fl.ctaTop} italic={fl.ctaItalic} />
          <p className="mt-3 text-sm text-cocoa-soft"><WordText>{c.lead}</WordText></p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button href={href(locale, "/book")} size="lg" icon={<ArrowIcon />}>{c.primary}</Button>
          <Button href={href(locale, "/contact")} size="lg" variant="secondary">{c.secondary}</Button>
        </div>
      </Container>
    </section>
  );
}
