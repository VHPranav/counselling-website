"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Two-pane FAQ: questions on a dark panel on the left, the chosen answer on
 * the right. Uses the WAI-ARIA tabs pattern (arrow keys move between questions).
 */
export function FaqTabs({
  items,
  questionsLabel,
  answerLabel,
}: {
  items: Array<{ q: string; a: string }>;
  questionsLabel: string;
  answerLabel: string;
}) {
  const [active, setActive] = useState(0);
  const id = useId();

  function onKey(e: React.KeyboardEvent<HTMLButtonElement>, i: number) {
    const next = e.key === "ArrowDown" ? i + 1 : e.key === "ArrowUp" ? i - 1 : null;
    if (next === null) return;
    e.preventDefault();
    const n = (next + items.length) % items.length;
    setActive(n);
    document.getElementById(`${id}-tab-${n}`)?.focus();
  }

  return (
    <div className="grid gap-3 rounded-[2rem] bg-sand p-3 sm:p-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <div className="on-dark rounded-[1.5rem] bg-forest p-3 text-cream sm:p-4">
        <p className="px-3 pb-2 pt-1 text-sm text-cream/70">{questionsLabel}</p>
        <div role="tablist" aria-orientation="vertical" aria-label={questionsLabel} className="flex flex-col gap-1">
          {items.map((item, i) => (
            <button
              key={i}
              id={`${id}-tab-${i}`}
              role="tab"
              type="button"
              aria-selected={i === active}
              aria-controls={`${id}-panel`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={cn(
                "min-h-12 rounded-xl px-3 py-3 text-left text-[0.9375rem] leading-snug transition-colors duration-300",
                i === active ? "bg-cream/[0.14] text-cream" : "text-cream/80 hover:bg-cream/[0.07] hover:text-cream",
              )}
            >
              {item.q}
            </button>
          ))}
        </div>
      </div>
      <div
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${active}`}
        className="flex flex-col gap-4 rounded-[1.5rem] p-4 sm:p-6"
      >
        <p className="text-sm text-cocoa-soft">{answerLabel}</p>
        <p className="self-end rounded-2xl rounded-br-md bg-cream-soft px-4 py-3 text-sm text-cocoa shadow-warm">{items[active]?.q}</p>
        <p key={active} className="fade-up max-w-prose rounded-2xl rounded-bl-md bg-forest/90 px-5 py-4 text-cream">
          {items[active]?.a}
        </p>
      </div>
    </div>
  );
}
