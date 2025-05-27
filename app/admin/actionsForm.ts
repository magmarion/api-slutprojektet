"use server";

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
        return {
            success: false,
            error: "Validation failed",
            details: result.error.flatten().fieldErrors,
        };
    }

    try {
        await createProduct(result.data);
        return { success: true };
    } catch (error) {
        console.error("Error creating product:", error);
        return { success: false, error: "Failed to create product" };
    }
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
        return {
            success: false,
            error: "Validation failed",
            details: result.error.flatten().fieldErrors,
        };
    }

    try {
        await updateProduct(articleNumber, result.data);
        return { success: true };
    } catch (error) {
        console.error("Error updating product:", error);
        return { success: false, error: "Failed to update product" };
    }
}

// Wrapper for deleting a product via form submission.
export async function deleteProductAction(formData: FormData) {
    const articleNumber = formData.get("articleNumber") as string;

    if (!articleNumber) {
        return { success: false, error: "Article number is missing" };
    }

    try {
        await deleteProduct(articleNumber);
        return { success: true };
    } catch (error) {
        console.error("Error deleting product:", error);
        return { success: false, error: "Failed to delete product" };
    }
}