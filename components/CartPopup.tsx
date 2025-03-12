"use client"

import { Link } from "lucide-react";

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
    if (!isOpen) return null;

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="bg-white w-96 h-full p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Your Cart</h2>
                <button
                    onClick={onClose}
                    className="text-gray-600 hover:text-gray-800"
                >
                    &times; {/* Close icon */}
                </button>
            </div>

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
                        <p>${item.price * item.quantity}</p>
                    </div>
                ))}
            </div>

            {/* Right Side: Summary and Proceed to Checkout */}
            <div className="mt-6">
                <div className="flex justify-between">
                    <p className="text-gray-600">Subtotal</p>
                    <p className="font-semibold">${totalPrice}</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-gray-600">Shipping</p>
                    <p className="font-semibold">$0</p>
                </div>
                <div className="flex justify-between border-t pt-4">
                    <p className="text-gray-600">Total</p>
                    <p className="font-semibold">${totalPrice}</p>
                </div>
                <Link
                    href="/checkout"
                    data-cy="proceed-to-checkout-button"
                    className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors block text-center"
                >
                    Go to checkout
                </Link>
            </div>
        </div>
    );
};