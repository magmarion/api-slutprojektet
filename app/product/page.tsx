import ProductCard from "@/components/products/ProductCard";
import { db } from "@/prisma/client";
import { FaBoxOpen } from "react-icons/fa";

export default async function ProductsPage() {
    const products = await db.product.findMany({
        include: { categories: true },
    });

    return (
        <main className="min-h-screen bg-gradient-to-b from-[#FEFAE1] to-[#daa400]">
            {/* Hero Section */}
            <div className="bg-gradient-to-b from-[#3D5300] to-[#616F47] text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Upptäck vår kollektion</h1>
                    <p className="text-xl text-[#FEFAE1] max-w-2xl mx-auto">
                        Bläddra bland handplockade växter och blomsterarrangemang – perfekt för ditt hem eller som gåva.
                    </p>
                </div>
            </div>

            {/* Products Grid */}
            <div className="container mx-auto px-4 py-16">
                {products.length === 0 ? (
                    <div className="text-center py-20">
                        <FaBoxOpen className="w-24 h-24 text-slate-400 mx-auto mb-6" />
                        <p className="text-2xl text-slate-600">Inga produkter hittades</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-4 px-4 py-6 md:grid-cols-3 lg:grid-cols-4">
                        {products.map((product) => (
                            <ProductCard key={product.articleNumber} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
