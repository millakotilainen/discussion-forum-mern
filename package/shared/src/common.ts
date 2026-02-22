import z from 'zod';

export const ValidationErrorResponseSchema = z.object({
  error: z.string(),
  fields: z.record(z.string(), z.string()),
});

export type ValidationErrorResponse = z.infer<typeof ValidationErrorResponseSchema>;