// app/categories/[slug]/page.tsx

import ProductCard from "@/components/products/ProductCard";
import { db } from "@/prisma/client";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = decodeURIComponent(slug);
  return {
    title: `Produkter i kategorin "${category}"`,
    description: `Utforska alla produkter i kategorin "${category}". Hitta det du behöver bland vårt breda sortiment.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = decodeURIComponent(slug);

  // Hämta produkter i denna kategori
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
    <main className="min-h-screen bg-[#FEFAE1] p-6">
      <h1 className="text-3xl font-bold text-center mb-8">{category}</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}