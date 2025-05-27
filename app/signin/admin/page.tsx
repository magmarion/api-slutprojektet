"use client";

import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminSignInPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const result = await signIn.credentials({
                identifier: email,
                password,
                redirect: false
            });

            if (result?.error) {
                setError("Felaktiga uppgifter");
            } else {
                router.push("/admin/dashboard");
            }
        } catch (err) {
            setError("Inloggning misslyckades");
            console.error("Login error:", err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FEFAE1]">
            <div className="bg-gradient-to-b from-[#F4D794] to-[#FEFAE1] p-8 rounded shadow-lg w-96">
                <h2 className="text-2xl font-bold text-[#3D5300] mb-4 text-center">
                    Admin Inloggning
                </h2>
                {error && (
                    <p className="text-red-500 mb-4">
                        {typeof error === 'string' ? error : JSON.stringify(error)}
                    </p>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            E-post
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-[#616F47] rounded focus:outline-none focus:border-indigo-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Lösenord
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-[#616F47] rounded focus:outline-none focus:border-indigo-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#3D5300] text-white px-4 py-2 rounded hover:bg-[#616F47] transition-colors"
                    >
                        Logga in
                    </button>
                </form>
            </div>
        </div>
    );
}