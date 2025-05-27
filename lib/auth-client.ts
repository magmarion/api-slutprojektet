// lib/auth-client.ts
import { createAuthClient } from "better-auth/react";

export const { signIn, signOut, useSession } = createAuthClient();

// Definiera en anpassad typ för användare
interface AuthenticatedUser {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
    isAdmin: boolean; // Lägg till denna
}

// Använd typen i sessionen
type AuthenticatedSession = {
    user: AuthenticatedUser;
    expiresAt: string;
    accessToken: string | null;
};

export function useAuthenticatedSession() {
    const session = useSession() as unknown as AuthenticatedSession | null;

    if (!session) {
        return null;
    }

    return {
        ...session,
        user: {
            ...session.user,
            isAdmin: session.user.isAdmin || false, 
        },
    };
}
