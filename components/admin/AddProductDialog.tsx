"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Product } from "@/data"
import { Plus } from "lucide-react"
import { useState, useTransition } from "react"
import { z } from "zod"

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

interface AddProductDialogProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    createAction: (data: Partial<Product>) => Promise<void>
}

export default function AddProductDialog({
    isOpen,
    onOpenChange,
    createAction,
}: AddProductDialogProps) {
    const [formData, setFormData] = useState<Partial<Product>>({});
    const [errors, setErrors] = useState<{
        title?: string;
        image?: string;
        price?: string;
        description?: string;
    }>({});
    const [isPending, startTransition] = useTransition();

    function handleCreate() {
        startTransition(async () => {
            const result = productSchema.safeParse({
                title: formData.title ?? "",
                image: formData.image ?? "",
                price: typeof formData.price === "number"
                    ? formData.price
                    : Number(formData.price),
                description: formData.description ?? "",
            });
            if (result.success) {
                setErrors({});
                await createAction(result.data);
                onOpenChange(false);
                setFormData({});
            } else {
                setErrors({
                    title: result.error.flatten().fieldErrors.title?.join(", "),
                    image: result.error.flatten().fieldErrors.image?.join(", "),
                    price: result.error.flatten().fieldErrors.price?.join(", "),
                    description: result.error.flatten().fieldErrors.description?.join(", "),
                });
            }
        });
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button
                    variant="default"
                    className="flex items-center gap-2"
                    onClick={() => onOpenChange(true)}
                    data-cy="admin-add-product"
                >
                    <Plus size={16} />
                    Add Product
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                    <DialogDescription>
                        Fill in the details to create a new product.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4" data-cy="product-form">
                    <div className="space-y-2">
                        <Label>Title</Label>
                        <Input
                            value={formData.title || ""}
                            onChange={(e) =>
                                setFormData({ ...formData, title: e.target.value })
                            }
                            placeholder="Product Title"
                        />
                        {errors.title && (
                            <p data-cy="product-title-error" className="text-red-500 text-sm">
                                {errors.title}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label>Image URL</Label>
                        <Input
                            value={formData.image || ""}
                            onChange={(e) =>
                                setFormData({ ...formData, image: e.target.value })
                            }
                            placeholder="https://example.com/image.jpg"
                        />
                        {errors.image && (
                            <p data-cy="product-image-error" className="text-red-500 text-sm">
                                {errors.image}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label>Price</Label>
                        <Input
                            type="number"
                            value={formData.price || ""}
                            onChange={(e) =>
                                setFormData({ ...formData, price: Number(e.target.value) })
                            }
                            placeholder="999"
                        />
                        {errors.price && (
                            <p data-cy="product-price-error" className="text-red-500 text-sm">
                                {errors.price}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                            value={formData.description || ""}
                            onChange={(e) =>
                                setFormData({ ...formData, description: e.target.value })
                            }
                            placeholder="Short description..."
                        />
                        {errors.description && (
                            <p
                                data-cy="product-description-error"
                                className="text-red-500 text-sm"
                            >
                                {errors.description}
                            </p>
                        )}
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleCreate} disabled={isPending}>
                        {isPending ? "Saving..." : "Save"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
