"use client";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [cartCount, setCartCount] = useState(2);

  return (
    <header className="p-4 bg-gray-100 shadow-md flex justify-between items-center">
      <Link href="/">
        <h1 className="text-xl font-bold">The webshop logo</h1>
      </Link>
      <nav className="flex gap-4">
        <Link href="/" className="text-gray-600 hover:text-gray-800">
          Home
        </Link>
        <Link href="/products" className="text-gray-600 hover:text-gray-800">
          Products
        </Link>
        <Link
          href="/admin"
          data-cy="admin-link"
          className="text-gray-600 hover:text-gray-800"
        >
          Admin
        </Link>
      </nav>

      <Link
        href="/checkout"
        data-cy="cart-link"
        className="relative cursor-pointer"
      >
        <ShoppingCart />
        {cartCount > 0 && (
          <span
            data-cy="cart-items-count-badge"
            className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center"
          >
            {cartCount}
          </span>
        )}
      </Link>
    </header>
  );
}
