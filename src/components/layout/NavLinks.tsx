"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export type NavigationLink = {
  href: string;
  label: string;
  children?: { href: string; label: string; description?: string }[];
};

/** Native disclosures keep topic navigation accessible without a menu widget. */
export function NavLinks({ links, label }: { links: NavigationLink[]; label: string }) {
  const pathname = usePathname() ?? "";
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    ref.current?.querySelectorAll("details").forEach((item) => { item.open = false; });
  }, [pathname]);

  useEffect(() => {
    const outside = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) ref.current?.querySelectorAll("details").forEach((item) => { item.open = false; });
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, []);

  return (
    <nav ref={ref} aria-label={label} className="hidden lg:block" onKeyDown={(event) => {
      if (event.key !== "Escape") return;
      const disclosure = ref.current?.querySelector("details[open]");
      if (disclosure instanceof HTMLDetailsElement) {
        disclosure.open = false;
        disclosure.querySelector("summary")?.focus();
      }
    }}>
      <ul className="flex items-center gap-1 xl:gap-2">
        {links.map((link) => {
          const current = pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
            <li key={link.href} className="relative">
              {link.children ? (
                <details className="group/nav">
                  <summary className={`mx-2 flex min-h-11 cursor-pointer list-none items-center gap-1.5 text-sm [&::-webkit-details-marker]:hidden ${current ? "text-clay-deeper" : ""}`}>
                    {link.label}
                    <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="none" className="transition-transform group-open/nav:rotate-180"><path d="m3 4.5 3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </summary>
                  <div className="absolute left-1/2 top-full z-50 mt-3 w-[34rem] max-w-[90vw] -translate-x-1/2 rounded-[1.25rem] border border-cocoa/15 bg-cream-soft p-3 shadow-warm-lg">
                    <ul className="grid grid-cols-2 gap-1">
                      {link.children.map((child) => <li key={child.href}><Link href={child.href} aria-current={pathname === child.href ? "page" : undefined} onClick={() => { ref.current?.querySelectorAll("details").forEach((item) => { item.open = false; }); }} className="block rounded-xl p-3 hover:bg-sand/60 aria-[current=page]:bg-sand/60"><span className="text-sm font-medium">{child.label}</span>{child.description ? <span className="mt-1 block text-xs leading-relaxed text-cocoa-soft">{child.description}</span> : null}</Link></li>)}
                    </ul>
                  </div>
                </details>
              ) : <Link href={link.href} aria-current={current ? "page" : undefined} className="link-underline mx-2 inline-block py-2 text-sm aria-[current=page]:text-clay-deeper">{link.label}</Link>}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
