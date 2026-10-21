import Image from "next/image";
import { Fragment, type CSSProperties } from "react";
import heroRoom from "@/assets/images/hero-kerala-room.jpg";
import heroPortrait from "@/assets/images/hero-portrait.jpg";
import { siteConfig } from "@/config/site";
import { href, type Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/dictionaries";
import { ArrowIcon, Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { ParallaxScene } from "@/components/motion/ParallaxScene";
import { Blob } from "@/components/shapes/Shapes";
import Link from "next/link";
import { TherapistAvatar } from "@/components/therapists/TherapistCard";
import type { Therapist } from "@/data/types";
import { format } from "@/i18n/dictionaries";

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

export function Hero({ locale, t, team = [] }: { locale: Locale; t: Messages["home"]["hero"]; team?: Therapist[] }) {
  const faces = team.filter((th) => th.photo).slice(0, 4);
  const points = [t.point1, t.point2, t.point3];
  // Demo mode shows an AI-generated portrait; launch mode keeps the people-free room photo.
  const photo = siteConfig.demoMode ? heroPortrait : heroRoom;
  const position = siteConfig.demoMode
    ? "object-[96%_30%] sm:object-[100%_30%] lg:object-[70%_40%]"
    : "object-[72%_50%] lg:object-[100%_50%]";
  const frame = siteConfig.demoMode ? "aspect-[5/6] sm:aspect-[16/10]" : "aspect-[4/3] sm:aspect-[16/10]";
  return (
    <section className="grain relative overflow-hidden bg-cream pb-16 pt-10 sm:pb-20 sm:pt-16 lg:flex lg:min-h-[calc(100dvh-5rem)] lg:items-center lg:py-14">
      {/* Mobile-only organic accents (the photo carries the desktop composition) */}
      <ParallaxScene className="pointer-events-none absolute inset-0 -z-0 lg:hidden">
        <div data-depth="0.08" className="absolute -right-40 -top-32 w-[30rem] sm:w-[40rem]">
          <Blob variant={0} className="w-full text-sand" />
        </div>
        <div data-depth="0.05" className="absolute -left-40 top-[30%] w-[26rem]">
          <Blob variant={2} className="w-full text-sage/25" />
        </div>
      </ParallaxScene>

      <Container size="wide" className="relative z-10">
        <div className="lg:max-w-[54%] xl:max-w-[50%]">

          <div className="relative mt-6">
            <div aria-hidden className="hero-glow pointer-events-none absolute -inset-x-16 -inset-y-10 -z-10 rounded-full opacity-70 lg:opacity-40" />
            <h1 className="text-display">
              <RevealWords text={t.title} />
            </h1>
          </div>
          <p className="fade-up mt-6 max-w-xl text-lead text-cocoa-soft lg:[:lang(ml)_&]:text-base" style={{ "--i": 6 } as CSSProperties}>
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
          {faces.length ? (
            <Link
              href={href(locale, "/therapists")}
              className="fade-up group mt-8 inline-flex items-center gap-3"
              style={{ "--i": 9 } as CSSProperties}
            >
              <span className="flex -space-x-3">
                {faces.map((th) => (
                  <TherapistAvatar key={th.slug} tone={th.tone} photo={th.photo} round sizes="40px" className="size-10 ring-2 ring-cream" />
                ))}
              </span>
              <span className="text-sm font-medium text-cocoa underline-offset-4 group-hover:underline">
                {format(t.team, { n: team.length })} →
              </span>
            </Link>
          ) : null}
          <ul className="fade-up mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-cocoa-soft" style={{ "--i": 10 } as CSSProperties}>
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

      {/*
        Hero photo (generated in Google Flow, see TODO.md).
        Mobile: an arch-topped photo under the text. Desktop: full-bleed behind it,
        with the plain sunlit wall on the left sitting under the headline.
      */}
      <div className={`relative mx-4 mt-12 ${frame} overflow-hidden rounded-t-[999px] rounded-b-pebble sm:mx-6 lg:absolute lg:inset-0 lg:m-0 lg:aspect-auto lg:rounded-none`}>
        <Image
          src={photo}
          alt=""
          fill
          preload
          fetchPriority="high"
          placeholder="blur"
          sizes="(min-width: 1024px) 100vw, calc(100vw - 2rem)"
          className={`hero-photo object-cover ${position}`}
        />
        {/* Soft cream wash so the headline always reads on desktop */}
        <div aria-hidden className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgb(246_240_230/0.94)_0%,rgb(246_240_230/0.82)_38%,rgb(246_240_230/0.25)_62%,transparent_78%)] lg:block" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 hidden h-32 bg-gradient-to-t from-cream/60 to-transparent lg:block" />
      </div>
    </section>
  );
}
