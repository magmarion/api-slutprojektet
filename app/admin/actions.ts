'use server';

import { Product } from '@/generated/prisma';
import { productSchema } from '@/lib/schemas';
import { db } from '@/prisma/client';
import { nanoid } from 'nanoid';
import { revalidatePath } from 'next/cache';

export async function getAllProducts() {
  return await db.product.findMany({
    select: {
      id: true,
      articleNumber: true,
      title: true,
      image: true,
      price: true,
      stock: true, 
      categories: true,
    },
  });
}


export async function createProduct(
  data: Partial<Product> & { stock?: number },
  categoryName?: string
) {
  const result = productSchema.safeParse({
    title: data.title,
    image: data.image,
    price: data.price,
    description: data.description,
    category: categoryName,
    stock: data.stock,
  });

  if (!result.success) {
    return {
      success: false,
      error: 'Validation failed',
      details: result.error.format(),
    };
  }

  const shortId = nanoid(8);

  try {
    const product = await db.product.create({
      data: {
        articleNumber: shortId,
        title: result.data.title,
        image: result.data.image,
        description: result.data.description,
        price: result.data.price,
        stock: result.data.stock,
        categories: categoryName
          ? { connect: [{ name: categoryName }] }
          : undefined,
      },
    });

    revalidatePath('/admin/dashboard');
    return { success: true, product };
  } catch (error) {
    console.error('Error creating product:', error);
    return {
      success: false,
      error: 'Failed to create product',
    };
  }
}

export async function updateProduct(
  articleNumber: string,
  data: Partial<Product> & { stock?: number },
  categoryName?: string
) {
  const result = productSchema.safeParse({
    title: data.title,
    image: data.image,
    price: data.price,
    description: data.description,
    category: categoryName,
    stock: data.stock,
  });

  if (!result.success) {
    return {
      success: false,
      error: 'Validation failed',
      details: result.error.format(),
    };
  }

  try {
    const product = await db.product.update({
      where: { articleNumber },
      data: {
        title: result.data.title,
        image: result.data.image,
        description: result.data.description,
        price: result.data.price,
        stock: result.data.stock,
        categories: categoryName
          ? {
              set: [], 
              connect: [{ name: categoryName }],
            }
          : undefined,
      },
    });

    revalidatePath('/admin');
    return { success: true, product };
  } catch (error) {
    console.error('Error updating product:', error);
    return { success: false, error: 'Failed to update product' };
  }
}

export async function deleteProduct(articleNumber: string) {
  await db.product.delete({
    where: { articleNumber },
  });
  revalidatePath('/admin');
}

export async function getCategories() {
  return await db.category.findMany({
    select: { name: true, id: true },
  });
}

export async function updateOrderStatus() {
  
}
