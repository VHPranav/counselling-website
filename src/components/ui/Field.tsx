import { useId, type ComponentProps, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Labelled input with hint and error wired up for assistive tech. */
export function Field({
  label,
  hint,
  error,
  optionalLabel,
  className,
  id: idProp,
  ...input
}: {
  label: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  /** Text shown next to the label when the field is optional, e.g. "optional". */
  optionalLabel?: string;
} & ComponentProps<"input">) {
  const auto = useId();
  const id = idProp ?? auto;
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-sm font-medium text-cocoa">
        {label}
        {optionalLabel && !input.required ? (
          <span className="ml-1.5 font-normal text-cocoa-soft">({optionalLabel})</span>
        ) : null}
      </label>
      {hint ? (
        <p id={hintId} className="text-sm text-cocoa-soft">
          {hint}
        </p>
      ) : null}
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={[hintId, errorId].filter(Boolean).join(" ") || undefined}
        className={cn(
          "min-h-12 w-full rounded-2xl bg-cream-soft px-4 text-base text-cocoa ring-inset",
          "placeholder:text-cocoa-soft/70 transition-shadow duration-200",
          error ? "ring-2 ring-clay-deep" : "ring-1 ring-cocoa/25 hover:ring-cocoa/45 focus-visible:ring-2 focus-visible:ring-cocoa",
        )}
        {...input}
      />
      {error ? (
        <p id={errorId} className="flex items-start gap-1.5 text-sm font-medium text-clay-deeper">
          <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden className="mt-[0.2em] shrink-0">
            <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8 4.5v4M8 11v.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          {error}
        </p>
      ) : null}
    </div>
  );
}
