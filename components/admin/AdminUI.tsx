"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";

// Shadcn UI components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

// Icons
import { Plus, Edit, Trash } from "lucide-react";


export interface Product {
  id: string;
  articleNumber: string;
  image: string;
  title: string;
  description: string;
  price: number;
}

interface AdminUIProps {
  products: Product[];
  // Server actions that you created with "use server"
  createAction: (data: Partial<Product>) => Promise<void>;
  updateAction: (articleNumber: string, data: Partial<Product>) => Promise<void>;
  deleteAction: (articleNumber: string) => Promise<void>;
}


export default function AdminUI({
  products,
  createAction,
  updateAction,
  deleteAction,
}: AdminUIProps) {
  // ----- Dialog States -----
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Track which product is active for editing/deleting
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  // Form data for adding/editing
  const [formData, setFormData] = useState<Partial<Product>>({});

  // For asynchronous transitions (optional)
  const [isPending, startTransition] = useTransition();



  // Opens the "Add Product" modal
  const handleOpenAddModal = () => {
    setFormData({});
    setActiveProduct(null);
    setShowAddDialog(true);
  };

  // Opens the "Edit Product" modal
  const handleOpenEditModal = (p: Product) => {
    setActiveProduct(p);
    setFormData(p); // pre-fill the form
    setShowEditDialog(true);
  };

  // Opens the "Delete Product" confirmation
  const handleOpenDeleteModal = (p: Product) => {
    setActiveProduct(p);
    setShowDeleteDialog(true);
  };

  // CREATE product
  const handleCreateProduct = () => {
    startTransition(async () => {
      await createAction(formData);
      setShowAddDialog(false);
    });
  };

  // UPDATE product
  const handleUpdateProduct = () => {
    if (!activeProduct) return;
    startTransition(async () => {
      await updateAction(activeProduct.articleNumber, formData);
      setShowEditDialog(false);
    });
  };

  // DELETE product
  const handleDeleteProduct = () => {
    if (!activeProduct) return;
    startTransition(async () => {
      await deleteAction(activeProduct.articleNumber);
      setShowDeleteDialog(false);
    });
  };

  // Render --------------------------------------------------
  return (
    <>
      {/* ADD PRODUCT DIALOG */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogTrigger asChild>
          <Button
            variant="default"
            onClick={handleOpenAddModal}
            className="flex items-center gap-2"
          >
            <Plus size={16} />
            Add Product
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>Fill in the details to create a new product.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={formData.title || ""}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Product Title"
              />
            </div>

            <div className="space-y-2">
              <Label>Image URL</Label>
              <Input
                value={formData.image || ""}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="space-y-2">
              <Label>Price</Label>
              <Input
                type="number"
                value={formData.price || ""}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                placeholder="999"
              />
            </div>

            <div className="space-y-2">
              <Label>Article Number</Label>
              <Input
                value={formData.articleNumber || ""}
                onChange={(e) => setFormData({ ...formData, articleNumber: e.target.value })}
                placeholder="test-1011"
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={formData.description || ""}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Short description..."
              />
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleCreateProduct} disabled={isPending}>
              {isPending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
        {products.map((product) => (
          <div
            key={product.articleNumber}
            className="border rounded-lg p-4 shadow-md bg-white flex flex-col"
          >
            <div className="flex-grow">
              <Image
                src={product.image}
                alt={product.title}
                width={200}
                height={150}
                className="object-cover w-full h-40 rounded-md"
              />
              <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
              <p className="text-gray-700 mb-1">Price: {product.price} SEK</p>
            </div>

            {/* ACTION BUTTONS (EDIT/DELETE) */}
            <div className="flex justify-end gap-2 mt-4">
              {/* EDIT DIALOG */}
              <Dialog
                open={showEditDialog && product.articleNumber === activeProduct?.articleNumber}
                onOpenChange={setShowEditDialog}
              >
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    onClick={() => handleOpenEditModal(product)}
                    className="p-2 text-blue-600"
                  >
                    <Edit size={16} />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Product</DialogTitle>
                    <DialogDescription>Modify the product details below.</DialogDescription>
                  </DialogHeader>

                  <div className="grid gap-4 py-4">
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
                          setFormData({ ...formData, price: Number(e.target.value) })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Article Number</Label>
                      <Input
                        value={formData.articleNumber || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, articleNumber: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        value={formData.description || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, description: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <DialogFooter>
                    <Button onClick={handleUpdateProduct} disabled={isPending}>
                      {isPending ? "Saving..." : "Save Changes"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* DELETE DIALOG */}
              <Dialog
                open={showDeleteDialog && product.articleNumber === activeProduct?.articleNumber}
                onOpenChange={setShowDeleteDialog}
              >
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    onClick={() => handleOpenDeleteModal(product)}
                    className="p-2 text-red-600"
                  >
                    <Trash size={16} />
                  </Button>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete Product</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete <strong>{activeProduct?.title}</strong>?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="destructive" onClick={handleDeleteProduct} disabled={isPending}>
                      {isPending ? "Deleting..." : "Yes, Delete"}
                    </Button>
                    <Button variant="ghost" onClick={() => setShowDeleteDialog(false)}>
                      Cancel
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
