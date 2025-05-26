// app/admin/actionsForm.ts
"use server";

import { z } from "zod";
import { createProduct, deleteProduct, updateProduct } from "./actions";
import { productSchema } from "@/lib/schemas"

// Wrapper for creating a product via form submission.
export async function createProductAction(formData: FormData) {
    const data = {
        title: formData.get("title") as string,
        image: formData.get("image") as string,
        price: Number(formData.get("price")),
        description: formData.get("description") as string,
        category: formData.get("category") as string,
    };

    const result = productSchema.safeParse(data);
    if (!result.success) {
        throw new Error(
            "Validation failed: " +
            JSON.stringify(result.error.flatten().fieldErrors)
        );
    }
    await createProduct(result.data);
    // The revalidatePath is handled in the action.
}

// Wrapper for updating a product via form submission.
export async function updateProductAction(
    formData: FormData,
    articleNumber: string
) {
    const data = {
        title: formData.get("title") as string,
        image: formData.get("image") as string,
        price: Number(formData.get("price")),
        description: formData.get("description") as string,
        category: formData.get("category") as string,
    };

    const result = productSchema.safeParse(data);
    if (!result.success) {
        throw new Error(
            "Validation failed: " +
            JSON.stringify(result.error.flatten().fieldErrors)
        );
    }
    await updateProduct(articleNumber, result.data);
}

// Wrapper for deleting a product via form submission.
export async function deleteProductAction(formData: FormData) {
    const articleNumber = formData.get("articleNumber") as string;
    if (!articleNumber) throw new Error("Article number missing");
    await deleteProduct(articleNumber);
}
