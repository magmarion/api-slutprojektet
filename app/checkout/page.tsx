"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const checkoutSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Email is invalid"),
  address: z.string().min(1, { message: "Address is required" }),
  zip: z.string().min(1, { message: "Zip is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  city: z.string().min(1, { message: "City is required" }),
  phone: z.string().min(1, "Phone number is invalid"),
  cardNumber: z.string().regex(/^\d{16}$/, "Card number is invalid"),
  expirationDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid format, ex. 12/24"),
  cvc: z.string().regex(/^\d{3,4}$/, "CVC needs to be 3 or 4 digits"),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  // 3. Använd zodResolver för att koppla schemat till React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  // 4. Hantera "submit"
  const router = useRouter();
  const onSubmit = (data: CheckoutFormData) => {
    console.log("Formulärdata:", data);
    router.push("/checkout/success");
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Namn */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            {...register("name")}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* E-post */}
        <div className="mb-4">
          <label className="block font-medium mb-1">E-mail</label>
          <input
            type="email"
            {...register("email")}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Telefonnummer */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Phone</label>
          <input
            type="tel"
            {...register("phone")}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Address</label>
          <input
            type="text"
            {...register("address")}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Zip code</label>
          <input
            type="text"
            {...register("zip")}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.zip && (
            <p className="text-red-500 text-sm mt-1">{errors.zip.message}</p>
          )}
        </div>
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
        <div className="mb-4">
          <label className="block font-medium mb-1">City</label>
          <input
            type="text"
            {...register("city")}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
          )}
          <div>
            <img  className="pt-15" src="/Credit-Card-Icons.png" alt="credit cards" />
          </div>
        </div>

        {/* Kortnummer */}
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

        {/* Utgångsdatum */}
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
            <p className="text-red-500 text-sm mt-1">{errors.cvc.message}</p>
          )}
        </div>

        {/* Submit-knapp */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Confirm
        </button>
      </form>
    </div>
  );
}
