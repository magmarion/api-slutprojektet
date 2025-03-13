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
    const [formData, setFormData] = useState<Partial<Product>>({})
    const [isPending, startTransition] = useTransition()

    function handleCreate() {
        startTransition(async () => {
            await createAction(formData)
            onOpenChange(false)
            setFormData({})
        })
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
