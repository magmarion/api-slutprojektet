// components/ProfileDropdown.tsx
"use client";
import { signOut, useSession } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaCat, FaGhost, FaListAlt, FaUser } from "react-icons/fa";
import { ImUser } from "react-icons/im";


interface ProfileDropdownProps {
    showDropdown: boolean;
    setShowDropdown: (value: boolean) => void;
}

export function ProfileDropdown({ showDropdown, setShowDropdown }: ProfileDropdownProps) {
    const router = useRouter();
    const { data: session } = useSession();

    const getAvatarIcon = () => {
        if (!session?.user) return null;

        // Kontrollera om användarens profilbild innehåller "github"
        if (session.user.image && session.user.image.includes("github")) {
            return <FaCat className="w-6 h-6 text-[#FEFAE1]" />;
        }

        // Google / Gmail inloggning
        if (session.user.email && session.user.email.toLowerCase().endsWith("gmail.com")) {
            return <FaGhost className="w-6 h-6 text-[#FEFAE1]" />;
        }

        // Annan inloggning (e-post)
        return <ImUser className="w-6 h-6 text-[#FEFAE1]" />;
    };




    return (
        <div className="relative">
            <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-9 h-12 border-2 rounded-full flex items-center justify-center text-[#FEFAE1] hover:text-[#F4D794] transition"
            >
                {getAvatarIcon()}
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
                        onClick={() => signOut({
                            fetchOptions: {
                                onSuccess: () => {
                                    router.push("/signin");
                                },
                            },
                        })}
                        className="w-full bg-[#AF3E3E] hover:bg-[#8B322C] text-white px-4 py-2 rounded transition-all cursor-pointer"
                    >
                        Logga ut
                    </button>
                </div>
            )}
        </div>
    );
}