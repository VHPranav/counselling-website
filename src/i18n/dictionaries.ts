import { locale as rootLocale } from "next/root-params";
import { notFound } from "next/navigation";
import type en from "../../messages/en.json";
import { hasLocale, type Locale } from "./config";
import { siteConfig } from "@/config/site";

/** The English file defines the shape; Malayalam must match it. */
export type Messages = typeof en;

const base: Record<Locale, () => Promise<Messages>> = {
  en: () => import("../../messages/en.json").then((m) => m.default),
  ml: () => import("../../messages/ml.json").then((m) => m.default),
};

/** Demo mode: sample text that fills in placeholders (messages/demo.*.json). */
const demo: Record<Locale, () => Promise<Record<string, unknown>>> = {
  en: () => import("../../messages/demo.en.json").then((m) => m.default),
  ml: () => import("../../messages/demo.ml.json").then((m) => m.default),
};

function deepMerge<T>(target: T, extra: Record<string, unknown>): T {
  const out = { ...(target as Record<string, unknown>) };
  for (const [k, v] of Object.entries(extra)) {
    out[k] = v && typeof v === "object" && !Array.isArray(v) ? deepMerge(out[k], v as Record<string, unknown>) : v;
  }
  return out as T;
}

const dictionaries: Record<Locale, () => Promise<Messages>> = {
  en: async () => (siteConfig.demoMode ? deepMerge(await base.en(), await demo.en()) : base.en()),
  ml: async () => (siteConfig.demoMode ? deepMerge(await base.ml(), await demo.ml()) : base.ml()),
};

/** Current locale from the URL. Server Components only. */
export async function getLocale(): Promise<Locale> {
  const value = await rootLocale();
  if (!value || !hasLocale(value)) notFound();
  return value;
}

/** Messages for the current locale. Server Components only. */
export async function getMessages(): Promise<Messages> {
  return dictionaries[await getLocale()]();
}

/** Replace {name} tokens: format("Hi {name}", { name: "Asha" }) */
export function format(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    key in vars ? String(vars[key]) : `{${key}}`,
  );
}
