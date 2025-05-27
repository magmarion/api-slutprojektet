// app/page.tsx

import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/products/ProductCard";
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
        <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#FEFAE1] to-[#daa400]">
            <HeroSection />
            <h1 className="text-3xl font-bold text-center text-[#594100] m-6">
                Gröna drömmar blir verklighet hos oss! Köp nu våra blommar för fan!
            </h1>

            {/* Visa alla produkter som standard */}
            <div className="grid grid-cols-2 gap-4 px-4 py-6 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product) => {
                    const mappedProduct = {
                        id: product.id,
                        createdAt: product.createdAt,
                        updatedAt: product.updatedAt,
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