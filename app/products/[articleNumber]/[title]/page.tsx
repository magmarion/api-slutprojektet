import AddToCartButton from "@/components/buttons/AddToCartButton";
import { db } from "prisma/client";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function ProductDetail({
    params,
}: {
    params: { articleNumber: string; title: string };
}) {
    const { articleNumber } = params;

    const product = await db.product.findFirst({
        where: { articleNumber },
    });

    if (!product) return notFound();

    return (
        <main className="flex min-h-screen items-center justify-center bg-gradient-to-r from-gray-100 to-gray-300 p-10">
            <div
                data-cy="product"
                className="flex flex-col lg:flex-row bg-white shadow-lg rounded-xl overflow-hidden p-8 max-w-4xl border border-gray-200"
            >
                <Image
                    src={product.image}
                    alt={product.title}
                    width={540}
                    height={540}
                    className="rounded-lg border p-4 shadow-md bg-gray-100 lg:w-1/2"
                    priority
                />

                <div className="lg:w-1/2 p-6 flex flex-col justify-between">
                    <div>
                        <h1 data-cy="product-title" className="text-3xl font-bold text-gray-900">
                            {product.title}
                        </h1>
                        <p data-cy="product-description" className="text-gray-700 text-lg mt-4 leading-relaxed">
                            {product.description}
                        </p>
                    </div>

                    <div>
                        <p data-cy="product-price" className="text-gray-900 text-xl font-bold mt-6">
                            Price: {product.price} SEK
                        </p>
                        <div className="mt-6">
                            <AddToCartButton
                                id={product.id}
                                title={product.title}
                                price={product.price}
                                image={product.image}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
