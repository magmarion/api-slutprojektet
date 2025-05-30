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
  user: {
    additionalFields: {
      isAdmin: {
        type: "boolean"
      } 
    }
  }
});

export async function getSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}