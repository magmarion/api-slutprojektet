"use client";

import type { Product } from "@/generated/prisma";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { getCategories, updateProduct } from "@/app/admin/actions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { productSchema } from "@/lib/schemas";

type FormData = z.infer<typeof productSchema>;

interface EditProductFormProps {
  product: Product;
}

export default function EditProductForm({ product }: EditProductFormProps) {
  const router = useRouter();
  const [categories, setCategories] = useState<{ name: string }[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Fel vid inläsning av kategorier:", error);
        toast.error("Kunde inte ladda kategorier");
      } finally {
        setIsLoadingCategories(false);
      }
    }

    loadCategories();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: product.title,
      image: product.image,
      price: product.price,
      description: product.description,
      category: categories?.[0]?.name || "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await updateProduct(product.articleNumber, data);
      toast.success("Produkten uppdaterades!");
      router.push("/admin");
    } catch (error) {
      console.error("Fel:", error);
      toast.error("Det gick inte att uppdatera produkten");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Redigera produkt</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} data-cy="product-form" className="space-y-6">
          {/* Rubrik */}
          <div>
            <Label htmlFor="title">Rubrik</Label>
            <Input
              id="title"
              placeholder="Produkttitel"
              {...register("title")}
              data-cy="product-title"
            />
            {errors.title && (
              <p data-cy="product-title-error" className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Bild-URL */}
          <div>
            <Label htmlFor="image">Bild-URL</Label>
            <Input
              id="image"
              placeholder="https://exempel.com/bild.jpg"
              {...register("image")}
              data-cy="product-image"
            />
            {errors.image && (
              <p data-cy="product-image-error" className="text-red-500 text-sm mt-1">
                {errors.image.message}
              </p>
            )}
          </div>

          {/* Pris */}
          <div>
            <Label htmlFor="price">Pris</Label>
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

          {/* Beskrivning */}
          <div>
            <Label htmlFor="description">Beskrivning</Label>
            <Input
              id="description"
              placeholder="Kort beskrivning..."
              {...register("description")}
              data-cy="product-description"
            />
            {errors.description && (
              <p data-cy="product-description-error" className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Kategori */}
          <div>
            <Label htmlFor="category">Kategori</Label>
            <select
              id="category"
              {...register("category")}
              className="w-full p-2 border rounded-md"
              disabled={isLoadingCategories}
              data-cy="product-category"
            >
              <option value="">Välj en kategori...</option>
              {categories.map((category) => (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1" data-cy="product-category-error">
                {errors.category.message}
              </p>
            )}
            {isLoadingCategories && <p className="text-sm">Laddar kategorier...</p>}
          </div>

          {/* Spara ändringar */}
          <Button type="submit" data-cy="product-submit">
            Spara ändringar
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
