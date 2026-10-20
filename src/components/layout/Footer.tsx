import Link from "next/link";
import { siteConfig } from "@/config/site";
import { href, type Locale } from "@/i18n/config";
import { format, type Messages } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/Section";
import { Ph } from "@/components/ui/Placeholder";
import { BananaLeaf, BrandMark, Ripple } from "@/components/shapes/Shapes";
import { CrisisNotice } from "./CrisisNotice";
import { footerExplore, footerHelp, legalNav } from "./navigation";

export function Footer({ locale, t }: { locale: Locale; t: Messages }) {
  const { contact } = siteConfig;
  return (
    <footer className="on-dark grain grain-light relative overflow-hidden bg-forest text-cream">
      <BananaLeaf className="pointer-events-none absolute -right-16 -top-10 hidden w-64 rotate-[18deg] text-moss/40 md:block" />
      <Ripple className="pointer-events-none absolute -bottom-6 -left-24 w-[34rem] text-sage/20" />
      <Container size="wide" className="relative py-16 sm:py-20">
        <CrisisNotice locale={locale} t={t} tone="dark" />

        <div className="mt-16 grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <BrandMark className="size-9" />
              <span className="font-display text-xl">
                <Ph>{siteConfig.brandName}</Ph>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-cream/80">{t.footer.tagline}</p>
            <dl className="mt-6 space-y-3 text-sm">
              <div>
                <dt className="text-cream/70">{t.footer.email}</dt>
                <dd>
                  <Ph>{contact.email}</Ph>
                </dd>
              </div>
              <div>
                <dt className="text-cream/70">{t.footer.whatsapp}</dt>
                <dd>
                  <Ph>{contact.phoneDisplay}</Ph>
                </dd>
              </div>
              <div>
                <dt className="text-cream/70">{t.footer.hours}</dt>
                <dd>
                  <Ph>{contact.hours[locale]}</Ph>
                </dd>
              </div>
            </dl>
          </div>

          <FooterList title={t.footer.explore} items={footerExplore.map((i) => ({ href: href(locale, i.path), label: t.nav[i.key] }))} />
          <FooterList title={t.footer.help} items={footerHelp.map((i) => ({ href: href(locale, i.path), label: t.nav[i.key] }))} />
          <FooterList title={t.footer.legal} items={legalNav.map((i) => ({ href: href(locale, i.path), label: t.footer[i.key] }))} />
        </div>

        <div className="kasavu mt-16" />
        <div className="mt-6 flex flex-col gap-3 text-sm text-cream/75 md:flex-row md:items-start md:justify-between">
          <p className="max-w-xl">{t.footer.disclaimer}</p>
          <p className="shrink-0">
            {format(t.footer.rights, { year: siteConfig.copyrightYear, brand: siteConfig.brandName })}
          </p>
        </div>
      </Container>
    </footer>
  );
}

function FooterList({ title, items }: { title: string; items: Array<{ href: string; label: string }> }) {
  return (
    <nav aria-label={title}>
      <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.14em] text-ochre [:lang(ml)_&]:tracking-normal [:lang(ml)_&]:normal-case">
        {title}
      </h2>
      <ul className="mt-4 space-y-1">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="link-underline inline-flex min-h-10 items-center text-cream/90 hover:text-cream">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
