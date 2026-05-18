import { z } from "zod";

export const inquirySchema = z.object({
  type: z.enum(["lease", "sponsor", "venue"]),
  segment: z.string().optional(),
  name: z.string().min(1, "Required"),
  company: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  message: z.string().min(10, "Please tell us a bit more (10+ characters)"),
  attendees: z.coerce.number().int().nonnegative().optional(),
  eventDate: z.string().optional(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

export async function submitInquiry(input: InquiryInput): Promise<void> {
  await new Promise((r) => setTimeout(r, 600));
  if (typeof window !== "undefined") {
    console.info("[inquiry]", input);
  }
}
