// lib/auth.ts
import { cookies } from 'next/headers';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { db } from '@/prisma/client';

export const auth = betterAuth({
  database: prismaAdapter(db, { provider: 'postgresql' }),
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
  trustedOrigins: ['http://localhost:5173'],
});

// Correct way to fetch session on the server
export async function getCurrentUser() {
  const cookieStore = cookies();
  const response = await auth.handler({ request: { cookies: cookieStore } });
  const session = await response.json();
  return session?.user ?? null;
}
