"use client";

import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";
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
    const { cartItems, totalPrice, removeFromCart, increaseQuantity, decreaseQuantity } = useCartStore();
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
            <SheetContent
                className={`bg-white w-full max-w-[400px] p-6 overflow-y-auto transform transition-all ease ${isClosing ? "translate-x-full" : "translate-x-0"
                    } sm:max-w-[350px] md:max-w-[450px] lg:max-w-[500px]`}
            >
                <SheetTitle className="sr-only">Cart Items</SheetTitle>
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">Your Items</h2>
                </div>

                {/* Left Side: List of Cart Items */}
                <div data-cy="cart-item"
                    className="space-y-4">
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="border-b py-4 flex justify-between items-center flex-wrap"
                        >
                            {/* Product Image */}
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-16 h-16 object-contain rounded-md mb-4 sm:mb-0"
                            />
                            <div className="flex flex-col items-start ml-10 flex-1 min-w-0">
                                <h3 data-cy="product-title" className="font-semibold text-sm md:text-base">{item.title}</h3>
                                <div className="flex items-center space-x-2 mt-2">

                                    <p data-cy="product-quantity" className="text-gray-600 text-xs md:text-base w-24">
                                        Quantity:
                                    </p>
                                    <button
                                        data-cy="decrease-quantity-button"
                                        onClick={() => decreaseQuantity(item.id)}
                                        className="text-slate-500 hover:text-slate-700 text-sm cursor-pointer transition-all duration-300 hover:scale-125"
                                    >
                                        <FaMinus className="w-3 h-3" />
                                    </button>
                                    <p data-cy="quantity" className="text-sm md:text-base">{item.quantity}</p>
                                    <button
                                        data-cy="increase-quantity-button"
                                        onClick={() => increaseQuantity(item.id)}
                                        className="text-slate-500 hover:text-slate-700 sm:text-sm cursor-pointer transition-all duration-300 hover:scale-125"
                                    >
                                        <FaPlus className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>

                            {/* Remove Button */}
                            < button
                                onClick={() => removeFromCart(item.id)}
                                className="text-slate-500 hover:text-slate-700 ml-auto mt-4 md:mt-0"
                            >
                                <FaTrashAlt className="w-6 h-6 cursor-pointer transition-all duration-300 hover:scale-125" />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Right Side: Summary and Proceed to Checkout */}
                <div className="mt-6">
                    <div className="flex justify-between">
                        <p className="text-gray-600 text-sm md:text-base">Subtotal:</p>
                        <p className="font-semibold text-sm md:text-base">{totalPrice} SEK</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-gray-600 text-sm md:text-base">Shipping:</p>
                        <p className="font-semibold text-sm md:text-base">0 SEK</p>
                    </div>
                    <div className="flex justify-between border-t pt-4">
                        <p className="text-gray-600 text-sm md:text-base">Total:</p>
                        <p data-cy="total-price" className="font-semibold text-sm md:text-base">{totalPrice} SEK</p>
                    </div>
                    <Link
                        href="/checkout"
                        data-cy="cart-link"
                        onClick={handleClose}
                        className="mt-6 w-full bg-slate-500 text-white py-2 px-4 rounded-lg hover:bg-slate-600 block text-center transition-all duration-300 hover:scale-105"
                    >
                        To the checkout
                    </Link>
                </div>
            </SheetContent >
        </Sheet >
    );
};