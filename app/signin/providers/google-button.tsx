"use client";

import { signIn } from "@/lib/auth-client";
import { FaGoogle } from "react-icons/fa";

export default function GoogleSignInButton() {
  return (
    <button
      onClick={() => signIn.social({ provider: "google" })}
      className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:border-[#616F47] text-[#616F47] font-medium py-2 px-4 rounded-lg shadow-sm transition-all"
    >
      <FaGoogle className="w-5 h-5" />
      Logga in med Google
    </button>
  );
}
