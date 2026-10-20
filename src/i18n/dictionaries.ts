import { locale as rootLocale } from "next/root-params";
import { notFound } from "next/navigation";
import type en from "../../messages/en.json";
import { hasLocale, type Locale } from "./config";

/** The English file defines the shape; Malayalam must match it. */
export type Messages = typeof en;

const dictionaries: Record<Locale, () => Promise<Messages>> = {
  en: () => import("../../messages/en.json").then((m) => m.default),
  ml: () => import("../../messages/ml.json").then((m) => m.default),
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
