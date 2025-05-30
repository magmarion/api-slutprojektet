// components/FeaturedProducts.tsx
import ProductCard from "./products/ProductCard";

export default function FeaturedProducts({ products }: { products: any[] }) {
    return (
        <section className="w-full max-w-7xl px-6 py-8">
            <h2 className="text-2xl font-semibold text-center text-[#594100] mb-6">Utvalda produkter</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product) => (
                    <ProductCard key={product.articleNumber} product={product} />
                ))}
            </div>
        </section>
    );
}
