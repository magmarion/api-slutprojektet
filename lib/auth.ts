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
  trustedOrigins: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:5173",
  ],
});

// ✅ FINAL FIXED FUNCTION
export async function getCurrentUser() {
  const cookieStore = cookies();

  const response = await auth.api["auth.session.get"]({
    cookies: cookieStore,
  });

  const session = await response.json();

  return session?.user ?? null;
}
