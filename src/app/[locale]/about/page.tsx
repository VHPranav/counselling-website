import { WordText } from "@/components/motion/WordText";
import Image from "next/image";
import heldHands from "@/assets/images/held-hands.jpg";
import { siteConfig } from "@/config/site";
import { abroadPlaces, keralaPlaces } from "@/data/places";
import { href } from "@/i18n/config";
import { format, getLocale, getMessages } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/metadata";
import { CtaBand, PageHero } from "@/components/ui/PageParts";
import { Ph } from "@/components/ui/Placeholder";
import { Container, Heading, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { BananaLeaf, Blob } from "@/components/shapes/Shapes";

export async function generateMetadata() {
  const t = await getMessages();
  return pageMetadata({ path: "/about", title: t.aboutPage.metaTitle, description: t.aboutPage.metaDescription });
}

export default async function AboutPage() {
  const locale = await getLocale();
  const t = await getMessages();
  const a = t.aboutPage;
  const values = ([1, 2, 3, 4] as const).map((n) => ({ title: a[`v${n}Title`], body: a[`v${n}Body`] }));
  const glyphColours = ["bg-clay", "bg-moss", "bg-ochre", "bg-sage"];

  return (
    <>
      <PageHero image="about"
        eyebrow={a.eyebrow}
        title={a.title}
        lead={<Ph>{format(a.lead, { brand: siteConfig.brandName })}</Ph>}
        crumbLabel={t.common.breadcrumb}
        crumbs={[{ label: t.common.home, href: href(locale) }, { label: t.nav.about }]}
      />

      <Section spacing="tight" className="overflow-hidden">
        <Container className="grid items-center gap-12 md:grid-cols-[1.3fr_1fr]">
          <div>
            <Heading level={2}>{a.storyTitle}</Heading>
            <p className="mt-5 text-lead text-cocoa-soft"><WordText>{a.story1}</WordText></p>
            <p className="mt-4 text-lead text-cocoa-soft"><WordText>
              <Ph>{a.story2}</Ph>
            </WordText></p>
          </div>
          <div className="relative mx-auto w-full max-w-sm">
            <Blob variant={2} aria-hidden className="absolute -bottom-8 -left-10 w-3/4 text-sage/50" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-pebble">
              <Image src={heldHands} alt="" fill placeholder="blur" sizes="(min-width: 768px) 24rem, calc(100vw - 2rem)" className="object-cover" />
            </div>
            <BananaLeaf aria-hidden className="absolute -right-6 -bottom-4 w-1/4 rotate-[18deg] text-moss" />
          </div>
        </Container>
      </Section>

      <Section tone="sand" grain spacing="tight">
        <Container>
          <Heading level={2}>{a.valuesTitle}</Heading>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal as="li" key={v.title} delay={(i % 2) * 100} className="rounded-pebble bg-cream-soft p-6 sm:p-8">
                <span aria-hidden className={`block size-3 rounded-full ${glyphColours[i]}`} />
                <h3 className="mt-5 text-h3"><WordText>{v.title}</WordText></h3>
                <p className="mt-2 text-cocoa-soft"><WordText>{v.body}</WordText></p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <Section spacing="tight">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <Heading level={2} size={3}>
              {a.trustTitle}
            </Heading>
            <p className="mt-4 text-cocoa-soft"><WordText>
              <Ph>{a.trustLead}</Ph>
            </WordText></p>
            <ul className="mt-6 space-y-3">
              {[a.trust1, a.trust2, a.trust3].map((item) => (
                <li key={item} className="rounded-soft bg-cream-soft p-4 text-sm ring-1 ring-cocoa/10">
                  <Ph>{item}</Ph>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Heading level={2} size={3}>
              {a.teamTitle}
            </Heading>
            <p className="mt-4 rounded-soft bg-sand/60 p-5 text-sm"><WordText>
              <Ph>{a.teamNote}</Ph>
            </WordText></p>
          </div>
        </Container>
      </Section>

      <Section tone="sage" grain spacing="tight">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <div>
            <Heading level={2} size={3}>
              {a.whereTitle}
            </Heading>
            <p className="mt-4 text-cocoa-soft"><WordText>{a.whereBody}</WordText></p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { title: a.whereKerala, places: keralaPlaces },
              { title: a.whereAbroad, places: abroadPlaces },
            ].map((group) => (
              <div key={group.title}>
                <h3 className="font-sans text-sm font-semibold text-moss"><WordText>{group.title}</WordText></h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {group.places.map((p) => (
                    <li key={p.en} className="rounded-full bg-cream-soft px-3 py-1.5 text-sm">
                      {p[locale]}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand
        title={t.concernsPage.ctaTitle}
        body={t.concernsPage.ctaBody}
        primary={{ href: href(locale, "/book"), label: t.nav.book }}
        secondary={{ href: href(locale, "/therapists"), label: t.home.therapists.viewAll }}
      />
    </>
  );
}
