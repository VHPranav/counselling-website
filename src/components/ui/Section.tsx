import { WordText } from "@/components/motion/WordText";
import type { ComponentProps, ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "cream" | "sand" | "sage" | "forest";

const tones: Record<Tone, string> = {
  cream: "bg-cream text-cocoa",
  sand: "bg-sand text-cocoa",
  sage: "bg-sand text-cocoa",
  forest: "bg-forest text-cream on-dark grain grain-light",
};

export function Container({
  className,
  size = "default",
  ...props
}: ComponentProps<"div"> & { size?: "default" | "narrow" | "wide" }) {
  const widths = { narrow: "max-w-3xl", default: "max-w-7xl", wide: "max-w-7xl" };
  return <div className={cn("mx-auto w-full px-4 sm:px-6 lg:px-10", widths[size], className)} {...props} />;
}

export function Section({
  as: Tag = "section",
  tone = "cream",
  grain = false,
  spacing = "default",
  className,
  children,
  ...props
}: {
  as?: ElementType;
  tone?: Tone;
  grain?: boolean;
  spacing?: "default" | "tight" | "none";
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<"section">, "className" | "children">) {
  const pad = { default: "py-16 sm:py-20 lg:py-24", tight: "py-10 sm:py-14", none: "" };
  return (
    <Tag className={cn("relative", tones[tone], grain && "grain", pad[spacing], className)} {...props}>
      {children}
    </Tag>
  );
}

export function Eyebrow({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-moss [.on-dark_&]:text-sage [:lang(ml)_&]:normal-case [:lang(ml)_&]:tracking-normal [:lang(ml)_&]:text-sm",
        "before:h-px before:w-6 before:bg-current before:opacity-60",
        className,
      )}
      {...props}
    />
  );
}

type HeadingLevel = 1 | 2 | 3 | 4;
const headingSizes: Record<"display" | HeadingLevel, string> = {
  display: "text-display",
  1: "text-h1",
  2: "text-h2",
  3: "text-h3",
  4: "text-h4",
};

export function Heading({
  level = 2,
  children,
  size,
  className,
  ...props
}: { level?: HeadingLevel; size?: "display" | HeadingLevel } & ComponentProps<"h2">) {
  const Tag = `h${level}` as const;
  return <Tag className={cn(headingSizes[size ?? level], className)} {...props}><WordText>{children}</WordText></Tag>;
}
