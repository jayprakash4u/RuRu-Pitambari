import { z } from "zod";

const clientSchema = z.object({
  NEXT_PUBLIC_SITE_NAME: z.string().min(1).default("Ruru Pitambari"),
});

// Public variables must be accessed explicitly so Next.js can inline them safely.
export const clientEnv = clientSchema.parse({
  NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
});
