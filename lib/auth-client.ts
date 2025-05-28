// lib/auth-client.ts
import { createAuthClient } from "better-auth/react";
interface AuthenticatedUser {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
    isAdmin: boolean;
}

type AuthenticatedSession = {
    user: AuthenticatedUser;
    expiresAt: string;
    accessToken: string | null;
};

export const { signIn, signOut, useSession } = createAuthClient();

export function useAuthenticatedSession(): AuthenticatedSession | null {
    const session = useSession() as unknown as AuthenticatedSession | null;

    if (!session || !session.user) return null;

    return {
        ...session,
        user: {
            ...session.user,
            isAdmin: session.user.isAdmin || false,
        },
    };
}