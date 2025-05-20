// app\admin\actions.ts
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
      category: data.category ?
       {
        connect: [{ name: data.category}],
      }
      : undefined,
    },
  });
  revalidatePath("/admin");
}

export async function updateProduct(articleNumber: string, data: Partial<Product>) {

  const updateData = {
    title: data.title,
    image: data.image,
    description: data.description,
    price: data.price
  }

    if (data.category) {
    updateData.category = {
      set: [{ name: data.category }], 
    };
  }

  await db.product.update({
    where: { articleNumber },
    data: updateData
  });
  revalidatePath("/admin");
  
}

export async function deleteProduct(articleNumber: string) {
  await db.product.delete({
    where: { articleNumber },
  });
  revalidatePath("/admin");
}
