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