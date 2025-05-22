"use client";

import { useEffect, useRef, useState } from "react";
import { signIn, signOut, useSession } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaShoppingCart, FaGithub } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { RiAdminFill } from "react-icons/ri";
import useCartStore from "../stores/cartStore";
import CartPopup from "./CartPopup";
import MobileMenu from "./MobileMenu";

export default function Header() {
    const pathname = usePathname();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null); // 👈 reference for outside click
    const { cartItems, cartCount } = useCartStore();
    const { data: session, isPending: loading } = useSession();

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

    if (loading) return <div>Loading...</div>;

    return (
        <header className="sticky top-0 z-50 bg-slate-900 shadow-md flex justify-between items-center px-5 h-15 md:h-20">
            <Link href="/" className="leading-none p-2 text-white tracking-wide hover:text-gray-400">
                <p className="text-xl">tech</p>
                <p className="font-extrabold -mt-3 text-xl">gear</p>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-16">
                {["home", "product", "about", "contact"].map((item) => (
                    <Link
                        key={item}
                        href={`/${item === "home" ? "" : item}`}
                        className={`text-white tracking-widest hover:text-gray-400 ${pathname === `/${item === "home" ? "" : item}` ? "font-bold border-b-2" : ""
                            }`}
                    >
                        {item}
                    </Link>
                ))}
            </nav>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-white text-2xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <HiX /> : <HiMenu />}
            </button>

            <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

            {/* Icons Section */}
            <div className="flex gap-4 pr-4 items-center relative">
                {session?.user && (
                    <Link href="/admin" data-cy="admin-link" className="text-white hover:text-gray-400">
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
                        className="absolute -top-3 -right-3 w-[20px] h-[20px] bg-slate-200 text-slate-900 text-xs flex justify-center items-center font-semibold rounded-full group-hover:bg-gray-400 transition-colors"
                    >
                        {cartCount}
                    </span>
                    <FaShoppingCart className="w-6 h-6 text-slate-200 group-hover:text-slate-200 hover:text-gray-400 transition-colors" />
                </button>

                {/* Profile Dropdown */}
                {session?.user ? (
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setShowDropdown(prev => !prev)}
                            className="w-9 h-9 rounded-full border-2 border-slate-300 flex items-center justify-center text-white hover:border-white transition"
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
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A7.963 7.963 0 0112 15c2.137 0 4.084.835 5.514 2.204M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              Profile
                            </Link>
                            <hr className="my-2" />
                            <button
                              onClick={() => signOut()}
                              className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
                            >
                              Sign Out
                            </button>
                          </div>
                          
                        )}
                    </div>
                ) : (
                    <Link
                        href="/signin"
                        className="bg-slate-200 hover:bg-slate-300 text-slate-900 px-3 py-1 rounded transition-colors"
                    >
                        Sign In
                    </Link>
                )}
            </div>

            <CartPopup isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cartItems={cartItems} />
        </header>
    );
}
