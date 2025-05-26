"use client";
import Image from "next/image";
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
            className={`fixed top-0 left-0 w-full h-full bg-gradient-to-b from-[#616F47] to-[#3D5300] z-50 flex flex-col items-center justify-center transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
        >
            <button className="absolute top-5 right-5 text-[#FEFAE1] text-3xl" onClick={onClose}>
                ×
            </button>

            <Link href="/" onClick={onClose} className="flex flex-col items-center mb-8">
                <div className="relative h-12 w-32"> {/* Justera höjd/bredd efter din bild */}
                    <Image
                        src="/logo.png" // Sökväg till din bild i public-mappen
                        alt="Bloom Logo"
                        fill
                        className="object-contain scale-130"
                        priority
                    />
                </div>
            </Link>

            <nav className="flex flex-col gap-6 text-center">
                {[
                    { swedish: "hem", english: "home" },
                    { swedish: "produkter", english: "product" },
                    { swedish: "om oss", english: "about" },
                    { swedish: "kontakt", english: "contact" }
                ].map((item) => {
                    const linkPath = `/${item.english === "home" ? "" : item.english}`;
                    const isActive = pathname === linkPath;

                    return (
                        <Link
                            key={item.english}
                            href={linkPath}
                            className={`text-[#FEFAE1] text-xl hover:text-[#F4D794] transition-colors ${isActive ? "bg-[#594100] px-2 py-1 rounded-lg" : ""
                                }`}
                            onClick={onClose}
                        >
                            {item.swedish.charAt(0).toUpperCase() + item.swedish.slice(1)}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
