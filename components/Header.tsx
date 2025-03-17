"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import useCartStore from "../stores/cartStore";
import CartPopup from "./CartPopup";

export default function Header() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { cartItems, cartCount } = useCartStore();
    const pathname = usePathname();

    return (
        <header className="p-2 bg-gray-100 shadow-md flex justify-between items-center">
            <Link href="/">
                <img src="/logo.png" alt="logo" className="h-20 w-25 p-0" />
            </Link>

            <nav className="flex gap-4">
                <Link
                    href="/"
                    className={
                        "text-gray-600 hover:text-gray-800 " +
                        (pathname === "/" ? "border-b-2 border-gray-800" : "")
                    }
                >
                    Home
                </Link>
                <Link
                    href="/product"
                    className={
                        "text-gray-600 hover:text-gray-800 " +
                        (pathname === "/product" ? "border-b-2 border-gray-800" : "")
                    }
                >
                    Products
                </Link>
            </nav>

            <div className="flex gap-4 pr-4">
                <Link href="/admin" data-cy="admin-link" className="text-gray-600 hover:text-gray-800">
                    <RiAdminFill className="w-6 h-6 cursor-pointer text-gray-600 hover:text-gray-800" />
                </Link>


                {/* Cart Icon */}
                <button
                    onClick={() => setIsCartOpen(true)}
                    className="relative cursor-pointer"
                    data-cy="open-cart-sidebar"
                >
                    <FaShoppingCart className="w-6 h-6 text-gray-600 hover:text-gray-800" />
                    {cartCount > 0 && (
                        <span
                            data-cy="cart-items-count-badge"
                            className="absolute -top-2 -right-2 bg-red-700 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center"
                        >
                            {cartCount}
                        </span>
                    )}
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
