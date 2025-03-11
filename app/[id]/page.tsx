import Image from "next/image";
import { notFound } from "next/navigation";
import { products } from "../product-data";

export default function ProductDetail({ params }: { params: { id: string } }) {
    const product = products.find((p) => p.id.toString() === params.id);

    if (!product) return notFound();

    return (
        <main className="p-10">
            <h1 data-cy="product-title" className="text-3xl font-bold">{product.name}</h1>
            <Image
                src={product.image}
                alt={product.name}
                width={240}
                height={240}
                className="rounded-lg my-4 border p-4 shadow-md bg-white"
                priority
            />
            {/* Product description */}
            <p data-cy="product-description" className="text-gray-700"></p>
            <p data-cy="product-price" className="text-gray-700 text-lg ml-14">Price: {product.price} SEK</p>
        </main>
    );
}