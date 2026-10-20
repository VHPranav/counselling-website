import Link from "next/link";
import { href } from "@/i18n/config";
import { format, getLocale, getMessages } from "@/i18n/dictionaries";
import { listPosts } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { ArrowIcon } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageParts";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Blob, Pebble } from "@/components/shapes/Shapes";

export async function generateMetadata() {
  const t = await getMessages();
  return pageMetadata({ path: "/blog", title: t.blogPage.metaTitle, description: t.blogPage.metaDescription });
}

const tones = ["text-clay/70", "text-moss/60", "text-ochre/70", "text-sage"];

export default async function BlogPage() {
  const locale = await getLocale();
  const t = await getMessages();
  const b = t.blogPage;
  const posts = await listPosts(locale);
  const intl = locale === "ml" ? "ml-IN" : "en-IN";

  return (
    <>
      <PageHero eyebrow={b.eyebrow} title={b.title} lead={b.lead} crumbLabel={t.common.breadcrumb} crumbs={[{ label: t.common.home, href: href(locale) }, { label: t.nav.blog }]} />
      <Section spacing="tight">
        <Container>
          <ul className="grid gap-6 md:grid-cols-2">
            {posts.map((post, i) => (
              <Reveal as="li" key={post.slug} delay={(i % 2) * 100}>
                <Link
                  href={href(locale, `/blog/${post.slug}`)}
                  className="group flex h-full flex-col overflow-hidden rounded-pebble bg-cream-soft ring-1 ring-cocoa/[0.08] transition-[transform,box-shadow] duration-500 ease-[var(--ease-soft)] hover:-translate-y-1 hover:shadow-warm-lg"
                >
                  <div aria-hidden className="relative h-40 overflow-hidden bg-sand">
                    <Blob variant={(i % 3) as 0 | 1 | 2} className={`absolute -right-10 -top-16 w-72 ${tones[i % tones.length]}`} />
                    <Pebble className="absolute bottom-6 left-8 w-16 text-cream/80" />
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <p className="text-sm text-cocoa-soft">
                      <time dateTime={post.meta.date}>{new Intl.DateTimeFormat(intl, { dateStyle: "long" }).format(new Date(post.meta.date))}</time> ·{" "}
                      {format(b.minRead, { n: post.meta.readingMinutes })}
                    </p>
                    <h2 className="mt-3 text-h3 leading-snug">{post.meta.title}</h2>
                    <p className="mt-3 text-cocoa-soft">{post.meta.description}</p>
                    <span className="mt-auto flex items-center gap-2 pt-6 text-sm font-medium text-clay-deep">
                      {t.common.readMore}
                      <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
