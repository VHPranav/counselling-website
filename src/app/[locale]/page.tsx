import Link from "next/link";
import { href } from "@/i18n/config";
import { getLocale, getMessages } from "@/i18n/dictionaries";
import { ArrowIcon, Button } from "@/components/ui/Button";
import { Container, Eyebrow, Heading, Section } from "@/components/ui/Section";
import { BananaLeaf, Blob, PalmFrond } from "@/components/shapes/Shapes";

// Phase 1 stand-in. The full home page (hero motion, mood selector, etc.) is Phase 2.
export default async function HomePage() {
  const locale = await getLocale();
  const t = await getMessages();
  return (
    <Section grain className="overflow-hidden">
      <Blob variant={0} className="pointer-events-none absolute -right-32 -top-20 w-[34rem] text-sand sm:w-[44rem]" />
      <Blob variant={2} className="pointer-events-none absolute -bottom-40 -left-40 w-[28rem] text-sage/30" />
      <PalmFrond className="pointer-events-none absolute right-4 top-24 hidden w-80 text-moss/30 lg:block" />
      <BananaLeaf className="pointer-events-none absolute -bottom-24 right-[8%] w-32 rotate-[-24deg] text-clay/25 sm:w-44" />
      <Container className="relative">
        <Eyebrow>{t.home.eyebrow}</Eyebrow>
        <Heading level={1} size="display" className="mt-6 max-w-4xl">
          {t.home.title}
        </Heading>
        <p className="mt-6 max-w-2xl text-lead text-cocoa-soft">{t.home.lead}</p>
        <div className="mt-10 flex flex-col gap-3 xs:flex-row">
          <Button href={href(locale, "/book")} size="lg" magnetic icon={<ArrowIcon />}>
            {t.home.ctaPrimary}
          </Button>
          <Button href={href(locale, "/therapists")} size="lg" variant="secondary">
            {t.home.ctaSecondary}
          </Button>
        </div>
        <p className="mt-16 max-w-md rounded-soft bg-cream-soft/80 p-4 text-sm text-cocoa-soft ring-1 ring-cocoa/10">
          {t.home.phaseNote}{" "}
          <Link href={href(locale, "/styleguide")} className="text-link">
            {t.home.styleguideLink}
          </Link>
        </p>
      </Container>
    </Section>
  );
}
