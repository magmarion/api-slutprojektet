"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createProduct, getCategories } from "@/app/admin/actions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const productSchema = z.object({
  title: z.string().nonempty("Title is required"),
  image: z
    .string()
    .nonempty("Image URL is required")
    .url("Please enter a valid URL"),
  price: z.coerce.number().min(1, "Price must be at least 1"),
  description: z.string().nonempty("Description is required"),
  category: z.string().nonempty("Category is required"),
});

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
    },
  });

  // Hämta kategorier när komponenten laddas
  useEffect(() => {
    async function loadCategories() {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Failed to load categories:", error);
        toast.error("Failed to load categories");
      } finally {
        setIsLoadingCategories(false);
      }
    }

    loadCategories();
  }, []);

  // Handle form submission - nu med direkt anrop till server action
  const onSubmit = async (data: ProductFormData) => {
    try {
      // Anropa server action direkt
      await createProduct(
        {
          title: data.title,
          image: data.image,
          price: data.price,
          description: data.description,
        },
        data.category
      ); // Skicka kategorin som en separat parameter

      toast.success("Product created successfully!");
      router.push("/admin");
    } catch (error) {
      console.error(error);
      toast.error("There was an error when creating the product.");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Product</CardTitle>
      </CardHeader>

      <CardContent>
        {/* Product Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          data-cy="product-form"
          className="space-y-6"
        >
          {/* Title */}
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Product Title"
              {...register("title")}
              data-cy="product-title"
            />
            {errors.title && (
              <p
                data-cy="product-title-error"
                className="text-red-500 text-sm mt-1"
              >
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Image URL */}
          <div>
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              placeholder="https://example.com/image.jpg"
              {...register("image")}
              data-cy="product-image"
            />
            {errors.image && (
              <p
                data-cy="product-image-error"
                className="text-red-500 text-sm mt-1"
              >
                {errors.image.message}
              </p>
            )}
          </div>

          {/* Price */}
          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              placeholder="999"
              {...register("price", { valueAsNumber: true })}
              data-cy="product-price"
            />
            {errors.price && (
              <p
                data-cy="product-price-error"
                className="text-red-500 text-sm mt-1"
              >
                {errors.price.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Short description..."
              {...register("description")}
              data-cy="product-description"
            />
            {errors.description && (
              <p
                data-cy="product-description-error"
                className="text-red-500 text-sm mt-1"
              >
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Kategori fält */}
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              {...register("category")}
              disabled={isLoadingCategories}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select a category...</option>
              {categories.map((category) => (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
            {isLoadingCategories && (
              <p className="text-sm">Loading categories...</p>
            )}
          </div>

          {/* Submit */}
          <Button type="submit" data-cy="product-submit">
            Save
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
