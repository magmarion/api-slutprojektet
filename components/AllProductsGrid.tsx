import React from "react";
import ProductCard from "@/components/products/ProductCard";
import { Product } from "@/generated/prisma";

interface ProductCategory {
  name: string;
}

interface ExtendedProduct extends Product {
  categories: ProductCategory[];
  stock: number; // ✅ include stock
}

interface AllProductsGridProps {
  products: ExtendedProduct[];
}

export default function AllProductsGrid({ products }: AllProductsGridProps) {
  return (
    <section className="w-full px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4 text-center text-[#594100]">
        Alla produkter
      </h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
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
            stock: product.stock,
            inStock: product.stock > 0, // ✅ set inStock based on stock value
            category: product.categories.map((c: { name: string }) => c.name),
          };
          return (
            <ProductCard
              key={mappedProduct.articleNumber}
              product={mappedProduct}
            />
          );
        })}
      </div>
    </section>
  );
}
