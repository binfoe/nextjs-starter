import { z } from 'zod';
import { procedure } from '@server/service/trpc';
import { prisma } from '@server/service/db';

export const list = procedure
  .input(
    z
      .object({
        page: z.number().min(0).default(0),
        size: z.number().min(1).max(100).default(10),
      })
      .default({
        page: 0,
        size: 10,
      }),
  )
  .query(async ({ input: { page, size } }) => {
    await new Promise((res) => setTimeout(res, 1000));
    const total = await prisma.post.count();
    const list = await prisma.post.findMany({
      skip: page * size,
      take: size,
    });
    return {
      total,
      list,
    };
  });
