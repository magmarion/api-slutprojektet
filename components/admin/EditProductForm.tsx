"use client";

import type { Product } from "@/data";

// UI components from shadcn
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { updateProductAction } from "@/app/admin/actionsForm";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // Sonner for notifications

/** Zod schema for client-side validation */
const productSchema = z.object({
    title: z.string().nonempty("Title is required"),
    image: z
        .string()
        .nonempty("Image URL is required")
        .url("Please enter a valid URL"),
    price: z.coerce.number().min(0, "Price must be at least 0"),
    description: z.string().nonempty("Description is required"),
});

type FormData = z.infer<typeof productSchema>;

interface EditProductFormProps {
    product: Product;
}

/**
 * Edit an existing product with client-side validation and a
 * server action for the final database update. A success toast
 * is shown upon completion.
 */
export default function EditProductForm({ product }: EditProductFormProps) {
    const router = useRouter();

    // Initialize react-hook-form using the product as the defaultValues
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
        },
    });

    /** Called when the form is submitted and passes client checks */
    const onSubmit = async (data: FormData) => {
        try {
            // Convert to FormData for the server action
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("image", data.image);
            formData.append("price", data.price.toString());
            formData.append("description", data.description);

            // Call the server action with the existing articleNumber
            await updateProductAction(formData, product.articleNumber);

            // Show a success toast
            toast.success("Product updated successfully!");

            // Redirect or refresh, as needed
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
                {/*
          We no longer use:
            action={async (formData) => {...}}
            method="post"
          Instead, we let react-hook-form handle submission in the client.
        */}
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
                        <Textarea
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

                    <Button type="submit" data-cy="product-submit">
                        Save Changes
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
