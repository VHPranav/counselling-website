"use server";

import { issuesToErrors } from "@/lib/booking/schema";
import { enquirySchema, type EnquiryInput } from "@/lib/enquiry/schema";
import { notifyEnquiry } from "@/lib/notify";

export type EnquiryResult =
  | { ok: true; demo: boolean }
  | { ok: false; error: "invalid"; fields: Record<string, string> }
  | { ok: false; error: "server" };

export async function submitEnquiry(input: EnquiryInput): Promise<EnquiryResult> {
  const parsed = enquirySchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "invalid", fields: issuesToErrors(parsed.error) };
  if (parsed.data.website) return { ok: true, demo: true }; // honeypot: quietly ignore bots
  try {
    const result = await notifyEnquiry(parsed.data);
    return { ok: true, demo: !result.sent };
  } catch {
    return { ok: false, error: "server" };
  }
}
