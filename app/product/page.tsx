import ProductCard from "@/components/products/ProductCard";
import { db } from "@/prisma/db";

export default async function ProductsPage() {
    const products = await db.product.findMany();

    return (
        <main className="flex min-h-screen flex-col items-center bg-slate-200 ">
            <h1 className="text-2xl font-bold text-gray-800 m-10">all products</h1>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product) => (
                    <ProductCard key={product.articleNumber} product={product} />
                ))}
            </div>
        </main>
    );
}
