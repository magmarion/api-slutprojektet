"use client";
import useCartStore from "@/stores/cartStore";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FaMinus, FaPlus } from "react-icons/fa";
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
    const { cartItems, totalPrice, increaseQuantity, decreaseQuantity } = useCartStore();

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
                                    <div className="flex flex-col max-[440px]:items-center max-[440px]:mr-4">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            width={50}
                                            height={50}
                                            className="rounded-md mr-4 max-[440px]:mb-2"
                                        />
                                        {/* Price (under the image on screens < 440px) */}
                                        <p className="font-semibold text-sm sm:text-base max-[440px]:block hidden">
                                            {item.price} SEK
                                        </p>
                                    </div>

                                    {/* Product Info and Quantity */}
                                    <div className="flex flex-col items-start flex-1 min-w-0">
                                        {/* Title */}
                                        <p className="font-semibold text-sm sm:text-base max-[440px]:mb-8">
                                            {item.title}
                                        </p>
                                        {/* Quantity with Increase and Decrease Buttons */}
                                        <div className="flex items-center space-x-2 mt-2">
                                            <p className="text-gray-600 text-xs sm:text-base w-24">
                                                Quantity: {item.quantity}
                                            </p>
                                            <button
                                                data-cy="increase-quantity-button"
                                                onClick={() => increaseQuantity(item.id)}
                                                className="text-slate-500 hover:text-slate-700 text-sm cursor-pointer transition-all duration-300 hover:scale-125"
                                            >
                                                <FaPlus className="w-3 h-3" />
                                            </button>
                                            <button
                                                data-cy="decrease-quantity-button"
                                                onClick={() => decreaseQuantity(item.id)}
                                                className="text-slate-500 hover:text-slate-700 text-sm cursor-pointer transition-all duration-300 hover:scale-125"
                                            >
                                                <FaMinus className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <p className="font-semibold text-sm sm:text-base ml-4 max-[440px]:hidden">
                                        {item.price} SEK
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p>No items in cart.</p>
                        )}

                        {/* Total Price */}
                        <div className="mt-5 border-t pt-2 flex justify-between">
                            <p className="text-gray-600 text-sm sm:text-base">Total Price:</p>
                            <p data-cy="total-price" className="font-semibold text-sm md:text-base">
                                {totalPrice} SEK
                            </p>
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
