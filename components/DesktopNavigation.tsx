// components/DesktopNavigation.tsx
"use client";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

interface DesktopNavigationProps {
    categories: string[];
    pathname: string;
}

export function DesktopNavigation({ categories, pathname }: DesktopNavigationProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navLinks = [
        { label: "Hem", path: "/" },
        { label: "Produkter", path: "/product" },
        { label: "Kontakt", path: "/contact" },
        { label: "Om oss", path: "/about" },
    ];

    return (
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
                                    className="absolute mt-7 w-48 bg-[#516036] text-[#FEFAE1] shadow-xl rounded-xl z-50 overflow-hidden"
                                >
                                    {categories.map((category) => (
                                        <Link
                                            key={category}
                                            href={`/categories/${encodeURIComponent(category)}`}
                                            className="block px-5 py-3 hover:bg-[#51722a] hover:text-[#F4D794] transition-colors duration-200 text-sm font-medium"
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
    );
}