"use client";

import { FaGithub } from "react-icons/fa";
import { signIn } from "@/lib/auth-client";

export default function GitHubSignInButton() {
    return (
        <button
            onClick={() => signIn.social({ provider: "github" })}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:border-[#616F47] text-[#616F47] font-medium py-2 px-4 rounded-lg shadow-sm transition-all cursor-pointer"
        >
            <FaGithub className="w-5 h-5" />

            Logga in med Github

        </button>
    );
}
