"use client";
import useCartStore from "@/stores/cartStore";
import Image from "next/image";
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
    zip: z.number().min(1, "Zip is required"),
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
    const { cartItems, totalPrice } = useCartStore();

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
        router.push("/checkout/confirmation");
    };

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
                                    className="flex items-center justify-between border-b pb-8 mb-2"
                                >
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        width={50}
                                        height={50}
                                        className="rounded-md"
                                    />

                                    <div className="flex flex-col items-start ml-20">
                                        <p className="font-semibold">{item.title}</p>
                                        <p className="text-gray-600">Quantity: {item.quantity}</p>
                                    </div>
                                    <p className="font-semibold ml-auto">{item.price} SEK</p>
                                </div>
                            ))
                        ) : (
                            <p>No items in cart.</p>
                        )}

                        <div className="mt-4 border-t pt-2 flex justify-between">
                            <p className="text-gray-600">Total Price:</p>
                            <p data-cy="total-price" className="font-semibold">{totalPrice} SEK</p>
                        </div>
                    </div>
                </div>
            </div>


            <div className="w-full lg:w-1/3">
                <form onSubmit={handleSubmit(onSubmit)} data-cy="customer-form" className="flex flex-col">
                    {/* Namn */}
                    <div className="mb-4">
                        <label className="block font-medium mb-1">Name</label>
                        <input
                            type="text"
                            data-cy="customer-name"
                            {...register("name")}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        {errors.name && (
                            <p data-cy="customer-name-error" className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                        )}
                    </div>

                    {/* E-post */}
                    <div className="mb-4">
                        <label className="block font-medium mb-1">E-mail</label>
                        <input
                            type="email"
                            data-cy="customer-email"
                            {...register("email")}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        {errors.email && (
                            <p data-cy="customer-email-error" className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Telefonnummer */}
                    <div className="mb-4">
                        <label className="block font-medium mb-1">Phone</label>
                        <input
                            type="tel"
                            {...register("phone")}
                            data-cy="customer-phone"
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        {errors.phone && (
                            <p data-cy="customer-phone-error" className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium mb-1">Address</label>
                        <input
                            type="text"
                            {...register("address")}
                            data-cy="customer-address"
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        {errors.address && (
                            <p data-cy="customer-address-error" className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium mb-1">Zip code</label>
                        <input
                            type="text"
                            {...register("zip")}
                            data-cy="customer-zipcode"
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        {errors.zip && (
                            <p data-cy="customer-zipcode-error" className="text-red-500 text-sm mt-1">{errors.zip.message}</p>
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
                            data-cy="customer-city"
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        {errors.city && (
                            <p data-cy="customer-city-error" className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                        )}
                        <div className="w-full md:w-[50%] flex justify-center items-center mt-4">
                            <img className="pt-15" src="/Credit-Card-Icons.png" alt="credit cards" />
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
        </div>
    );
}
