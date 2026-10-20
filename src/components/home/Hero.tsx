import { Fragment, type CSSProperties } from "react";
import { href, type Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/dictionaries";
import { ArrowIcon, Button } from "@/components/ui/Button";
import { Container, Eyebrow } from "@/components/ui/Section";
import { ParallaxScene } from "@/components/motion/ParallaxScene";
import { Arch, BananaLeaf, Blob, PalmFrond, Pebble, Ripple } from "@/components/shapes/Shapes";

/** Splits a headline into word spans for the CSS word-by-word reveal. */
function RevealWords({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <span className="word-reveal">
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className="w" style={{ "--i": i } as CSSProperties}>
            {word}
          </span>
          {/* Space sits outside the inline-block so it is never collapsed. */}
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}

export function Hero({ locale, t }: { locale: Locale; t: Messages["home"]["hero"] }) {
  const points = [t.point1, t.point2, t.point3];
  return (
    <section className="grain relative overflow-hidden bg-cream pb-16 pt-10 sm:pb-24 sm:pt-16 lg:min-h-[calc(100dvh-5rem)] lg:pb-28 lg:pt-20">
      {/* Background layers */}
      <ParallaxScene className="pointer-events-none absolute inset-0 -z-0">
        <div data-depth="0.08" className="absolute -right-40 -top-32 w-[30rem] sm:w-[40rem] lg:hidden">
          <Blob variant={0} className="w-full text-sand" />
        </div>
        <div data-depth="0.25" className="absolute -bottom-16 -right-10 w-28 sm:w-40 lg:hidden">
          <BananaLeaf className="w-full rotate-[-28deg] text-moss/25" />
        </div>
        <div data-depth="0.05" className="absolute -bottom-48 -left-40 w-[26rem] lg:w-[34rem]">
          <Blob variant={2} className="w-full text-sage/25" />
        </div>

        {/* Desktop composition: an arch "window" onto the backwaters at dusk */}
        <div className="absolute inset-y-0 right-0 hidden w-[44%] lg:block">
          <div data-depth="0.12" className="absolute right-[10%] top-[8%] w-[70%] max-w-[30rem]">
            <Arch className="w-full text-sand" />
          </div>
          <div data-depth="0.3" className="absolute right-[34%] top-[20%] w-[22%] max-w-36">
            <div className="aspect-square rounded-full bg-ochre/70" />
          </div>
          <div data-depth="0.18" className="absolute right-[14%] top-[54%] w-[62%] max-w-[26rem]">
            <Ripple className="w-full text-clay-deep/40" />
          </div>
          <div data-depth="0.45" className="absolute right-[4%] top-[2%] w-[52%] max-w-[22rem]">
            <PalmFrond className="w-full -scale-x-100 text-moss/55" />
          </div>
          <div data-depth="0.65" className="absolute bottom-[6%] right-[56%] w-[24%] max-w-40">
            <BananaLeaf className="w-full rotate-[-32deg] text-moss" />
          </div>
          <div data-depth="0.8" className="absolute bottom-[12%] right-[22%] w-[14%] max-w-24">
            <Pebble className="w-full text-clay" />
          </div>
          <div data-depth="0.95" className="absolute bottom-[8%] right-[12%] w-[8%] max-w-14">
            <Pebble className="w-full rotate-12 text-cocoa/70" />
          </div>
        </div>
      </ParallaxScene>

      <Container size="wide" className="relative">
        <div className="lg:max-w-[58%]">
          <Eyebrow className="fade-up">{t.eyebrow}</Eyebrow>
          <div className="relative mt-6">
            <div aria-hidden className="hero-glow pointer-events-none absolute -inset-x-16 -inset-y-10 -z-10 rounded-full opacity-70" />
            <h1 className="text-display">
              <RevealWords text={t.title} />
            </h1>
          </div>
          <p className="fade-up mt-6 max-w-xl text-lead text-cocoa-soft" style={{ "--i": 6 } as CSSProperties}>
            {t.lead}
          </p>
          <div className="fade-up mt-9 flex flex-col gap-3 sm:flex-row" style={{ "--i": 8 } as CSSProperties}>
            <Button href={href(locale, "/book")} size="lg" magnetic icon={<ArrowIcon />}>
              {t.ctaPrimary}
            </Button>
            <Button href="#mood" size="lg" variant="secondary">
              {t.ctaSecondary}
            </Button>
          </div>
          <ul className="fade-up mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-cocoa-soft" style={{ "--i": 10 } as CSSProperties}>
            {points.map((p) => (
              <li key={p} className="flex items-center gap-2">
                <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden className="text-moss">
                  <path d="M6 1c3 2 4 5 3 7.5C8.3 10 7 11 6 11s-2.3-1-3-2.5C2 6 3 3 6 1Z" fill="currentColor" />
                </svg>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
