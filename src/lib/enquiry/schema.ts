import { z } from "zod";

/** Business and general contact enquiries. No health details are requested. */
export const enquirySchema = z
  .object({
    kind: z.enum(["business", "contact"]),
    locale: z.enum(["ml", "en"]),
    name: z.string().trim().min(1, "required").max(80),
    email: z.union([z.literal(""), z.email("email").max(120)]),
    phone: z.union([z.literal(""), z.string().trim().regex(/^\+?[0-9][0-9\s-]{6,18}$/, "phone")]),
    organisation: z.string().trim().max(120).optional(),
    role: z.string().trim().max(80).optional(),
    orgType: z.enum(["", "company", "college", "school", "other"]).optional(),
    size: z.string().trim().max(20).optional(),
    topic: z.enum(["", "general", "booking", "therapist", "media"]).optional(),
    message: z.string().trim().min(1, "required").max(2000),
    consent: z.boolean().refine(Boolean, "consent"),
    website: z.string().max(200).optional(),
  })
  .superRefine((v, ctx) => {
    if (!v.email && !v.phone) ctx.addIssue({ code: "custom", path: ["email"], message: "contact" });
    if (v.kind === "business" && !v.organisation) ctx.addIssue({ code: "custom", path: ["organisation"], message: "required" });
  });

export type EnquiryInput = z.input<typeof enquirySchema>;
export type EnquiryData = z.output<typeof enquirySchema>;
