import ProductCard from "@/components/products/ProductCard";
import { db } from "prisma/client";
import { FaBoxOpen } from "react-icons/fa";

export default async function ProductsPage() {
    const products = await db.product.findMany({
        include: { category: true },
    });

    return (
        <main className="min-h-screen bg-slate-100">
            {/* Hero Section */}
            <div className="bg-gradient-to-b from-slate-900 to-slate-800 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Explore Our Products</h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        Discover the latest tech innovations at amazing prices
                    </p>
                </div>
            </div>

            {/* Products Grid */}
            <div className="container mx-auto px-4 py-16">
                {products.length === 0 ? (
                    <div className="text-center py-20">
                        <FaBoxOpen className="w-24 h-24 text-slate-400 mx-auto mb-6" />
                        <p className="text-2xl text-slate-600">No products found</p>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {products.map((product) => (
                            <ProductCard key={product.articleNumber} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}