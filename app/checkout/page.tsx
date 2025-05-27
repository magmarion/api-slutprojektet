"use client";

import CheckoutForm from "@/components/checkout/CheckoutForm";
import useCartStore from "@/stores/cartStore";
import Image from "next/image";
import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";
import { motion } from "framer-motion";

export default function CheckoutPage() {
    const {
        cartItems,
        totalPrice,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
    } = useCartStore();

    return (
        <main className="min-h-screen bg-[#FEFAE1] px-4 py-16 flex flex-col lg:flex-row gap-10 justify-evenly items-start">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full lg:w-2/3 bg-[#FFF6DA] shadow-xl rounded-2xl p-6"
            >
                <h1 className="text-3xl font-bold text-[#3D5300] mb-6">Kassa</h1>

                {cartItems.length > 0 ? (
                    <>
                        <div className="divide-y space-y-6">
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    data-cy="cart-item"
                                    className="flex items-center justify-between pt-4"
                                >
                                    <div className="flex items-center gap-4">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            width={60}
                                            height={60}
                                            className="rounded-lg bg-[#F2F1E6] p-2"
                                        />
                                        <div>
                                            <p className="text-lg font-semibold text-[#3D5300]">
                                                {item.title}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                {item.price * item.quantity} SEK
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => decreaseQuantity(item.id)}
                                            className="text-[#616F47] hover:text-[#3D5300]"
                                        >
                                            <FaMinus />
                                        </button>
                                        <span className="text-sm font-medium text-gray-700">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => increaseQuantity(item.id)}
                                            className="text-[#616F47] hover:text-[#3D5300]"
                                        >
                                            <FaPlus />
                                        </button>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="ml-2 text-[#AF3E3E] hover:scale-110 transition-transform"
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t mt-6 pt-4 flex justify-between items-center">
                            <p className="text-base text-gray-600">Total:</p>
                            <p data-cy="total-price" className="text-xl font-bold text-[#3D5300]">
                                {totalPrice} SEK
                            </p>
                        </div>
                    </>
                ) : (
                    <p className="text-gray-600">Inga varor i varukorgen.</p>
                )}
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full lg:w-1/3 bg-[#FFF6DA] shadow-xl rounded-2xl p-6"
            >
                <CheckoutForm />
            </motion.div>
        </main>
    );
}
