"use client";

import type { Product } from "@/generated/prisma";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { getCategories, updateProduct } from "@/app/admin/actions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const productSchema = z.object({
    title: z.string().nonempty("Title is required"),
    image: z
        .string()
        .nonempty("Image URL is required")
        .url("Please enter a valid URL"),
    price: z.coerce.number().min(1, "Price must be at least 1"),
    description: z.string().nonempty("Description is required"),
    category: z.string().nonempty("Category is required")
});

type FormData = z.infer<typeof productSchema>;

interface EditProductFormProps {
    product: Product;
}

export default function EditProductForm({ product }: EditProductFormProps) {
    const router = useRouter();
    const [categories, setCategories] = useState<{ name: string }[]>([]);
    const [isLoadingCategories, setIsLoadingCategories] = useState(true);

    // Hämta kategorier med Server Actions
    useEffect(() => {
        async function loadCategories() {
            try {
                const categoriesData = await getCategories();
                setCategories(categoriesData);
            } catch (error) {
                console.error("Failed to load categories:", error);
                toast.error("Failed to load categories");
            } finally {
                setIsLoadingCategories(false);
            }
        }

        loadCategories();
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            title: product.title,
            image: product.image,
            price: product.price,
            description: product.description,
            category: categories?.[0]?.name || "",
        },
    });

    const onSubmit = async (data: FormData) => {
        try {
            await updateProduct(product.articleNumber, data);
            toast.success("Product updated successfully!");
            router.push("/admin");
        } catch (error) {
            console.error(error);
            toast.error("There was an error updating the product.");
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Edit Product</CardTitle>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} data-cy="product-form" className="space-y-6">
                    {/* Title */}
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            placeholder="Product Title"
                            {...register("title")}
                            data-cy="product-title"
                        />
                        {errors.title && (
                            <p data-cy="product-title-error" className="text-red-500 text-sm mt-1">
                                {errors.title.message}
                            </p>
                        )}
                    </div>

                    {/* Image URL */}
                    <div>
                        <Label htmlFor="image">Image URL</Label>
                        <Input
                            id="image"
                            placeholder="https://example.com/image.jpg"
                            {...register("image")}
                            data-cy="product-image"
                        />
                        {errors.image && (
                            <p data-cy="product-image-error" className="text-red-500 text-sm mt-1">
                                {errors.image.message}
                            </p>
                        )}
                    </div>

                    {/* Price */}
                    <div>
                        <Label htmlFor="price">Price</Label>
                        <Input
                            id="price"
                            type="number"
                            placeholder="999"
                            {...register("price", { valueAsNumber: true })}
                            data-cy="product-price"
                        />
                        {errors.price && (
                            <p data-cy="product-price-error" className="text-red-500 text-sm mt-1">
                                {errors.price.message}
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Input
                            id="description"
                            placeholder="Short description..."
                            {...register("description")}
                            data-cy="product-description"
                        />
                        {errors.description && (
                            <p data-cy="product-description-error" className="text-red-500 text-sm mt-1">
                                {errors.description.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="category">Category</Label>
                        <select
                            id="category"
                            {...register("category")}
                            className="w-full p-2 border rounded-md"
                            disabled={isLoadingCategories}
                            data-cy="product-category"
                        >
                            <option value="">Select a category...</option>
                            {categories.map((category) => (
                                <option
                                    key={category.name}
                                    value={category.name}
                                >
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {errors.category && (
                            <p className="text-red-500 text-sm mt-1" data-cy="product-category-error">
                                {errors.category.message}
                            </p>
                        )}
                        {isLoadingCategories && <p className="text-sm">Loading categories...</p>}
                    </div>

                    <Button type="submit" data-cy="product-submit">
                        Save Changes
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
