"use client";

import { createOrder } from "@/app/orders/actions";
import { checkoutSchema } from "@/lib/schemas";
import useCartStore from "@/stores/cartStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { nanoid } from "nanoid";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutForm() {
  const router = useRouter();
  const { setCheckoutInfo, cartItems } = useCartStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });


  const onSubmit = async (data: CheckoutFormData) => {
    if (cartItems.length === 0) {
      toast.error(
        "Din varukorg är tom. Lägg till produkter för att göra en beställning."
      );
      return;
    }

    setCheckoutInfo(data);

    const result = await createOrder({
      items: cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
      total: cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
      status: "PENDING",
    });

    if (!result.success) {
      if (result.error === "Du behöver logga in för att göra en beställning!") {
        toast.error(
          <>
            Du behöver vara inloggad för att slutföra din beställning.{" "}
            <a href="/signin" className="underline text-blue-600">
              Klicka här för att logga in.
            </a>
          </>
        );
      } else {
        toast.error(result.error || "Ordern kunde inte läggas.");
      }
      return;
    }


    const orderNumber = nanoid(8);
    const { setCheckoutItems, clearCart } = useCartStore.getState();
    setCheckoutItems(cartItems);
    clearCart();
    router.push(`/confirmation/${orderNumber}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      data-cy="customer-form"
      className="flex flex-col"
    >
      {/* Namn */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Namn</label>
        <input
          type="text"
          data-cy="customer-name"
          autoComplete="name"
          {...register("name")}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.name && (
          <p
            data-cy="customer-name-error"
            className="text-[#AF3E3E] text-sm mt-1"
          >
            {errors.name.message}
          </p>
        )}
      </div>

      {/* E-post */}
      <div className="mb-4">
        <label className="block font-medium mb-1">E-post</label>
        <input
          type="email"
          data-cy="customer-email"
          autoComplete="email"
          {...register("email")}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.email && (
          <p
            data-cy="customer-email-error"
            className="text-[#AF3E3E] text-sm mt-1"
          >
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Tel */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Tel</label>
        <input
          type="tel"
          data-cy="customer-phone"
          autoComplete="tel"
          {...register("phone")}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.phone && (
          <p
            data-cy="customer-phone-error"
            className="text-[#AF3E3E] text-sm mt-1"
          >
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* Adress */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Adress</label>
        <input
          type="text"
          data-cy="customer-address"
          autoComplete="street-address"
          {...register("address")}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.address && (
          <p
            data-cy="customer-address-error"
            className="text-[#AF3E3E] text-sm mt-1"
          >
            {errors.address.message}
          </p>
        )}
      </div>

      {/* Postnummer */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Postnummer</label>
        <input
          type="text"
          data-cy="customer-zipcode"
          autoComplete="postal-code"
          {...register("zipcode")}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.zipcode && (
          <p
            data-cy="customer-zipcode-error"
            className="text-[#AF3E3E] text-sm mt-1"
          >
            {errors.zipcode.message}
          </p>
        )}
      </div>

      {/* Ort */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Ort</label>
        <input
          type="text"
          data-cy="customer-city"
          autoComplete="address-level2"
          {...register("city")}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.city && (
          <p
            data-cy="customer-city-error"
            className="text-[#AF3E3E] text-sm mt-1"
          >
            {errors.city.message}
          </p>
        )}
        <div className="w-full md:w-[50%] flex justify-center items-center mt-4">
          <Image
            className="cursor-pointer"
            src="/Credit-Card-Icons.png"
            alt="credit cards"
            width={300}
            height={50}
          />
        </div>
      </div>

      {/* Kortnummer (statisk text) */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Kortnummer</label>
        <p className="p-2 border border-gray-300 rounded bg-[#FFF6DA]">
          4242 4242 4242 4242
        </p>
      </div>

      {/* Utgångsdatum (MM/YY) */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Utgångsdatum (MM/YY)</label>
        <p className="p-2 border border-gray-300 rounded bg-[#FFF6DA]">12/30</p>
      </div>

      {/* CVC */}
      <div className="mb-6">
        <label className="block font-medium mb-1">CVC</label>
        <p className="p-2 border border-gray-300 rounded bg-[#FFF6DA]">123</p>
      </div>

      {/* Betala med kort */}
      <Button
        type="submit"
        className="bg-[#616F47] hover:bg-[#3D5300] text-white font-semibold py-2 px-4 rounded cursor-pointer"
      >
        Betala med kort
      </Button>
    </form>
  );
}

function clearCart() {
  throw new Error("Function not implemented.");
}
