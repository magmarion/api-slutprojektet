// lib/auth.ts
import { cookies } from "next/headers";
import { db } from "@/prisma/client";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  trustedOrigins: ["http://localhost:3000", "http://localhost:5173"],
});

// ✅ This function fetches the current user session
export async function getCurrentUser() {
  const request = {
    cookies: cookies(),
  };

  const response = await auth.handler(request);
  // @ts-ignore – use `.json()` to parse the session
  const session = await response.json();
  return session?.user ?? null;
}
