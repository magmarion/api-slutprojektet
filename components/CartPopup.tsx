"use client";

import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
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
      <SheetContent
        className={`bg-white w-full max-w-[400px] p-6 overflow-y-auto transform transition-all ease ${
          isClosing ? "translate-x-full" : "translate-x-0"
        } sm:max-w-[350px] md:max-w-[450px] lg:max-w-[500px]`}
      >
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
              className="border-b py-4 flex justify-between items-center flex-wrap"
            >
              {/* Product Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 object-contain rounded-md mb-4 sm:mb-0"
              />
              <div className="flex flex-col items-start ml-10 flex-1 min-w-0">
                <h3 className="font-semibold text-sm md:text-base">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-xs md:text-base">
                  Quantity: {item.quantity}
                </p>
              </div>
              <button
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
            <p className="font-semibold text-sm md:text-base">
              {totalPrice} SEK
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600 text-sm md:text-base">Shipping:</p>
            <p className="font-semibold text-sm md:text-base">0 SEK</p>
          </div>
          <div className="flex justify-between border-t pt-4">
            <p className="text-gray-600 text-sm md:text-base">Total:</p>
            <p
              data-cy="total-price"
              className="font-semibold text-sm md:text-base"
            >
              {totalPrice} SEK
            </p>
          </div>
          <Link
            href="/checkout"
            data-cy="cart-link"
            onClick={handleClose}
            className="mt-6 w-full bg-slate-500 text-white py-2 px-4 rounded-xs hover:bg-slate-600 block text-center transition-all duration-300 hover:scale-105"
          >
            Go to checkout
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
