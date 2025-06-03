"use client";

import { signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function RegisterPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await signUp.email({
                email,
                password,
                callbackURL: "/",
                name,
                isAdmin: false,
            });

            if (result.error) {
                throw new Error(result.error.message || "Registreringen misslyckades");
            }

            toast.success("Registreringen lyckades! Du kan nu logga in.");
            router.push("/signin/email-signin");
        } catch (err: any) {
            toast.error(err.message || "Ett okänt fel uppstod vid registrering");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#f8e5be] relative overflow-hidden flex items-center justify-center px-4">
            {/* Bakgrund */}
            <img
                src="/blad-bakgrund.png"
                alt="Bakgrund"
                className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none z-0"
            />

            {/* Registreringsformulär */}
            <form
                onSubmit={handleRegister}
                className="relative z-10 bg-[#FEFAE1] border border-[#e0d9c5] rounded-lg shadow-xl p-6 md:p-8 w-full max-w-md space-y-4"
            >
                <h1 className="text-2xl font-semibold text-center text-[#3D5300] mb-2">Skapa konto</h1>

                <input
                    placeholder="Namn"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3D5300]"
                />
                <input
                    type="email"
                    placeholder="E-postadress"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3D5300]"
                />
                <input
                    type="password"
                    placeholder="Lösenord (minst 6 tecken)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3D5300]"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#3D5300] hover:bg-[#2f4200] text-white font-medium py-2 rounded transition disabled:opacity-50"
                >
                    {loading ? "Skapar konto..." : "Skapa konto"}
                </button>
            </form>
        </main>
    );
}
