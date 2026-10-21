import Link from "next/link";
import { siteConfig } from "@/config/site";
import { href, type Locale } from "@/i18n/config";
import { format, type Messages } from "@/i18n/dictionaries";
import { Button } from "@/components/ui/Button";
import { Ph } from "@/components/ui/Placeholder";
import { BrandMark } from "@/components/shapes/Shapes";
import { LocaleToggle } from "./LocaleToggle";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";
import { bookPath, primaryNav } from "./navigation";

export function Header({ locale, t }: { locale: Locale; t: Messages }) {
  const links = primaryNav.map((item) => ({ href: href(locale, item.path), label: t.nav[item.key] }));
  return (
    <header className="sticky top-0 z-40 border-b border-cocoa/[0.06] bg-cream/85 backdrop-blur-md supports-[not(backdrop-filter:blur(1px))]:bg-cream">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:h-[4.5rem] sm:px-6 lg:px-10">
        <Link
          href={href(locale)}
          className="mr-auto flex min-h-11 items-center gap-2.5 rounded-full"
          aria-label={format(t.header.home, { brand: siteConfig.brandName })}
        >
          <BrandMark className="size-7 shrink-0 sm:size-8" />
          <span className="whitespace-nowrap font-display text-base leading-none tracking-tight sm:text-lg" aria-hidden>
            <Ph>{siteConfig.brandName}</Ph>
          </span>
        </Link>

        <NavLinks links={links} label={t.header.primaryNav} />

        <LocaleToggle current={locale} label={t.header.language} className="lg:ml-3" />
        <Button href={href(locale, bookPath)} size="sm" magnetic className="whitespace-nowrap max-sm:hidden">
          {t.nav.book}
        </Button>
        <MobileMenu
          openLabel={t.header.menu}
          closeLabel={t.header.closeMenu}
          links={links}
          footer={
            <Button href={href(locale, bookPath)} size="lg" className="w-full">
              {t.nav.book}
            </Button>
          }
        />
      </div>
    </header>
  );
}
