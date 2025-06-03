"use client";
import { signIn } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function EmailSignInPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await signIn.email(
            { email, password, callbackURL: "/", rememberMe: true },
            {
                onError: (ctx) => {
                    toast.error(ctx.error.message || "Inloggningen misslyckades");
                },
            }
        );

        setLoading(false);
    };

    return (
        <main className="min-h-screen bg-[#f8e5be] relative overflow-hidden flex items-center justify-center">
            <img
                src="/blad-bakgrund.png"
                alt="Bakgrund"
                className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none z-0"
            />

            <div className="relative z-10 flex items-center justify-center w-full max-w-md p-4">
                <form
                    onSubmit={handleLogin}
                    className="bg-[#FEFAE1] border border-[#e0d9c5] rounded-lg shadow-xl p-6 md:p-8 w-full space-y-4"
                >
                    <h1 className="text-2xl font-semibold text-center text-[#3D5300] mb-2">Logga in</h1>
                    
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="E-postadress"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3D5300]"
                    />
                    <input
                        type="password"
                        placeholder="Lösenord"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3D5300]"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#3D5300] hover:bg-[#2f4200] text-white font-medium py-2 rounded transition disabled:opacity-50"
                    >
                        {loading ? "Loggar in..." : "Logga in"}
                    </button>

                    <p className="text-sm text-center text-gray-600 mt-4">
                        Har du inget konto?{" "}
                        <Link href="/signin/register" className="text-[#3D5300] underline">
                            Registrera dig här
                        </Link>
                    </p>
                </form>
            </div>
        </main>
    );
}