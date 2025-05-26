import { z } from "zod";

export const productSchema = z.object({
  title: z.string().nonempty("Title is required"),
  image: z
    .string()
    .nonempty("Image URL is required")
    .url("Please enter a valid URL"),
  price: z
    .number({ invalid_type_error: "Price must be a number" })
    .min(0, "Price must be at least 0"),
  description: z.string().nonempty("Description is required"),
  category: z.string().nonempty("Category is required"),
});

