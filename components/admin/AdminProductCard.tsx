"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Product } from "@/data";
import { Edit, Trash } from "lucide-react";
import Image from "next/image";
import { useState, useTransition } from "react";

interface ProductCardProps {
  product: Product;
  updateAction: (
    articleNumber: string,
    data: Partial<Product>
  ) => Promise<void>;
  deleteAction: (articleNumber: string) => Promise<void>;
}

export default function ProductCard({
  product,
  updateAction,
  deleteAction,
}: ProductCardProps) {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const [formData, setFormData] = useState<Partial<Product>>(product);
  const [isPending, startTransition] = useTransition();

  function handleUpdate() {
    startTransition(async () => {
      await updateAction(product.articleNumber, formData);
      setShowEditDialog(false);
    });
  }

  function handleDelete() {
    startTransition(async () => {
      await deleteAction(product.articleNumber);
      setShowDeleteDialog(false);
    });
  }

  return (
    <div className="border rounded-xs p-4 shadow-md bg-white flex flex-col">
      <div className="flex-grow" data-cy="product">
        <div className="flex justify-between items-center">
          <span data-cy="product-id" className="text-gray-500">
            {product.articleNumber}
          </span>
        </div>
        <Image
          src={product.image}
          alt={product.title}
          width={200}
          height={150}
          className="object-cover w-full h-40 rounded-md"
        />
        <h2 className="text-lg font-semibold mt-2" data-cy="product-title">
          {product.title}
        </h2>
        <p className="text-gray-700 mb-1" data-cy="product-price">
          Price: {product.price} SEK
        </p>

        <div className="flex justify-end gap-2 mt-4">
          {/* EDIT DIALOG */}
          <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                onClick={() => setShowEditDialog(true)}
                className="p-2 text-blue-600"
                data-cy="admin-edit-product"
              >
                <Edit size={16} />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Product</DialogTitle>
                <DialogDescription>
                  Modify the product details below.
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
                  />
                </div>
                <div className="space-y-2">
                  <Label>Image URL</Label>
                  <Input
                    value={formData.image || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Price</Label>
                  <Input
                    type="number"
                    value={formData.price || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        price: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={formData.description || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <DialogFooter>
                <Button onClick={handleUpdate} disabled={isPending}>
                  {isPending ? "Saving..." : "Save Changes"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* DELETE DIALOG */}
          <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                onClick={() => setShowDeleteDialog(true)}
                className="p-2 text-red-600"
                data-cy="admin-remove-product"
              >
                <Trash size={16} />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Product</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete{" "}
                  <strong>{product.title}</strong>?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={isPending}
                  data-cy="confirm-delete-button"
                >
                  {isPending ? "Deleting..." : "Yes, Delete"}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setShowDeleteDialog(false)}
                >
                  Cancel
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
