import NextAuth, { NextAuthConfig } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';

import Google from 'next-auth/providers/google';
import { prisma } from './db';
import { getEnv } from '@/common/env';

export const config = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: getEnv('GOOGLE_CLIENT_ID'),
      clientSecret: getEnv('GOOGLE_CLIENT_SECRET'),
    }),
  ],
  
  callbacks: {
    // authorized({ request, auth }) {
    //   const { pathname } = request.nextUrl;
    //   if (pathname === '/middleware-example') return !!auth;
    //   return true;
    // },
  },
} as NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
