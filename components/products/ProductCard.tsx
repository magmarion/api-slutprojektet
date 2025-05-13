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
        <div
            key={product.articleNumber}
            data-cy="product"
            className="border rounded-md p-4 shadow-md bg-white flex flex-col md:flex-col items-start md:items-center gap-4 transition-transform hover:scale-105"
        >
            {/* Top Section: Mobile = row, Desktop = column */}
            <Link
                href={`/product/${product.articleNumber}/${product.title}`}
                className="flex flex-row md:flex-col items-start md:items-center w-full gap-4"
            >
                <Image
                    src={product.image}
                    alt={product.title}
                    width={150}
                    height={150}
                    className="object-contain w-[100px] h-[100px] md:w-[150px] md:h-[150px] rounded-md"
                />

                <div className="flex flex-col justify-center md:items-center flex-1">
                    <h2
                        data-cy="product-title"
                        className="text-base md:text-lg font-semibold hover:underline"
                    >
                        {product.title}
                    </h2>
                    <p data-cy="product-price" className="text-gray-700">
                        {product.price} SEK
                    </p>
                </div>
            </Link>

            {/* Buttons Section */}
            <div className="flex flex-col w-full gap-2 mt-2 md:mt-4">
                <AddToCartButton
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    image={product.image}
                />
                <Link href={`/product/${product.articleNumber}/${product.title}`}>
                    <Button className="bg-slate-500 w-full rounded-xs cursor-pointer">
                        Info
                    </Button>
                </Link>
            </div>
        </div>

    );
}
