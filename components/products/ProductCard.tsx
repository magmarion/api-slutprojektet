"use client";

import AddToCartButton from "@/components/buttons/AddToCartButton";
import { Button } from "@/components/ui/button";
import type { Product } from "@/data";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <Link
            href={`/product/${product.articleNumber}/${product.title}`}
            key={product.articleNumber}
            data-cy="product"
            className="border rounded-md p-4 shadow-md bg-white flex md:flex-col items-center cursor-pointer transition-transform hover:scale-105"
        >
            <Image
                src={product.image}
                alt={product.title}
                width={200}
                height={150}
                className="object-contain w-[150px] h-[150px] rounded-md"
            />

            <div className="flex flex-col justify-between items-stretch md:w-full gap-2 ml-5 md:ml-0">
                <h2
                    data-cy="product-title"
                    className="text-lg font-semibold mt-2 hover:underline flex md:justify-center"
                >
                    {product.title}
                </h2>
                <p data-cy="product-price" className="text-gray-700 flex md:justify-center">
                    {product.price} SEK
                </p>

                <AddToCartButton
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    image={product.image}
                />

                <Button className="bg-slate-500 w-full rounded-xs cursor-pointer">
                    Info
                </Button>
            </div>
        </Link>
    );
}
