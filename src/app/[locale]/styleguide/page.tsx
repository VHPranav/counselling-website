import { WordText } from "@/components/motion/WordText";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import ml from "../../../../messages/ml.json";
import { getMessages } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/metadata";
import { ArrowIcon, Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Field } from "@/components/ui/Field";
import { Marquee } from "@/components/ui/Marquee";
import { Ph } from "@/components/ui/Placeholder";
import { Container, Heading, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Arch, BananaLeaf, Blob, BrandMark, PalmFrond, Pebble, Ripple } from "@/components/shapes/Shapes";
import { ChipDemo } from "./ChipDemo";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getMessages();
  return pageMetadata({ path: "/styleguide", title: t.styleguide.title, noIndex: true });
}

const swatches = [
  { name: "cream", hex: "#F6F0E6", cls: "bg-cream", note: "page background" },
  { name: "sand", hex: "#E8DCC8", cls: "bg-sand", note: "cards, alternates" },
  { name: "clay", hex: "#C47A5A", cls: "bg-clay", note: "decoration only (3.3:1)" },
  { name: "clay-deep", hex: "#9C5238", cls: "bg-clay-deep", note: "buttons, links (5.0:1)", dark: true },
  { name: "clay-deeper", hex: "#7F4029", cls: "bg-clay-deeper", note: "hover, links on sand · added", dark: true },
  { name: "ochre", hex: "#D9A441", cls: "bg-ochre", note: "highlights, focus" },
  { name: "sage", hex: "#A3A98B", cls: "bg-sage", note: "soft surfaces" },
  { name: "moss", hex: "#5E6B4A", cls: "bg-moss", note: "secondary, success", dark: true },
  { name: "forest", hex: "#2F3A2C", cls: "bg-forest", note: "dark sections", dark: true },
  { name: "cocoa", hex: "#3B2A22", cls: "bg-cocoa", note: "text (12:1)", dark: true },
  { name: "cocoa-soft", hex: "#5C4A40", cls: "bg-cocoa-soft", note: "muted text · added", dark: true },
];

// Full class names so Tailwind can find them.
const typeScale = [
  ["display", "text-display font-display"],
  ["h1", "text-h1 font-display"],
  ["h2", "text-h2 font-display"],
  ["h3", "text-h3 font-display"],
  ["h4", "text-h4 font-display"],
  ["lead", "text-lead"],
  ["base", "text-base"],
  ["sm", "text-sm"],
] as const;

export default async function StyleguidePage() {
  const t = await getMessages();
  const s = t.styleguide;
  return (
    <>
      <Section spacing="tight" grain>
        <Container>

          <Heading level={1} className="mt-4">
            {s.title}
          </Heading>
          <p className="mt-4 max-w-2xl text-lead text-cocoa-soft"><WordText>{s.intro}</WordText></p>
        </Container>
      </Section>

      <Block title={s.colours}>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {swatches.map((sw) => (
            <li key={sw.name} className="overflow-hidden rounded-soft bg-cream-soft ring-1 ring-cocoa/10">
              <div className={`${sw.cls} flex h-20 items-end p-3 text-sm ${sw.dark ? "text-cream" : "text-cocoa"}`}>Aa</div>
              <div className="p-3 text-sm">
                <p className="font-medium"><WordText>{sw.name}</WordText></p>
                <p className="text-cocoa-soft tabular-nums"><WordText>{sw.hex}</WordText></p>
                <p className="text-cocoa-soft"><WordText>{sw.note}</WordText></p>
              </div>
            </li>
          ))}
        </ul>
      </Block>

      <Block title={s.type} tone="sand">
        <div className="space-y-6">
          {typeScale.map(([size, cls]) => (
            <div key={size} className="grid gap-2 sm:grid-cols-[6rem_1fr] sm:items-baseline">
              <code className="text-sm text-cocoa-soft">{size}</code>
              <p className={cls}><WordText>
                {s.sample}
              </WordText></p>
            </div>
          ))}
        </div>
      </Block>

      <Block title={s.buttons}>
        <div className="flex flex-wrap items-center gap-3">
          <Button href="#" magnetic icon={<ArrowIcon />}>
            {s.buttonPrimary}
          </Button>
          <Button href="#" variant="secondary">
            {s.buttonSecondary}
          </Button>
          <Button variant="ghost">{s.buttonGhost}</Button>
          <Button size="lg">{s.buttonPrimary}</Button>
          <Button size="sm" variant="secondary">
            {s.buttonGhost}
          </Button>
        </div>
        <div className="mt-6 flex flex-wrap gap-3 rounded-pebble bg-forest p-6 on-dark">
          <Button variant="light">{s.buttonPrimary}</Button>
          <Button>{s.buttonSecondary}</Button>
        </div>
      </Block>

      <Block title={s.chips} tone="sand">
        <ChipDemo labels={[s.chipAnxious, s.chipLow, s.chipOverwhelmed, s.chipTalk]} />
      </Block>

      <Block title={s.cards}>
        <div className="grid gap-5 md:grid-cols-3">
          {(["cream", "sand", "forest"] as const).map((tone, i) => (
            <Reveal key={tone} delay={i * 120}>
              <Card href="#" tone={tone} className="h-full">
                <Heading level={3} size={4}>
                  {s.cardTitle}
                </Heading>
                <p className={`mt-3 ${tone === "forest" ? "text-cream/85" : "text-cocoa-soft"}`}><WordText>{s.cardBody}</WordText></p>
                <p className="mt-6 text-sm font-medium"><WordText>
                  <Ph>{s.cardMeta}</Ph>
                </WordText></p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Block>

      <Block title={s.fields} tone="sand">
        <form className="grid max-w-xl gap-6" noValidate>
          <Field label={s.fieldName} hint={s.fieldNameHint} name="name" autoComplete="given-name" required />
          <Field label={s.fieldName} error={s.fieldNameError} name="name-error" required />
          <Field label={s.fieldEmail} type="email" name="email" autoComplete="email" optionalLabel={t.common.optional} />
        </form>
      </Block>

      <Block title={s.shapes}>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          <ShapeTile>
            <Blob className="w-full text-clay" />
          </ShapeTile>
          <ShapeTile>
            <Blob variant={1} className="w-full text-sage" />
          </ShapeTile>
          <ShapeTile>
            <Pebble className="w-full text-sand" />
          </ShapeTile>
          <ShapeTile>
            <Arch className="h-full text-ochre/70" />
          </ShapeTile>
          <ShapeTile>
            <BananaLeaf className="h-full text-moss" />
          </ShapeTile>
          <ShapeTile>
            <PalmFrond className="w-full text-moss" />
          </ShapeTile>
          <ShapeTile>
            <Ripple className="w-full text-clay-deep" />
          </ShapeTile>
          <ShapeTile dark>
            <BrandMark className="size-16" />
          </ShapeTile>
        </div>
        <div className="kasavu mt-10" />
      </Block>

      <Section tone="forest" spacing="tight">
        <Container>
          <Heading level={2} size={3}>
            {s.marquee}
          </Heading>
        </Container>
        <Marquee className="mt-8" label={s.marquee} seconds={45}>
          {[1, 2, 3, 4].map((n) => (
            <figure key={n} className="w-80 shrink-0 rounded-pebble bg-forest-soft p-6 ring-1 ring-cream/10">
              <blockquote className="font-display text-h4 leading-snug">
                <Ph>{s.marqueeItem}</Ph>
              </blockquote>
            </figure>
          ))}
        </Marquee>
      </Section>

      {/* Always rendered in Malayalam, in both locales, to check shaping. */}
      <Block title={s.malayalam} tone="sand">
        <p className="mb-8 max-w-2xl text-cocoa-soft"><WordText>{s.malayalamNote}</WordText></p>
        <div lang="ml" className="space-y-6 rounded-pebble bg-cream p-6 sm:p-10">
          <p className="font-display text-display leading-[1.3]"><WordText>{ml.home.hero.title}</WordText></p>
          <p className="font-display text-h2 leading-[1.4]"><WordText>{ml.styleguide.sample}</WordText></p>
          <p className="text-base leading-[1.8]"><WordText>{ml.styleguide.sample}</WordText></p>
          <div className="flex flex-wrap gap-3">
            <Button icon={<ArrowIcon />}>{ml.nav.book}</Button>
            <Button variant="secondary">{ml.styleguide.buttonSecondary}</Button>
          </div>
          <ChipDemo labels={[ml.styleguide.chipAnxious, ml.styleguide.chipLow, ml.styleguide.chipOverwhelmed, ml.styleguide.chipTalk]} />
          <p className="flex flex-wrap gap-x-6 gap-y-2 text-[0.9375rem]"><WordText>
            {Object.values(ml.nav).map((label) => (
              <span key={label} className="link-underline">
                {label}
              </span>
            ))}
          </WordText></p>
          <p className="text-h4 leading-[1.8]"><WordText>ൻ ൺ ർ ൽ ൾ · ക്ഷ ന്ത ങ്ങ ത്ത സ്ത്ര ന്ന ഞ്ഞ ക്ക ണ്ട ദ്ധ ഷ്ട ത്സ ങ്ക ന്റെ</WordText></p>
        </div>
      </Block>
    </>
  );
}

function Block({ title, tone = "cream", children }: { title: string; tone?: "cream" | "sand"; children: ReactNode }) {
  return (
    <Section tone={tone} spacing="tight">
      <Container>
        <Heading level={2} size={3} className="mb-8">
          {title}
        </Heading>
        {children}
      </Container>
    </Section>
  );
}

function ShapeTile({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return (
    <div className={`flex aspect-square items-center justify-center rounded-soft p-4 ring-1 ring-cocoa/10 ${dark ? "bg-forest" : "bg-cream-soft"}`}>
      {children}
    </div>
  );
}
