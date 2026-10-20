import { href } from "@/i18n/config";
import { getLocale, getMessages } from "@/i18n/dictionaries";
import { Button } from "@/components/ui/Button";
import { Container, Heading, Section } from "@/components/ui/Section";
import { BananaLeaf, Ripple } from "@/components/shapes/Shapes";

export default async function NotFound() {
  const locale = await getLocale();
  const t = await getMessages();
  return (
    <Section grain className="overflow-hidden text-center">
      <Ripple className="pointer-events-none absolute left-1/2 top-10 w-[36rem] -translate-x-1/2 text-clay/25" />
      <BananaLeaf className="pointer-events-none absolute -bottom-10 right-[10%] w-28 rotate-[-20deg] text-moss/25" />
      <Container size="narrow" className="relative py-10">
        <p className="font-display text-display text-clay">404</p>
        <Heading level={1} size={2} className="mt-4">
          {t.common.notFoundTitle}
        </Heading>
        <p className="mt-4 text-lead text-cocoa-soft">{t.common.notFoundBody}</p>
        <Button href={href(locale)} size="lg" className="mt-8">
          {t.common.notFoundHome}
        </Button>
      </Container>
    </Section>
  );
}
