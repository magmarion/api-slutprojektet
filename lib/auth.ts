// lib/auth.ts
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { db } from '@/prisma/client';
import argon2 from 'argon2';
import { headers } from 'next/headers';

export const auth = betterAuth({
  database: prismaAdapter(db, { provider: 'postgresql' }),
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
  trustedOrigins: [process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'],
  login: async ({ identifier, password }: { identifier: string; password: string }) => {
    // Identifier är antingen e-postadressen
    const user = await db.user.findUnique({
      where: { email: identifier },
      select: {
        id: true,
        email: true,
        password: true,
      },
    });

    console.log("User found:", user);


    if (!user || !user.password) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await argon2.verify(user.password, password);
    console.log("Password match:", isMatch);

    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    return {
      id: user.id,
      email: user.email,
      isAdmin: (await db.user.findUnique({ where: { id: user.id } }))?.isAdmin,
    };
  },
});

export async function getSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}