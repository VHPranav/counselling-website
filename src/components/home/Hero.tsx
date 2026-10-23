"use client";

import { WordText } from "@/components/motion/WordText";


import { HeroVideo } from "./HeroVideo";
import { useEffect, useId, useRef, useState } from "react";
import { href, type Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/dictionaries";
import { ArrowIcon, Button } from "@/components/ui/Button";
import type { Therapist } from "@/data/types";
import "./Hero.css";

/** Measure one phrase so each loop starts exactly where the previous one ends. */
function MovingPathText({
  path,
  text,
  dy = 0,
  className = "home-hero-ribbonText",
  duration = "32s",
}: {
  path: string;
  text: string;
  dy?: number;
  className?: string;
  duration?: string;
}) {
  const measureRef = useRef<SVGTextElement>(null);
  const [phraseWidth, setPhraseWidth] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(true);

  useEffect(() => {
    let active = true;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(preference.matches);
    const measure = () => {
      if (active) setPhraseWidth(measureRef.current?.getComputedTextLength() ?? 0);
    };
    updatePreference();
    measure();
    void document.fonts.ready.then(measure);
    window.addEventListener("resize", measure);
    preference.addEventListener("change", updatePreference);
    return () => {
      active = false;
      window.removeEventListener("resize", measure);
      preference.removeEventListener("change", updatePreference);
    };
  }, [text]);

  return (
    <>
      <text ref={measureRef} className={className} visibility="hidden">{text}</text>
      <text className={className} dy={dy}>
        <textPath href={`#${path}`}>
          {text.repeat(4)}
          {!reducedMotion && phraseWidth > 0 ? (
            <animate
              key={phraseWidth}
              attributeName="startOffset"
              from="0"
              to={-phraseWidth}
              dur={duration}
              repeatCount="indefinite"
            />
          ) : null}
        </textPath>
      </text>
    </>
  );
}

export function Hero({
  locale,
  t,
  flow,
}: {
  locale: Locale;
  t: Messages["home"]["hero"];
  flow: Messages["home"]["flow"];
  team?: Therapist[];
}) {
  const id = useId();
  const thoughtPath = `${id}-thought`;
  const ribbonPath = `${id}-ribbon`;
  const reassurance = `${t.point3}  ·  ${t.point1}  ·  ${t.point2}  ·  `;

  return (
    <section className="home-hero-hero" aria-labelledby={`${id}-title`}>
      <div className="home-hero-content">
        <h1 id={`${id}-title`} className="home-hero-title"><WordText>
          <span>{flow.heroTop}</span>{" "}
          <em>{flow.heroItalic}</em>
        </WordText></h1>
        <p className="home-hero-lead"><WordText>{t.lead}</WordText></p>
        <div className="home-hero-actions">
          <Button href={href(locale, "/book")} size="lg" variant="accent" className="home-hero-primary" icon={<ArrowIcon />}>
            {t.ctaPrimary}
          </Button>
          <Button href="#mood" size="lg" variant="ghost" className="home-hero-secondary">
            {t.ctaSecondary}
          </Button>
        </div>
        <p className="home-hero-assurance"><WordText>
          <svg viewBox="0 0 20 20" width="16" height="16" fill="none" aria-hidden="true">
            <rect x="4.5" y="8.5" width="11" height="8" rx="2" stroke="currentColor" strokeWidth="1.3" />
            <path d="M7 8.5V6a3 3 0 0 1 6 0v2.5M10 12v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          {t.point3}
        </WordText></p>
      </div>

      {/* The illustration sits at the viewport’s lower edge without stretching its SVG. */}
      <div className="home-hero-flow" aria-hidden="true">
        <svg className="home-hero-paths" viewBox="0 0 1440 320" fill="none" focusable="false">
          <defs>
            <path id={thoughtPath} d="M-100 135 C60 290 360 170 340 80 C325-45 145 10 185 125 C225 245 450 280 720 260" />
            <path id={ribbonPath} d="M720 260 C950 260 1200 150 1530 140" />
          </defs>
          <MovingPathText
            path={thoughtPath}
            text={`${t.lead}  ·  ${flow.heroTop} ${flow.heroItalic}  ·  `}
            className="home-hero-thoughtText"
            duration="48s"
          />
          <use href={`#${ribbonPath}`} className="home-hero-ribbon" />
          <MovingPathText path={ribbonPath} text={reassurance} dy={6} />
        </svg>
        <svg className="home-hero-pathsMobile" viewBox="0 0 390 180" fill="none" focusable="false">
          <defs>
            <path id={`${thoughtPath}-mobile`} d="M-50 60 C-5 130 100 80 80 35 C60-10 5 23 29 62 C68 132 130 145 195 145" />
            <path id={`${ribbonPath}-mobile`} d="M195 145 C275 145 330 105 420 112" />
          </defs>
          <MovingPathText
            path={`${thoughtPath}-mobile`}
            text={`${flow.heroTop} ${flow.heroItalic}  ·  ${t.lead}  ·  `}
            className="home-hero-thoughtText"
            duration="48s"
          />
          <use href={`#${ribbonPath}-mobile`} className="home-hero-ribbon" />
          <MovingPathText path={`${ribbonPath}-mobile`} text={reassurance} dy={4} />
        </svg>
        {/* Short stock clip of a counsellor talking (demo); fills the 4:5 frame. */}
        <div className="home-hero-media">
          <HeroVideo className="home-hero-portrait" />
        </div>
      </div>
    </section>
  );
}
