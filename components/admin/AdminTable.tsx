"use client";

import { deleteProductAction } from "@/app/admin/actionsForm";
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
import type { Product } from "@/data";
import { Edit, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface AdminTableProps {
    products: Product[];
}

export default function AdminTable({ products }: AdminTableProps) {
    // We'll track which product's delete dialog is open (by articleNumber)
    const [openDeleteDialog, setOpenDeleteDialog] = useState<string | null>(null);

    return (
        <table className="min-w-full divide-y divide-gray-200 border-collapse">
            <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Article Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Image
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                    <tr key={product.articleNumber} data-cy="product">
                        <td data-cy="product-id" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {product.articleNumber}
                        </td>
                        <td data-cy="product-title" className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {product.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <Image
                                src={product.image}
                                alt={product.title}
                                width={64}
                                height={64}
                                className="rounded-md object-cover"
                            />
                        </td>
                        <td data-cy="product-price" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {product.price} SEK
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap space-x-2">
                            {/* Edit Button */}
                            <Link href={`/admin/product/${product.articleNumber}`}>
                                <Button variant="ghost" data-cy="admin-edit-product">
                                    <Edit size={16} />
                                </Button>
                            </Link>

                            {/* Delete Button & Confirm Delete Dialog */}
                            <Dialog open={openDeleteDialog === product.articleNumber} onOpenChange={(open) => {
                                if (!open) setOpenDeleteDialog(null);
                            }}>
                                <DialogTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        data-cy="admin-remove-product"
                                        onClick={() => setOpenDeleteDialog(product.articleNumber)}
                                    >
                                        <Trash size={16} />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Confirm Deletion</DialogTitle>
                                        <DialogDescription>
                                            Are you sure you want to delete <strong>{product.title}</strong>?
                                        </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter className="flex flex-col gap-2 sm:flex-row">
                                        <form
                                            action={deleteProductAction}
                                            method="post"
                                            onSubmit={() => setOpenDeleteDialog(null)}
                                            className="w-full"
                                        >
                                            <input type="hidden" name="articleNumber" value={product.articleNumber} />
                                            <Button type="submit" variant="destructive" data-cy="confirm-delete-button" className="w-full sm:w-auto">
                                                Yes, Delete
                                            </Button>
                                        </form>
                                        <Button variant="outline" onClick={() => setOpenDeleteDialog(null)} className="w-full sm:w-auto">
                                            Cancel
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
