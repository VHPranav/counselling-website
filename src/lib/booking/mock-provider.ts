import { therapists } from "@/data/therapists";
import type { AvailabilityDay, AvailabilityQuery, BookingProvider, BookingRequest, BookingResult, Slot } from "./types";

/**
 * Demo provider: generates believable, repeatable availability from the
 * therapist data and "accepts" bookings without storing them anywhere.
 * Working hours are in IST (UTC+5:30); the browser shows them in local time.
 */

const IST_OFFSET_MIN = 330;
const HOURS_IST = [9, 10, 11, 12, 14, 15, 16, 17, 18, 19, 20];
const SESSION_MIN = 60;

/** Tiny deterministic hash so the same therapist/day always gets the same slots. */
function hash(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) h = Math.imul(h ^ input.charCodeAt(i), 16777619);
  return h >>> 0;
}

function addDays(isoDate: string, n: number): string {
  const d = new Date(`${isoDate}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

/** UTC instant for a wall-clock hour in IST on a given date. */
function istToUtc(isoDate: string, hour: number): Date {
  const d = new Date(`${isoDate}T00:00:00Z`);
  d.setUTCMinutes(hour * 60 - IST_OFFSET_MIN);
  return d;
}

const firstOpenDay = { "this-week": 1, "next-week": 6, later: 15 } as const;

function eligibleTherapists(q: AvailabilityQuery) {
  return therapists.filter(
    (t) =>
      t.services.includes(q.serviceSlug) &&
      (q.therapistSlug ? t.slug === q.therapistSlug : q.language === "either" || t.languages.includes(q.language)),
  );
}

function slotsFor(therapistSlug: string, availability: keyof typeof firstOpenDay, date: string, dayIndex: number, now: Date): Slot[] {
  if (dayIndex < firstOpenDay[availability]) return [];
  const weekday = new Date(`${date}T12:00:00Z`).getUTCDay();
  if (weekday === 0 && hash(therapistSlug) % 2 === 0) return []; // some therapists rest on Sundays
  return HOURS_IST.filter((h) => hash(`${therapistSlug}:${date}:${h}`) % 3 === 0)
    .map((h) => {
      const start = istToUtc(date, h);
      const end = new Date(start.getTime() + SESSION_MIN * 60_000);
      return { start: start.toISOString(), end: end.toISOString(), therapistSlug };
    })
    .filter((s) => new Date(s.start).getTime() > now.getTime() + 12 * 3600_000); // 12h notice
}

const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"; // no 0/O/1/I/L

export function makeReference(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  return Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join("");
}

export const mockProvider: BookingProvider = {
  async getAvailability(q) {
    const now = new Date();
    const today = now.toISOString().slice(0, 10);
    const pool = eligibleTherapists(q);
    const days: AvailabilityDay[] = [];
    for (let i = 0; i < q.days; i++) {
      const date = addDays(q.fromDate, i);
      const dayIndex = Math.round((Date.parse(date) - Date.parse(today)) / 86_400_000);
      const all = pool.flatMap((t) => slotsFor(t.slug, t.availability, date, dayIndex, now));
      // When matching, show one slot per start time (first available therapist).
      const byStart = new Map<string, Slot>();
      for (const s of all) if (!byStart.has(s.start)) byStart.set(s.start, s);
      days.push({ date, slots: [...byStart.values()].sort((a, b) => a.start.localeCompare(b.start)) });
    }
    return days;
  },

  async createBooking(req: BookingRequest): Promise<BookingResult> {
    // Re-check the slot is genuinely offered (guards against tampered requests).
    const date = req.slot.start.slice(0, 10);
    const days = await this.getAvailability({
      serviceSlug: req.serviceSlug,
      therapistSlug: req.slot.therapistSlug,
      language: req.matchLanguage,
      fromDate: date,
      days: 2,
    });
    const offered = days.some((d) => d.slots.some((s) => s.start === req.slot.start && s.therapistSlug === req.slot.therapistSlug));
    if (!offered) return { ok: false, error: "slot_unavailable" };
    return { ok: true, reference: makeReference(), status: "requested" };
  },
};
