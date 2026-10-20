import { crisisLines } from "@/config/safety";
import type { Locale } from "@/i18n/config";
import { format, type Messages } from "@/i18n/dictionaries";
import { cn } from "@/lib/cn";
import { useId } from "react";

/**
 * "We are not a crisis service" notice with tap-to-call numbers.
 * Calm by design: no red, no alarm icons. Used in the footer and on booking pages.
 */
export function CrisisNotice({
  locale,
  t,
  tone = "light",
  className,
}: {
  locale: Locale;
  t: Messages;
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  const titleId = useId();
  return (
    <aside
      aria-labelledby={titleId}
      className={cn(
        "rounded-pebble p-6 sm:p-8",
        dark ? "bg-forest-soft text-cream ring-1 ring-cream/10" : "bg-sand text-cocoa",
        className,
      )}
    >
      <h2 id={titleId} className="font-sans text-h4 font-semibold tracking-normal [:lang(ml)_&]:font-semibold">
        {t.crisis.title}
      </h2>
      <p className={cn("mt-2 max-w-2xl", dark ? "text-cream/85" : "text-cocoa-soft")}>{t.crisis.body}</p>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {crisisLines.map((line) => (
          <li
            key={line.id}
            className={cn("flex flex-col gap-1 rounded-soft p-4", dark ? "bg-forest" : "bg-cream-soft")}
          >
            <span className="font-medium">{line.name[locale]}</span>
            <span className={cn("text-sm", dark ? "text-cream/80" : "text-cocoa-soft")}>
              {line.description[locale]}
            </span>
            <span className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
              <a
                href={`tel:${line.tel}`}
                className={cn(
                  "inline-flex min-h-11 items-center rounded-full px-4 font-semibold tabular-nums",
                  dark ? "bg-cream text-forest hover:bg-white" : "bg-forest text-cream hover:bg-cocoa",
                )}
              >
                {format(t.crisis.call, { number: line.number })}
              </a>
              {line.alternate ? (
                <a
                  href={`tel:${line.alternate.tel}`}
                  className={cn("text-sm underline underline-offset-4 tabular-nums", dark ? "text-cream/90" : "text-cocoa")}
                >
                  {format(t.crisis.alternate, { number: line.alternate.number })}
                </a>
              ) : null}
            </span>
          </li>
        ))}
      </ul>
      <p className={cn("mt-4 text-sm", dark ? "text-cream/80" : "text-cocoa-soft")}>{t.crisis.abroad}</p>
    </aside>
  );
}
