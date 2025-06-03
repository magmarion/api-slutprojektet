"use client";

import { signIn } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EmailSignInPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const { error } = await signIn.email(
            {
                email,
                password,
                callbackURL: "/",
                rememberMe: true,
            },
            {
                onError: (ctx) => {
                    alert(ctx.error.message);
                },
            }
        );
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h1 className="text-xl font-semibold mb-4">Logga in med e-post</h1>
            <input
                placeholder="E-post"
                className="mb-2 w-full border p-2"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                placeholder="Lösenord"
                className="mb-4 w-full border p-2"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                className="bg-[#3D5300] text-white px-4 py-2 rounded"
                onClick={handleLogin}
            >
                Logga in
            </button>
            <p className="mt-4 text-sm text-center">
                Har du inget konto?{" "}
                <Link href="/signin/register" className="text-[#3D5300] underline">
                    Registrera dig här
                </Link>
            </p>
        </div>
    );
}
