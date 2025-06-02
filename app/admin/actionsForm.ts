"use server";

import { createProduct, deleteProduct, updateProduct } from "./actions";
import { productSchema } from "@/lib/schemas";

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
            error: "Validering misslyckades",
            details: result.error.flatten().fieldErrors,
        };
    }

    try {
        await createProduct(result.data);
        return { success: true };
    } catch (error) {
        console.error("Fel vid skapande av produkt:", error);
        return { success: false, error: "Det gick inte att skapa produkten" };
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
            error: "Validering misslyckades",
            details: result.error.flatten().fieldErrors,
        };
    }

    try {
        await updateProduct(articleNumber, result.data);
        return { success: true };
    } catch (error) {
        console.error("Fel vid uppdatering av produkt:", error);
        return { success: false, error: "Det gick inte att uppdatera produkten" };
    }
}

// Wrapper for deleting a product via form submission.
export async function deleteProductAction(formData: FormData) {
    const articleNumber = formData.get("articleNumber") as string;

    if (!articleNumber) {
        return { success: false, error: "Artikelnummer saknas" };
    }

    try {
        await deleteProduct(articleNumber);
        return { success: true };
    } catch (error) {
        console.error("Fel vid radering av produkt:", error);
        return { success: false, error: "Det gick inte att ta bort produkten" };
    }
}
