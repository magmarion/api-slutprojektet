"use client"

import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import Link from "next/link";
import { useEffect, useState } from "react";
import useCartStore from "../stores/cartStore";

interface CartItem {
    id: string;
    title: string;
    price: number;
    quantity: number;
    image: string;
}

interface CartPopupProps {
    isOpen: boolean;
    onClose: () => void;
    cartItems: CartItem[];
}

export default function CartPopup({ isOpen, onClose }: CartPopupProps) {
    const { cartItems, totalPrice, removeFromCart } = useCartStore();
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
            setIsClosing(false);
        }, 300);
    };

    useEffect(() => {
        if (isOpen) setIsClosing(false);
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <Sheet open={isOpen} onOpenChange={handleClose}>
            <SheetContent className={`bg-white w-96 p-6 overflow-y-auto transform transition-all ease ${isClosing ? "translate-x-full" : "translate-x-0"
                }`}>
                <SheetTitle className="sr-only">Cart Items</SheetTitle>
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">Your Items</h2>
                </div>

                {/* Left Side: List of Cart Items */}
                <div className="space-y-4">
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            data-cy="cart-item"
                            className="border-b py-4 flex justify-between"
                        >
                            {/* Product Image */}
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-16 h-16 object-cover rounded-md"
                            />
                            <div>
                                <h3 className="font-semibold">{item.title}</h3>
                                <p className="text-gray-600">Quantity: {item.quantity}</p>
                            </div>
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>

                {/* Right Side: Summary and Proceed to Checkout */}
                <div className="mt-6">
                    <div className="flex justify-between">
                        <p className="text-gray-600">Subtotal:</p>
                        <p className="font-semibold">{totalPrice} SEK</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-gray-600">Shipping:</p>
                        <p className="font-semibold">0 SEK</p>
                    </div>
                    <div className="flex justify-between border-t pt-4">
                        <p className="text-gray-600">Total:</p>
                        <p data-cy="total-price" className="font-semibold">{totalPrice} SEK</p>
                    </div>
                    <Link
                        href="/checkout"
                        data-cy="cart-link"
                        onClick={handleClose}
                        className="mt-6 w-full bg-slate-500 text-white py-2 px-4 rounded-lg hover:bg-slate-600 block text-center transition-all duration-300 hover:scale-105"
                    >
                        Go to checkout
                    </Link>
                </div>
            </SheetContent>
        </Sheet>
    );
};