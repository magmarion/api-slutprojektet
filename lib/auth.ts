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
  trustedOrigins: ['http://localhost:5173'],
  login: async ({ identifier, password }: { identifier: string; password: string }) => {
    // Identifier är antingen e-postadressen
    const user = await db.user.findUnique({
      where: { email: identifier },
      select: {
        id: true,
        email: true,
        password: true, // Inkludera explicit 'password'
      },
    });

    if (!user) {
      throw new Error('Användaren hittades inte.');
    }

    // Jämför det angivna lösenordet med det hashade lösenordet i databasen
    const isMatch = await argon2.verify(user.password!, password);

    if (!isMatch) {
      throw new Error('Felaktigt lösenord.');
    }

    return user;
  },
});

// Correct way to fetch session on the server
export async function getSession() {
  return auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
}