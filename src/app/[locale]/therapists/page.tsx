import { concerns } from "@/data/concerns";
import { services } from "@/data/services";
import { therapists } from "@/data/therapists";
import { href } from "@/i18n/config";
import { getLocale, getMessages } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/metadata";
import { cardLabels, toCardData } from "@/lib/therapists";
import { PageHero } from "@/components/ui/PageParts";
import { Ph } from "@/components/ui/Placeholder";
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
      <PageHero image="therapists"
        eyebrow={p.eyebrow}
        title={p.title}
        lead={p.lead}
        crumbLabel={t.common.breadcrumb}
        crumbs={[{ label: t.common.home, href: href(locale) }, { label: t.nav.therapists }]}
      >
        <p className="mt-6 text-sm">
          <Ph>{p.placeholderNote}</Ph>
        </p>
      </PageHero>
      <Section spacing="tight">
        <Container size="wide">
          <TherapistDirectory
            entries={therapists.map((th) => ({
              card: toCardData(th, locale, t),
              languages: th.languages,
              concerns: th.concerns,
              services: th.services,
              availability: th.availability,
            }))}
            labels={p}
            cardLabels={cardLabels(t)}
            languageOptions={[
              { value: "ml", label: t.common.ml },
              { value: "en", label: t.common.en },
            ]}
            concernOptions={concerns.map((c) => ({ value: c.slug, label: c.name[locale] }))}
            serviceOptions={services.map((s) => ({ value: s.slug, label: s.name[locale] }))}
            matchHref={href(locale, "/book?match=1")}
          />
        </Container>
      </Section>
    </>
  );
}
