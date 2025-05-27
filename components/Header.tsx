"use client";
import { getCategories } from "@/app/admin/actions";
import { signOut, useSession } from "@/lib/auth-client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaGithub, FaShoppingCart } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { RiAdminFill } from "react-icons/ri";
import useCartStore from "../stores/cartStore";
import CartPopup from "./CartPopup";
import MobileMenu from "./MobileMenu";

const navLinks = [
    { label: "Hem", path: "/" },
    { label: "Produkter", path: "/product" },
    { label: "Kontakt", path: "/contact" },
    { label: "Om oss", path: "/about" },
];

export default function Header() {
    const pathname = usePathname();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [categories, setCategories] = useState<string[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { cartItems, cartCount } = useCartStore();
    const { data: session, isPending: loading } = useSession();

    // Handle click outside dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Load categories on mount
    useEffect(() => {
        async function loadCategories() {
            try {
                const categoriesData = await getCategories();
                setCategories(categoriesData.map((cat: { name: string }) => cat.name));
            } catch (error) {
                console.error("Failed to load categories:", error);
            }
        }
        loadCategories();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <header className="sticky top-0 z-50 bg-gradient-to-b from-[#3D5300] to-[#616F47] text-[#FEFAE1] shadow-lg flex justify-between items-center px-5 py-4">
            {/* Logo */}
            <Link href="/" className="hover:opacity-90 transition-opacity">
                <div className="relative h-12 w-32"> {/* Adjust height/width as needed */}
                    <Image
                        src="/logo.png" // Path to your image in public folder
                        alt="Bloom Logo"
                        fill
                        className="object-contain scale-110"
                        priority
                    />
                </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-8 relative">
                {navLinks.map((link) => (
                    <div
                        key={link.label}
                        className="relative group"
                        onMouseEnter={() => link.label === "Produkter" && setIsDropdownOpen(true)}
                        onMouseLeave={() => link.label === "Produkter" && setIsDropdownOpen(false)}
                    >
                        <Link
                            href={link.path}
                            className={`hover:text-[#F4D794] transition-colors ${pathname === link.path ? "bg-[#594100] px-2 py-1 rounded-lg" : ""}`}
                        >
                            {link.label}
                        </Link>
                        {link.label === "Produkter" && (
                            <AnimatePresence>
                                {isDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute mt-7 w-48 bg-[#616F47] text-[#FEFAE1] shadow-xl rounded-xl z-50 overflow-hidden"
                                    >
                                        {categories.map((category) => (
                                            <Link
                                                key={category}
                                                href={`/categories/${encodeURIComponent(category)}`}
                                                className="block px-5 py-3 hover:bg-[#4A5A36] hover:text-[#F4D794] transition-colors duration-200 text-sm font-medium"
                                                onClick={() => setIsDropdownOpen(false)}
                                            >
                                                {category}
                                            </Link>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        )}
                    </div>
                ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
                className="md:hidden text-[#FEFAE1] text-2xl"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {isMenuOpen ? <HiX /> : <HiMenu />}
            </button>
            <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

            {/* Icons Section */}
            <div className="flex gap-4 pr-4 items-center relative">
                {/* Admin Link */}
                {session?.user && (session.user as { isAdmin?: boolean }).isAdmin && (
                    <Link
                        href="/admin"
                        data-cy="admin-link"
                        className="text-[#FEFAE1] hover:text-[#F4D794] transition-colors"
                    >
                        <RiAdminFill className="w-6 h-6 cursor-pointer" />
                    </Link>
                )}

                {/* Cart Icon */}
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

                {/* Profile Dropdown */}
                {session?.user ? (
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setShowDropdown((prev) => !prev)}
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
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-4 h-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5.121 17.804A7.963 7.963 0 0112 15c2.137 0 4.084.835 5.514 2.204M15 10a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                    Profil
                                </Link>
                                <Link
                                    href="/my-orders"
                                    onClick={() => setShowDropdown(false)}
                                    className="flex items-center gap-2 text-sm font-medium hover:underline"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2h6v2H9zm-3-4v-2h12v2H6zm0-4V7h12v2H6z" />
                                    </svg>
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