// app/categories/[slug]/page.tsx

import { db } from "@/prisma/client";
import { notFound } from "next/navigation";
import ProductCard from "@/components/products/ProductCard";
import { Metadata } from "next";

type Params = {
    slug: string;
};

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    return {
        title: `Produkter i kategorin "${params.slug}"`,
    };
}

export default async function CategoryPage({ params }: { params: Params }) {
    const category = decodeURIComponent(params.slug);

    // Hämta produkter i denna kategori
    const products = await db.product.findMany({
        where: {
            category: category,
        },
    });

    if (!products.length) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-slate-200 p-6">
            <h1 className="text-3xl font-bold text-center mb-8">{category}</h1>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </main>
    );
}