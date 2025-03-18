"use client";

import React from "react";
import { useCartStore } from "@/stores/cartStore";
import Image from "next/image";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Button } from "@/components/ui/button";
  

  export default function ConfirmationPage() {
    const { cartItems, totalPrice } = useCartStore();
  
    return (
      <div
        data-cy="confirmation-page"
        className="flex flex-col lg:flex-row justify-evenly items-start w-full p-4 gap-8"
      >
        {/* LEFT SIDE: Thank you message + Order summary */}
      <Card className="w-full lg:w-1/2 lg:pr-4">
        <CardHeader>
          <CardTitle>Thank you for your purchase!</CardTitle>
          <CardDescription>
            We appreciate your order. A confirmation email has been sent.
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
         {/* Order Summary */}
         {cartItems.length > 0 ? (
            <div className="bg-gray-100 p-4 rounded-md">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b pb-4 mb-4"
                >
               {/* Item Info */}
               <div className="flex items-center">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={50}
                      height={50}
                      className="rounded-md mr-4"
                    />
                    <div>
                      <p className="font-semibold text-sm sm:text-base">
                        {item.title}
                      </p>
                      <p className="text-gray-600 text-sm sm:text-base">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                  {/* Price */}
                  <p className="font-semibold text-sm sm:text-base ml-4">
                    {item.price} SEK
                  </p>
                </div>
              ))}     