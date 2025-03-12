"use client";

import React, { useState } from "react";
import Image from "next/image";

import { Product, products as defaultProducts } from "@/data";

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

import { Plus, Edit, Save, Trash } from "lucide-react";

const AdminPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(defaultProducts);

  const [showAddDialog, setShowAddDialog] = useState<boolean>(false);
  const [showEditDialog, setShowEditDialog] = useState<boolean>(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);

  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  const [formData, setFormData] = useState<Partial<Product>>({});


  // Open add product dialog
  const handleOpenAddModal = () => {
    setFormData({});
    setActiveProduct(null);
    setShowAddDialog(true);
  };

  // edit product dialog
  const handleOpenEditModal = (p: Product) => {
    setActiveProduct(p);
    setFormData(p); 
    setShowEditDialog(true);
  };

  // delete dialog
  const handleOpenDeleteModal = (p: Product) => {
    setActiveProduct(p);
    setShowDeleteDialog(true);
  };

  const handleCreateProduct = () => {
    const newProduct: Product = {
      id: crypto.randomUUID(),
      articleNumber: formData.articleNumber || `temp-${Date.now()}`,
      title: formData.title || "Untitled",
      image: formData.image || "",
      description: formData.description || "",
      price: formData.price || 0,
    };

    setProducts((prev) => [...prev, newProduct]);
    setShowAddDialog(false);
  };

  const handleUpdateProduct = () => {
    if (!activeProduct) return;

    setProducts((prev) =>
      prev.map((prod) => {
        if (prod.articleNumber === activeProduct.articleNumber) {
          return {
            ...prod,
            ...formData,
          };
        }
        return prod;
      })
    );
    setShowEditDialog(false);
  };

  const handleDeleteProduct = () => {
    if (!activeProduct) return;

    setProducts((prev) =>
      prev.filter(
        (prod) => prod.articleNumber !== activeProduct.articleNumber
      )
    );
    setShowDeleteDialog(false);
  };

  return (
    <main className="p-4 md:p-10">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">ADMIN</h1>

        {/* ADD PRODUCT */}
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
                  onChange={(e) =>
                    setFormData({ ...formData, price: Number(e.target.value) })
                  }
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
              <p className="text-gray-700 mb-1">Price: {product.price} SEK</p>
            </div>

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
