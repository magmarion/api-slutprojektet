"use client";

import React from "react";
import useCartStore from "@/stores/cartStore";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/** A simple shadcn/ui-based Footer */
function SiteFooter() {
  return (
    <Card>
      <CardContent className="text-center py-4">
        <p className="text-sm">© 2025 My Webshop</p>
      </CardContent>
    </Card>
  );
}

export default function ConfirmationPage() {
  // 1) Pull cart items, total price, and checkout data (customer info) from your store
  const { cartItems, totalPrice, checkoutInfo } = useCartStore();

  return (
    <div className="flex flex-col min-h-screen">
      {/* MAIN CONTENT */}
      <main
        data-cy="confirmation-page"
        className="flex-1 flex flex-col lg:flex-row justify-evenly items-start w-full p-4 gap-8"
      >
        {/* LEFT SIDE: Thank you message + Order summary */}
        <Card className="w-full lg:w-1/2 lg:pr-4">
          <CardHeader>
            <CardTitle>Thank you for your purchase!</CardTitle>
            <CardDescription>
              We appreciate your order. A confirmation email has been sent.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* If there are items in the cart, show the summary */}
            {cartItems.length > 0 ? (
              <div className="bg-gray-100 p-4 rounded-md">
                {/* Cart Items */}
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    data-cy="cart-item"
                    className="flex items-center justify-between border-b pb-8 mb-4 relative"
                  >
                    {/* Left Column: Image + item total price */}
                    <div className="flex flex-col max-[440px]:items-center max-[440px]:mr-4">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={50}
                        height={50}
                        className="rounded-md mr-4 max-[440px]:mb-2"
                      />
                      <p
                        data-cy="product-price"
                        className="font-semibold text-sm sm:text-base min-[440px]:absolute right-0"
                      >
                        {item.price * item.quantity} SEK
                      </p>
                    </div>
                    {/* Right Column: Title + Quantity */}
                    <div className="flex flex-col items-start flex-1 min-w-0">
                      <p
                        data-cy="product-title"
                        className="font-semibold text-sm sm:text-base max-[440px]:mb-8"
                      >
                        {item.title}
                      </p>
                      <p className="text-gray-600 text-sm sm:text-base mt-2">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}

                {/* TOTAL */}
                <div className="mt-5 border-t pt-2 flex justify-between">
                  <p className="text-gray-600 text-sm sm:text-base">
                    Total Price:
                  </p>
                  <p className="font-semibold text-sm md:text-base">
                    {totalPrice} SEK
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-sm">
                Looks like your cart is empty. Please visit the shop to add more
                items.
              </p>
            )}

            {/* 2) Display Customer Info (if provided) */}
            {checkoutInfo && checkoutInfo.name && (
              <div className="mt-6 bg-gray-100 p-4 rounded-md">
                <h2 className="text-base font-semibold mb-2">
                  Customer Details
                </h2>
                <p className="text-sm">
                  <span className="font-semibold">Name:</span> {checkoutInfo.name}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Email:</span> {checkoutInfo.email}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Phone:</span> {checkoutInfo.phone}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Address:</span> {checkoutInfo.address}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* RIGHT SIDE: Next steps or additional info */}
        <Card className="w-full lg:w-1/3">
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
            <CardDescription>We hope you enjoy your new items!</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {/* Button linking back to homepage */}
            <Button asChild>
              <a href="/" data-cy="continue-shopping-button">
                Continue Shopping
              </a>
            </Button>
            {/* Additional post-checkout details if needed */}
          </CardContent>
        </Card>
      </main>

      {/* FOOTER pinned at bottom */}
      <SiteFooter />
    </div>
  );
}
