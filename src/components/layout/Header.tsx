import Link from "next/link";
import { concerns } from "@/data/concerns";
import { siteConfig } from "@/config/site";
import { href, type Locale } from "@/i18n/config";
import { format, type Messages } from "@/i18n/dictionaries";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import logo from "@/assets/brand/logo.png";

import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";
import { bookPath, primaryNav } from "./navigation";

export function Header({ locale, t }: { locale: Locale; t: Messages }) {
  const links = primaryNav.map((item) => ({
    href: href(locale, item.path),
    label: t.nav[item.key],
    ...(item.key === "concerns" ? { children: concerns.map((concern) => ({ href: href(locale, `/concerns/${concern.slug}`), label: concern.name[locale], description: concern.summary[locale] })) } : {}),
  }));
  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-4">
      {/* Floating pill bar */}
      <div className="mx-auto flex h-14 max-w-5xl items-center gap-3 rounded-2xl border border-cocoa/10 bg-cream-soft/85 pl-4 pr-2 shadow-[0_8px_30px_-12px_rgb(59_42_34/0.25)] backdrop-blur-md supports-[not(backdrop-filter:blur(1px))]:bg-cream-soft sm:h-[3.75rem] sm:pl-5">
        <Link
          href={href(locale)}
          className="mr-auto flex min-h-11 items-center gap-2.5 rounded-full"
          aria-label={format(t.header.home, { brand: siteConfig.brandName })}
        >
          <Image src={logo} alt="" priority className="h-10 w-auto sm:h-12" sizes="80px" />
        </Link>

        <NavLinks links={links} label={t.header.primaryNav} />


        <Button href={href(locale, bookPath)} size="sm" variant="accent" className="whitespace-nowrap max-sm:hidden">
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
