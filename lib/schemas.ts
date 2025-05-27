// Validering med zod + server actions
import * as z from 'zod';

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

export const orderSchema = z.object({
  userId: z.string().nonempty("User ID is required"),
  items: z
    .array(
      z.object({
        productId: z.string().nonempty("Product ID is required"),
        quantity: z
          .number()
          .int()
          .positive("Quantity must be a positive integer"),
      })
    )
    .nonempty("Items cannot be empty"),
  total: z.number().min(0, "Total must be at least 0"),
  status: z.string().nonempty("Status is required"),
});

export const updateOrderSchema = z.object({
  userId: z.string().optional(),
  items: z.array(z.any()).optional(),
  total: z.number().min(0).optional(),
  status: z.string().optional(),
});

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Ogiltig e-postadress' }),
    password: z.string().min(6, { message: 'Lösenordet måste vara minst 6 tecken långt' }),
});

export const RegisterSchema = z.object({
    email: z.string().email({ message: 'Ogiltig e-postadress' }),
    password: z.string().min(6, { message: 'Lösenordet måste vara minst 6 tecken långt' }),
    username: z.string().min(3, { message: 'Användarnamnet måste vara minst 3 tecken långt' }),

});