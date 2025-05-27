"use client";

import useCartStore from "@/stores/cartStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { nanoid } from "nanoid";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";


// Zod schema: zip must be exactly 5 digits, e.g. "12345"
const checkoutSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Email is invalid"),
  address: z.string().min(1, { message: "Address is required" }),
  zipcode: z
    .string()
    .regex(/^\d{5}$/, { message: "Zip must be exactly 5 digits" }),
  city: z.string().min(1, { message: "City is required" }),
  phone: z
    .string()
    .regex(/^\d{10}$/, { message: "Phone must be exactly 10 digits" }),
});

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

  const onSubmit = (data: CheckoutFormData) => {

    if (cartItems.length === 0) {
      toast.error("Your cart is empty. Please add items to your cart before checking out.");
      return;
    }
    console.log("Form data:", data);

    setCheckoutInfo({
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      zipcode: data.zipcode,
      city: data.city,
    });


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
      {/* Name */}
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

      {/* E-mail */}
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

      {/* Phone */}
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

      {/* Address */}
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

      {/* Zip code */}
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

      {/* City */}
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

      {/* Card number (static text) */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Kortnummer</label>
        <p className="p-2 border border-gray-300 rounded bg-[#FFF6DA]">
          4242 4242 4242 4242
        </p>
      </div>

      {/* Expiration date (static text) */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Utgångsdatum (MM/YY)</label>
        <p className="p-2 border border-gray-300 rounded bg-[#FFF6DA]">12/30</p>
      </div>

      {/* CVC (static text) */}
      <div className="mb-6">
        <label className="block font-medium mb-1">CVC</label>
        <p className="p-2 border border-gray-300 rounded bg-[#FFF6DA]">123</p>
      </div>

      {/* Payment button */}
      <Button
        type="submit"
        className="bg-[#616F47] hover:bg-[#3D5300] text-white  font-semibold py-2 px-4 rounded cursor-pointer"
      >
        Betala med kort
      </Button>
    </form>
  );
}
function clearCart() {
  throw new Error("Function not implemented.");
}

