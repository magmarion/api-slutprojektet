import AllProductsGrid from "@/components/AllProductsGrid";
import FeaturedProducts from "@/components/FeaturedProducts";
import HeroSection from "@/components/HeroSection";
import Newsletter from "@/components/Newsletter";
import USPSection from "@/components/USPSection";
import { db } from "@/prisma/client";

export default async function Home() {
    const categories = await db.category.findMany({ select: { name: true } });
    const products = await db.product.findMany({ include: { categories: true } });
    
    const featured = products.slice(0, 4);

    return (
        <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#FEFAE1] to-[#daa400]">
            <HeroSection />

            <h1 className="text-3xl font-bold text-center text-[#594100] m-6">
                Gröna drömmar blir verklighet hos oss
            </h1>

            <USPSection />

            <FeaturedProducts products={featured} />

            <AllProductsGrid products={products} />

            <Newsletter />

        </main>
    );
}
