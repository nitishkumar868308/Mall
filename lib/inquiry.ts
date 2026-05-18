import { z } from "zod";

export const inquirySchema = z.object({
  type: z.enum(["lease", "sponsor", "venue"]),
  segment: z.string().optional(),
  name: z.string().min(1, "Required"),
  company: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  message: z.string().min(10, "Please tell us a bit more (10+ characters)"),
  attendees: z
    .string()
    .optional()
    .refine(
      (v) => !v || (/^\d+$/.test(v) && Number(v) >= 0),
      "Enter a whole number",
    ),
  eventDate: z.string().optional(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

export interface InquiryPayload extends Omit<InquiryInput, "attendees"> {
  attendees?: number;
}

export async function submitInquiry(input: InquiryInput): Promise<void> {
  const payload: InquiryPayload = {
    ...input,
    attendees: input.attendees ? Number(input.attendees) : undefined,
  };
  await new Promise((r) => setTimeout(r, 600));
  if (typeof window !== "undefined") {
    console.info("[inquiry]", payload);
  }
}
