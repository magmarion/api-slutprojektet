import AddToCartButton from "@/components/buttons/AddToCartButton";
import HeroSection from "@/components/HeroSection";
import { Button } from "@/components/ui/button";
import { db } from "@/prisma/db";
import Image from "next/image";
import Link from "next/link";

export default async function Home({
    searchParams,
}: {
    searchParams: { page?: string };
}) {
    const pageSize = 10;
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
                    <Link
                        href={`/product/${product.articleNumber}/${product.title}`}
                        key={product.articleNumber}
                        className="border rounded-md p-4 shadow-md bg-white flex md:flex-col items-center cursor-pointer transition-transform hover:scale-105"
                        data-cy="product"
                    >
                        <Image
                            src={product.image}
                            alt={product.title}
                            width={200}
                            height={150}
                            className="object-contain w-[150px] h-[150px] rounded-md"
                        />
                        <div className="flex flex-col justify-between items-stretch md:w-full gap-2 ml-5 md:ml-0">
                            <h2
                                data-cy="product-title"
                                className="text-lg font-semibold mt-2 hover:underline flex md:justify-center"
                            >
                                {product.title}
                            </h2>
                            <div className="flex md:justify-center">
                                <p>Apple</p>
                            </div>
                            <p data-cy="product-price" className="text-gray-700 flex md:justify-center">
                                {product.price} SEK
                            </p>
                            <AddToCartButton
                                id={product.id}
                                title={product.title}
                                price={product.price}
                                image={product.image}
                            />
                            <Button className="bg-slate-500 w-full rounded-xs cursor-pointer">Info</Button>
                        </div>
                    </Link>
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
