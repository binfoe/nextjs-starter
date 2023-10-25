import { initTRPC } from '@trpc/server';
import superjson from 'superjson';

const { router, procedure, mergeRouters } = initTRPC.create({
  transformer: superjson,
});

export { router, procedure, mergeRouters };
