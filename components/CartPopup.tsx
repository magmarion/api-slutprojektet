"use client"

import Link from "next/link";
import useCartStore from "../stores/cartStore";
import { X } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

interface CartPopupProps {
    isOpen: boolean;
    onClose: () => void;
    cartItems: CartItem[];
}

export default function CartPopup({ isOpen, onClose, cartItems }: CartPopupProps) {
    const { removeFromCart } = useCartStore();

    if (!isOpen) return null;

    // Calculate total price of all items in the cart
    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            {/* SheetTrigger is optional if you're controlling the state externally */}
            <SheetTrigger aria-label="Open cart" className="hidden" />

            <SheetContent className="bg-white w-96 p-6 overflow-y-auto">
                <SheetTitle className="sr-only">Cart Items</SheetTitle>
                <h2 className="text-xl font-bold">Your Items</h2>

                {/* Left Side: List of Cart Items */}
                <div className="space-y-4">
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            data-cy="cart-item"
                            className="border-b py-4 flex justify-between"
                        >
                            <div>
                                <h3 className="font-semibold">{item.name}</h3>
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
                        <p className="font-semibold">{totalPrice} SEK</p>
                    </div>
                    <Link
                        href="/checkout"
                        data-cy="proceed-to-checkout-button"
                        className="mt-6 w-full bg-slate-500 text-white py-2 px-4 rounded-lg hover:bg-slate-600 block text-center transition-all duration-300 hover:scale-105"
                    >
                        Go to checkout
                    </Link>
                </div>
            </SheetContent>
        </Sheet>
    );
};