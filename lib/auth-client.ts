// lib/auth-client.ts
import { createAuthClient } from "better-auth/react";

export const { signIn, signOut, useSession } = createAuthClient();

export function useAuthenticatedSession() {
    const session = useSession();
    return session;
}