"use client";

import { useId, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Large selectable card backed by a native radio input (keyboard and screen-reader friendly). */
export function RadioCard({
  name,
  value,
  checked,
  onChange,
  children,
  className,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  children: ReactNode;
  className?: string;
}) {
  const id = useId();
  return (
    <label
      htmlFor={id}
      className={cn(
        "booking-choice relative flex cursor-pointer gap-4 rounded-pebble p-5 ring-1 ring-inset transition-[background-color,box-shadow] duration-200 ease-[var(--ease-soft)]",
        "has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-3 has-[:focus-visible]:outline-ochre",
        checked ? "bg-cream-soft shadow-warm ring-2 ring-clay-deep" : "bg-cream-soft/70 ring-cocoa/15 hover:ring-cocoa/40",
        className,
      )}
    >
      <input id={id} type="radio" name={name} value={value} checked={checked} onChange={() => onChange(value)} className="sr-only" />
      <span
        aria-hidden
        className={cn(
          "mt-1 flex size-5 shrink-0 items-center justify-center rounded-full ring-2 ring-inset transition-colors",
          checked ? "bg-clay-deep ring-clay-deep" : "ring-cocoa/30",
        )}
      >
        {checked ? <span className="size-2 rounded-full bg-cream" /> : null}
      </span>
      <span className="min-w-0 flex-1">{children}</span>
    </label>
  );
}

/** Small segmented radio group (pills). */
export function Segmented<T extends string>({
  legend,
  name,
  value,
  options,
  onChange,
}: {
  legend: string;
  name: string;
  value: T;
  options: Array<{ value: T; label: string }>;
  onChange: (v: T) => void;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-medium">{legend}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((o) => (
          <label
            key={o.value}
            className={cn(
              "inline-flex min-h-11 cursor-pointer items-center rounded-full px-5 ring-1 ring-inset transition-colors duration-300",
              "has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-3 has-[:focus-visible]:outline-ochre",
              value === o.value ? "bg-forest text-cream ring-forest" : "bg-cream-soft ring-cocoa/20 hover:ring-cocoa/50",
            )}
          >
            <input type="radio" name={name} value={o.value} checked={value === o.value} onChange={() => onChange(o.value)} className="sr-only" />
            {o.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/** Checkbox with label, optional extra content and an error message. */
export function Checkbox({
  checked,
  onChange,
  children,
  error,
  id: idProp,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  children: ReactNode;
  error?: string;
  id?: string;
}) {
  const auto = useId();
  const id = idProp ?? auto;
  return (
    <div>
      <div className="flex gap-3">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-0.5 size-6 shrink-0 cursor-pointer accent-clay-deep"
        />
        <label htmlFor={id} className="cursor-pointer text-[0.9375rem] leading-relaxed">
          {children}
        </label>
      </div>
      {error ? (
        <p id={`${id}-error`} className="ml-9 mt-1 text-sm font-medium text-clay-deeper">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** Labelled native select. */
export function SelectField({
  label,
  value,
  onChange,
  options,
  error,
  placeholder,
  id: idProp,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: Array<{ value: string; label: string }>;
  error?: string;
  placeholder?: string;
  id?: string;
}) {
  const auto = useId();
  const id = idProp ?? auto;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(
            "min-h-12 w-full appearance-none rounded-2xl bg-cream-soft px-4 pr-10 text-base ring-inset",
            error ? "ring-2 ring-clay-deep" : "ring-1 ring-cocoa/25 hover:ring-cocoa/45",
          )}
        >
          {placeholder ? <option value="">{placeholder}</option> : null}
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <svg viewBox="0 0 14 14" width="14" height="14" aria-hidden className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
          <path d="m3 5 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </div>
      {error ? (
        <p id={`${id}-error`} className="text-sm font-medium text-clay-deeper">
          {error}
        </p>
      ) : null}
    </div>
  );
}
