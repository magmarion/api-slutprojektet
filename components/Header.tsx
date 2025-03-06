import Link from "next/link";
import { useState } from "react";

export default function Header() {
    const [cartCount, setCartCount] = useState(2);

    return (
        <header className="p-4 bg-gray-100 shadow-md flex justify-between">
            <Link href="/">
                <h1 className="text-xl font-bold">The webbshop logo</h1>
            </Link>
        </header>
    );
}