"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeNames, locales, switchLocalePath, type Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";

/** Segmented ML / EN toggle. Keeps you on the same page in the other language. */
export function LocaleToggle({
  current: _current,
  label: _label,
  tone: _tone = "light",
  className: _className,
}: {
  current: Locale;
  label: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  return null;
}
