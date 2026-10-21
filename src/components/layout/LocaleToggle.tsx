"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeNames, locales, switchLocalePath, type Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";

/** Segmented ML / EN toggle. Keeps you on the same page in the other language. */
export function LocaleToggle({
  current,
  label,
  tone = "light",
  className,
}: {
  current: Locale;
  label: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const pathname = usePathname() ?? `/${current}`;
  return (
    <nav aria-label={label} className={className}>
      <ul
        className={cn(
          "relative flex items-center rounded-full p-1 text-[0.8125rem] ring-1 ring-inset",
          tone === "light" ? "bg-cream-soft/80 ring-cocoa/15" : "bg-forest-soft ring-cream/15",
        )}
      >
        {locales.map((loc) => {
          const active = loc === current;
          return (
            <li key={loc}>
              <Link
                href={switchLocalePath(pathname, loc)}
                hrefLang={loc}
                lang={loc}
                aria-current={active ? "true" : undefined}
                scroll={false}
                className={cn(
                  "flex min-h-8 min-w-10 items-center justify-center rounded-full px-3 leading-none transition-colors duration-300",
                  loc === "ml" && "pt-[0.15em]",
                  active
                    ? tone === "light"
                      ? "bg-forest text-cream"
                      : "bg-cream text-forest"
                    : tone === "light"
                      ? "text-cocoa hover:bg-sand"
                      : "text-cream hover:bg-cream/10",
                )}
              >
                <span aria-hidden className="sm:hidden">{loc === "ml" ? "മല" : "EN"}</span>
                <span className="max-sm:sr-only">{localeNames[loc]}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
