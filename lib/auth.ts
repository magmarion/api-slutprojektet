import { db } from "@/prisma/client";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { cookies } from "next/headers";

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
  // ✅ Add trustedOrigins
 trustedOrigins: ["http://localhost:3000", "http://localhost:3001", "http://localhost:5173"],

});

// ✅ Helper to get the current user
export async function getCurrentUser() {
    const session = await auth.handler({ cookies: cookies() });
    return session?.user ?? null;
}
