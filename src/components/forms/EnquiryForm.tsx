"use client";

import Link from "next/link";
import { useId, useRef, useState, useTransition } from "react";
import { submitEnquiry } from "@/app/[locale]/enquiry-actions";
import { enquirySchema, type EnquiryInput } from "@/lib/enquiry/schema";
import { issuesToErrors } from "@/lib/booking/schema";
import { Checkbox, SelectField } from "@/components/booking/controls";
import { ArrowIcon, Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Ph } from "@/components/ui/Placeholder";
import type { Messages } from "@/i18n/dictionaries";
import { cn } from "@/lib/cn";

type Props = {
  kind: "business" | "contact";
  locale: "ml" | "en";
  t: Messages["enquiry"];
  errors: { required: string; email: string; phone: string; contact: string; consent: string; summary: string };
  privacyHref: string;
  privacyLabel: string;
};

/**
 * Enquiry form for organisations and general contact. Validates in the browser
 * and again on the server; never asks for health details.
 */
export function EnquiryForm({ kind, locale, t, errors: msgs, privacyHref, privacyLabel }: Props) {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    organisation: "",
    role: "",
    orgType: "",
    size: "",
    topic: "",
    message: "",
    website: "",
  });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sent" | "demo" | "error">("idle");
  const [pending, start] = useTransition();
  const summaryRef = useRef<HTMLDivElement>(null);
  const messageId = useId();

  const set = (key: keyof typeof values) => (v: string) => {
    setValues((s) => ({ ...s, [key]: v }));
    setErrors((e) => {
      if (!(key in e) && !(key === "phone" && "email" in e)) return e;
      const next = { ...e };
      delete next[key];
      if (key === "phone") delete next.email;
      return next;
    });
  };
  const err = (key: string) => (errors[key] ? (msgs as Record<string, string>)[errors[key]] ?? msgs.required : undefined);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const input: EnquiryInput = {
      kind,
      locale,
      ...values,
      email: values.email.trim(),
      phone: values.phone.trim(),
      orgType: values.orgType as EnquiryInput["orgType"],
      topic: values.topic as EnquiryInput["topic"],
      consent,
    };
    const local = enquirySchema.safeParse(input);
    if (!local.success) {
      setErrors(issuesToErrors(local.error));
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    start(async () => {
      const res = await submitEnquiry(input);
      if (res.ok) setStatus(res.demo ? "demo" : "sent");
      else if (res.error === "invalid") {
        setErrors(res.fields);
        requestAnimationFrame(() => summaryRef.current?.focus());
      } else setStatus("error");
    });
  }

  if (status === "sent" || status === "demo") {
    return (
      <div role="status" className="rounded-pebble bg-forest p-6 text-cream on-dark sm:p-8">
        <p className="font-display text-h4">{t.success}</p>
        {status === "demo" ? (
          <p className="mt-3 text-sm">
            <Ph>{t.demo}</Ph>
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      {Object.keys(errors).length || status === "error" ? (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="rounded-soft bg-clay/15 p-4 text-sm font-medium text-clay-deeper outline-none">
          {status === "error" ? t.errorServer : msgs.summary}
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t.name} value={values.name} onChange={(e) => set("name")(e.target.value)} autoComplete="name" error={err("name")} required />
        {kind === "business" ? (
          <Field label={t.organisation} value={values.organisation} onChange={(e) => set("organisation")(e.target.value)} autoComplete="organization" error={err("organisation")} required />
        ) : (
          <SelectField
            label={t.topic}
            value={values.topic}
            onChange={set("topic")}
            placeholder="—"
            options={[
              { value: "general", label: t.topicGeneral },
              { value: "booking", label: t.topicBooking },
              { value: "therapist", label: t.topicTherapist },
              { value: "media", label: t.topicMedia },
            ]}
          />
        )}
        <Field label={t.email} type="email" inputMode="email" value={values.email} onChange={(e) => set("email")(e.target.value)} autoComplete="email" error={err("email")} />
        <Field label={t.phone} type="tel" inputMode="tel" value={values.phone} onChange={(e) => set("phone")(e.target.value)} autoComplete="tel" error={err("phone")} />
        {kind === "business" ? (
          <>
            <Field label={t.role} value={values.role} onChange={(e) => set("role")(e.target.value)} autoComplete="organization-title" />
            <SelectField
              label={t.orgType}
              value={values.orgType}
              onChange={set("orgType")}
              placeholder="—"
              options={[
                { value: "company", label: t.orgCompany },
                { value: "college", label: t.orgCollege },
                { value: "school", label: t.orgSchool },
                { value: "other", label: t.orgOther },
              ]}
            />
            <Field label={t.size} inputMode="numeric" value={values.size} onChange={(e) => set("size")(e.target.value)} />
          </>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={messageId} className="text-sm font-medium">
          {t.message}
        </label>
        <p id={`${messageId}-hint`} className="text-sm text-cocoa-soft">
          {t.messageHint}
        </p>
        <textarea
          id={messageId}
          rows={5}
          value={values.message}
          onChange={(e) => set("message")(e.target.value)}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={`${messageId}-hint${errors.message ? ` ${messageId}-error` : ""}`}
          className={cn(
            "w-full rounded-2xl bg-cream-soft px-4 py-3 text-base ring-inset",
            errors.message ? "ring-2 ring-clay-deep" : "ring-1 ring-cocoa/25 hover:ring-cocoa/45 focus-visible:ring-2 focus-visible:ring-cocoa",
          )}
        />
        {errors.message ? (
          <p id={`${messageId}-error`} className="text-sm font-medium text-clay-deeper">
            {err("message")}
          </p>
        ) : null}
      </div>

      <Checkbox
        checked={consent}
        onChange={(v) => {
          setConsent(v);
          setErrors((e) => Object.fromEntries(Object.entries(e).filter(([k]) => k !== "consent")));
        }}
        error={err("consent")}
      >
        {t.consent}{" "}
        <Link href={privacyHref} className="text-link" target="_blank">
          {privacyLabel}
        </Link>
      </Checkbox>

      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <input tabIndex={-1} autoComplete="off" name="website" value={values.website} onChange={(e) => set("website")(e.target.value)} />
      </div>

      <Button type="submit" size="lg" className="justify-self-start" disabled={pending} icon={pending ? null : <ArrowIcon />}>
        {pending ? t.sending : kind === "business" ? t.submitBusiness : t.submitContact}
      </Button>
    </form>
  );
}
