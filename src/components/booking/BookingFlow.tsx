"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore, useTransition, type ReactNode } from "react";
import { fetchAvailability, submitBooking } from "@/app/[locale]/book/actions";
import { Field } from "@/components/ui/Field";
import { ArrowIcon, Button } from "@/components/ui/Button";
import { Ph } from "@/components/ui/Placeholder";
import { TherapistAvatar } from "@/components/therapists/TherapistCard";
import { bookingSchema, issuesToErrors, type BookingInput } from "@/lib/booking/schema";
import type { AvailabilityDay, Slot } from "@/lib/booking/types";
import type { Therapist } from "@/data/types";
import type { Messages } from "@/i18n/dictionaries";
import { cn } from "@/lib/cn";
import { Checkbox, RadioCard, Segmented, SelectField } from "./controls";
import type Lenis from "lenis";
import "./BookingMotion.css";

export type FlowService = {
  slug: string;
  name: string;
  audience: string;
  summary: string;
  minutes: string;
  price: string;
  modes: Array<"video" | "audio">;
  teen: boolean;
};

export type FlowTherapist = {
  slug: string;
  name: string;
  role: string;
  languages: Array<"ml" | "en">;
  languagesLabel: string;
  services: string[];
  modes: Array<"video" | "audio">;
  tone: Therapist["tone"];
  photo: string | null;
  price: string;
};

type Props = {
  locale: "ml" | "en";
  t: Messages["booking"];
  common: { ml: string; en: string; optional: string };
  modeLabels: { video: string; audio: string };
  services: FlowService[];
  therapists: FlowTherapist[];
  links: { terms: string; agreement: string; privacy: string; minors: string; contact: string; confirmed: string };
  policyLabels: { terms: string; agreement: string; privacy: string; minors: string; contact: string };
};

const STEPS = 4;
const noopSubscribe = () => () => {};

/** Local calendar date (YYYY-MM-DD) of an instant in a time zone. */
function localDate(iso: string, timeZone: string): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(iso));
}

function localHour(iso: string, timeZone: string): number {
  return Number(new Intl.DateTimeFormat("en-GB", { timeZone, hour: "2-digit", hourCycle: "h23" }).format(new Date(iso)));
}

export function BookingFlow({ locale, t, common, modeLabels, services, therapists, links, policyLabels }: Props) {
  const router = useRouter();
  const params = useSearchParams();
  const intl = locale === "ml" ? "ml-IN" : "en-IN";

  // ---- Prefill from links like /book?service=couples&therapist=therapist-2&match=1
  const initial = useMemo(() => {
    const s = params.get("service");
    const th = params.get("therapist");
    const therapist = therapists.find((x) => x.slug === th) ?? null;
    const service = services.find((x) => x.slug === s) ?? null;
    return {
      serviceSlug: service?.slug ?? null,
      therapistSlug: therapist && (!service || therapist.services.includes(service.slug)) ? therapist.slug : null,
      match: params.get("match") === "1",
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [step, setStep] = useState(initial.serviceSlug ? 1 : 0);
  const [serviceSlug, setServiceSlug] = useState<string | null>(initial.serviceSlug);
  const [therapistSlug, setTherapistSlug] = useState<string | null>(initial.therapistSlug);
  const [matchMe, setMatchMe] = useState(initial.match && !initial.therapistSlug);
  const [matchLanguage, setMatchLanguage] = useState<"ml" | "en" | "either">("either");

  const [availability, setAvailability] = useState<{ key: string; days: AvailabilityDay[] } | null>(null);
  const [weekPick, setWeekPick] = useState<{ key: string; week: number } | null>(null);
  const [datePick, setDatePick] = useState<{ key: string; date: string } | null>(null);
  const [slot, setSlot] = useState<Slot | null>(null);
  const [mode, setMode] = useState<"video" | "audio">("video");
  const [timeError, setTimeError] = useState<string | null>(null);

  const [forWhom, setForWhom] = useState<"self" | "other">("self");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsappOk, setWhatsappOk] = useState(false);
  const [sessionLanguage, setSessionLanguage] = useState<"ml" | "en" | "both">(locale);
  const [guardian, setGuardian] = useState({ teenAge: "", name: "", relationship: "", contact: "" });
  const [consents, setConsents] = useState({ adultOrGuardian: false, terms: false, dataUse: false, notCrisis: false, otherPersonAgrees: false });
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, startSubmit] = useTransition();
  /** Drop a field's error as soon as the visitor edits it. */
  const clear = (...keys: string[]) =>
    setErrors((e) => (keys.some((k) => k in e) ? Object.fromEntries(Object.entries(e).filter(([k]) => !keys.includes(k))) : e));

  // Visitor's time zone (IST during server rendering, so markup always matches).
  const timeZone = useSyncExternalStore(
    noopSubscribe,
    () => Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Kolkata",
    () => "Asia/Kolkata",
  );

  const service = services.find((s) => s.slug === serviceSlug) ?? null;
  const therapist = therapists.find((x) => x.slug === therapistSlug) ?? null;
  const eligible = therapists.filter((x) => (service ? x.services.includes(service.slug) : true));
  const serviceModes = service?.modes ?? ["video", "audio"];
  const availableModes = therapist ? serviceModes.filter((x) => therapist.modes.includes(x)) : serviceModes;
  const effectiveMode = availableModes.includes(mode) ? mode : (availableModes[0] ?? "video");

  // ---- Step navigation with browser history (back button goes to the previous step)
  const headingRef = useRef<HTMLHeadingElement>(null);
  const previousStep = useRef(step);
  const goTo = useCallback((next: number) => {
    setStep(next);
    window.history.pushState({ bookingStep: next }, "");
  }, []);
  useEffect(() => {
    window.history.replaceState({ bookingStep: step }, "");
    const onPop = (e: PopStateEvent) => {
      if (typeof e.state?.bookingStep === "number") setStep(e.state.bookingStep);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (previousStep.current === step) return;
    previousStep.current = step;
    headingRef.current?.focus({ preventScroll: true });
    const section = headingRef.current?.closest("section");
    if (section && section.getBoundingClientRect().top < 96) {
      const target = Math.max(0, section.getBoundingClientRect().top + window.scrollY - 96);
      const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
      lenis?.scrollTo(target, { immediate: true, force: true });
      window.scrollTo({ top: target, behavior: "instant" });
    }
  }, [step]);

  // ---- Availability, fetched when the time step opens (cached per query)
  const queryKey = serviceSlug ? `${serviceSlug}|${matchMe ? "*" : (therapistSlug ?? "")}|${matchLanguage}` : "";
  const days = availability?.key === queryKey ? availability.days : null;
  const loadingSlots = step === 2 && !days;
  useEffect(() => {
    if (step !== 2 || !serviceSlug || availability?.key === queryKey) return;
    let cancelled = false;
    fetchAvailability({ serviceSlug, therapistSlug: matchMe ? null : therapistSlug, language: matchLanguage }).then((result) => {
      if (!cancelled) setAvailability({ key: queryKey, days: result });
    });
    return () => {
      cancelled = true;
    };
  }, [step, queryKey, serviceSlug, therapistSlug, matchMe, matchLanguage, availability?.key]);

  // Group slots by the visitor's local date.
  const slotsByDate = useMemo(() => {
    const map = new Map<string, Slot[]>();
    for (const d of days ?? []) for (const s of d.slots) {
      const key = localDate(s.start, timeZone);
      map.set(key, [...(map.get(key) ?? []), s]);
    }
    return map;
  }, [days, timeZone]);

  const allDates = useMemo(() => {
    if (!days?.length) return [];
    const start = localDate(new Date().toISOString(), timeZone);
    return Array.from({ length: 21 }, (_, i) => {
      const d = new Date(`${start}T12:00:00Z`);
      d.setUTCDate(d.getUTCDate() + i);
      return d.toISOString().slice(0, 10);
    });
  }, [days, timeZone]);

  // Default to the first date that has times; the visitor's own pick wins.
  const firstDate = allDates.find((d) => slotsByDate.has(d)) ?? null;
  const date = datePick?.key === queryKey && slotsByDate.has(datePick.date) ? datePick.date : firstDate;
  const week = weekPick?.key === queryKey ? weekPick.week : firstDate ? Math.floor(allDates.indexOf(firstDate) / 7) : 0;
  const setDate = (d: string) => setDatePick({ key: queryKey, date: d });
  const setWeek = (fn: (w: number) => number) => setWeekPick({ key: queryKey, week: fn(week) });

  const fmtTime = (iso: string) => new Intl.DateTimeFormat(intl, { timeZone, hour: "numeric", minute: "2-digit" }).format(new Date(iso));
  const fmtDay = (d: string, opts: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat(intl, { timeZone: "UTC", ...opts }).format(new Date(`${d}T12:00:00Z`));
  const whenLabel = slot
    ? new Intl.DateTimeFormat(intl, { timeZone, weekday: "long", day: "numeric", month: "long", hour: "numeric", minute: "2-digit" }).format(new Date(slot.start))
    : "";

  const canContinue = [Boolean(service), Boolean(matchMe || therapist), Boolean(slot), true][step];

  // ---- Submit
  const errorText = (code?: string) =>
    code
      ? ({ required: t.errorRequired, email: t.errorEmail, phone: t.errorPhone, contact: t.errorContact, consent: t.errorConsent } as Record<string, string>)[code] ??
        t.errorRequired
      : undefined;

  function buildInput(): BookingInput {
    return {
      locale,
      serviceSlug: serviceSlug ?? "",
      therapistSlug: matchMe ? null : therapistSlug,
      matchLanguage,
      slot: slot ?? { start: "", end: "", therapistSlug: "" },
      mode: effectiveMode,
      sessionLanguage,
      forWhom,
      name,
      email: email.trim(),
      phone: phone.trim(),
      whatsappOk,
      timeZone,
      guardian: service?.teen
        ? {
            teenAge: Number(guardian.teenAge) || 0,
            name: guardian.name,
            relationship: (guardian.relationship || "guardian") as "mother" | "father" | "guardian",
            contact: guardian.contact,
          }
        : null,
      consents,
      website: honeypot,
    };
  }

  const errorSummaryRef = useRef<HTMLDivElement>(null);
  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);
    const input = buildInput();
    const local = bookingSchema.safeParse(input);
    if (service?.teen && !guardian.relationship) {
      const errs = local.success ? {} : issuesToErrors(local.error);
      setErrors({ ...errs, "guardian.relationship": "required" });
      requestAnimationFrame(() => errorSummaryRef.current?.focus());
      return;
    }
    if (!local.success) {
      setErrors(issuesToErrors(local.error));
      requestAnimationFrame(() => errorSummaryRef.current?.focus());
      return;
    }
    setErrors({});
    startSubmit(async () => {
      const res = await submitBooking(input);
      if (res.ok) {
        try {
          // Non-sensitive summary for the confirmation page; cleared once shown.
          sessionStorage.setItem(
            "booking:last",
            JSON.stringify({ ref: res.reference, service: service?.name, therapist: matchMe ? null : therapist?.name, when: whenLabel, demo: res.demo }),
          );
        } catch {}
        router.push(`${links.confirmed}?ref=${encodeURIComponent(res.reference)}`);
        return;
      }
      if (res.error === "slot_unavailable") {
        setSlot(null);
        setAvailability(null); // refetch fresh times
        setTimeError(t.errorSlotTaken);
        goTo(2);
        return;
      }
      if (res.error === "invalid" && "fields" in res) {
        setErrors(res.fields);
        requestAnimationFrame(() => errorSummaryRef.current?.focus());
        return;
      }
      setServerError(t.errorServer);
    });
  }

  const stepNames = [t.stepService, t.stepTherapist, t.stepTime, t.stepDetails];

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-12">
      <div className="min-w-0">
        {/* Progress */}
        <nav aria-label={t.progressLabel}>
          <ol className="grid grid-cols-4 gap-2">
            {stepNames.map((label, i) => {
              const done = i < step;
              return (
                <li key={label}>
                  <button
                    type="button"
                    disabled={i > step}
                    onClick={() => i < step && goTo(i)}
                    aria-current={i === step ? "step" : undefined}
                    className="group flex w-full flex-col gap-2 text-left disabled:cursor-default"
                  >
                    <span className={cn("h-1.5 w-full rounded-full transition-colors duration-500", i <= step ? "bg-clay-deep" : "bg-sand")} />
                    <span className={cn("text-xs sm:text-sm", i === step ? "font-semibold text-cocoa" : done ? "text-cocoa-soft group-hover:underline" : "text-cocoa-soft/80")}>
                      <span className="sr-only">{t.stepOf.replace("{n}", String(i + 1)).replace("{total}", String(STEPS))}: </span>
                      {label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>

        <section className="mt-8 scroll-mt-28">
          <p className="text-sm text-cocoa-soft">{t.stepOf.replace("{n}", String(step + 1)).replace("{total}", String(STEPS))}</p>

          {/* STEP 1: service */}
          {step === 0 ? (
            <StepShell title={t.serviceTitle} headingRef={headingRef}>
              <div className="grid gap-3 sm:grid-cols-2">
                {services.map((s) => (
                  <RadioCard
                    key={s.slug}
                    name="service"
                    value={s.slug}
                    checked={serviceSlug === s.slug}
                    onChange={(v) => {
                      setServiceSlug(v);
                      if (therapist && !therapist.services.includes(v)) setTherapistSlug(null);
                      setSlot(null);
                    }}
                  >
                    <span className="block font-display text-h4 leading-snug">{s.name}</span>
                    <span className="mt-1 block text-sm font-medium text-moss">{s.audience}</span>
                    <span className="mt-2 block text-sm text-cocoa-soft">{s.summary}</span>
                    <span className="mt-3 block text-sm">
                      {s.minutes} · <Ph>{s.price}</Ph>
                    </span>
                  </RadioCard>
                ))}
              </div>
            </StepShell>
          ) : null}

          {/* STEP 2: therapist */}
          {step === 1 ? (
            <StepShell title={t.therapistTitle} headingRef={headingRef}>
              <RadioCard
                name="therapist"
                value="match"
                checked={matchMe}
                onChange={() => {
                  setMatchMe(true);
                  setTherapistSlug(null);
                  setSlot(null);
                }}
                className="bg-sand/60"
              >
                <span className="block font-display text-h4">{t.matchTitle}</span>
                <span className="mt-1 block text-sm text-cocoa-soft">{t.matchBody}</span>
              </RadioCard>
              {matchMe ? (
                <div className="mt-4 rounded-soft bg-cream-soft p-4">
                  <Segmented
                    legend={t.matchLanguage}
                    name="matchLanguage"
                    value={matchLanguage}
                    onChange={(v) => {
                      setMatchLanguage(v);
                      setSlot(null);
                    }}
                    options={[
                      { value: "ml", label: common.ml },
                      { value: "en", label: common.en },
                      { value: "either", label: t.either },
                    ]}
                  />
                </div>
              ) : null}

              <h3 className="mt-8 text-sm font-semibold text-moss">{t.orChoose}</h3>
              {eligible.length ? (
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {eligible.map((th) => (
                    <RadioCard
                      key={th.slug}
                      name="therapist"
                      value={th.slug}
                      checked={!matchMe && therapistSlug === th.slug}
                      onChange={(v) => {
                        setMatchMe(false);
                        setTherapistSlug(v);
                        setSlot(null);
                      }}
                    >
                      <span className="flex items-center gap-3">
                        <TherapistAvatar tone={th.tone} photo={th.photo} round sizes="48px" className="size-12 shrink-0" />
                        <span className="min-w-0">
                          <span className="block font-medium">
                            <Ph>{th.name}</Ph>
                          </span>
                          <span className="block text-xs text-cocoa-soft">
                            <Ph>{th.role}</Ph>
                          </span>
                          <span className="mt-1 block text-xs">{th.languagesLabel}</span>
                        </span>
                      </span>
                    </RadioCard>
                  ))}
                </div>
              ) : (
                <p className="mt-3 rounded-soft bg-sand/60 p-4 text-sm">{t.noTherapists}</p>
              )}
            </StepShell>
          ) : null}

          {/* STEP 3: date and time */}
          {step === 2 ? (
            <StepShell title={t.timeTitle} headingRef={headingRef}>
              <p className="text-sm text-cocoa-soft">{t.timezone.replace("{tz}", timeZone.replace(/_/g, " "))}</p>
              <p className="mt-1 text-xs">
                <Ph>{t.mockNote}</Ph>
              </p>
              {timeError ? (
                <p role="alert" className="mt-4 rounded-soft bg-clay/15 p-3 text-sm font-medium text-clay-deeper">
                  {timeError}
                </p>
              ) : null}

              {loadingSlots || !days ? (
                <p className="mt-8 animate-pulse text-cocoa-soft" aria-live="polite">
                  {t.loadingSlots}
                </p>
              ) : slotsByDate.size === 0 ? (
                <p className="mt-8 rounded-soft bg-sand/60 p-5">{t.noSlots}</p>
              ) : (
                <>
                  <fieldset className="mt-6">
                    <legend className="sr-only">{t.dateGroup}</legend>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setWeek((w) => Math.max(0, w - 1))}
                        disabled={week === 0}
                        className="flex size-11 shrink-0 items-center justify-center rounded-full ring-1 ring-inset ring-cocoa/20 hover:bg-sand disabled:opacity-30"
                      >
                        <span className="sr-only">{t.prevDays}</span>
                        <ArrowIcon className="rotate-180" />
                      </button>
                      <div className="grid flex-1 grid-cols-7 gap-1.5">
                        {allDates.slice(week * 7, week * 7 + 7).map((d) => {
                          const has = slotsByDate.has(d);
                          const active = date === d;
                          return (
                            <label
                              key={d}
                              className={cn(
                                "flex min-h-16 flex-col items-center justify-center rounded-2xl text-center ring-1 ring-inset transition-colors",
                                "has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ochre",
                                active ? "bg-forest text-cream ring-forest" : has ? "cursor-pointer bg-cream-soft ring-cocoa/20 hover:ring-cocoa/50" : "bg-transparent text-cocoa/35 ring-cocoa/10",
                              )}
                            >
                              <input type="radio" name="date" value={d} checked={active} disabled={!has} onChange={() => setDate(d)} className="sr-only" />
                              <span className="text-[0.6875rem] uppercase tracking-wide [:lang(ml)_&]:normal-case [:lang(ml)_&]:tracking-normal">
                                {fmtDay(d, { weekday: locale === "ml" ? "narrow" : "short" })}
                              </span>
                              <span className="text-lg font-semibold leading-tight">{fmtDay(d, { day: "numeric" })}</span>
                              <span className="sr-only">{fmtDay(d, { month: "long" })}</span>
                            </label>
                          );
                        })}
                      </div>
                      <button
                        type="button"
                        onClick={() => setWeek((w) => Math.min(2, w + 1))}
                        disabled={week >= 2}
                        className="flex size-11 shrink-0 items-center justify-center rounded-full ring-1 ring-inset ring-cocoa/20 hover:bg-sand disabled:opacity-30"
                      >
                        <span className="sr-only">{t.nextDays}</span>
                        <ArrowIcon />
                      </button>
                    </div>
                    <p className="mt-2 text-center text-sm text-cocoa-soft">
                      {fmtDay(allDates[week * 7] ?? allDates[0], { month: "long", year: "numeric" })}
                    </p>
                  </fieldset>

                  {date ? (
                    <fieldset className="mt-8">
                      <legend className="font-medium">{t.slotsFor.replace("{date}", fmtDay(date, { weekday: "long", day: "numeric", month: "long" }))}</legend>
                      {(["morning", "afternoon", "evening"] as const).map((period) => {
                        const list = (slotsByDate.get(date) ?? []).filter((s) => {
                          const h = localHour(s.start, timeZone);
                          return period === "morning" ? h < 12 : period === "afternoon" ? h >= 12 && h < 17 : h >= 17;
                        });
                        if (!list.length) return null;
                        return (
                          <div key={period} className="mt-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-moss [:lang(ml)_&]:normal-case [:lang(ml)_&]:tracking-normal">{t[period]}</p>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {list.map((s) => {
                                const active = slot?.start === s.start && slot.therapistSlug === s.therapistSlug;
                                return (
                                  <label
                                    key={s.start + s.therapistSlug}
                                    className={cn(
                                      "inline-flex min-h-11 cursor-pointer items-center rounded-full px-5 tabular-nums ring-1 ring-inset transition-colors",
                                      "has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ochre",
                                      active ? "bg-clay-deep text-cream ring-clay-deep" : "bg-cream-soft ring-cocoa/20 hover:ring-cocoa/50",
                                    )}
                                  >
                                    <input
                                      type="radio"
                                      name="slot"
                                      checked={active}
                                      onChange={() => {
                                        setSlot(s);
                                        setTimeError(null);
                                      }}
                                      className="sr-only"
                                    />
                                    {fmtTime(s.start)}
                                  </label>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </fieldset>
                  ) : null}
                </>
              )}

              {availableModes.length > 1 ? (
                <div className="mt-8">
                  <Segmented legend={t.mode} name="mode" value={effectiveMode} onChange={setMode} options={availableModes.map((m) => ({ value: m, label: modeLabels[m] }))} />
                </div>
              ) : null}
            </StepShell>
          ) : null}

          {/* STEP 4: details and consent */}
          {step === 3 && service ? (
            <form onSubmit={onSubmit} noValidate>
              <StepShell title={t.detailsTitle} headingRef={headingRef} lead={t.detailsLead}>
                {Object.keys(errors).length || serverError ? (
                  <div ref={errorSummaryRef} tabIndex={-1} role="alert" className="mb-6 rounded-soft bg-clay/15 p-4 text-sm font-medium text-clay-deeper outline-none">
                    {serverError ?? t.errorSummary}
                  </div>
                ) : null}

                <div className="grid gap-6">
                  <Segmented
                    legend={t.forWhom}
                    name="forWhom"
                    value={forWhom}
                    onChange={setForWhom}
                    options={[
                      { value: "self", label: t.forMe },
                      { value: "other", label: t.forSomeone },
                    ]}
                  />
                  {forWhom === "other" ? (
                    <Checkbox
                      checked={consents.otherPersonAgrees}
                      onChange={(v) => {
                        setConsents((c) => ({ ...c, otherPersonAgrees: v }));
                        clear("consents.otherPersonAgrees");
                      }}
                      error={errorText(errors["consents.otherPersonAgrees"])}
                    >
                      {t.someoneAgree}
                    </Checkbox>
                  ) : null}

                  <Field
                    label={forWhom === "other" ? t.nameOther : t.name}
                    hint={t.nameHint}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      clear("name");
                    }}
                    autoComplete={forWhom === "self" ? "given-name" : "off"}
                    error={errorText(errors.name)}
                    required
                  />
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field
                      label={t.email}
                      type="email"
                      inputMode="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        clear("email");
                      }}
                      autoComplete="email"
                      error={errorText(errors.email)}
                    />
                    <Field
                      label={t.phone}
                      hint={t.phoneHint}
                      type="tel"
                      inputMode="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        clear("phone", "email");
                      }}
                      autoComplete="tel"
                      error={errorText(errors.phone)}
                    />
                  </div>
                  <p className="-mt-3 text-sm text-cocoa-soft">{t.contactHint}</p>
                  <Checkbox checked={whatsappOk} onChange={setWhatsappOk}>
                    {t.whatsappOk}
                  </Checkbox>
                  <Segmented
                    legend={t.sessionLanguage}
                    name="sessionLanguage"
                    value={sessionLanguage}
                    onChange={setSessionLanguage}
                    options={[
                      { value: "ml", label: common.ml },
                      { value: "en", label: common.en },
                      { value: "both", label: t.both },
                    ]}
                  />

                  {service.teen ? (
                    <fieldset className="rounded-pebble bg-sand/70 p-5 sm:p-6">
                      <legend className="sr-only">{t.guardianTitle}</legend>
                      <h3 className="text-h4" aria-hidden>
                        {t.guardianTitle}
                      </h3>
                      <p className="mt-1 text-sm text-cocoa-soft">{t.guardianLead}</p>
                      <div className="mt-5 grid gap-5 sm:grid-cols-2">
                        <SelectField
                          label={t.teenAge}
                          value={guardian.teenAge}
                          onChange={(v) => {
                            setGuardian((g) => ({ ...g, teenAge: v }));
                            clear("guardian.teenAge");
                          }}
                          placeholder="—"
                          options={[13, 14, 15, 16, 17].map((n) => ({ value: String(n), label: String(n) }))}
                          error={errorText(errors["guardian.teenAge"])}
                        />
                        <SelectField
                          label={t.guardianRelation}
                          value={guardian.relationship}
                          onChange={(v) => {
                            setGuardian((g) => ({ ...g, relationship: v }));
                            clear("guardian.relationship");
                          }}
                          placeholder="—"
                          options={[
                            { value: "mother", label: t.mother },
                            { value: "father", label: t.father },
                            { value: "guardian", label: t.legalGuardian },
                          ]}
                          error={errorText(errors["guardian.relationship"])}
                        />
                        <Field
                          label={t.guardianName}
                          value={guardian.name}
                          onChange={(e) => {
                            setGuardian((g) => ({ ...g, name: e.target.value }));
                            clear("guardian.name");
                          }}
                          error={errorText(errors["guardian.name"])}
                          required
                        />
                        <Field
                          label={t.guardianContact}
                          value={guardian.contact}
                          onChange={(e) => {
                            setGuardian((g) => ({ ...g, contact: e.target.value }));
                            clear("guardian.contact");
                          }}
                          error={errorText(errors["guardian.contact"])}
                          required
                        />
                      </div>
                      <p className="mt-4 text-sm">
                        {t.under13}{" "}
                        <Link href={links.contact} className="text-link">
                          {policyLabels.contact}
                        </Link>
                      </p>
                    </fieldset>
                  ) : null}

                  <aside className="rounded-pebble bg-cream-soft p-5 ring-1 ring-cocoa/10 sm:p-6" aria-labelledby="privacy-title">
                    <h3 id="privacy-title" className="font-sans text-base font-semibold">
                      {t.privacyTitle}
                    </h3>
                    <ul className="mt-3 space-y-2 text-sm text-cocoa-soft">
                      {[t.privacy1, t.privacy2, t.privacy3, t.privacy4].map((line) => (
                        <li key={line} className="flex gap-2.5">
                          <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden className="mt-1 shrink-0 text-moss">
                            <path d="M6 1c3 2 4 5 3 7.5C8.3 10 7 11 6 11s-2.3-1-3-2.5C2 6 3 3 6 1Z" fill="currentColor" />
                          </svg>
                          {line}
                        </li>
                      ))}
                    </ul>
                  </aside>

                  <fieldset className="grid gap-4">
                    <legend className="mb-1 text-h4 font-display">{t.consentTitle}</legend>
                    <Checkbox
                      checked={consents.adultOrGuardian}
                      onChange={(v) => {
                        setConsents((c) => ({ ...c, adultOrGuardian: v }));
                        clear("consents.adultOrGuardian");
                      }}
                      error={errorText(errors["consents.adultOrGuardian"])}
                    >
                      {service.teen ? (
                        <>
                          {t.guardianConsent}{" "}
                          <Link href={links.minors} className="text-link" target="_blank">
                            {policyLabels.minors}
                          </Link>
                        </>
                      ) : (
                        t.consentAge
                      )}
                    </Checkbox>
                    <Checkbox checked={consents.terms} onChange={(v) => {
                        setConsents((c) => ({ ...c, terms: v }));
                        clear("consents.terms");
                      }} error={errorText(errors["consents.terms"])}>
                      {t.consentTerms}
                      <span className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                        <Link href={links.terms} className="text-link" target="_blank">
                          {policyLabels.terms}
                        </Link>
                        <Link href={links.agreement} className="text-link" target="_blank">
                          {policyLabels.agreement}
                        </Link>
                        <Link href={links.privacy} className="text-link" target="_blank">
                          {policyLabels.privacy}
                        </Link>
                      </span>
                    </Checkbox>
                    <Checkbox checked={consents.dataUse} onChange={(v) => {
                        setConsents((c) => ({ ...c, dataUse: v }));
                        clear("consents.dataUse");
                      }} error={errorText(errors["consents.dataUse"])}>
                      {t.consentData}
                    </Checkbox>
                    <Checkbox checked={consents.notCrisis} onChange={(v) => {
                        setConsents((c) => ({ ...c, notCrisis: v }));
                        clear("consents.notCrisis");
                      }} error={errorText(errors["consents.notCrisis"])}>
                      {t.consentCrisis}
                    </Checkbox>
                  </fieldset>

                  {/* Honeypot for bots: hidden from people and assistive tech */}
                  <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
                    <label>
                      {t.honeypot}
                      <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} name="website" />
                    </label>
                  </div>

                  <div className="rounded-soft bg-sand/60 p-4 text-sm">
                    <p className="font-semibold">{t.payTitle}</p>
                    <p className="mt-1 text-cocoa-soft">
                      <Ph>{t.payNote}</Ph>
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <Button variant="ghost" onClick={() => goTo(2)}>
                    {t.back}
                  </Button>
                  <Button type="submit" size="lg" icon={submitting ? null : <ArrowIcon />} disabled={submitting} aria-busy={submitting}>
                    {submitting ? t.submitting : t.submit}
                  </Button>
                </div>
              </StepShell>
            </form>
          ) : null}

          {step < 3 ? (
            <div className="mt-10 flex flex-col-reverse gap-3 border-t border-cocoa/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
              {step > 0 ? (
                <Button variant="ghost" onClick={() => goTo(step - 1)}>
                  {t.back}
                </Button>
              ) : (
                <span />
              )}
              <Button size="lg" onClick={() => canContinue && goTo(step + 1)} disabled={!canContinue} icon={<ArrowIcon />}>
                {t.next}
              </Button>
            </div>
          ) : null}
        </section>
      </div>

      {/* Summary */}
      <aside className="lg:sticky lg:top-28 lg:self-start" aria-labelledby="summary-title">
        <div className="rounded-pebble bg-sand p-5 sm:p-6">
          <h2 id="summary-title" className="text-h4">
            {t.summaryTitle}
          </h2>
          <dl className="mt-4 space-y-3 text-sm">
            <SummaryRow label={t.summaryService} value={service?.name} onChange={step > 0 ? () => goTo(0) : undefined} changeLabel={t.change} />
            <SummaryRow
              label={t.summaryTherapist}
              value={matchMe ? t.matched : therapist ? <Ph>{therapist.name}</Ph> : undefined}
              onChange={step > 1 ? () => goTo(1) : undefined}
              changeLabel={t.change}
            />
            <SummaryRow label={t.summaryWhen} value={whenLabel || undefined} onChange={step > 2 ? () => goTo(2) : undefined} changeLabel={t.change} />
            {slot ? <SummaryRow label={t.summaryFormat} value={modeLabels[effectiveMode]} /> : null}
            {service ? (
              <SummaryRow
                label={t.summaryFee}
                value={
                  <>
                    {service.minutes} · <Ph>{service.price}</Ph>
                  </>
                }
              />
            ) : null}
          </dl>
        </div>
      </aside>
    </div>
  );
}

function StepShell({
  title,
  lead,
  headingRef,
  children,
}: {
  title: string;
  lead?: string;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  children: ReactNode;
}) {
  return (
    <div className="booking-step-panel">
      <h2 ref={headingRef} tabIndex={-1} className="booking-step-heading mt-2 text-h2 outline-none">
        {title}
      </h2>
      {lead ? <p className="mt-2 text-cocoa-soft">{lead}</p> : null}
      <div className="mt-6">{children}</div>
    </div>
  );
}

function SummaryRow({ label, value, onChange, changeLabel }: { label: string; value?: ReactNode; onChange?: () => void; changeLabel?: string }) {
  // <dl> children must be dt/dd pairs, so the Change button lives inside the <dd>.
  return (
    <div className="border-b border-cocoa/10 pb-3 last:border-0 last:pb-0">
      <dt className="text-cocoa-soft">{label}</dt>
      <dd className="mt-0.5 flex items-start justify-between gap-3 font-medium">
        <span className="min-w-0">{value ?? "—"}</span>
        {onChange && value ? (
          <button type="button" onClick={onChange} className="-mt-2 min-h-10 shrink-0 text-sm font-normal underline underline-offset-4 hover:text-clay-deep">
            {changeLabel}
          </button>
        ) : null}
      </dd>
    </div>
  );
}
