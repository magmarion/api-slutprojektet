"use client";

import { motion } from "framer-motion";
import EmailSignInButton from "./providers/email-button";
import GitHubSignInButton from "./providers/github-button";
import GoogleSignInButton from "./providers/google-button";
import { FaLeaf } from "react-icons/fa";

export default function SignInPage() {
    return (
        <main className="min-h-screen bg-[#f8e5be] relative overflow-hidden">
            {/* Bakgrundsbild */}
            <img
                src="/blad-bakgrund.png"
                alt="Bakgrundsblad"
                className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none z-0"
            />

            {/* Hero */}
            <div className="absolute top-0 w-full bg-gradient-to-b from-[#3D5300] to-[#616F47] text-white flex items-center justify-center py-10 md:py-16 z-10">
                <div className="text-center px-4">
                    <FaLeaf className="text-4xl mx-auto mb-2 text-lime-100" />
                    <h1 className="text-3xl md:text-4xl font-bold">Välkommen till Bloom</h1>
                    <p className="text-sm md:text-base text-lime-200 mt-2">
                        Handla med omtanke – naturligt, hållbart och vackert
                    </p>
                </div>
            </div>

            {/* Innehåll under hero */}
            <div className="relative z-10 flex flex-col md:flex-grow justify-center items-center px-4 pt-[280px] md:pt-[300px] pb-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-[#FEFAE1] backdrop-blur-sm rounded-lg shadow-2xl border border-[#e0d9c5] p-6 md:p-10 max-w-md w-full"
                >
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-semibold text-[#3D5300]">Välkommen tillbaka!</h2>
                        <p className="text-md text-gray-700 mt-1">Logga in för att fortsätta handla hållbart</p>
                    </div>

                    <div className="space-y-4 mb-6">
                        <GitHubSignInButton />
                        <GoogleSignInButton />
                        <EmailSignInButton />
                    </div>

                    <div className="flex items-start gap-2 text-left text-sm text-gray-700 mt-4">
                        <input
                            type="checkbox"
                            id="terms"
                            className="accent-[#3D5300] mt-1"
                        />
                        <label htmlFor="terms">
                            Jag godkänner <a href="#" className="underline text-[#3D5300]">villkoren</a> och <a href="#" className="underline text-[#3D5300]">integritetspolicyn</a>.
                        </label>
                    </div>

                    <p className="text-xs text-center text-gray-500 mt-6">
                        Har du inget konto? <a href="#" className="text-[#3D5300] underline">Skapa ett här</a>
                    </p>
                </motion.div>
            </div>
        </main>
    );
}
