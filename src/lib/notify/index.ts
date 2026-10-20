import "server-only";
import { siteConfig } from "@/config/site";
import { serviceBySlug } from "@/data/services";
import { therapists } from "@/data/therapists";
import type { BookingRequest } from "@/lib/booking/types";
import type { EnquiryData } from "@/lib/enquiry/schema";

/**
 * Booking notifications.
 * - With RESEND_API_KEY and BOOKING_NOTIFY_TO set, emails the team (and the
 *   client, if they gave an email) through Resend's HTTP API.
 * - Otherwise runs in demo mode and only logs the booking reference.
 * Never logs or emails health information; the form doesn't collect any.
 */

type NotifyResult = { sent: boolean };

const RESEND_URL = "https://api.resend.com/emails";

function istTime(iso: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "short",
  }).format(new Date(iso));
}

function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

function teamEmail(ref: string, b: BookingRequest) {
  const svc = serviceBySlug[b.serviceSlug]?.name.en ?? b.serviceSlug;
  const th = therapists.find((t) => t.slug === b.slot.therapistSlug)?.name.en ?? b.slot.therapistSlug;
  const rows: Array<[string, string]> = [
    ["Reference", ref],
    ["Service", svc],
    ["Therapist", `${th}${b.therapistSlug ? "" : " (matched, not chosen by client)"}`],
    ["When (IST)", istTime(b.slot.start)],
    ["Client time zone", b.timeZone],
    ["Format", b.mode],
    ["Session language", b.sessionLanguage],
    ["Booked for", b.forWhom === "self" ? "Themselves" : "Someone else (they agreed)"],
    ["Name", b.name],
    ["Email", b.email || "—"],
    ["Phone", b.phone || "—"],
    ["WhatsApp OK", b.whatsappOk ? "Yes" : "No"],
    ["Site language", b.locale],
  ];
  if (b.guardian) {
    rows.push(
      ["Teen age", String(b.guardian.teenAge)],
      ["Guardian", `${b.guardian.name} (${b.guardian.relationship})`],
      ["Guardian contact", b.guardian.contact],
    );
  }
  const html = `<h2>New booking request ${esc(ref)}</h2><table cellpadding="6">${rows
    .map(([k, v]) => `<tr><td><strong>${esc(k)}</strong></td><td>${esc(v)}</td></tr>`)
    .join("")}</table><p>Confirm the session with the client and send a payment link.</p>`;
  return { subject: `New booking request ${ref}`, html };
}

function clientEmail(ref: string, b: BookingRequest) {
  const ml = b.locale === "ml";
  const subject = ml ? `ബുക്കിങ് അപേക്ഷ ലഭിച്ചു (${ref})` : `We've received your booking request (${ref})`;
  const html = ml
    ? `<p>നമസ്കാരം ${esc(b.name)},</p><p>നിങ്ങളുടെ ബുക്കിങ് അപേക്ഷ ലഭിച്ചു. റഫറൻസ്: <strong>${esc(ref)}</strong>.</p><p>സെഷൻ ഉറപ്പിക്കാനും പേയ്മെന്റ് ലിങ്ക് അയക്കാനും ഞങ്ങൾ ഉടൻ ബന്ധപ്പെടും.</p><p>— ${esc(siteConfig.brandName)}</p>`
    : `<p>Hello ${esc(b.name)},</p><p>We've received your booking request. Your reference is <strong>${esc(ref)}</strong>.</p><p>We'll be in touch shortly to confirm your session and send a payment link.</p><p>— ${esc(siteConfig.brandName)}</p>`;
  return { subject, html };
}

async function send(to: string, subject: string, html: string, apiKey: string, from: string) {
  const res = await fetch(RESEND_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to, subject, html }),
  });
  if (!res.ok) throw new Error(`Email failed with status ${res.status}`);
}

export async function notifyBooking(reference: string, booking: BookingRequest): Promise<NotifyResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.BOOKING_NOTIFY_TO;
  const from = process.env.BOOKING_EMAIL_FROM ?? `Bookings <bookings@${siteConfig.domain}>`;

  if (!apiKey || !to) {
    // Demo mode. Reference only: no names, contacts or anything personal.
    console.info(`[booking] demo request ${reference} (${booking.serviceSlug}); email not configured`);
    return { sent: false };
  }

  try {
    const team = teamEmail(reference, booking);
    await send(to, team.subject, team.html, apiKey, from);
    if (booking.email) {
      const client = clientEmail(reference, booking);
      await send(booking.email, client.subject, client.html, apiKey, from);
    }
    console.info(`[booking] request ${reference} notified`);
    return { sent: true };
  } catch (err) {
    console.error(`[booking] notification failed for ${reference}: ${(err as Error).message}`);
    return { sent: false };
  }
}

export async function notifyEnquiry(e: EnquiryData): Promise<NotifyResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_NOTIFY_TO ?? process.env.BOOKING_NOTIFY_TO;
  const from = process.env.BOOKING_EMAIL_FROM ?? `Website <hello@${siteConfig.domain}>`;
  if (!apiKey || !to) {
    console.info(`[enquiry] demo ${e.kind} enquiry received; email not configured`);
    return { sent: false };
  }
  const rows: Array<[string, string | undefined]> = [
    ["Type", e.kind],
    ["Name", e.name],
    ["Email", e.email || "—"],
    ["Phone", e.phone || "—"],
    ["Organisation", e.organisation],
    ["Role", e.role],
    ["Organisation type", e.orgType],
    ["Size", e.size],
    ["Topic", e.topic],
    ["Site language", e.locale],
  ];
  const html = `<h2>New ${esc(e.kind)} enquiry</h2><table cellpadding="6">${rows
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td><strong>${esc(k)}</strong></td><td>${esc(v!)}</td></tr>`)
    .join("")}</table><p style="white-space:pre-wrap">${esc(e.message)}</p>`;
  try {
    await send(to, `New ${e.kind} enquiry from ${e.name}`, html, apiKey, from);
    console.info(`[enquiry] ${e.kind} enquiry notified`);
    return { sent: true };
  } catch (err) {
    console.error(`[enquiry] notification failed: ${(err as Error).message}`);
    return { sent: false };
  }
}
