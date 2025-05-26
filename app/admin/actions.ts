// app\admin\actions.ts
'use server';

import { Product } from '@/generated/prisma';
import { nanoid } from 'nanoid';
import { revalidatePath } from 'next/cache';
import { db } from 'prisma/client';
import { z } from 'zod';

const productSchema = z.object({
  title: z.string().nonempty('Title is required'),
  image: z
    .string()
    .nonempty('Image URL is required')
    .url('Please enter a valid URL'),
  price: z
    .number({ invalid_type_error: 'Price must be a number' })
    .min(0, 'Price must be at least 0'),
  description: z.string().nonempty('Description is required'),
  category: z.string().nonempty('Category is required'),
});

export async function createProduct(
  data: Partial<Product>,
  categoryName?: string
) {
  // Validate data
  const result = productSchema.safeParse({
    title: data.title,
    image: data.image,
    price: data.price,
    description: data.description,
    category: categoryName,
  });

  // If validation fails, return error
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
        categories: categoryName
          ? {
              connect: [{ name: categoryName }],
            }
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
  data: Partial<Product>,
  categoryName?: string
) {
  // Validate data
  const result = productSchema.safeParse({
    title: data.title,
    image: data.image,
    price: data.price,
    description: data.description,
    category: categoryName,
  });

  // If validation fails, return error
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
        title: data.title,
        image: data.image,
        description: data.description,
        price: data.price,
        categories: categoryName
          ? {
              set: [], // Rensa befintliga kategorier
              connect: [{ name: categoryName }], // Koppla till den valda kategorin
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
  const categories = await db.category.findMany({
    select: { name: true },
  });

  return categories;
}

export async function updateOrderStatus() {

  // Write code here
}