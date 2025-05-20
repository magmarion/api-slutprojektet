"use client";

import { useState } from "react";
import Link from "next/link";
import { FaUserAlt, FaUserShield } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import React from "react";

export default function LoginPage() {
  const [role, setRole] = useState<"customer" | "admin">("customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Replace with actual login logic (e.g. Auth.js)
    console.log("Logging in:", { email, password, role });
  };

  return (
    <section className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center px-4 py-12">
      <Link href="/" className="mb-6 text-center">
        <p className="text-xl">tech</p>
        <p className="font-extrabold text-xl -mt-3">gear</p>
      </Link>

      <div className="bg-slate-800 w-full max-w-md p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">
          {role === "admin" ? "Admin Login" : "Customer Login"}
        </h1>

        <div className="flex justify-center gap-4 mb-4">
          <button
            onClick={() => setRole("customer")}
            className={`flex items-center gap-2 px-4 py-2 rounded text-sm transition-colors ${role === "customer"
              ? "bg-white text-slate-900 font-bold"
              : "bg-slate-700 text-white"
              }`}
          >
            <FaUserAlt />
            Customer
          </button>
          <button
            onClick={() => setRole("admin")}
            className={`flex items-center gap-2 px-4 py-2 rounded text-sm transition-colors ${role === "admin"
              ? "bg-white text-slate-900 font-bold"
              : "bg-slate-700 text-white"
              }`}
          >
            <FaUserShield />
            Admin
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full p-2 bg-slate-700 text-white rounded placeholder-gray-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            required
            className="w-full p-2 bg-slate-700 text-white rounded placeholder-gray-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            variant="ghost"
            className="w-full border border-white text-white hover:bg-white hover:text-slate-900 font-bold"
          >
            Login
          </Button>
        </form>

        <p className="text-sm mt-4 text-center">
          Don’t have an account?{" "}
          <Link href="/register" className="text-blue-400 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </section>
  );
}
