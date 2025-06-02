"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createProduct, getCategories } from "@/app/admin/actions";
import { productSchema } from "@/lib/schemas";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type ProductFormData = z.infer<typeof productSchema>;

export default function AddProductForm() {
  const router = useRouter();
  const [categories, setCategories] = useState<{ name: string }[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      image: "",
      price: 0,
      description: "",
      category: "",
      stock: 0,
    },
  });

  // Hämta kategorier när komponenten laddas
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

  // Hantera formulärinlämning
  const onSubmit = async (data: ProductFormData) => {
    try {
      await createProduct(
        {
          title: data.title,
          image: data.image,
          price: data.price,
          description: data.description,
        },
        data.category
      );

      toast.success("Produkten skapades!");
      router.push("/admin");
    } catch (error) {
      console.error("Fel:", error);
      toast.error("Det gick inte att skapa produkten");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lägg till produkt</CardTitle>
      </CardHeader>

      <CardContent>
        {/* Product Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* Rubrik */}
          <div>
            <Label htmlFor="title">Rubrik</Label>
            <Input
              id="title"
              placeholder="Produkttitel"
              {...register("title")}
            />
            {errors.title && (
              <p
                className="text-red-500 text-sm mt-1"
              >
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Bild URL */}
          <div>
            <Label htmlFor="image">Bild-URL</Label>
            <Input
              id="image"
              placeholder="https://example.com/image.jpg"
              {...register("image")}
            />
            {errors.image && (
              <p
                className="text-red-500 text-sm mt-1"
              >
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
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
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
            />
            {errors.description && (
              <p
                className="text-red-500 text-sm mt-1"
              >
                {errors.description.message}
              </p>
            )}
          </div>


          {/* Stock (Saldo i lager) */}
<div>
  <Label htmlFor="stock">Saldo i lager</Label>
  <Input
    id="stock"
    type="number"
    placeholder="Antal i lager"
    {...register("stock", { valueAsNumber: true })}
  />
  {errors.stock && (
    <p
      className="text-red-500 text-sm mt-1"
    >
      {errors.stock.message}
    </p>
  )}
</div>


          {/* Kategori fält */}

          <div className="space-y-2">
            <Label htmlFor="category">Kategori</Label>
            <select
              id="category"
              {...register("category")}
              disabled={isLoadingCategories}
              className="w-full p-2 border"
            >
              <option value="">Välj en kategori...</option>
              {categories.map((category) => (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
            {isLoadingCategories && <p className="text-sm">Laddar kategorier...</p>}
          </div>
          
          {/* Skicka */}
          <Button type="submit">
            Spara
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
