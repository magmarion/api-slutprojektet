// This file exports the client-side utilities (signIn, signUp, useSession) for interacting with Better Auth.
import { createAuthClient } from "better-auth/react"
export const { signIn, signOut, useSession } = createAuthClient();

