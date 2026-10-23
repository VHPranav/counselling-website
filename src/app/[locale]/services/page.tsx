import { WordText } from "@/components/motion/WordText";
import Link from "next/link";
import { services } from "@/data/services";
import { href } from "@/i18n/config";
import { getLocale, getMessages } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/metadata";
import { formatInr } from "@/lib/therapists";
import { ArrowIcon, Button } from "@/components/ui/Button";
import { Breadcrumbs, FaqList } from "@/components/ui/PageParts";
import { Ph } from "@/components/ui/Placeholder";
import { Container, Section } from "@/components/ui/Section";
import { ServiceChooser } from "@/components/services/ServiceChooser";
import "@/components/services/Services.css";

export async function generateMetadata() {
  const t = await getMessages();
  return pageMetadata({ path: "/services", title: t.servicesPage.metaTitle, description: t.servicesPage.metaDescription });
}

export default async function ServicesPage() {
  const locale = await getLocale();
  const t = await getMessages();
  const s = t.servicesPage;
  const followUp = services.find((service) => service.slug === "follow-up")!;
  const price = (amount: number | null) => amount == null ? t.home.services.price : formatInr(amount, locale);
  return (
    <>
      <section className="page-intro services-page-intro">
        <Container>
          <Breadcrumbs label={t.common.breadcrumb} items={[{ label: t.common.home, href: href(locale) }, { label: t.nav.services }]} />
          <div className="services-page-introGrid">
            <div><h1><WordText>The right support,<br /><em>for this part of life.</em></WordText></h1><p><WordText>For yourself, your relationship, or your family. Find space to talk with a psychologist who understands your language and your world.</WordText></p><div className="services-page-assurances"><span>Malayalam & English</span><span>Online, wherever you are</span></div></div>
            <aside className="services-page-help"><h2><WordText>You don’t have to<br /><em>choose alone.</em></WordText></h2><p><WordText>Tell us a little about the support you’re looking for. We’ll help you find a place to begin.</WordText></p><Button href={href(locale, "/book?match=1")} variant="secondary" icon={<ArrowIcon />}>{s.matchMe}</Button></aside>
          </div>
        </Container>
      </section>

      <ServiceChooser locale={locale} />

      <Section id="follow-up" spacing="tight" tone="forest" className="services-page-followUp" aria-labelledby="follow-up-title">
        <Container className="services-page-followUpGrid"><div><h2 id="follow-up-title"><WordText>Already started?<br /><em>Keep the conversation going.</em></WordText></h2><p><WordText>Continue with your therapist whenever you’re ready for the next session.</WordText></p></div><div className="services-page-followUpDetails"><p><WordText>{followUp.durationMinutes} minutes · {followUp.modes.map((mode) => t.home.services[mode]).join(" / ")}</WordText></p><strong><Ph>{price(followUp.priceInr)}</Ph><span> / session</span></strong><Button href={href(locale, "/book?service=follow-up")} variant="light" icon={<ArrowIcon />}>Book a follow-up</Button><Link href={href(locale, "/services/follow-up")}>About follow-up sessions ↗</Link></div></Container>
      </Section>

      <Section spacing="tight">
        <Container className="services-page-faqGrid"><div><h2><WordText>A little clarity,<br /><em>before you begin.</em></WordText></h2><p><WordText>Start with one conversation. You and your therapist can work out the rest together.</WordText></p><Link href={href(locale, "/therapists")} className="services-page-teamLink">Meet the psychologists <ArrowIcon /></Link></div><FaqList items={[
          { q: "What happens in the first session?", a: "You can share what brings you here, ask questions and discuss what you want support with. You do not need to prepare a perfect explanation." },
          { q: "Can I choose Malayalam or English?", a: "Yes. Choose the language you feel most comfortable in. You can also move between Malayalam and English during the conversation." },
          { q: "How do sessions for teenagers work?", a: "Teen counselling is for ages 13–17 with parent or guardian consent. The therapist explains privacy and its limits with both of you at the start." },
        ]} /></Container>
      </Section>
    </>
  );
}
