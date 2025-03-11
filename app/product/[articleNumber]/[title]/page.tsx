import { db } from "@/prisma/db";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function ProductDetail({ params }: { params: { articleNumber: string, title: string } }) {

    const product = await db.product.findUnique({
        where: { articleNumber: params.articleNumber },
    })

    if (!product) return notFound();

    return (
        <main className="p-10">
            <h1 data-cy="product-title" className="text-3xl font-bold">{product.title}</h1>
            <Image
                src={product.image}
                alt={product.title}
                width={240}
                height={240}
                className="rounded-lg my-4 border p-4 shadow-md bg-white"
                priority
            />
            {/* Product description */}
            <p data-cy="product-description" className="text-gray-700 ml-14">{product.description}</p>
            <p data-cy="product-price" className="text-gray-700 text-lg ml-14">Price: {product.price} SEK</p>
        </main>
    );
}