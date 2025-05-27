"use client";

import { motion } from "framer-motion";
import EmailSignInButton from "./providers/email-button";
import GitHubSignInButton from "./providers/github-button";
import GoogleSignInButton from "./providers/google-button";
import { GrUserAdmin } from "react-icons/gr";
import { FaLeaf } from "react-icons/fa";
import Link from "next/link";

export default function SignInPage() {
    return (
        <main className="min-h-screen overflow-hidden bg-[#FEFAE1] flex flex-col items-center justify-center px-4 relative">
            {/* Background Illustration */}
            <div className="absolute top-0 w-full h-64 bg-gradient-to-b from-[#3D5300] to-[#616F47] text-white flex items-center justify-center">
                <div className="text-center px-4">
                    <FaLeaf className="text-4xl mx-auto mb-2 text-lime-100" />
                    <h1 className="text-3xl md:text-4xl font-bold text-[#FEFAE1]">Välkommen till Bloom</h1>
                    <p className="text-sm md:text-base text-lime-200 mt-2">
                        Handla med omtanke – naturligt, hållbart och vackert
                    </p>
                </div>
            </div>

            {/* Sign in Card */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 mt-48 bg-gradient-to-b from-[#F4D794] to-[#FEFAE1] rounded-2xl shadow-xl p-8 max-w-md w-full text-center"
            >
                <h2 className="text-2xl font-bold text-[#3D5300] mb-4">
                    Logga in på Bloom
                </h2>
                <p className="text-gray-600 mb-6">Välj ett sätt att logga in:</p>

                <div className="space-y-4">
                    <GitHubSignInButton />
                    <GoogleSignInButton />
                    <Link href="/signin/admin" className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:border-[#616F47] text-[#616F47] font-medium py-2 px-4 rounded-lg shadow-sm transition-all">
                        <GrUserAdmin className="w-5 h-5" />
                        Logga in som admin
                    </Link>
                </div>
            </motion.div>
        </main>
    );
}