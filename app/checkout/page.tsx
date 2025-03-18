"use client";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import useCartStore from "@/stores/cartStore";
import Image from "next/image";
import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";


export default function CheckoutPage() {
    const { cartItems, totalPrice, increaseQuantity, decreaseQuantity, removeFromCart } = useCartStore();


    return (
        <div className="flex flex-col lg:flex-row justify-evenly items-start w-full p-4">
            <div className="w-full lg:w-1/2 lg:pr-4 mb-8 lg:mb-0">
                <div className="bg-gray-100 p-4 rounded-md mb-6">
                    <h1 className="text-2xl font-bold mb-2">Checkout</h1>
                    <div className="bg-gray-100 p-4 rounded-md mb-2">
                        {cartItems.length > 0 ? (
                            cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    data-cy="cart-item"
                                    className="flex items-center justify-between border-b pb-8 mb-2 relative"
                                >
                                    <div className="flex flex-col max-[440px]:items-center max-[440px]:mr-4">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            width={50}
                                            height={50}
                                            className="rounded-md mr-4 max-[440px]:mb-2"
                                        />
                                        {/* Price (under the image on screens < 440px) */}
                                        <p data-cy="product-price" className="font-semibold text-sm sm:text-base min-[440px]:absolute right-0">
                                            {item.price * item.quantity} SEK
                                        </p>
                                    </div>

                                    <div className="flex flex-col items-start flex-1 min-w-0">
                                        {/* Title */}
                                        <p data-cy="product-title" className="font-semibold text-sm sm:text-base max-[440px]:mb-8">
                                            {item.title}
                                        </p>

                                        <div className="flex items-center space-x-2 mt-2">
                                            <p className="text-gray-600 text-xs sm:text-base w-24">
                                                Quantity:
                                            </p>
                                            <button
                                                data-cy="decrease-quantity-button"
                                                onClick={() => decreaseQuantity(item.id)}
                                                className="text-slate-500 hover:text-slate-700 text-sm cursor-pointer"
                                            >
                                                <FaMinus className="w-3 h-3" />
                                            </button>
                                            <span data-cy="product-quantity" className="text-gray-600 text-sm sm:text-base">{item.quantity}</span>
                                            <button
                                                data-cy="increase-quantity-button"
                                                onClick={() => increaseQuantity(item.id)}
                                                className="text-slate-500 hover:text-slate-800 text-sm cursor-pointer"
                                            >
                                                <FaPlus className="w-3 h-3" />
                                            </button>

                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="flex items-center gap-1 text-slate-500 hover:text-slate-800 transition-all text-sm"
                                            >
                                                <FaTrashAlt className="w-4 h-4 cursor-pointer transition-all duration-300 hover:scale-125" />
                                            </button>
                                        </div>

                                    </div>

                                    {/* <p className="font-semibold text-sm sm:text-base ml-4 max-[440px]:hidden">
                                        {item.price} SEK
                                    </p> */}
                                </div>
                            ))
                        ) : (
                            <p>No items in cart.</p>
                        )}
                        <div className="mt-5 border-t pt-2 flex justify-between">
                            <p className="text-gray-600 text-sm sm:text-base">Total Price:</p>
                            <p data-cy="total-price" className="font-semibold text-sm md:text-base">
                                {totalPrice} SEK
                            </p>
                        </div>
                    </div>
                </div>
            </div>


            <div className="w-full lg:w-1/3">
                <CheckoutForm />
            </div>
        </div>
    );
}
