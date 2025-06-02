"use client";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useCartStore from "@/stores/cartStore";
import Image from "next/image";
import Link from "next/link";

export default function ConfirmationPage() {
  const params = useParams();
  const orderNumber = params?.orderNumber as string; // Typ-casta till string

  const { checkoutItems, checkoutInfo } = useCartStore();

  const orderTotal = checkoutItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

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
            <CardTitle>Tack för din beställning!</CardTitle>
            <CardDescription>
              Vi har tagit emot din beställning. Du får ett bekräftelsemejl på angivet mejl.
              {/* Order Number */}
              <p className="text-sm mt-2">
                Ordernummer: <span className="font-semibold">${orderNumber}</span>
              </p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* If there are items in the cart, show the summary */}
            {checkoutItems.length > 0 ? (
              <div className="bg-gray-100 p-4 rounded-md">
                {/* Cart Items */}
                {checkoutItems.map((item) => (
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
                        Antal: {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}

                {/* TOTAL */}
                <div className="mt-5 border-t pt-2 flex justify-between">
                  <p className="text-gray-600 text-sm sm:text-base">
                    Total Pris:
                  </p>
                  <p className="font-semibold text-sm md:text-base">
                    {orderTotal} SEK
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-sm">
                Det verkar som att din varukorg är tom. Besök butiken för att lägga till fler varor.
              </p>
            )}

            {/* Display Customer Info (if provided) */}
            {checkoutInfo && checkoutInfo.name && (
              <div className="mt-6 bg-gray-100 p-4 rounded-md">
                <h2 className="text-base font-semibold mb-2">
                  Kunduppgifter
                </h2>
                <p className="text-sm">
                  <span className="font-semibold">Namn:</span> {checkoutInfo.name}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">E-post:</span> {checkoutInfo.email}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Tel:</span> {checkoutInfo.phone}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Frakt Adress: <br /></span> {checkoutInfo.address} <br /> {checkoutInfo.zipcode} {checkoutInfo.city}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* RIGHT SIDE: Next steps or additional info */}
        <Card className="w-full lg:w-1/3">
          <CardHeader>
            <CardTitle>Nästa Steg</CardTitle>
            <CardDescription>Vi hoppas att du gillar dina nya varor!</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {/* Button linking back to homepage */}
            <Button asChild>
              <Link href="/" data-cy="continue-shopping-button">
                Fortsätt handla
              </Link>
            </Button>
            {/* Additional post-checkout details if needed */}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
