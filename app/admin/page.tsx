"use client";

import AddProductForm from "./AddProductForm";
import AdminProductsGrid from "./AdminProductsGrid";

import { getAllProducts } from "@/app/admin/actions";
import { useEffect, useState } from "react";
import { Product, Category } from "@/generated/prisma";

export default function AdminPage() {
  const [products, setProducts] = useState<(Product & { categories: Category[] })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getAllProducts();
        setProducts(result);
      } catch (error) {
        console.error("Failed to load products", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-[#3D5300] mb-8">
        Admin Dashboard
      </h1>

      {/* Product Creation Form */}
      <section className="mb-10">
        <AddProductForm />
      </section>

      {/* Product List */}
      <section>
        <h2 className="text-2xl font-semibold text-[#3D5300] mb-4">
          All Products
        </h2>
        {loading ? (
          <p className="text-gray-700">Loading products...</p>
        ) : products.length > 0 ? (
          <AdminProductsGrid products={products} />
        ) : (
          <p className="text-gray-500">No products found.</p>
        )}
      </section>
    </main>
  );
}
