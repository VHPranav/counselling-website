import { WordText } from "@/components/motion/WordText";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import concernPhoto from "@/assets/pages/concerns.jpg";
import supportPhoto from "@/assets/portraits/lakshmi-pillai.jpg";
import { concernDetails } from "@/data/concern-details";
import { services } from "@/data/services";
import { serviceConcerns, discoveryLabels } from "@/data/service-discovery";
import { demoTestimonials } from "@/data/demo";
import { faqs } from "@/data/faqs";
import { formatInr } from "@/lib/therapists";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { concernBySlug, concerns } from "@/data/concerns";
import { concernLabels as l } from "@/data/concern-presentation";
import { matchTherapists } from "@/data/therapists";
import { siteConfig } from "@/config/site";
import { href } from "@/i18n/config";
import { getLocale, getMessages } from "@/i18n/dictionaries";
import { loadConcernGuide } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { toCardData } from "@/lib/therapists";
import { ArrowIcon, Button } from "@/components/ui/Button";
import { Breadcrumbs, FaqList } from "@/components/ui/PageParts";
import { Ph } from "@/components/ui/Placeholder";
import { Container, Section } from "@/components/ui/Section";
import { TherapistAvatar } from "@/components/therapists/TherapistCard";
import "./Concern.css";

export function generateStaticParams() { return concerns.map((concern) => ({ slug: concern.slug })); }
export const instant = false;

export async function generateMetadata({ params }: PageProps<"/[locale]/concerns/[slug]">) {
  const { slug } = await params;
  const locale = await getLocale();
  const concern = Object.hasOwn(concernBySlug, slug) ? concernBySlug[slug] : undefined;
  if (!concern) return {};
  return pageMetadata({ path: `/concerns/${slug}`, title: concern.name[locale], description: concern.summary[locale] });
}

export default async function ConcernPage({ params }: PageProps<"/[locale]/concerns/[slug]">) {
  const { slug } = await params;
  const concern = Object.hasOwn(concernBySlug, slug) ? concernBySlug[slug] : undefined;
  if (!concern) notFound();
  const locale = await getLocale();
  const t = await getMessages();
  const c = t.concernsPage;
  const guide = await loadConcernGuide(locale, slug);
  const name = concern.name[locale];
  const team = matchTherapists([slug], 3).map((person) => toCardData(person, locale, t));
  const detail = concernDetails[slug];
  const sessionOptions = services.filter((service) => service.slug !== "follow-up" && serviceConcerns[service.slug]?.includes(slug));
  const faqItems = [...(guide?.meta.faq ?? []), ...faqs.filter((item) => item.home).slice(0, 3).map((item) => ({ q: item.question[locale], a: item.answer[locale] }))];
  const related = concerns.filter((item) => item.slug !== slug).slice(0, 6);
  const jsonLd = faqItems.length ? {
    "@context": "https://schema.org", "@type": "FAQPage", inLanguage: locale,
    mainEntity: faqItems.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
  } : null;

  return (
    <>
      {jsonLd ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} /> : null}
      <section className="page-intro concern-intro">
        <Container>
          <Breadcrumbs label={t.common.breadcrumb} items={[{ label: t.common.home, href: href(locale) }, { label: t.nav.concerns, href: href(locale, "/#services") }, { label: name }]} />
          <div className="concern-intro-grid">
            <div>

              <h1><WordText>{slug === "anxiety" ? l.anxietyTitle[locale] : name}{" "}<em>{slug === "anxiety" ? l.titleEnd[locale] : l.topicEnd[locale]}</em></WordText></h1>
              <p className="concern-intro-lead"><WordText>{slug === "anxiety" ? l.anxietyLead[locale] : (guide?.meta.intro ?? concern.summary[locale])}</WordText></p>
              <div className="concern-intro-actions">
                <Button href={team.length ? "#psychologists" : href(locale, "/therapists")} icon={<ArrowIcon />}>{l.choose[locale]}</Button>
                <Button href={href(locale, "/book?match=1")} variant="secondary">{l.match[locale]}</Button>
              </div>
              <p className="concern-intro-note"><WordText>{t.home.hero.point3} · {t.home.hero.point2}</WordText></p>
            </div>
            <div className="concern-intro-image">
              <Image src={concernPhoto} alt="" fill preload sizes="(min-width: 1024px) 38vw, 90vw" placeholder="blur" className="object-cover object-[80%_40%]" />
              <span>{t.home.hero.point1}</span>
            </div>
          </div>
        </Container>
      </section>

      {team.length ? (
        <Section id="psychologists" spacing="tight" className="scroll-mt-0">
          <Container>
            <div className="concern-heading-row">
              <div><h2><WordText>{c.therapistsTitle}</WordText></h2><p><WordText>{l.teamLead[locale]}</WordText></p></div>
              <Link href={href(locale, "/therapists")} className="text-link inline-flex min-h-11 items-center text-sm">{t.home.therapists.viewAll}</Link>
            </div>
            <ul className="concern-practitioners" tabIndex={0} aria-label={c.therapistsTitle}>
              {team.map((person) => (
                <li key={person.slug} className="concern-practitioner-card">
                  <Link href={person.href} className="concern-practitioner-profile">
                    <TherapistAvatar tone={person.tone} photo={person.photo} round className="size-20 shrink-0" sizes="80px" />
                    <span><span className="block text-sm font-semibold"><Ph>{person.name}</Ph></span><span className="mt-1 block text-xs text-clay-deep"><Ph>{person.role}</Ph></span></span>
                  </Link>
                  <p className="mt-4 text-xs leading-relaxed text-cocoa-soft"><WordText><Ph>{person.credential}</Ph></WordText></p>
                  <p className="mt-2 text-xs text-cocoa-soft"><WordText>{person.languages}</WordText></p>
                  <div className="concern-practitioner-bottom"><span className="text-sm font-semibold"><Ph>{person.price}</Ph></span><Button href={href(locale, `/book?therapist=${person.slug}`)} size="sm" icon={<ArrowIcon />}>{l.bookWith[locale]}</Button></div>
                  <Link href={person.href} className="mt-2 inline-flex min-h-11 items-center text-xs text-clay-deeper underline">{t.home.therapists.viewProfile}</Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      <Section spacing="tight" className="concern-process" aria-labelledby="concern-process-title">
        <Container>
          <div className="concern-process-heading"><h2 id="concern-process-title" className="text-h2"><WordText>How online counselling works <em>at Thanal.</em></WordText></h2><p><WordText>Start from wherever you are. A few simple steps bring you closer to a conversation in your own language.</WordText></p></div>
          <div className="concern-process-layout">
            <ol className="concern-process-steps">
              {[
                ["Choose your psychologist", "Explore profiles and approaches. Pick someone you feel comfortable with, or ask us to help you choose."],
                ["Book your session", "Choose a session format and a time that works for you. Review the fee before confirming."],
                ["Meet online", "Find a quiet, private space and join by video or audio. Begin with whatever feels easiest to share."],
                ["Decide what comes next", "Discuss what you need, reflect on the session, and agree any follow-up together."],
              ].map(([title, body], i) => <li key={title}><span aria-hidden="true">{i + 1}.</span><div><h3><WordText>{title}</WordText></h3><p><WordText>{body}</WordText></p></div></li>)}
            </ol>
            <figure className="concern-process-media"><video src="/videos/hero-counsellor-720.mp4" poster={supportPhoto.src} controls muted playsInline preload="metadata" aria-label="Counselling video preview" /><figcaption>Space for a conversation. Time for you.</figcaption></figure>
          </div>
        </Container>
      </Section>

      <Section spacing="tight" tone="forest" className="concern-why" aria-labelledby="concern-why-title">
        <Container className="concern-support-split">
          <div className="concern-support-photo"><Image src={supportPhoto} alt="" fill sizes="(min-width: 1024px) 30vw, 90vw" placeholder="blur" className="object-cover object-top" /></div>
          <div>
            <h2 id="concern-why-title" className="text-h2"><WordText>Why Thanal for <em>{name.toLowerCase()}?</em></WordText></h2>
            <p className="concern-why-lead"><WordText>Finding support is personal. We make room for your language, your circumstances and the things you want to work through.</WordText></p>
            <ul className="concern-benefit-grid">
              {[
                ["Someone who understands", "Explore practitioners who work with this concern and speak Malayalam and English."],
                ["Support shaped around you", "Talk about your needs and goals, then agree an approach that makes sense for your life."],
                ["Practical ways forward", "Work on understanding patterns and practising skills you can use between conversations."],
                ["Room to keep going", "Review how things feel with your therapist and decide on the next steps together."],
              ].map(([title, body]) => <li key={title}><h3><WordText>{title}</WordText></h3><p><WordText>{body}</WordText></p></li>)}
            </ul>
          </div>
        </Container>
      </Section>

      <Section spacing="tight" className="concern-options">
        <Container>
          <div className="concern-heading-row"><div><h2><WordText>Choose a session that fits.</WordText></h2><p><WordText>Explore the format and fee before you book. Your practitioner can help you decide where to begin.</WordText></p></div></div>
          <ul className="concern-session-grid">{sessionOptions.map((service) => <li key={service.slug}><h3><WordText>{service.name[locale]}</WordText></h3><p><WordText>{service.summary[locale]}</WordText></p><div className="concern-session-meta"><span>{service.durationMinutes} minutes · {service.modes.map((mode) => t.home.services[mode]).join(" / ")}</span><strong><Ph>{service.priceInr == null ? t.home.services.price : formatInr(service.priceInr, locale)}</Ph></strong></div><Button href={href(locale, `/book?service=${service.slug}`)} variant="secondary" size="sm">{l.bookWith[locale]}</Button></li>)}</ul>
        </Container>
      </Section>

      {siteConfig.demoMode ? <Section spacing="tight" className="concern-stories"><Container><h2 className="text-h2"><WordText>A little less alone. <em>A little more heard.</em></WordText></h2><p className="mt-3 text-xs text-cocoa-soft"><WordText>{discoveryLabels.sampleReviews[locale]}</WordText></p><TestimonialsCarousel items={demoTestimonials.map((item) => ({ quote: item.quote[locale], who: item.who[locale] }))} label="Session stories" previousLabel={t.home.testimonials.previous} nextLabel={t.home.testimonials.next} /></Container></Section> : null}

      <Section spacing="tight">
        <Container className="concern-overview"><h2 className="text-h2"><WordText>Understanding <em>{name.toLowerCase()}.</em></WordText></h2><div><p><WordText>{detail.intro}</WordText></p><p className="mt-4 text-xs text-cocoa-soft"><WordText>These experiences can overlap with other concerns. A conversation with a qualified professional can help you understand what is happening for you.</WordText></p></div></Container>
      </Section>

      <Section spacing="tight" className="concern-signs">
          <Container>
            <div className="concern-heading-row"><div><h2><WordText>{c.signsTitle}</WordText></h2></div><p className="max-w-md text-sm leading-relaxed text-cocoa-soft"><WordText>{l.signsLead[locale]}</WordText></p></div>
            <ul className="concern-sign-grid">{(guide?.meta.signs ?? detail.signs).map((sign, i) => <li key={sign}><span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span><p><WordText>{sign}</WordText></p></li>)}</ul>
            <p className="mt-4 text-xs text-cocoa-soft"><WordText>{c.signsNote}</WordText></p>
          </Container>
        </Section>

      <Section spacing="tight">
        <Container className="concern-seek"><div><h2 className="text-h2"><WordText>When is it time <em>to reach out?</em></WordText></h2><p className="mt-4 text-sm leading-relaxed text-cocoa-soft"><WordText>{detail.seek}</WordText></p><Button href="#psychologists" className="mt-5" icon={<ArrowIcon />}>{l.choose[locale]}</Button></div><div className="concern-seek-note"><span aria-hidden="true">“</span><p><WordText>You don’t need to have the right words. You can start with how today feels.</WordText></p></div></Container>
      </Section>

      <Section spacing="tight" className="concern-experiences">
        <Container><div className="concern-heading-row"><div><h2><WordText>Different ways it <em>can show up.</em></WordText></h2><p><WordText>Your experience is your own. Here are some areas you might want to talk about.</WordText></p></div></div><ul className="concern-experience-grid">{detail.experiences.map(([title, body]) => <li key={title}><h3><WordText>{title}</WordText></h3><p><WordText>{body}</WordText></p></li>)}</ul></Container>
      </Section>

      <Section spacing="tight">
        <Container className="concern-therapy"><div><h2 className="text-h2"><WordText>What you can work on <em>in therapy.</em></WordText></h2><p className="mt-4 text-sm leading-relaxed text-cocoa-soft"><WordText>Your sessions can focus on what matters to you. The approach and pace are discussed together, and can change as your needs change.</WordText></p><Button href="#psychologists" className="mt-5" variant="secondary">Meet the psychologists</Button></div><ol>{detail.goals.map((goal, i) => <li key={goal}><span>{String(i + 1).padStart(2, "0")}</span><p><WordText>{goal}</WordText></p></li>)}</ol></Container>
      </Section>

      <Section spacing="tight" className="concern-resources"><Container><h2 className="text-h2"><WordText>Not sure how <em>to begin?</em></WordText></h2><div className="concern-resource-grid"><Link href={href(locale, "/blog/first-session")}><h3><WordText>Your first session</WordText></h3><p><WordText>A little preparation for a conversation that is yours.</WordText></p><span>Read the guide ↗</span></Link><Link href={href(locale, "/blog/talking-to-family")}><h3><WordText>Talking to your family</WordText></h3><p><WordText>Finding words for the support you would like.</WordText></p><span>Read the guide ↗</span></Link><Link href={href(locale, "/book?match=1")}><h3><WordText>Choosing a psychologist</WordText></h3><p><WordText>Get help finding someone you feel comfortable with.</WordText></p><span>Help me choose ↗</span></Link></div></Container></Section>

      <Section spacing="tight">
        <Container className="grid items-start gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <div><h2 className="text-h2"><WordText>Questions before <em>you begin?</em></WordText></h2><p className="mt-4 text-sm leading-relaxed text-cocoa-soft"><WordText>{l.firstBody[locale]}</WordText></p><Button href={href(locale, "/book?match=1")} className="mt-5" variant="secondary">{l.match[locale]}</Button></div>
          <div>
            <FaqList items={faqItems} />
            {guide ? <details className="concern-read-more"><summary>{l.readMore[locale]} <span aria-hidden="true">+</span></summary><article className="pb-6"><guide.Content /></article></details> : null}
          </div>
        </Container>
      </Section>

      <Section spacing="tight" className="concern-closing">
        <Container className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center"><div><h2 className="text-h2"><WordText>{c.ctaTitle}</WordText></h2><p className="mt-2 max-w-lg text-sm text-cocoa-soft"><WordText>{c.ctaBody}</WordText></p></div><Button href={href(locale, "/book")} icon={<ArrowIcon />}>{c.book}</Button></Container>
      </Section>
      <Section spacing="tight">
        <Container><h2 className="font-sans text-sm font-medium"><WordText>{c.related}</WordText></h2><ul className="mt-4 flex flex-wrap gap-2">{related.map((item) => <li key={item.slug}><Link href={href(locale, `/concerns/${item.slug}`)} className="inline-flex min-h-11 items-center rounded-full border border-cocoa/15 bg-cream-soft px-4 text-sm hover:bg-sand">{item.name[locale]}</Link></li>)}</ul></Container>
      </Section>
    </>
  );
}
