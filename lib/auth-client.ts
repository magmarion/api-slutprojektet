// lib/auth-client.ts
import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { auth } from "./auth";

export const { signIn, signOut, useSession } = createAuthClient({
    plugins: [inferAdditionalFields<typeof auth>()],
});

export function useAuthenticatedSession() {
    const session = useSession();
    return session;
}