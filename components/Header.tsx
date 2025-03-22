"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { HiMenu, HiX } from "react-icons/hi";
import useCartStore from "../stores/cartStore";
import CartPopup from "./CartPopup";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const pathname = usePathname();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems, cartCount } = useCartStore();

  return (
    <header className="sticky top-0 z-50 bg-slate-900 shadow-md flex justify-between items-center px-5 h-15 md:h-20">
      <Link href="/" className="leading-none p-2 text-white tracking-wide hover:text-gray-400">
        <p className="text-xl">tech</p>
        <p className="font-extrabold -mt-3 text-xl">gear</p>
      </Link>

      {/* Desktop Navigation - Hidden on Small Screens */}
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
      <div className="flex gap-4 pr-4">
        <Link href="/admin" data-cy="admin-link">
          <RiAdminFill className="w-6 h-6 cursor-pointer text-white hover:text-gray-400" />
        </Link>

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

        <CartPopup isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cartItems={cartItems} />
      </div>
    </header>
  );
}
