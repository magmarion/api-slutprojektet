// components/IconsSection.tsx
"use client";
import { useSession } from "@/lib/auth-client";
import { Link } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { ProfileDropdown } from "./ProfileDropdown";

interface IconsSectionProps {
    setIsCartOpen: (value: boolean) => void;
    cartCount: number;
}

export function IconsSection({ setIsCartOpen, cartCount }: IconsSectionProps) {
    const { data: session } = useSession();
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="flex gap-4 pr-4 items-center relative">
            {(session?.user as { isAdmin?: boolean })?.isAdmin && (
                <Link
                    href="/admin"
                    data-cy="admin-link"
                    className="text-[#FEFAE1] hover:text-[#F4D794] transition-colors"
                >
                    <RiAdminFill className="w-6 h-6 cursor-pointer" />
                </Link>
            )}

            <button
                onClick={() => setIsCartOpen(true)}
                className="relative cursor-pointer group"
                data-cy="open-cart-sidebar"
            >
                <span
                    data-cy="cart-items-count-badge"
                    className="absolute -top-3 -right-3 w-[20px] h-[20px] bg-[#644A07] text-white text-xs flex justify-center items-center font-semibold rounded-full group-hover:bg-[#4B352A] transition-colors"
                >
                    {cartCount}
                </span>
                <FaShoppingCart className="w-6 h-6 text-[#FEFAE1] group-hover:text-[#F4D794] transition-colors" />
            </button>

            {session?.user ? (
                <ProfileDropdown showDropdown={showDropdown} setShowDropdown={setShowDropdown} />
            ) : (
                <div className="flex gap-4">
                    <Link
                        href="/signin"
                        className="bg-[#FEFAE1] hover:bg-[#F4D794] text-slate-900 px-3 py-1 rounded transition-colors"
                    >
                        Logga in
                    </Link>
                </div>
            )}
        </div>
    );
}