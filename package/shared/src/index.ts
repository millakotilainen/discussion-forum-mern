import { z } from 'zod';

// --- DTOs / Validation Schemas (start small) ---

export const RegisterRequestSchema = z.object({
  username: z.string().min(3).max(30),
  email: z.string().pipe(z.email()),
  password: z.string().min(8).max(200),
});

export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;

export const LoginRequestSchema = z.object({
  email: z.string().pipe(z.email()),
  password: z.string().min(1),
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>;
