// This file is correctly set up to handle all authentication routes using better-auth/next-js.
// It delegates routing to Better Auth.

import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
 
export const { POST, GET } = toNextJsHandler(auth);