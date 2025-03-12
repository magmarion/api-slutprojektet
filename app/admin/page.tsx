"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

// Example Product interface; adjust or import from "@/data" if you have it there
export interface Product {
  id: string;
  articleNumber: string;
  image: string;
  title: string;
  description: string;
  price: number;
}

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

// Icons from lucide-react (https://lucide.dev/icons/)
import { Plus, Edit, Save, Trash } from "lucide-react";

const AdminPage: React.FC = () => {
  // Local state for all products
  const [products, setProducts] = useState<Product[]>([]);

  // Dialog visibility states
  const [showAddDialog, setShowAddDialog] = useState<boolean>(false);
  const [showEditDialog, setShowEditDialog] = useState<boolean>(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);

  // Track which product is currently selected for edit/delete
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  // Form data for add/edit
  const [formData, setFormData] = useState<Partial<Product>>({});

  // Fetch existing products from your /api/products route on mount
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data: Product[]) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // ------------- HANDLERS -------------

  // 1. Open "Add Product" dialog
  const handleOpenAddModal = () => {
    setFormData({});
    setActiveProduct(null);
    setShowAddDialog(true);
  };

  // 2. Open "Edit Product" dialog
  const handleOpenEditModal = (p: Product) => {
    setActiveProduct(p);
    setFormData(p);
    setShowEditDialog(true);
  };

  // 3. Open "Delete Product" dialog
  const handleOpenDeleteModal = (p: Product) => {
    setActiveProduct(p);
    setShowDeleteDialog(true);
  };

  // 4. CREATE a new product
  const handleCreateProduct = async () => {
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to create product");

      // Replace the local product list with the updated list from server
      const updated = await res.json();
      setProducts(updated);

      // Close the dialog
      setShowAddDialog(false);
    } catch (error) {
      console.error(error);
    }
  };

  // 5. UPDATE an existing product
  const handleUpdateProduct = async () => {
    if (!activeProduct) return;
    try {
      const res = await fetch(`/api/products?articleNumber=${activeProduct.articleNumber}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to update product");

      const updated = await res.json();
      setProducts(updated);

      setShowEditDialog(false);
    } catch (error) {
      console.error(error);
    }
  };

  // 6. DELETE a product
  const handleDeleteProduct = async () => {
    if (!activeProduct) return;
    try {
      const res = await fetch(`/api/products?articleNumber=${activeProduct.articleNumber}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete product");

      const updated = await res.json();
      setProducts(updated);

      setShowDeleteDialog(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="p-4 md:p-10">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">ADMIN</h1>

        {/* ADD PRODUCT (Dialog) */}
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button
              onClick={handleOpenAddModal}
              variant="default"
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
                  placeholder="https://..."
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
              <Button onClick={handleCreateProduct}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
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
              <p className="text-gray-700">Price: {product.price} SEK</p>
            </div>

            {/* ACTION BUTTONS */}
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
                    <Button onClick={handleUpdateProduct}>Save Changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* SAVE button (optional; can reuse the same edit modal or do something else) */}
              <Button
                variant="ghost"
                onClick={() => handleOpenEditModal(product)}
                className="p-2 text-green-600"
              >
                <Save size={16} />
              </Button>

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
                    <Button variant="destructive" onClick={handleDeleteProduct}>
                      Yes, Delete
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
    </main>
  );
};

export default AdminPage;
