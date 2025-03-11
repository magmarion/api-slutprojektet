"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { products } from "./product-data";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center p-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
                Welcome to the webshop!
            </h1>
            <p className="text-gray-600 mb-8">Here you will find our best products</p>

            <div className="flex flex-wrap justify-between items-center gap-4">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="border rounded-lg p-4 shadow-md bg-white"
                    >
                        <Link href={`/${product.id}`}>
                            <Image
                                src={product.image}
                                alt={product.name}
                                width={200}
                                height={150}
                                className="object-cover w-full h-40 rounded-md cursor-pointer"
                            />
                        </Link>
                        <Link href={`/product/${product.id}`}>
                            <h2 className="text-lg font-semibold mt-2 hover:underline">
                                {product.name}
                            </h2>
                        </Link>
                        <p className="text-gray-700">Price: {product.price} SEK</p>
                        <Button
                            onClick={() => toast.success("Added to cart!")}
                            className="mt-3 w-full cursor-pointer"
                        >
                            Buy
                        </Button>
                    </div>
                ))}
            </div>
        </main>
    );
}
