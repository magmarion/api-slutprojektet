// lib/auth.ts
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { db } from '@/prisma/client';
import { headers } from "next/headers";

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

export async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user) {
    // Fetch the full user data including isAdmin
    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: { id: true, name: true, email: true, isAdmin: true },
    });

    if (user) {
      return { ...session, user };
    }
  }

  return null;
}