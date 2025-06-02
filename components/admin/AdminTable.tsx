"use client";

import { deleteProductAction } from "@/app/admin/actionsForm";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { Category, Product } from "../../generated/prisma";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Edit, Trash } from "lucide-react";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";

// 🆕 Korrekt typ med relation
type ProductWithCategory = Product & {
  categories: Category[];
};

export default function AdminProductsGrid({
  products,
}: {
  products: ProductWithCategory[];
}) {
  const router = useRouter();
  const [openDeleteDialog, setOpenDeleteDialog] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleDelete(articleNumber: string) {
    try {
      const formData = new FormData();
      formData.append("articleNumber", articleNumber);

      await deleteProductAction(formData);

      toast.success("Produkten raderades!");
      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      console.error(error);
      toast.error("Fel vid radering av produkt.");
    }
  }

  return (
    <section className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <Card
            key={product.articleNumber}
            data-cy="product"
            className="border hover:shadow-md transition-shadow ease-in-out"
          >
            <CardHeader>
              <CardTitle data-cy="product-title">{product.title}</CardTitle>
              <CardDescription data-cy="product-id">
                {product.articleNumber}
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col items-start space-y-3">
              <Image
                src={product.image}
                alt={product.title}
                width={96}
                height={96}
                className="w-32 h-32 object-fit rounded-md"
              />
              <p
                className="text-sm text-gray-700 font-semibold"
                data-cy="product-price"
              >
                {product.price} SEK
              </p>

              {/* 🆕 Visa kategorier */}
              <p className="text-xs text-gray-600">
                {product.categories.map((c) => c.name).join(", ")}
              </p>
            </CardContent>

            <CardFooter className="flex items-center justify-between space-x-2">
              <Link href={`admin/product/${product.articleNumber}`}>
                <Button
                  variant="outline"
                  data-cy="admin-edit-product"
                  className="flex items-center gap-1 cursor-pointer"
                >
                  <Edit size={16} />
                  Redigera
                </Button>
              </Link>

              {/* Delete button & confirm dialog */}
              <ConfirmDeleteDialog
                open={openDeleteDialog === product.articleNumber}
                onOpenChange={(open) => !open && setOpenDeleteDialog(null)}
                onConfirm={() => {
                  handleDelete(product.articleNumber);
                  setOpenDeleteDialog(null);
                }}
                productTitle={product.title}
              >
                <Button
                  variant="destructive"
                  data-cy="admin-remove-product"
                  className="flex items-center gap-1 bg-red-700 cursor-pointer"
                  onClick={() => setOpenDeleteDialog(product.articleNumber)}
                >
                  <Trash size={16} />
                  Ta bort
                </Button>
              </ConfirmDeleteDialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
