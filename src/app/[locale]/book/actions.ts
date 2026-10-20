"use server";

import { services } from "@/data/services";
import { getBookingProvider } from "@/lib/booking";
import { bookingSchema, issuesToErrors, type BookingInput } from "@/lib/booking/schema";
import type { AvailabilityDay, BookingRequest } from "@/lib/booking/types";
import { notifyBooking } from "@/lib/notify";

const MAX_DAYS = 21;

export async function fetchAvailability(input: {
  serviceSlug: string;
  therapistSlug: string | null;
  language: "ml" | "en" | "either";
}): Promise<AvailabilityDay[]> {
  if (!services.some((s) => s.slug === input.serviceSlug)) return [];
  const language = ["ml", "en", "either"].includes(input.language) ? input.language : "either";
  return getBookingProvider().getAvailability({
    serviceSlug: input.serviceSlug,
    therapistSlug: input.therapistSlug,
    language,
    fromDate: new Date().toISOString().slice(0, 10),
    days: MAX_DAYS,
  });
}

export type SubmitResult =
  | { ok: true; reference: string; demo: boolean }
  | { ok: false; error: "invalid"; fields: Record<string, string> }
  | { ok: false; error: "slot_unavailable" | "server" };

export async function submitBooking(input: BookingInput): Promise<SubmitResult> {
  const parsed = bookingSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "invalid", fields: issuesToErrors(parsed.error) };

  // A filled-in honeypot means a bot: pretend success, do nothing.
  if (parsed.data.website) return { ok: true, reference: "XXXXXX", demo: true };
  const data = { ...parsed.data };
  delete data.website;
  const service = services.find((s) => s.slug === data.serviceSlug);
  if (!service) return { ok: false, error: "invalid", fields: {} };
  // Teen sessions must carry guardian details; other sessions must not.
  if (Boolean(service.requiresGuardianConsent) !== Boolean(data.guardian)) return { ok: false, error: "invalid", fields: { guardian: "required" } };

  try {
    const result = await getBookingProvider().createBooking(data as BookingRequest);
    if (!result.ok) return { ok: false, error: result.error === "slot_unavailable" ? "slot_unavailable" : "server" };
    const notified = await notifyBooking(result.reference, data as BookingRequest);
    // "demo" when no one was actually told about the request.
    return { ok: true, reference: result.reference, demo: !notified.sent };
  } catch (err) {
    console.error(`[booking] failed: ${(err as Error).message}`);
    return { ok: false, error: "server" };
  }
}
