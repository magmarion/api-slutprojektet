"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import useCartStore from "../stores/cartStore";
import CartPopup from "./CartPopup";

export default function Header() {
  const pathname = usePathname();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems, cartCount } = useCartStore();

  return (
    <header className=" bg-slate-900 shadow-md flex justify-between items-center md:pl-5 md:pr-5 h-15 md:h-20">
      <Link
        href="/"
        className="leading-none p-2 text-white tracking-wide   hover:text-gray-400  "
      >
        <p className="text-xl ">TECH</p>
        <p className="font-extrabold -mt-3 text-xl">GEAR</p>
      </Link>

      <nav className="flex gap-4">
        <Link
          href="/"
          className={`text-white tracking-widest hover:text-gray-400 ${pathname === "/" ? "font-bold" : ""
            }`}
        >
          home
        </Link>
        <Link
          href="/product"
          className={`text-white tracking-widest  hover:text-gray-400 ${pathname === "/product" ? "font-bold" : ""
            }`}
        >
          products
        </Link>
      </nav>

      <div className="flex gap-4 pr-4">
        <Link href="/admin" data-cy="admin-link">
          <RiAdminFill className="w-6 h-6 cursor-pointer text-white hover:text-gray-400 " />
        </Link>

        {/* Cart Icon */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative cursor-pointer"
          data-cy="open-cart-sidebar"
        >
          <span
            data-cy="cart-items-count-badge"
            className="absolute -top-3 -right-3 w-[20px] h-[20px] bg-slate-200 text-slate-900 text-xs flex justify-center items-center font-semibold rounded-full z-0"
          >
            {cartCount}
          </span>
          <FaShoppingCart className="w-6 h-6 text-slate-200 hover:text-gray-400 relative" />
        </button>



        <CartPopup
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
        />
      </div>
    </header>
  );
}
