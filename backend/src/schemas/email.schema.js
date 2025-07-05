import { z } from 'zod';

export const emailSchema = z.object({
  to: z.string().email('Invalid email address'),
  cc: z.preprocess(
    val => val === '' ? undefined : val,
    z.string().email('Invalid email address').optional()
  ),
  bcc: z.preprocess(
    val => val === '' ? undefined : val,
    z.string().email('Invalid email address').optional()
  ),
  subject: z.string().min(1, 'Subject is required'),
  body: z.string().min(1, 'Body is required')
});

export const searchQuerySchema = z.object({
  query: z.string().min(1, 'Search query is required')
});

export const idParamSchema = z.object({
  id: z.number().int().positive('Invalid ID')
}); 