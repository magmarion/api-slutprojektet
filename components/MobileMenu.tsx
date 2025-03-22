"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    const pathname = usePathname(); // Get the current route

    return (
        <div
            className={`fixed top-0 left-0 w-full h-full bg-slate-900 bg-opacity-95 z-50 flex flex-col items-center justify-center transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
        >
            <button className="absolute top-5 right-5 text-white text-3xl" onClick={onClose}>
                ×
            </button>

            <Link href="/" onClick={onClose} className="flex flex-col items-center mb-8">
                <p className="text-white text-2xl font-bold tracking-wide">tech</p>
                <p className="text-white text-2xl font-extrabold -mt-2">gear</p>
            </Link>

            <nav className="flex flex-col gap-6 text-center">
                {["home", "product", "about", "contact"].map((item) => {
                    const linkPath = `/${item === "home" ? "" : item}`;
                    const isActive = pathname === linkPath;

                    return (
                        <Link
                            key={item}
                            href={linkPath}
                            className={`text-white text-xl hover:text-gray-400 ${isActive ? "font-bold border-b-2 border-white" : ""
                                }`}
                            onClick={onClose}
                        >
                            {item}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
