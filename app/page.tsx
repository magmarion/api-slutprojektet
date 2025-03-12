import BuyButton from "@/components/buttons/BuyButton";
import { db } from "@/prisma/db";
import Image from "next/image";
import Link from "next/link";


export default async function Home() {
    const products = await db.product.findMany();
    return (
        <main className="flex min-h-screen flex-col items-center p-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
                Welcome to the webshop!
            </h1>
            <p className="text-gray-600 mb-8">Here you will find our best products</p>

            <div className="flex flex-wrap justify-between items-center gap-4">
                {products.map((products) => (
                    <div
                        key={products.articleNumber}
                        className="border rounded-lg p-4 shadow-md bg-white"
                    >
                        <Link href={`/product/${products.articleNumber}/${products.title}`}>
                            <Image
                                src={products.image}
                                alt={products.title}
                                width={200}
                                height={150}
                                className="object-cover w-full h-40 rounded-md cursor-pointer"
                            />
                        </Link>
                        <Link href={`/product/${products.articleNumber}/${products.title}`}>
                            <h2 className="text-lg font-semibold mt-2 hover:underline">
                                {products.title}
                            </h2>
                        </Link>
                        <p className="text-gray-700">Price: {products.price} SEK</p>
                        <BuyButton/>
                    </div>
                ))}
            </div>
        </main>
    );
}
