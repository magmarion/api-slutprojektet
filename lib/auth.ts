import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { db } from '@/prisma/client';
import argon2 from 'argon2';
import { createAdmin } from './create-admin';
import { headers } from 'next/headers';

interface LoginCredentials {
  identifier: string;
  password: string;
}

interface SocialProfile {
  email?: string;
  name?: string;
}

export const auth = betterAuth({
  database: prismaAdapter(db, { provider: 'postgresql' }),
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }
  },

  
  trustedOrigins: [process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'],
  login: async ({ identifier, password }: LoginCredentials) => {
    const user = await db.user.findUnique({
      where: { email: identifier },
      select: { id: true, email: true, password: true, isAdmin: true }
    });

    if (!user?.password) throw new Error("CredentialsSignin");

    const isValid = await argon2.verify(user.password, password);
    if (!isValid) throw new Error("CredentialsSignin");

    const isAdmin = user.isAdmin || user.email === process.env.ADMIN_EMAIL;
    return { id: user.id, email: user.email, isAdmin };
  },


  onSocialLogin: async (profile: SocialProfile) => {
    if (!profile.email) return null;

    let user = await db.user.findUnique({ where: { email: profile.email } });
  }
});

export async function getSession() {
  return auth.api.getSession({ headers: await headers() });
}