import type { z } from "zod";

import { ValidationError } from "./errors";

function validationDetails(error: z.ZodError) {
  return error.issues.map((issue) => ({
    path: issue.path.join("."),
    reason: issue.message,
  }));
}

export async function parseJson<TSchema extends z.ZodType>(request: Request, schema: TSchema) {
  let input: unknown;
  try {
    input = await request.json();
  } catch {
    throw new ValidationError("The request body must contain valid JSON.");
  }

  const result = schema.safeParse(input);
  if (!result.success) throw new ValidationError(undefined, validationDetails(result.error));
  return result.data;
}

export function parseSearchParams<TSchema extends z.ZodType>(url: URL, schema: TSchema) {
  const input = Object.fromEntries(url.searchParams);
  const result = schema.safeParse(input);
  if (!result.success) throw new ValidationError(undefined, validationDetails(result.error));
  return result.data;
}
