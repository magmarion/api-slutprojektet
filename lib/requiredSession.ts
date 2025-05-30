// lib/requiredSession.ts
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";

export async function requireAdminSession() {
  const session = await getSession();
  if (!session || !session.user.isAdmin) {
    redirect("/signin");
  }
  return session;
}