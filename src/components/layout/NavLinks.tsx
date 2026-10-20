"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/** Desktop header links; marks the section you're in with aria-current. */
export function NavLinks({ links, label }: { links: Array<{ href: string; label: string }>; label: string }) {
  const pathname = usePathname() ?? "";
  return (
    <nav aria-label={label} className="hidden lg:block">
      <ul className="flex items-center gap-1 xl:gap-2">
        {links.map((link) => {
          const current = pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={current ? "page" : undefined}
                className="link-underline mx-2.5 inline-block py-2 text-[0.9375rem] aria-[current=page]:text-clay-deeper"
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
