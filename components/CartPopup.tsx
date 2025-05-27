"use client";

import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import Image from "next/image";
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
                className={`bg-gradient-to-b from-[#FEFAE1] to-[#daa400] w-full max-w-[400px] p-6 overflow-y-auto transform transition-all ease ${isClosing ? "translate-x-full" : "translate-x-0"
                    } sm:max-w-[350px] md:max-w-[450px] lg:max-w-[500px]`}
            >
                <SheetTitle className="sr-only">Cart Items</SheetTitle>
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">Översikt</h2>
                </div>

                {/* Left Side: List of Cart Items */}
                <div data-cy="cart-item"
                    className="space-y-4">
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="border-b border-b-[#4B352A] py-4 flex justify-between items-center flex-wrap"
                        >
                            {/* Product Image */}
                            <Image
                                src={item.image}
                                alt={item.title}
                                width={64}
                                height={64}
                                className="w-16 h-16 object-contain rounded-md mb-4 sm:mb-0"
                            />
                            <div className="flex flex-col items-start ml-10 flex-1 min-w-0">
                                <h3 data-cy="product-title" className="font-semibold text-sm md:text-base">{item.title}</h3>
                                <div className="flex items-center space-x-2 mt-2">

                                    <p data-cy="product-quantity" className="text-gray-900 text-xs md:text-base w-24">
                                        Antal:
                                    </p>
                                    <button
                                        data-cy="decrease-quantity-button"
                                        onClick={() => decreaseQuantity(item.id)}
                                        className="text-slate-900 text-sm cursor-pointer transition-all duration-300 hover:scale-115"
                                    >
                                        <FaMinus className="w-3 h-3" />
                                    </button>
                                    <p data-cy="quantity" className="text-sm md:text-base">{item.quantity}</p>
                                    <button
                                        data-cy="increase-quantity-button"
                                        onClick={() => increaseQuantity(item.id)}
                                        className="text-slate-900 sm:text-sm cursor-pointer transition-all duration-300 hover:scale-115"
                                    >
                                        <FaPlus className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>

                            {/* Remove Button */}
                            < button
                                onClick={() => removeFromCart(item.id)}
                                data-cy="remove-from-cart-button"
                                className="text-slate-700 ml-auto mt-4 md:mt-0"
                            >
                                <FaTrashAlt className="w-5 h-5 cursor-pointer transition-all duration-300 hover:scale-115" />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Right Side: Summary and Proceed to Checkout */}
                <div className="mt-6">
                    <div className="flex justify-between">
                        <p className="text-gray-900 text-sm md:text-base">Delsumma:</p>
                        <p className="font-semibold text-sm md:text-base">{totalPrice} SEK</p>
                    </div>
                    <div className="flex justify-between pb-2">
                        <p className="text-gray-900 text-sm md:text-base">Frakt:</p>
                        <p className="font-semibold text-sm md:text-base">0 SEK</p>
                    </div>
                    <div className="flex justify-between border-t pt-4 border-t-[#4B352A]">
                        <p className="text-gray-900 text-sm md:text-base">Total Summa:</p>
                        <p data-cy="total-price" className="font-semibold text-sm md:text-base">{totalPrice} SEK</p>
                    </div>
                    <Link
                        href="/checkout"
                        data-cy="cart-link"
                        onClick={handleClose}
                        className="mt-6 w-full bg-[#616F47] text-[#fffdef] py-3 px-4 rounded block text-center transition-all duration-300 hover:scale-105"
                    >
                        Gå Till Kassan
                    </Link>
                </div>
            </SheetContent >
        </Sheet >
    );
};