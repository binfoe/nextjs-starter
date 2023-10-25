import { httpBatchLink } from '@trpc/client';
import { appRouter } from '@server/router';

const url = `http://127.0.0.1:${process.env.PORT}/api/trpc`;

export const trpcServerClient = appRouter.createCaller({
  links: [
    httpBatchLink({
      url,
    }),
  ],
});
