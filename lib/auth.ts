import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { db } from '@/prisma/client';
import argon2 from 'argon2';
import { headers } from 'next/headers';

const authConfig = {
  database: prismaAdapter(db, { provider: 'postgresql' }),
  trustedOrigins: [process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'],

  // Social providers (enabled only if env vars exist)
  socialProviders: process.env.GITHUB_CLIENT_ID ? {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }
  } : undefined,

  login: async ({ identifier, password }: { identifier: string; password: string }) => {
    const user = await db.user.findUnique({
      where: { email: identifier },
      select: { id: true, email: true, password: true, isAdmin: true }
    });

    if (!user?.password) throw new Error("Invalid credentials");

    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid) throw new Error("Invalid credentials");

    return {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin || user.email === process.env.ADMIN_EMAIL
    };
  },

  onSocialLogin: async ({ email }: { email?: string }) => {
    if (!email) return null;
    return db.user.findUnique({ where: { email } });
  }
};

export const auth = betterAuth(authConfig);

// Simplified session getter
export const getSession = async () => auth.api.getSession({ headers: await headers() });