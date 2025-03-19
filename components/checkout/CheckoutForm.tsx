"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useCartStore from "@/stores/cartStore";
import { Button } from "../ui/button";

const checkoutSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().min(1, { message: "Email is required" }).email("Email is invalid"),
  address: z.string().min(1, { message: "Address is required" }),
  zip: z.number().min(1, "Zip is required"),
  country: z.string().min(1, { message: "Country is required" }),
  city: z.string().min(1, { message: "City is required" }),
  phone: z.string().min(1, "Phone number is invalid"),
  cardNumber: z.string().regex(/^\d{16}$/, "Card number is invalid"),
  expirationDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid format, ex. 12/24"),
  cvc: z.string().regex(/^\d{3,4}$/, "CVC needs to be 3 or 4 digits"),
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
      zip: data.zip,
      city: data.city,
      country: data.country,

    });


    router.push("/checkout/confirmation");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-cy="customer-form" className="flex flex-col">
      {/* Name */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Name</label>
        <input
          type="text"
          data-cy="customer-name"
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
          {...register("phone")}
          data-cy="customer-phone"
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
          {...register("address")}
          data-cy="customer-address"
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
          {...register("zip", { valueAsNumber: true })}
          data-cy="customer-zipcode"
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.zip && (
          <p data-cy="customer-zipcode-error" className="text-red-500 text-sm mt-1">
            {errors.zip.message}
          </p>
        )}
      </div>

      {/* Country */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Country</label>
        <input
          type="text"
          {...register("country")}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.country && (
          <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
        )}
      </div>

      {/* City */}
      <div className="mb-4">
        <label className="block font-medium mb-1">City</label>
        <input
          type="text"
          {...register("city")}
          data-cy="customer-city"
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

      {/* Card number */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Card number</label>
        <input
          type="text"
          {...register("cardNumber")}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.cardNumber && (
          <p className="text-red-500 text-sm mt-1">
            {errors.cardNumber.message}
          </p>
        )}
      </div>

      {/* Expiration date */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Expiration (MM/YY)</label>
        <input
          type="text"
          placeholder="MM/YY"
          {...register("expirationDate")}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.expirationDate && (
          <p className="text-red-500 text-sm mt-1">
            {errors.expirationDate.message}
          </p>
        )}
      </div>

      {/* CVC */}
      <div className="mb-6">
        <label className="block font-medium mb-1">CVC</label>
        <input
          type="text"
          {...register("cvc")}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.cvc && (
          <p className="text-red-500 text-sm mt-1">
            {errors.cvc.message}
          </p>
        )}
      </div>

      {/* Submit button */}
      <Button
        type="submit"
        className="bg-blue-800 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded cursor-pointer"
      >
        Confirm
      </Button>
    </form>
  );
}
