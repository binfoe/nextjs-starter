'use server';
import { safeAction } from '../util';
import { listPostScheme } from './schema';
import { prisma } from '@server/service/db';

export const listProject = safeAction(listPostScheme, async ({ size, page }) => {
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

export const countProject = safeAction(async () => {
  return await prisma.post.count();
});
