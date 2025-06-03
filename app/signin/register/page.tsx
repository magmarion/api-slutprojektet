"use client";

import { signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        setLoading(true);
        const { error } = await signUp.email(
            { email, password, name, isAdmin: false },
            {
                onSuccess: () => {
                    alert("Registreringen lyckades. Du kan nu logga in.");
                    router.push("/signin/email-signin");
                },
                onError: (ctx) => {
                    alert(ctx.error.message);
                },
            }
        );
        setLoading(false);
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h1 className="text-xl font-semibold mb-4">Skapa konto</h1>
            <input
                placeholder="Namn"
                className="mb-2 w-full border p-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
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
                disabled={loading}
                className="bg-[#3D5300] text-white px-4 py-2 rounded"
                onClick={handleRegister}
            >
                Skapa konto
            </button>
        </div>
    );
}
