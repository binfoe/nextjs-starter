import { z } from 'zod';

export const listPostScheme = z
  .object({
    page: z.number().min(0).default(0),
    size: z.number().min(1).max(100).default(10),
  })
  .optional()
  .default({
    page: 0,
    size: 10,
  });
