import { WordText } from "@/components/motion/WordText";
import { workshops } from "@/data/workshops";
import { href } from "@/i18n/config";
import { format, getLocale, getMessages } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/metadata";
import { formatInr } from "@/lib/therapists";
import { Button } from "@/components/ui/Button";
import { CtaBand, PageHero } from "@/components/ui/PageParts";
import { Ph } from "@/components/ui/Placeholder";
import { Container, Heading, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";

export async function generateMetadata() {
  const t = await getMessages();
  return pageMetadata({ path: "/community", title: t.communityPage.metaTitle, description: t.communityPage.metaDescription });
}

// Build time is "now" for this static page; past events drop off on the next deploy.
const BUILD_TIME = Date.now();

export default async function CommunityPage() {
  const locale = await getLocale();
  const t = await getMessages();
  const c = t.communityPage;
  const intl = "en-IN";
  const upcoming = workshops.filter((w) => Date.parse(w.start) > BUILD_TIME).sort((a, b) => a.start.localeCompare(b.start));

  return (
    <>
      <PageHero image="community"
        eyebrow={c.eyebrow}
        title={c.title}
        lead={c.lead}
        crumbLabel={t.common.breadcrumb}
        crumbs={[{ label: t.common.home, href: href(locale) }, { label: t.nav.community }]}
      />
      <Section spacing="tight">
        <Container>
          <Heading level={2} size={3}>
            {c.upcoming}
          </Heading>
          {upcoming.some((w) => w.sample) ? (
            <p className="mt-2 text-sm"><WordText>
              <Ph>{c.sampleNote}</Ph>
            </WordText></p>
          ) : null}
          {upcoming.length ? (
            <ul className="mt-8 grid gap-5 lg:grid-cols-3">
              {upcoming.map((w, i) => {
                const start = new Date(w.start);
                return (
                  <Reveal as="li" key={w.slug} delay={i * 90}>
                    <article className="flex h-full flex-col rounded-pebble bg-cream-soft p-6 ring-1 ring-cocoa/[0.08] sm:p-7">
                      <div className="flex items-start gap-4">
                        <time dateTime={w.start} className="flex w-16 shrink-0 flex-col items-center rounded-2xl bg-forest py-2 text-cream">
                          <span className="text-xs">{new Intl.DateTimeFormat(intl, { month: "short", timeZone: "Asia/Kolkata" }).format(start)}</span>
                          <span className="font-display text-h3 leading-none">{new Intl.DateTimeFormat(intl, { day: "numeric", timeZone: "Asia/Kolkata" }).format(start)}</span>
                        </time>
                        <div>
                          <h3 className="text-h4 leading-snug"><WordText>{w.title[locale]}</WordText></h3>
                          <p className="mt-1 text-sm text-cocoa-soft"><WordText>
                            {new Intl.DateTimeFormat(intl, { weekday: "long", hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata", timeZoneName: "short" }).format(start)}
                          </WordText></p>
                        </div>
                      </div>
                      <p className="mt-4 text-cocoa-soft"><WordText>{w.summary[locale]}</WordText></p>
                      <ul className="mt-5 flex flex-wrap gap-2 text-xs">
                        {[c.online, format(c.minutes, { n: w.durationMinutes }), w.languages.map((l) => t.common[l]).join(" + "), w.audience[locale]].map((tag) => (
                          <li key={tag} className="rounded-full bg-sand px-3 py-1">
                            {tag}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-4 text-sm"><WordText>
                        <Ph>{format(c.facilitator, { name: w.facilitator[locale] })}</Ph>
                      </WordText></p>
                      <div className="mt-auto flex items-center justify-between gap-4 border-t border-cocoa/10 pt-5">
                        <span className="text-sm font-medium">
                          {w.priceInr == null ? c.free : formatInr(w.priceInr, locale)} · {format(c.seats, { n: w.seats })}
                        </span>
                        <Button href={href(locale, "/contact")} size="sm" variant="secondary">
                          {c.register}
                        </Button>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </ul>
          ) : (
            <p className="mt-8 rounded-soft bg-sand/60 p-6"><WordText>{c.empty}</WordText></p>
          )}
        </Container>
      </Section>
      <CtaBand title={c.groupTitle} body={c.groupBody} primary={{ href: href(locale, "/business#enquire"), label: c.groupCta }} />
    </>
  );
}
