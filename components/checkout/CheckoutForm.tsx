"use client";

import useCartStore from "@/stores/cartStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";

// Zod schema: zip must be exactly 5 digits, e.g. "12345"
const checkoutSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().min(1, { message: "Email is required" }).email("Email is invalid"),
  address: z.string().min(1, { message: "Address is required" }),
  zipcode: z.string().regex(/^\d{5}$/, { message: "Zip must be exactly 5 digits" }),
  city: z.string().min(1, { message: "City is required" }),
  phone: z.string().regex(/^\d{10}$/, { message: "Phone must be exactly 10 digits" }),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutForm() {
  const router = useRouter();
  const { setCheckoutInfo } = useCartStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = (data: CheckoutFormData) => {
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

    router.push(`/confirmation/${orderNumber}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-cy="customer-form" className="flex flex-col">
      {/* Name */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Name</label>
        <input
          type="text"
          data-cy="customer-name"
          autoComplete="name"
          {...register("name")}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.name && (
          <p data-cy="customer-name-error" className="text-red-500 text-sm mt-1">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* E-mail */}
      <div className="mb-4">
        <label className="block font-medium mb-1">E-mail</label>
        <input
          type="email"
          data-cy="customer-email"
          autoComplete="email"
          {...register("email")}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.email && (
          <p data-cy="customer-email-error" className="text-red-500 text-sm mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Phone */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Phone</label>
        <input
          type="tel"
          data-cy="customer-phone"
          autoComplete="tel"
          {...register("phone")}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.phone && (
          <p data-cy="customer-phone-error" className="text-red-500 text-sm mt-1">
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* Address */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Address</label>
        <input
          type="text"
          data-cy="customer-address"
          autoComplete="street-address"
          {...register("address")}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.address && (
          <p data-cy="customer-address-error" className="text-red-500 text-sm mt-1">
            {errors.address.message}
          </p>
        )}
      </div>

      {/* Zip code */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Zip code</label>
        <input
          type="text"
          data-cy="customer-zipcode"
          autoComplete="postal-code"
          {...register("zipcode")}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.zipcode && (
          <p data-cy="customer-zipcode-error" className="text-red-500 text-sm mt-1">
            {errors.zipcode.message}
          </p>
        )}
      </div>

      {/* City */}
      <div className="mb-4">
        <label className="block font-medium mb-1">City</label>
        <input
          type="text"
          data-cy="customer-city"
          autoComplete="address-level2"
          {...register("city")}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.city && (
          <p data-cy="customer-city-error" className="text-red-500 text-sm mt-1">
            {errors.city.message}
          </p>
        )}
        <div className="w-full md:w-[50%] flex justify-center items-center mt-4">
          <img className="cursor-pointer" src="/Credit-Card-Icons.png" alt="credit cards" />
        </div>
      </div>

      {/* Card number (static text) */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Card number</label>
        <p className="p-2 border border-gray-300 rounded bg-gray-50">
          4242 4242 4242 4242
        </p>
      </div>

      {/* Expiration date (static text) */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Expiration (MM/YY)</label>
        <p className="p-2 border border-gray-300 rounded bg-gray-50">
          12/30
        </p>
      </div>

      {/* CVC (static text) */}
      <div className="mb-6">
        <label className="block font-medium mb-1">CVC</label>
        <p className="p-2 border border-gray-300 rounded bg-gray-50">
          123
        </p>
      </div>

      {/* Payment button */}
      <Button
        type="submit"
        className="bg-blue-800 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded cursor-pointer"
      >
        Pay with Card
      </Button>
    </form>
  );
}
