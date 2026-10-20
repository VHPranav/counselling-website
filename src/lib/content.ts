import type { ComponentType } from "react";
import type { Locale } from "@/i18n/config";

export type ConcernMeta = {
  intro: string;
  signs: string[];
  faq: Array<{ q: string; a: string }>;
};

type Loader = () => Promise<{ default: ComponentType; meta: Record<string, unknown> }>;

/**
 * Written concern guides. To add one: create content/concerns/{en,ml}/<slug>.mdx
 * and list it here in both languages. Concerns not listed use the template.
 */
const concernGuides: Record<Locale, Record<string, Loader>> = {
  en: {
    anxiety: () => import("@content/concerns/en/anxiety.mdx"),
    depression: () => import("@content/concerns/en/depression.mdx"),
    relationships: () => import("@content/concerns/en/relationships.mdx"),
    "work-stress": () => import("@content/concerns/en/work-stress.mdx"),
  },
  ml: {
    anxiety: () => import("@content/concerns/ml/anxiety.mdx"),
    depression: () => import("@content/concerns/ml/depression.mdx"),
    relationships: () => import("@content/concerns/ml/relationships.mdx"),
    "work-stress": () => import("@content/concerns/ml/work-stress.mdx"),
  },
};

export function hasConcernGuide(locale: Locale, slug: string): boolean {
  return slug in concernGuides[locale];
}

export async function loadConcernGuide(locale: Locale, slug: string) {
  const load = concernGuides[locale][slug];
  if (!load) return null;
  const mod = await load();
  return { Content: mod.default, meta: mod.meta as ConcernMeta };
}
