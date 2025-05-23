// app/page.tsx

import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/products/ProductCard";
import { Product } from "@/data";
import { db } from "@/prisma/client";

export default async function Home() {
    // Hämta unika kategorier från databasen
    const categories = await db.category.findMany({
        select: { name: true }, 
    });

    // Hämta alla produkter
    const products = await db.product.findMany({
        include: { categories: true },
    });

    return (
        <main className="flex min-h-screen flex-col items-center bg-slate-200">
            <HeroSection />
            <h1 className="text-2xl font-bold text-center text-gray-900 m-6">
                Vackert på balkongen, vackert hemma, vackert i trädgården. Köp nu våra blommar för fan!
            </h1>

            {/* Kategorilänkar */}
            <div className="flex justify-center gap-4 mb-8">
                {categories.map((cat) => (
                    <a
                        key={cat.name}
                        href={`/categories/${encodeURIComponent(cat.name)}`}
                        className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-600"
                    >
                        {cat.name}
                    </a>
                ))}
            </div>

            {/* Visa alla produkter som standard */}
            <div className="grid grid-cols-1 px-8 py-4 pb-11 gap-3 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product) => {
                    const mappedProduct: Product = {
                        id: product.id,
                        articleNumber: product.articleNumber,
                        image: product.image,
                        title: product.title,
                        description: product.description,
                        price: product.price,
                        category: product.categories.map((c: { name: string }) => c.name),
                    };
                    return (
                        <ProductCard key={mappedProduct.articleNumber} product={mappedProduct} />
                    );
                })}
            </div>
        </main>
    );
}