// app\admin\actions.ts
"use server";

import { Product } from "@/generated/prisma";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { db } from "prisma/client";
import { z } from "zod";

const productSchema = z.object({
    title: z.string().nonempty("Title is required"),
    image: z
        .string()
        .nonempty("Image URL is required")
        .url("Please enter a valid URL"),
    price: z
        .number({ invalid_type_error: "Price must be a number" })
        .min(0, "Price must be at least 0"),
    description: z.string().nonempty("Description is required"),
    category: z.string().nonempty("Category is required")
});

export async function createProduct(data: Partial<Product>, categoryName?: string) {
  const shortId = nanoid(8);


  await db.product.create({
    data: {
      articleNumber: shortId,
      title: data.title ?? "Untitled",
      image: data.image ?? "",
      description: data.description ?? "",
      price: data.price ?? 0,
      categories: categoryName
        ? {
            connect: [{ name: categoryName }],
          }
        : undefined,
    },
  });
  revalidatePath("/admin");
}

export async function updateProduct(
  articleNumber: string,
  data: Partial<Product>,
  categoryName?: string
) {
  const updateData: any = {
    title: data.title,
    image: data.image,
    description: data.description,
    price: data.price,
  };

  if (categoryName) {
    updateData.categories = {
      set: [{ name: categoryName }],
    };
  }

  await db.product.update({
    where: { articleNumber },
    data: updateData,
  });
  revalidatePath("/admin");
}

export async function deleteProduct(articleNumber: string) {
  await db.product.delete({
    where: { articleNumber },
  });
  revalidatePath("/admin");
}

export async function getCategories() {
  const categories = await db.category.findMany({
    select: { name: true }
  });

  return categories;
}




