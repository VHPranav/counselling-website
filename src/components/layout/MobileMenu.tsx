"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * Full-screen mobile menu built on <dialog>: focus is trapped, Escape closes,
 * and the page behind is inert, all natively.
 */
export function MobileMenu({
  openLabel,
  closeLabel,
  links,
  footer,
}: {
  openLabel: string;
  closeLabel: string;
  links: Array<{ href: string; label: string }>;
  footer?: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();

  // Close when the route changes.
  useEffect(() => {
    ref.current?.close();
  }, [pathname]);

  return (
    <>
      <button
        type="button"
        onClick={() => ref.current?.showModal()}
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full ring-1 ring-inset ring-cocoa/20 hover:bg-sand lg:hidden"
        aria-haspopup="dialog"
      >
        <span className="sr-only">{openLabel}</span>
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden>
          <path d="M4 8h16M4 16h11" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      </button>
      <dialog
        ref={ref}
        aria-label={openLabel}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-cream p-0 text-cocoa backdrop:bg-forest/40 open:flex open:flex-col lg:hidden
          open:animate-[menu-in_.45s_var(--ease-soft)] motion-reduce:open:animate-none"
        onClick={(e) => {
          if (e.target === e.currentTarget) e.currentTarget.close();
        }}
      >
        <div className="flex justify-end px-4 pt-4">
          <button
            type="button"
            onClick={() => ref.current?.close()}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full ring-1 ring-inset ring-cocoa/20 hover:bg-sand"
          >
            <span className="sr-only">{closeLabel}</span>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden>
              <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-6 pb-8 pt-4">
          <ul className="flex flex-col">
            {links.map((link) => (
              <li key={link.href} className="border-b border-cocoa/10">
                <Link
                  href={link.href}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className="flex min-h-16 items-center font-display text-h3 aria-[current=page]:text-clay-deep"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {footer ? <div className="border-t border-cocoa/10 px-6 py-6">{footer}</div> : null}
      </dialog>
    </>
  );
}
