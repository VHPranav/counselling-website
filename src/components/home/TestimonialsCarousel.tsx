"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { ArrowIcon } from "@/components/ui/Button";
import { Ph } from "@/components/ui/Placeholder";
import "./TestimonialsCarousel.css";

type Props = {
  items: { quote: string; who: string }[];
  label: string;
  previousLabel: string;
  nextLabel: string;
};

export function TestimonialsCarousel({ items, label, previousLabel, nextLabel }: Props) {
  const trackRef = useRef<HTMLUListElement>(null);
  const trackId = useId();
  const [position, setPosition] = useState({ first: 1, last: 1, atStart: true, atEnd: false });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      const cards = Array.from(track.children) as HTMLElement[];
      const step = cards[1] ? cards[1].getBoundingClientRect().left - cards[0].getBoundingClientRect().left : track.clientWidth;
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      const visibleCount = Math.max(1, Math.floor((track.clientWidth + gap + 1) / step));
      const first = Math.min(items.length, Math.round(track.scrollLeft / step) + 1);
      setPosition({
        first,
        last: Math.min(items.length, first + visibleCount - 1),
        atStart: track.scrollLeft <= 2,
        atEnd: track.scrollLeft + track.clientWidth >= track.scrollWidth - 2,
      });
    };
    update();
    track.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(track);
    return () => {
      track.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, [items.length]);

  function move(direction: number | "first" | "last") {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.children) as HTMLElement[];
    const step = cards[1] ? cards[1].getBoundingClientRect().left - cards[0].getBoundingClientRect().left : track.clientWidth;
    const left = direction === "first" ? 0 : direction === "last" ? track.scrollWidth : track.scrollLeft + direction * step;
    track.scrollTo({ left, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  function onKeyDown(event: KeyboardEvent<HTMLUListElement>) {
    const direction = { ArrowLeft: -1, ArrowRight: 1, Home: "first", End: "last" }[event.key];
    if (direction === undefined) return;
    event.preventDefault();
    move(direction as number | "first" | "last");
  }

  return (
    <div className="reviews-carousel" role="region" aria-roledescription="carousel" aria-label={label}>
      <ul ref={trackRef} id={trackId} className="reviews-carousel-track" tabIndex={0} aria-label={label} onKeyDown={onKeyDown}>
        {items.map((item, i) => (
          <li key={`${item.who}-${i}`} className="reviews-carousel-slide">
            <figure className="reviews-carousel-card bg-cream-soft">
              <span className="reviews-carousel-quote" aria-hidden="true">“</span>
              <blockquote>“<Ph>{item.quote}</Ph>”</blockquote>
              <figcaption>
                <span className="reviews-carousel-avatar" aria-hidden="true">{item.who.trim().charAt(0)}</span>
                <Ph>{item.who}</Ph>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <div className="reviews-carousel-controls">
        <p className="reviews-carousel-position" aria-live="polite" aria-atomic="true">
          <span>{position.first === position.last ? position.first : `${position.first}–${position.last}`}</span>
          <span aria-hidden="true"> / </span>
          <span>{items.length}</span>
        </p>
        <div className="reviews-carousel-arrows">
          <button type="button" onClick={() => move(-1)} disabled={position.atStart} aria-label={previousLabel} aria-controls={trackId}>
            <ArrowIcon className="rotate-180" />
          </button>
          <button type="button" onClick={() => move(1)} disabled={position.atEnd} aria-label={nextLabel} aria-controls={trackId}>
            <ArrowIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
