"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createProductAction } from "@/app/admin/actionsForm";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const productSchema = z.object({
    title: z.string().nonempty("Title is required"),
    image: z
        .string()
        .nonempty("Image URL is required")
        .url("Please enter a valid URL"),
    price: z.coerce.number().min(1, "Price must be at least 1"),
    description: z.string().nonempty("Description is required"),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function AddProductForm() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            title: "",
            image: "",
            price: 0,
            description: "",
        },
    });

    // Handle form submission
    const onSubmit = async (data: ProductFormData) => {
        try {
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("image", data.image);
            formData.append("price", data.price.toString());
            formData.append("description", data.description);

            await createProductAction(formData);

            toast.success("Product created successfully!");
            router.push("/admin");
        } catch (error) {
            console.error(error);
            toast.error("There was an error creating the product.");
        }
    };


    return (
        <Card>
            <CardHeader>
                <CardTitle>Create Product</CardTitle>
            </CardHeader>

            <CardContent>
                {/* Product Form */}
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

                    {/* Submit */}
                    <Button type="submit" data-cy="product-submit">
                        Save
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
