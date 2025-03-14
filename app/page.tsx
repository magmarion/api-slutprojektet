import AddToCartButton from "@/components/buttons/AddToCartButton";
import { db } from "@/prisma/db";
import Image from "next/image";
import Link from "next/link";


export default async function Home() {
    const products = await db.product.findMany();

    products.forEach((product) => {
        console.log("Type of product.id:", typeof product.id, "Value:", product.id);
    });

    return (
        <main className="flex min-h-screen flex-col items-center p-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
                Welcome to the webshop!
            </h1>
            <p className="text-gray-600 mb-8">Here you will find our best products</p>

            <div className="flex flex-wrap justify-between items-center gap-4">
                {products.map((product) => (
                    <div
                        data-cy="product"
                        key={product.articleNumber}
                        className="border rounded-lg p-4 shadow-md bg-white"
                    >
                        <Link href={`/product/${product.articleNumber}/${product.title}`}>
                            <Image
                                src={product.image}
                                alt={product.title}
                                width={200}
                                height={150}
                                className="object-cover w-full h-40 rounded-md cursor-pointer"
                            />
                        </Link>
                        <Link href={`/product/${product.articleNumber}/${product.title}`}>
                            <h2
                                data-cy="product-title"
                                className="text-lg font-semibold mt-2 hover:underline">
                                {product.title}
                            </h2>
                        </Link>
                        <p
                            data-cy="product-price"
                            className="text-gray-700">Price: {product.price} SEK</p>
                        <AddToCartButton id={product.id} title={product.title} price={product.price} />
                    </div>
                ))}
            </div>
        </main>
    );
}
