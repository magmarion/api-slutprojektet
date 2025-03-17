"use client";

import { deleteProductAction } from "@/app/admin/actionsForm";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import type { Product } from "@/data";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Trash } from "lucide-react";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog"; // <--- Our new component

interface AdminTableProps {
    products: Product[];
}

export default function AdminTable({ products }: AdminTableProps) {
    const router = useRouter();
    const [openDeleteDialog, setOpenDeleteDialog] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    /**
     * Delete a product by its articleNumber, show a toast, and refresh.
     */
    async function handleDelete(articleNumber: string) {
        try {
            const formData = new FormData();
            formData.append("articleNumber", articleNumber);

            await deleteProductAction(formData);

            toast.success("Product deleted successfully!");
            startTransition(() => {
                router.refresh();
            });
        } catch (error) {
            console.error(error);
            toast.error("Error deleting product.");
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>All Products</CardTitle>
            </CardHeader>

            <CardContent>
                {/* Make table responsive */}
                <div className="w-full overflow-x-auto">
                    <table className="w-full table-auto border-collapse">
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
                                    <td
                                        data-cy="product-id"
                                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                    >
                                        {product.articleNumber}
                                    </td>
                                    <td
                                        data-cy="product-title"
                                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                                    >
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
                                    <td
                                        data-cy="product-price"
                                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                    >
                                        {product.price} SEK
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap space-x-2">
                                        {/* Edit Button */}
                                        <Link href={`/admin/product/${product.articleNumber}`}>
                                            <Button variant="ghost" data-cy="admin-edit-product">
                                                <Edit size={16} />
                                            </Button>
                                        </Link>

                                        {/* Delete - using our new ConfirmDeleteDialog */}
                                        <ConfirmDeleteDialog
                                            open={openDeleteDialog === product.articleNumber}
                                            onOpenChange={(open) => {
                                                if (!open) setOpenDeleteDialog(null);
                                            }}
                                            onConfirm={() => {
                                                handleDelete(product.articleNumber);
                                                setOpenDeleteDialog(null);
                                            }}
                                            productTitle={product.title}
                                        >
                                            <Button
                                                variant="ghost"
                                                data-cy="admin-remove-product"
                                                onClick={() => setOpenDeleteDialog(product.articleNumber)}
                                            >
                                                <Trash size={16} />
                                            </Button>
                                        </ConfirmDeleteDialog>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
}
