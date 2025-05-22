"use client";

import AddToCartButton from "@/components/buttons/AddToCartButton";
import { Button } from "@/components/ui/button";
import type { Product } from "@/generated/prisma";
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
            className="border p-4 shadow-md bg-white flex flex-col md:flex-col items-start md:items-center gap-4 transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-lg"
        >
            {/* Top Section: Mobile = row, Desktop = column */}
            <Link
                href={`/product/${product.articleNumber}/${product.title}`}
                className="flex flex-col md:flex-col items-start md:items-center w-full gap-4"
            >
                <Image
                    src={product.image}
                    alt=''
                    width={150}
                    height={150}
                    className="object-cover w-full h-[200px] sm:h-[150px] md:h-[200px] lg:h-[250px]"
                />

                <div className="flex flex-col justify-center md:items-center flex-1">
                    <h2
                        className="text-base md:text-lg font-semibold hover:underline"
                    >
                        {product.title}
                    </h2>
                    <p className="text-gray-700">
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
                    <Button variant="secondary" size="full">
                        Info
                    </Button>
                </Link>
            </div>
        </div>

    );
}
