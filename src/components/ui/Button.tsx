import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "light" | "accent";
type Size = "md" | "lg" | "sm";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 rounded-full font-medium text-center text-balance " +
  "transition-[background-color,color,box-shadow,transform,translate] duration-300 ease-[var(--ease-soft)] " +
  "disabled:pointer-events-none disabled:opacity-50 select-none touch-manipulation";

const variants: Record<Variant, string> = {
  primary:
    "bg-clay-deep text-cream shadow-warm hover:bg-clay-deeper hover:shadow-warm-lg active:scale-[0.98]",
  secondary:
    "bg-transparent text-cocoa ring-1 ring-inset ring-cocoa/30 hover:ring-cocoa hover:bg-cocoa/[0.04] active:scale-[0.98]",
  ghost: "bg-transparent text-cocoa hover:bg-sand/70 active:scale-[0.98]",
  light: "bg-cream text-forest hover:bg-white shadow-warm active:scale-[0.98]",
  accent:
    "rounded-xl! bg-blush text-cocoa ring-2 ring-inset ring-cocoa hover:bg-sand active:scale-[0.98]",
};

// Min height 44px everywhere for touch targets; extra vertical room for Malayalam.
const sizes: Record<Size, string> = {
  sm: "min-h-10 px-4 py-1.5 text-[0.8125rem]",
  md: "min-h-11 px-5 py-2 text-sm",
  lg: "min-h-12 px-6 py-2.5 text-[0.9375rem] sm:px-7",
};

type Common = {
  variant?: Variant;
  size?: Size;
  /** Phase 2: buttons with this flag get a subtle magnetic pull on desktop. */
  magnetic?: boolean;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
};

type AsLink = Common & { href: string } & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;
type AsButton = Common & { href?: undefined } & Omit<ComponentProps<"button">, "className" | "children">;

export function Button(props: AsLink | AsButton) {
  const { variant = "primary", size = "md", magnetic, icon, className, children, ...rest } = props;
  const classes = cn(base, variants[variant], sizes[size], className);
  const inner = (
    <>
      <span className="relative leading-snug [:lang(ml)_&]:pt-[0.12em]">{children}</span>
      {icon ? (
        <span
          aria-hidden
          className="relative inline-flex transition-transform duration-300 ease-[var(--ease-soft)] group-hover/btn:translate-x-0.5"
        >
          {icon}
        </span>
      ) : null}
    </>
  );

  if (typeof rest.href === "string") {
    const { href, ...linkRest } = rest as AsLink;
    return (
      <Link href={href} className={classes} data-magnetic={magnetic || undefined} {...linkRest}>
        {inner}
      </Link>
    );
  }
  const { type = "button", ...buttonRest } = rest as AsButton;
  return (
    <button type={type} className={classes} data-magnetic={magnetic || undefined} {...buttonRest}>
      {inner}
    </button>
  );
}

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" fill="none" className={className} aria-hidden>
      <path d="M4 10h11m0 0-4.5-4.5M15 10l-4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
