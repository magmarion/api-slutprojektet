// app/page.tsx

import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/products/ProductCard";
import { Product } from "@/data";
import { db } from "@/prisma/client";

export default async function Home() {
    // Hämta unika kategorier från databasen
    const categories = await db.product.groupBy({
        by: ["category"],
    });

    // Hämta alla produkter
    const products = await db.product.findMany();

    return (
        <main className="flex min-h-screen flex-col items-center bg-slate-200">
            <HeroSection />
            <h1 className="text-2xl font-bold text-center text-gray-900 m-6">
                Supah dupah hot deals right now
            </h1>

            {/* Kategorilänkar */}
            <div className="flex justify-center gap-4 mb-8">
                {categories.map((cat) => (
                    <a
                        key={cat.category}
                        href={`/categories/${encodeURIComponent(cat.category)}`}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        {cat.category}
                    </a>
                ))}
            </div>

            {/* Visa alla produkter som standard */}
            <div className="grid grid-cols-1 px-8 py-4 pb-11 gap-3 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product: Product) => (
                    <ProductCard key={product.articleNumber} product={product} />
                ))}
            </div>
        </main>
    );
}