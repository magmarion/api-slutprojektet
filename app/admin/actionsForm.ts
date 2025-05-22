// app/admin/actionsForm.ts
"use server";

import { z } from "zod";
import { createProduct, deleteProduct, updateProduct } from "./actions";

// Wrapper for creating a product via form submission.
export async function createProductAction(formData: FormData) {
    const data = {
        title: formData.get("title") as string,
        image: formData.get("image") as string,
        price: Number(formData.get("price")),
        description: formData.get("description") as string,
    };

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
    });

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
    };

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
    });

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
