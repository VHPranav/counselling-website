import { WordText } from "@/components/motion/WordText";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { href } from "@/i18n/config";
import { format, getLocale, getMessages } from "@/i18n/dictionaries";
import { listPosts, loadPost, postSlugs } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { Breadcrumbs, CtaBand } from "@/components/ui/PageParts";
import { Ph } from "@/components/ui/Placeholder";
import { Container, Heading, Section } from "@/components/ui/Section";

export function generateStaticParams() {
  return postSlugs.map((slug) => ({ slug }));
}

// All slugs are pre-rendered at build time (see the note in concerns/[slug]).
export const instant = false;

export async function generateMetadata({ params }: PageProps<"/[locale]/blog/[slug]">) {
  const { slug } = await params;
  const post = await loadPost(await getLocale(), slug);
  if (!post) return {};
  const meta = await pageMetadata({ path: `/blog/${slug}`, title: post.meta.title, description: post.meta.description });
  return { ...meta, openGraph: { ...meta.openGraph, type: "article", publishedTime: post.meta.date } };
}

export default async function PostPage({ params }: PageProps<"/[locale]/blog/[slug]">) {
  const { slug } = await params;
  const locale = await getLocale();
  const post = await loadPost(locale, slug);
  if (!post) notFound();
  const t = await getMessages();
  const b = t.blogPage;
  const intl = "en-IN";
  const others = (await listPosts(locale)).filter((p) => p.slug !== slug).slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.meta.title,
    description: post.meta.description,
    datePublished: post.meta.date,
    inLanguage: locale,
    publisher: { "@type": "Organization", name: siteConfig.brandName },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Section grain spacing="none" className="pb-12 pt-8 sm:pt-12">
        <Container size="narrow">
          <Breadcrumbs
            label={t.common.breadcrumb}
            items={[{ label: t.common.home, href: href(locale) }, { label: t.nav.blog, href: href(locale, "/blog") }, { label: post.meta.title }]}
          />
          <p className="mt-10 text-sm text-cocoa-soft"><WordText>
            <time dateTime={post.meta.date}>{new Intl.DateTimeFormat(intl, { dateStyle: "long" }).format(new Date(post.meta.date))}</time> ·{" "}
            {format(b.minRead, { n: post.meta.readingMinutes })}
          </WordText></p>
          <Heading level={1} size={1} className="mt-3">
            {post.meta.title}
          </Heading>
          <p className="mt-5 text-lead text-cocoa-soft"><WordText>{post.meta.description}</WordText></p>
          <p className="mt-6 text-sm"><WordText>
            <Ph>{format(b.by, { author: post.meta.author })}</Ph>
          </WordText></p>
        </Container>
      </Section>
      <Section spacing="tight" className="pt-4">
        <Container size="narrow">
          <article className="text-lead [&_p]:text-[length:inherit]">
            <post.Content />
          </article>
          <p className="mt-12 rounded-soft bg-sand/60 p-4 text-sm text-cocoa-soft"><WordText>{b.disclaimer}</WordText></p>
          {others.length ? (
            <nav aria-labelledby="read-next" className="mt-12 border-t border-cocoa/10 pt-8">
              <h2 id="read-next" className="text-h4"><WordText>
                {b.readNext}
              </WordText></h2>
              <ul className="mt-4 space-y-3">
                {others.map((p) => (
                  <li key={p.slug}>
                    <Link href={href(locale, `/blog/${p.slug}`)} className="text-link text-lead">
                      {p.meta.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
        </Container>
      </Section>
      <CtaBand
        title={t.concernsPage.ctaTitle}
        body={t.concernsPage.ctaBody}
        primary={{ href: href(locale, "/book"), label: t.nav.book }}
        secondary={{ href: href(locale, "/blog"), label: b.back }}
      />
    </>
  );
}
