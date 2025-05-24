
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function requireSession() {
  const session = await getSession();
  if (!session) redirect("/signin");
  return session;
}
