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
import { productSchema } from "@/lib/schemas";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type FormData = z.infer<typeof productSchema>;

interface EditProductFormProps {
    product: Product & { categories?: { name: string }[] };
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
                console.error("Det gick inte att ladda kategorier:", error);
                toast.error("Det gick inte att ladda kategorier.");
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
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            title: product.title,
            image: product.image,
            price: product.price,
            description: product.description,
            category: categories?.[0]?.name ?? "",
        },
    });

    useEffect(() => {
        if (!isLoadingCategories) {
            reset({
                title: product.title,
                image: product.image,
                price: product.price,
                description: product.description,
                category: product.categories?.[0]?.name ?? "",
            });
        }
    }, [isLoadingCategories, product, reset]);

    const onSubmit = async (data: FormData) => {
        console.log("Form data som skickas:", data);
        try {
            await updateProduct(product.articleNumber, data, data.category);
            toast.success("Produkten har uppdaterats!");
            router.push("/admin/dashboard");
        } catch (error) {
            console.error(error);
            toast.error("Något gick fel när produkten skulle uppdateras.");
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Redigera produkt</CardTitle>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Title */}
                    <div>
                        <Label htmlFor="title">Titel</Label>
                        <Input
                            id="title"
                            placeholder="Product Title"
                            {...register("title")}
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.title.message}
                            </p>
                        )}
                    </div>

                    {/* Image URL */}
                    <div>
                        <Label htmlFor="image">Bild-URL</Label>
                        <Input
                            id="image"
                            placeholder="https://example.com/image.jpg"
                            {...register("image")}
                        />
                        {errors.image && (
                            <p className="text-red-500 text-sm mt-1">
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
                        />
                        {errors.price && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.price.message}
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <Label htmlFor="description">Beskrivning</Label>
                        <Input
                            id="description"
                            placeholder="Beskrivning..."
                            {...register("description")}
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.description.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="category">Kategori</Label>
                        <select
                            id="category"
                            {...register("category")}
                            className="w-full p-2 border"
                            disabled={isLoadingCategories}
                        >
                            <option value="">Välj kategori...</option>
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
                            <p className="text-red-500 text-sm mt-1">
                                {errors.category.message}
                            </p>
                        )}
                        {isLoadingCategories && <p className="text-sm">Laddar kategorier...</p>}
                    </div>

                    <Button type="submit">
                        Spara ändringar
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
