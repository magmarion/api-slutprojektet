"use client";

import AddToCartButton from "@/components/buttons/AddToCartButton";
import { Button } from "@/components/ui/button";
import type { Product } from "@/generated/prisma";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
    product: Product & { inStock?: boolean };
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div
            key={product.articleNumber}
            data-cy="product"
            className="relative p-4 shadow-sm bg-[#FFF6DA] flex flex-col justify-between hover:shadow-lg
               w-full max-w-[180px] sm:max-w-full mx-auto min-h-[340px]"
        >
            {/* ✅ Lagerstatus badge */}
            <span
                className={`absolute top-2 right-2 px-2 py-1 text-xs rounded-full font-medium z-10
                  ${product.inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
            >
                {product.inStock ? "I lager" : "Slut i lager"}
            </span>

            {/* Top Section: Mobile = row, Desktop = column */}
            <Link
                href={`/product/${product.articleNumber}/${product.title}`}
                className="flex flex-col items-center gap-4"
            >
                <div className="overflow-hidden w-full">
                    <Image
                        src={product.image}
                        alt=""
                        width={350}
                        height={350}
                        className="object-cover w-full h-[180px] sm:h-[200px] md:h-[250px] lg:h-[300px] 
             transition-transform duration-300 ease-out group-hover:scale-110 hover:scale-110"
                    />
                </div>

                <div className="flex flex-col items-center flex-1">
                    <div className="min-h-[60px] flex items-center justify-center text-center">
                        <h2 className="text-sm md:text-base font-semibold hover:underline text-center min-h-[40px]">
                            {product.title.includes('(') ? (
                                <div className="flex flex-col gap-0 items-center">
                                    <span>{product.title.split('(')[0].trim()}</span>
                                    <span className="text-sm">
                                        {product.title.split('(')[1]}
                                    </span>
                                </div>
                            ) : (
                                product.title
                            )}
                        </h2>

                    </div>
                    <p className="text-gray-800">
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
                        Information
                    </Button>
                </Link>
            </div>
        </div>
    );
}