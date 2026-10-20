import Link from "next/link";
import { services } from "@/data/services";
import { href } from "@/i18n/config";
import { format, getLocale, getMessages } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/metadata";
import { formatInr } from "@/lib/therapists";
import { ArrowIcon, Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CtaBand, PageHero } from "@/components/ui/PageParts";
import { Ph } from "@/components/ui/Placeholder";
import { Container, Heading, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { ServiceGlyph } from "@/components/home/ServiceGlyph";

export async function generateMetadata() {
  const t = await getMessages();
  return pageMetadata({ path: "/services", title: t.servicesPage.metaTitle, description: t.servicesPage.metaDescription });
}

export default async function ServicesPage() {
  const locale = await getLocale();
  const t = await getMessages();
  const s = t.servicesPage;
  const every = ([1, 2, 3, 4] as const).map((n) => ({ title: s[`every${n}Title`], body: s[`every${n}Body`] }));

  return (
    <>
      <PageHero
        eyebrow={s.eyebrow}
        title={s.title}
        lead={s.lead}
        crumbLabel={t.common.breadcrumb}
        crumbs={[{ label: t.common.home, href: href(locale) }, { label: t.nav.services }]}
      >
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {every.map((e) => (
            <li key={e.title} className="rounded-soft bg-cream-soft/80 p-4 ring-1 ring-cocoa/[0.08]">
              <p className="font-medium">{e.title}</p>
              <p className="mt-1 text-sm text-cocoa-soft">
                <Ph>{e.body}</Ph>
              </p>
            </li>
          ))}
        </ul>
      </PageHero>

      <Section spacing="tight">
        <Container>
          <ul className="space-y-5">
            {services.map((svc) => (
              <Reveal as="li" key={svc.slug}>
                <article id={svc.slug} className="scroll-mt-28">
                  <Card tone="sand" className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
                    <div>
                      <ServiceGlyph slug={svc.slug} className="size-14" />
                      <Heading level={2} size={3} className="mt-5">
                        {svc.name[locale]}
                      </Heading>
                      <p className="mt-2 font-medium text-moss">{svc.audience[locale]}</p>
                      <p className="mt-4 max-w-2xl text-cocoa-soft">{svc.details[locale]}</p>

                      {svc.requiresGuardianConsent ? (
                        <div className="mt-6 rounded-soft bg-cream-soft p-5">
                          <h3 className="font-sans text-base font-semibold">{s.teensTitle}</h3>
                          <ol className="mt-3 space-y-2 text-sm text-cocoa-soft">
                            {[s.teens1, s.teens2, s.teens3].map((line, i) => (
                              <li key={i} className="flex gap-3">
                                <span aria-hidden className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-ochre/30 text-xs font-semibold text-cocoa">
                                  {i + 1}
                                </span>
                                {line}
                              </li>
                            ))}
                          </ol>
                          <Link href={href(locale, "/legal/minor-protection")} className="text-link mt-4 inline-block text-sm">
                            {s.teensLink}
                          </Link>
                        </div>
                      ) : null}
                    </div>

                    <div className="flex flex-col justify-between gap-6 rounded-soft bg-cream-soft p-5 sm:p-6">
                      <dl className="grid grid-cols-2 gap-x-4 gap-y-5 text-sm">
                        <div>
                          <dt className="text-cocoa-soft">{s.duration}</dt>
                          <dd className="mt-0.5 text-lead font-medium">{format(t.home.services.minutes, { n: svc.durationMinutes })}</dd>
                        </div>
                        <div>
                          <dt className="text-cocoa-soft">{s.fee}</dt>
                          <dd className="mt-0.5 text-lead font-medium">
                            <Ph>{svc.priceInr == null ? t.home.services.price : formatInr(svc.priceInr, locale)}</Ph>
                            <span className="block text-xs font-normal text-cocoa-soft">{s.perSession}</span>
                          </dd>
                        </div>
                        <div className="col-span-2">
                          <dt className="text-cocoa-soft">{s.format}</dt>
                          <dd className="mt-1 flex flex-wrap gap-2">
                            {svc.modes.map((m) => (
                              <span key={m} className="rounded-full bg-sand px-3 py-1">
                                {t.home.services[m]}
                              </span>
                            ))}
                          </dd>
                        </div>
                      </dl>
                      <Button href={href(locale, `/book?service=${svc.slug}`)} icon={<ArrowIcon />} className="w-full">
                        {s.book}
                      </Button>
                    </div>
                  </Card>
                </article>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBand
        title={s.notSure}
        body={s.notSureBody}
        primary={{ href: href(locale, "/book?match=1"), label: s.matchMe }}
        secondary={{ href: href(locale, "/pricing"), label: s.seePricing }}
      />
    </>
  );
}
