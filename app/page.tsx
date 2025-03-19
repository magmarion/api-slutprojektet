import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { db } from "@/prisma/db";
import Link from "next/link";

export default async function Home({
    searchParams,
}: {
    searchParams: { page?: string };
}) {
    const pageSize = 12;
    // Läs av nuvarande sida från query-parametrarna, defaulta till 1 om inget anges
    const currentPage = parseInt(searchParams.page ?? "1", 10);
    const skip = (currentPage - 1) * pageSize;

    // Hämta bara de produkter som ska visas på den aktuella sidan
    const products = await db.product.findMany({
        skip,
        take: pageSize,
    });

    // Om du vill ha totala antalet produkter för att kunna räkna ut antalet sidor:
    const totalProducts = await db.product.count();
    const totalPages = Math.ceil(totalProducts / pageSize);
    return (
        <main className="flex min-h-screen flex-col items-center bg-slate-200  ">
            < HeroSection />
            <h1 className="text-2xl font-bold text-center text-gray-900 m-10">
                Supah Dupah Hot Deals Right Now
            </h1>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product) => (
                    <ProductCard key={product.articleNumber} product={product} />
                ))}
            </div>


            {/* Pagination-länkar */}
            <div className="flex gap-4 my-8">
                {currentPage > 1 && (
                    <Link href={`/?page=${currentPage - 1}`}>
                        <Button className="rounded-xs cursor-pointer">Previous</Button>
                    </Link>
                )}
                {currentPage < totalPages && (
                    <Link href={`/?page=${currentPage + 1}`}>
                        <Button className="rounded-xs cursor-pointer ">Next</Button>
                    </Link>
                )}
            </div>
        </main>
    );
}
