// components/ProfileDropdown.tsx
"use client";
import { signOut } from "@/lib/auth-client";
import Link from "next/link";
import { FaGithub, FaUser, FaListAlt } from "react-icons/fa";

interface ProfileDropdownProps {
    showDropdown: boolean;
    setShowDropdown: (value: boolean) => void; // Typsäkerhet här
}

export function ProfileDropdown({ showDropdown, setShowDropdown }: ProfileDropdownProps) {
    return (
        <div className="relative">
            <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-9 h-9 rounded-full border-2 border-[#FEFAE1] flex items-center justify-center text-[#FEFAE1] hover:border-[#F4D794] transition"
            >
                <FaGithub />
            </button>
            {showDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white text-slate-900 rounded shadow-lg z-50 p-4 space-y-2">
                    <Link
                        href="/profile"
                        onClick={() => setShowDropdown(false)}
                        className="flex items-center gap-2 text-sm font-medium hover:underline"
                    >
                        <FaUser className="w-4 h-4" />
                        Profil
                    </Link>
                    <Link
                        href="/my-orders"
                        onClick={() => setShowDropdown(false)}
                        className="flex items-center gap-2 text-sm font-medium hover:underline"
                    >
                        <FaListAlt className="w-4 h-4" />
                        Mina Beställningar
                    </Link>
                    <hr className="my-2" />
                    <button
                        onClick={() => signOut()}
                        className="w-full bg-[#AF3E3E] hover:bg-[#8B322C] text-white px-4 py-2 rounded transition-all cursor-pointer"
                    >
                        Logga ut
                    </button>
                </div>
            )}
        </div>
    );
}