import { z } from "zod";

/**
 * Validation for a booking request. Used on the server (authoritative) and in
 * the browser (for instant feedback). Error codes map to translated messages.
 */
const phoneRe = /^\+?[0-9][0-9\s-]{6,18}$/;

export const bookingSchema = z
  .object({
    locale: z.enum(["ml", "en"]),
    serviceSlug: z.string().min(1).max(40),
    therapistSlug: z.string().min(1).max(60).nullable(),
    matchLanguage: z.enum(["ml", "en", "either"]),
    slot: z.object({ start: z.iso.datetime(), end: z.iso.datetime(), therapistSlug: z.string().min(1).max(60) }),
    mode: z.enum(["video", "audio"]),
    sessionLanguage: z.enum(["ml", "en", "both"]),
    forWhom: z.enum(["self", "other"]),
    name: z.string().trim().min(1, "required").max(80),
    email: z.union([z.literal(""), z.email("email").max(120)]),
    phone: z.union([z.literal(""), z.string().trim().regex(phoneRe, "phone")]),
    whatsappOk: z.boolean(),
    timeZone: z.string().max(64),
    guardian: z
      .object({
        teenAge: z.number().int().min(13).max(17),
        name: z.string().trim().min(1, "required").max(80),
        relationship: z.enum(["mother", "father", "guardian"]),
        contact: z.string().trim().min(5, "required").max(120),
      })
      .nullable(),
    consents: z.object({
      adultOrGuardian: z.boolean().refine(Boolean, "consent"),
      terms: z.boolean().refine(Boolean, "consent"),
      dataUse: z.boolean().refine(Boolean, "consent"),
      notCrisis: z.boolean().refine(Boolean, "consent"),
      otherPersonAgrees: z.boolean(),
    }),
    /** Honeypot: real people never fill this in. */
    website: z.string().max(200).optional(),
  })
  .superRefine((v, ctx) => {
    if (!v.email && !v.phone) ctx.addIssue({ code: "custom", path: ["email"], message: "contact" });
    if (v.forWhom === "other" && !v.consents.otherPersonAgrees)
      ctx.addIssue({ code: "custom", path: ["consents", "otherPersonAgrees"], message: "consent" });
  });

export type BookingInput = z.input<typeof bookingSchema>;

/** Flatten zod issues to { "field.path": "code" } for the form. */
export function issuesToErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".");
    if (!out[key]) out[key] = issue.message in errorCodes ? issue.message : "required";
  }
  return out;
}

const errorCodes = { required: 1, email: 1, phone: 1, contact: 1, consent: 1 } as const;
export type ErrorCode = keyof typeof errorCodes;
