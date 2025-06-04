import ProductCard from "@/components/products/ProductCard";
import { db } from "@/prisma/client";
import { notFound } from "next/navigation";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const category = decodeURIComponent(slug);

    // Hämta produkter i denna kategori (befintlig kod)
    const products = await db.product.findMany({
        where: {
            categories: {
                some: {
                    name: category,
                },
            },
        },
        include: {
            categories: true,
        },
    });

    if (!products.length) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-gradient-to-b from-[#FEFAE1] to-[#daa400] px-4 py-8">
            {/* Förbättrad rubriksektion */}
            <section className="max-w-6xl mx-auto text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-[#4B352A] mb-3 font-playfair">
                    {category}
                </h1>
                <p className="text-lg text-[#516036] max-w-2xl mx-auto">
                    Upptäck vårt utsökta urval av {category.toLowerCase()}. Naturligt sköna och vackra val för ditt hem.
                </p>
            </section>

            {/* Produktgrid med förbättringar */}
            <section className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* Kategoriinfo-fotter */}
                <div className="mt-16 p-8 bg-white/50 rounded-xl text-center border border-[#F4D794]">
                    <h3 className="text-xl font-semibold text-[#3D5300] mb-3">
                        Om våra {category.toLowerCase()}
                    </h3>
                    <p className="text-[#4B352A] max-w-3xl mx-auto">
                        Alla våra {category.toLowerCase()} odlas med omsorg och hållbarhet i fokus.
                        Vi arbetar direkt med lokala odlare för att garantera fräschhet och kvalitet.
                    </p>
                </div>
            </section>
        </main>
    );
}