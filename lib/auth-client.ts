import { createAuthClient } from "better-auth/react";

type SignInOptions = {
  identifier: string;
  password: string;
  redirect?: boolean;
};

type SocialSignInOptions = {
  provider: string;
  redirect?: boolean;
};

type AuthClient = {
  signIn: {
    (provider: string, options?: any): Promise<any>;
    credentials: (options: SignInOptions) => Promise<{ error?: string }>;
    social: (options: SocialSignInOptions) => Promise<{ error?: string }>;
  };
  signOut: () => Promise<void>;
  useSession: () => any;
};

export const { signIn, signOut, useSession } = (createAuthClient() as unknown) as AuthClient;