// components/Header.tsx
"use client";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { RiAdminFill } from "react-icons/ri";
import { useCategories } from "../hooks/useCategories";
import useCartStore from "../stores/cartStore";
import CartPopup from "./CartPopup";
import { DesktopNavigation } from "./DesktopNavigation";
import MobileMenu from "./MobileMenu";
import { ProfileDropdown } from "./ProfileDropdown";

export default function Header() {
    const pathname = usePathname();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { cartItems, cartCount } = useCartStore();
    const { data: session, isPending: loading } = useSession();
    const { data: categories = [] } = useCategories();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (loading) return <div className="text-md">Loading...</div>;

    return (
        <header className="sticky top-0 z-50 bg-gradient-to-b from-[#3D5300] to-[#516036] text-[#FEFAE1] shadow-lg flex justify-between items-center px-5 py-4">
            {/* Logo */}
            <Link href="/" className="hover:opacity-90 transition-opacity">
                <div className="relative h-12 w-32">
                    <Image
                        src="/logo.png"
                        alt="Bloom Logo"
                        fill
                        className="object-contain scale-110"
                        priority
                    />
                </div>
            </Link>

            {/* Desktop Navigation */}
            <DesktopNavigation categories={categories} pathname={pathname} />

            {/*Mobile Menu Button */}
            <button
                className="md:hidden text-[#FEFAE1] text-2xl"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {isMenuOpen ? <HiX /> : <HiMenu />}
            </button>
            <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

            {/* Icons Section */}
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

            <CartPopup isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cartItems={cartItems} />
        </header>
    );
}