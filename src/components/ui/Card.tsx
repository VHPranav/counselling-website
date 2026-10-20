import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

const surface = {
  cream: "bg-cream-soft",
  sand: "bg-sand",
  forest: "bg-forest-soft text-cream",
};

/** Rounded card with a soft warm lift on hover. Pass href to make the whole card a link. */
export function Card({
  href,
  tone = "cream",
  interactive,
  className,
  children,
  ...props
}: {
  href?: string;
  tone?: keyof typeof surface;
  interactive?: boolean;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<"div">, "className" | "children">) {
  const lift = href || interactive;
  const classes = cn(
    "relative block rounded-pebble p-6 sm:p-8 ring-1 ring-cocoa/[0.07]",
    surface[tone],
    lift &&
      "transition-[transform,box-shadow] duration-500 ease-[var(--ease-soft)] hover:-translate-y-1 hover:shadow-warm-lg focus-within:shadow-warm-lg",
    className,
  );
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}
