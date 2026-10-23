import { WordText } from "@/components/motion/WordText";
import { Suspense } from "react";
import { siteConfig } from "@/config/site";
import { href } from "@/i18n/config";
import { getLocale, getMessages } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/metadata";
import { CrisisNotice } from "@/components/layout/CrisisNotice";
import { Button } from "@/components/ui/Button";
import { Ph } from "@/components/ui/Placeholder";
import { Container, Heading, Section } from "@/components/ui/Section";
import { Breathing } from "@/components/home/Breathing";
import { Confirmed } from "@/components/booking/Confirmed";
import { BananaLeaf, Ripple } from "@/components/shapes/Shapes";

export async function generateMetadata() {
  const t = await getMessages();
  return pageMetadata({ path: "/book/confirmed", title: t.confirmed.metaTitle, noIndex: true });
}

export default async function ConfirmedPage() {
  const locale = await getLocale();
  const t = await getMessages();
  const c = t.confirmed;
  // Only link to WhatsApp once a real number is configured.
  const whatsapp = /^\d{8,15}$/.test(siteConfig.contact.whatsapp) ? siteConfig.contact.whatsapp : null;

  return (
    <>
      <Section grain className="overflow-hidden">
        <Ripple className="pointer-events-none absolute -right-24 top-10 w-[30rem] text-clay/20" />
        <BananaLeaf className="pointer-events-none absolute -bottom-16 -left-6 w-32 rotate-[24deg] text-moss/20" />
        <Container size="narrow" className="relative">
          <Heading level={1} size={1}>
            {c.title}
          </Heading>
          <p className="mt-4 text-lead text-cocoa-soft"><WordText>{c.lead}</WordText></p>

          <div className="mt-10">
            <Suspense fallback={<div className="h-40 rounded-pebble bg-sand/40" aria-busy="true" />}>
              <Confirmed
                t={c}
                labels={{ service: t.booking.summaryService, therapist: t.booking.summaryTherapist, when: t.booking.summaryWhen, matched: t.booking.matched }}
                whatsapp={whatsapp}
              />
            </Suspense>
          </div>

          <ol className="mt-10 space-y-4">
            {[c.next1, c.next2, c.next3].map((line, i) => (
              <li key={i} className="flex gap-4">
                <span aria-hidden className="flex size-9 shrink-0 items-center justify-center rounded-full bg-sand font-display text-lead">
                  {i + 1}
                </span>
                <p className="pt-1"><WordText>
                  <Ph>{line}</Ph>
                </WordText></p>
              </li>
            ))}
          </ol>

          <Button href={href(locale)} variant="secondary" className="mt-10">
            {c.home}
          </Button>
        </Container>
      </Section>

      <Section tone="sage" grain spacing="tight">
        <Container size="narrow" className="flex flex-col items-center text-center">
          <h2 className="text-h3"><WordText>{c.breathe}</WordText></h2>
          <div className="mt-8">
            <Breathing labels={t.home.breath} />
          </div>
        </Container>
      </Section>

      <Section spacing="tight">
        <Container size="narrow">
          <CrisisNotice locale={locale} t={t} />
        </Container>
      </Section>
    </>
  );
}
