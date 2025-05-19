"use server";

import { Product } from "@/data";
import { db } from "prisma/client";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";


export async function createProduct(data: Partial<Product>) {

  const shortId = nanoid(8)

  await db.product.create({
    data: {
      articleNumber: shortId,
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
