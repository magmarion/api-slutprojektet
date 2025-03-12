"use server";

import { db } from "@/prisma/db";
import { revalidatePath } from "next/cache";
import { Product } from "../../data/index"; // or wherever you keep this interface

export async function createProduct(data: Partial<Product>) {
  await db.product.create({
    data: {
      articleNumber: data.articleNumber ?? `temp-${Date.now()}`,
      title: data.title ?? "Untitled",
      image: data.image ?? "",
      description: data.description ?? "",
      price: data.price ?? 0,
    },
  });
  revalidatePath("/admin");
}

export async function updateProduct(articleNumber: string, data: Partial<Product>) {
  await db.product.update({
    where: { articleNumber },
    data,
  });
  revalidatePath("/admin");
}

export async function deleteProduct(articleNumber: string) {
  await db.product.delete({
    where: { articleNumber },
  });
  revalidatePath("/admin");
}
