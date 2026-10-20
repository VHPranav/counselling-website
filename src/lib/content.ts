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

// ---------------------------------------------------------------------------
// Journal (blog). To add a post: create content/blog/{en,ml}/<slug>.mdx and
// list it here. Newest first is handled automatically by `date`.

export type PostMeta = { title: string; description: string; date: string; readingMinutes: number; author: string };

const posts: Record<Locale, Record<string, Loader>> = {
  en: {
    "first-session": () => import("@content/blog/en/first-session.mdx"),
    "talking-to-family": () => import("@content/blog/en/talking-to-family.mdx"),
  },
  ml: {
    "first-session": () => import("@content/blog/ml/first-session.mdx"),
    "talking-to-family": () => import("@content/blog/ml/talking-to-family.mdx"),
  },
};

export const postSlugs = Object.keys(posts.en);

export async function loadPost(locale: Locale, slug: string) {
  const load = posts[locale][slug];
  if (!load) return null;
  const mod = await load();
  return { slug, Content: mod.default, meta: mod.meta as PostMeta };
}

export async function listPosts(locale: Locale) {
  const all = await Promise.all(postSlugs.map((slug) => loadPost(locale, slug)));
  return all.filter((p) => p !== null).sort((a, b) => b.meta.date.localeCompare(a.meta.date));
}

// ---------------------------------------------------------------------------
// Legal drafts. Slugs match the footer links.

export const legalSlugs = ["privacy", "terms", "refunds", "therapy-agreement", "minor-protection"] as const;
export type LegalSlug = (typeof legalSlugs)[number];

const legal: Record<Locale, Record<LegalSlug, Loader>> = {
  en: {
    privacy: () => import("@content/legal/en/privacy.mdx"),
    terms: () => import("@content/legal/en/terms.mdx"),
    refunds: () => import("@content/legal/en/refunds.mdx"),
    "therapy-agreement": () => import("@content/legal/en/therapy-agreement.mdx"),
    "minor-protection": () => import("@content/legal/en/minor-protection.mdx"),
  },
  ml: {
    privacy: () => import("@content/legal/ml/privacy.mdx"),
    terms: () => import("@content/legal/ml/terms.mdx"),
    refunds: () => import("@content/legal/ml/refunds.mdx"),
    "therapy-agreement": () => import("@content/legal/ml/therapy-agreement.mdx"),
    "minor-protection": () => import("@content/legal/ml/minor-protection.mdx"),
  },
};

export function isLegalSlug(slug: string): slug is LegalSlug {
  return (legalSlugs as readonly string[]).includes(slug);
}

export async function loadLegal(locale: Locale, slug: LegalSlug) {
  const mod = await legal[locale][slug]();
  return { Content: mod.default, meta: mod.meta as { updated: string } };
}
