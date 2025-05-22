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
            className="p-4 shadow-sm bg-white flex flex-col justify-between hover:shadow-lg"
        >
            {/* Top Section: Mobile = row, Desktop = column */}
            <Link
                href={`/product/${product.articleNumber}/${product.title}`}
                className="flex flex-col items-center gap-4"
            >
                <div className="overflow-hidden w-full">
                    <Image
                        src={product.image}
                        alt=''
                        width={350}
                        height={350}
                        className="object-cover w-full h-[300px] md:h-[200px] lg:h-[250px] xl:h-[350px] 
                      transition-transform duration-300 ease-out 
                      group-hover:scale-110 hover:scale-110"
                    />
                </div>

                <div className="flex flex-col items-center flex-1">
                    <h2 className="text-base md:text-lg font-semibold hover:underline">
                        {product.title.includes('(') ? (
                            <div className="flex flex-col gap-0 items-center">
                                <span>{product.title.split('(')[0].trim()}</span>
                                <span className="text-sm">
                                    ({product.title.split('(')[1]}
                                </span>
                            </div>
                        ) : (
                            product.title
                        )}
                    </h2>
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
                        Info
                    </Button>
                </Link>
            </div>
        </div>

    );
}
