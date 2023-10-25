'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink, loggerLink, splitLink, httpLink } from '@trpc/client';
import { useState } from 'react';
import superjson from 'superjson';
import { api } from './trpc';

export const TrpcProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { staleTime: 5000 } },
      }),
  );

  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        loggerLink({
          enabled: () => process.env.NODE_ENV !== 'production',
        }),
        splitLink({
          condition: (op) => op.context.skipBatch === true,
          true: httpLink({
            url: '/api/trpc',
          }),
          false: httpBatchLink({
            url: '/api/trpc',
          }),
        }),
        // httpBatchLink({
        //   url: '/api/trpc',
        //   fetch: async (input, init?) => {
        //     const fetch = getFetch();
        //     return fetch(input, {
        //       ...init,
        //       credentials: 'include',
        //     });
        //   },
        // }),
      ],
      transformer: superjson,
    }),
  );
  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </api.Provider>
  );
};
