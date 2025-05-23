import { FaFacebookSquare, FaInstagram, FaLinkedin } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="p-6 bg-gradient-to-b from-[#3D5300] to-[#616F47] text-[#FEFAE1]">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

                {/* Logo - Centrerad på mobil, vänster på desktop */}
                <Link href="/" className="hover:opacity-90 transition-opacity">
                    <div className="relative h-10 w-28 md:h-12 md:w-32">
                        <Image
                            src="/logo.png"
                            alt="Bloom Logo"
                            fill
                            className="object-contain brightness-90 saturate-150"
                            priority
                        />
                    </div>
                </Link>

                {/* Copyright - Nu i mitten */}
                <p className="text-sm md:text-base font-medium order-last md:order-none">
                    © 2025 Bloom. Alla rättigheter reserverade.
                </p>

                {/* Sociala ikoner - Flyttad till höger */}
                <div className="flex gap-4 text-2xl">
                    <a href="#" aria-label="Facebook" className="hover:text-[#F4D794] transition-colors">
                        <FaFacebookSquare />
                    </a>
                    <a href="#" aria-label="LinkedIn" className="hover:text-[#F4D794] transition-colors">
                        <FaLinkedin />
                    </a>
                    <a href="#" aria-label="Instagram" className="hover:text-[#F4D794] transition-colors">
                        <FaInstagram />
                    </a>
                </div>
            </div>
        </footer>
    );
}