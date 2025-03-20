"use client";
import Link from "next/link";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    return (
        <div
            className={`fixed top-0 left-0 w-full h-full bg-slate-900 bg-opacity-95 z-50 flex flex-col items-center justify-center transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
        >
            <button className="absolute top-5 right-5 text-white text-3xl" onClick={onClose}>
                ×
            </button>

            <nav className="flex flex-col gap-6 text-center">
                {["home", "product", "about", "contact"].map((item) => (
                    <Link
                        key={item}
                        href={`/${item === "home" ? "" : item}`}
                        className="text-white text-xl hover:text-gray-400"
                        onClick={onClose}
                    >
                        {item}
                    </Link>
                ))}
            </nav>
        </div>
    );
}
