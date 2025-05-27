// Fil: app/products/actions.ts
'use server';

import { db } from '@/prisma/client';

// Typ för Product med relationer
export type ProductWithRelations = {
  id: string;
  articleNumber: string;
  image: string;
  title: string;
  description: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  categories: { id: number; name: string }[];
};

// Hämta alla produkter
export async function getProducts(): Promise<ProductWithRelations[]> {
  return db.product.findMany({
    include: {
      categories: { select: { id: true, name: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
}

// Hämta en produkt via ID
export async function getProductById(
  id: string
): Promise<ProductWithRelations> {
  const product = await db.product.findUnique({
    where: { id },
    include: {
      categories: { select: { id: true, name: true } },
    },
  });
  if (!product) throw new Error('Product not found');
  return product;
}

// Skapa en ny produkt
export async function createProduct(data: {
  articleNumber: string;
  image: string;
  title: string;
  description: string;
  price: number;
  categoryIds?: number[];
}): Promise<ProductWithRelations> {
  const product = await db.product.create({
    data: {
      articleNumber: data.articleNumber,
      image: data.image,
      title: data.title,
      description: data.description,
      price: data.price,
      categories: data.categoryIds
        ? { connect: data.categoryIds.map((id) => ({ id })) }
        : undefined,
    },
    include: {
      categories: { select: { id: true, name: true } },
    },
  });
  return product;
}

// Uppdatera en befintlig produkt
export async function updateProduct(
  id: string,
  data: {
    articleNumber?: string;
    image?: string;
    title?: string;
    description?: string;
    price?: number;
    categoryIds?: number[];
  }
): Promise<ProductWithRelations> {
  const updated = await db.product.update({
    where: { id },
    data: {
      articleNumber: data.articleNumber,
      image: data.image,
      title: data.title,
      description: data.description,
      price: data.price,
      categories:
        data.categoryIds !== undefined
          ? { set: data.categoryIds.map((id) => ({ id })) }
          : undefined,
    },
    include: {
      categories: { select: { id: true, name: true } },
    },
  });
  return updated;
}

// Ta bort en produkt
export async function deleteProduct(id: string): Promise<void> {
  await db.product.delete({ where: { id } });
}
