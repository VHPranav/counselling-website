import { WordText } from "@/components/motion/WordText";
import { therapists } from "@/data/therapists";
import { href } from "@/i18n/config";
import { getLocale, getMessages } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/metadata";
import { cardLabels, toCardData } from "@/lib/therapists";
import { Breadcrumbs } from "@/components/ui/PageParts";
import { Button } from "@/components/ui/Button";
import "@/components/therapists/TherapistDirectory.css";
import { Container, Section } from "@/components/ui/Section";
import { TherapistDirectory } from "@/components/therapists/TherapistDirectory";

export async function generateMetadata() {
  const t = await getMessages();
  return pageMetadata({ path: "/therapists", title: t.therapistsPage.metaTitle, description: t.therapistsPage.metaDescription });
}

export default async function TherapistsPage() {
  const locale = await getLocale();
  const t = await getMessages();
  const p = t.therapistsPage;
  return (
    <>
      <section className="page-intro psychologist-intro">
        <Container>
          <Breadcrumbs label={t.common.breadcrumb} items={[{ label: t.common.home, href: href(locale) }, { label: t.nav.therapists }]} />
          <div className="psychologist-intro-content"><div><h1><WordText>Find a psychologist <em>you can open up to.</em></WordText></h1><p className="psychologist-intro-lead"><WordText>Meet our Malayalam- and English-speaking practitioners. Compare their approach, session fee and availability, then choose who feels right for you.</WordText></p></div><Button href={href(locale, "/book?match=1")} variant="secondary">{p.match}</Button></div>
          <ol className="psychologist-journey"><li><span>01</span>Choose your psychologist</li><li><span>02</span>Book a session</li><li><span>03</span>Meet privately online</li></ol>
        </Container>
      </section>
      <Section spacing="tight">
        <Container size="wide">
          <TherapistDirectory
            entries={therapists.map((th) => ({
              card: toCardData(th, locale, t),
              bio: th.bio[locale],
              bookHref: href(locale, `/book?therapist=${th.slug}`),
            }))}
            labels={p}
            cardLabels={cardLabels(t)}
            matchHref={href(locale, "/book?match=1")}
          />
        </Container>
      </Section>
    </>
  );
}
