/**
 * Booking domain types. The UI only talks to a BookingProvider, so the mock
 * provider can be swapped for a real calendar + payments backend without
 * touching any components. See README → "Booking backend".
 */
import type { SessionMode } from "@/data/types";

export type Slot = {
  /** Start time, ISO 8601 in UTC. */
  start: string;
  /** End time, ISO 8601 in UTC. */
  end: string;
  /** Therapist offering this slot. */
  therapistSlug: string;
};

export type AvailabilityQuery = {
  serviceSlug: string;
  /** null = "match me": slots from any suitable therapist. */
  therapistSlug: string | null;
  /** Used when matching. */
  language: "ml" | "en" | "either";
  /** ISO date (YYYY-MM-DD) of the first day to return. */
  fromDate: string;
  days: number;
};

export type AvailabilityDay = { date: string; slots: Slot[] };

/**
 * What the booking form sends. Deliberately contains no health information:
 * no concern, mood or notes. Clients share that with their therapist in session.
 */
export type BookingRequest = {
  locale: "ml" | "en";
  serviceSlug: string;
  /** Requested therapist, or null when the client asked to be matched. */
  therapistSlug: string | null;
  matchLanguage: "ml" | "en" | "either";
  slot: Slot;
  mode: SessionMode;
  sessionLanguage: "ml" | "en" | "both";
  forWhom: "self" | "other";
  name: string;
  email: string;
  phone: string;
  whatsappOk: boolean;
  timeZone: string;
  guardian: null | {
    teenAge: number;
    name: string;
    relationship: "mother" | "father" | "guardian";
    contact: string;
  };
  consents: {
    adultOrGuardian: boolean;
    terms: boolean;
    dataUse: boolean;
    notCrisis: boolean;
    otherPersonAgrees: boolean;
  };
};

export type BookingResult =
  | { ok: true; reference: string; status: "requested" }
  | { ok: false; error: "slot_unavailable" | "invalid" | "server" };

export interface BookingProvider {
  getAvailability(query: AvailabilityQuery): Promise<AvailabilityDay[]>;
  createBooking(request: BookingRequest): Promise<BookingResult>;
}

/**
 * Payments are not live yet. A real implementation (e.g. Razorpay) would
 * create an order after the booking is confirmed and return a payment link.
 */
export interface PaymentProvider {
  createPaymentLink(input: { reference: string; amountInr: number; email?: string; phone?: string }): Promise<{ url: string }>;
}
