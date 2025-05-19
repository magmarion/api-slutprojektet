import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/products/ProductCard";
import { db } from "@/prisma/client";

export default async function Home() {

    // Hämta bara de produkter som ska visas på den aktuella sidan
    const products = await db.product.findMany();

    return (
        <main className="flex min-h-screen flex-col items-center bg-slate-200">
            < HeroSection />
            <h1 className="text-2xl font-bold text-center text-gray-900 m-6">
                supah dupah hot deals right now
            </h1>

            <div className="grid grid-cols-1 px-8 py-4 pb-11 gap-3 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product) => (
                    <ProductCard key={product.articleNumber} product={product} />
                ))}
            </div>

    
        </main>
    );
}

