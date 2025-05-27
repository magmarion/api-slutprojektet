// lib/adminMiddleware.ts
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function adminMiddleware() {
    const session = await getSession();
    console.log('Session in middleware:', session);
    if (!session || !((session.user as { isAdmin?: boolean }).isAdmin)) {
        redirect("/signin");
    }
    return session;
}