// app/orders/actions.ts
import { db } from "@/prisma/client";
import { z } from "zod";

const orderSchema = z.object({
  userId: z.string().nonempty("User ID is required"),
  items: z.array(z.any()).nonempty("Items cannot be empty"),
  total: z.number().min(0, "Total must be at least 0"),
  status: z.string().nonempty("Status is required"),
});

const updateOrderSchema = z.object({
  userId: z.string().optional(),
  items: z.array(z.any()).optional(),
  total: z.number().min(0).optional(),
  status: z.string().optional(),
});

export async function getOrders() {
  "use server";
  try {
    return await db.order.findMany();
  } catch (error) {
    console.error("Error fetching orders:", error);
    return { success: false, error: "Failed to fetch orders" };
  }
}

export async function createOrder(data: {
  userId: string;
  items: any[];
  total: number;
  status: string;
}) {
  "use server";

  const result = orderSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      error: "Validation failed",
      details: result.error.flatten().fieldErrors,
    };
  }

  try {
    const order = await db.order.create({ data: result.data });
    return { success: true, order };
  } catch (error) {
    console.error("Error creating order:", error);
    return { success: false, error: "Failed to create order" };
  }
}

export async function getOrderById(id: string) {
  "use server";
  try {
    const order = await db.order.findUnique({ where: { id } });
    if (!order) {
      return { success: false, error: "Order not found" };
    }
    return { success: true, order };
  } catch (error) {
    console.error("Error fetching order by ID:", error);
    return { success: false, error: "Failed to fetch order" };
  }
}

export async function updateOrder(
  id: string,
  data: {
    userId?: string;
    items?: any[];
    total?: number;
    status?: string;
  }
) {
  "use server";

  const result = updateOrderSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      error: "Validation failed",
      details: result.error.flatten().fieldErrors,
    };
  }

  try {
    const updatedOrder = await db.order.update({
      where: { id },
      data: result.data,
    });
    return { success: true, updatedOrder };
  } catch (error) {
    console.error("Error updating order:", error);
    return { success: false, error: "Failed to update order" };
  }
}

export async function deleteOrder(id: string) {
  "use server";
  try {
    await db.order.delete({ where: { id } });
    return { success: true };
  } catch (error) {
    console.error("Error deleting order:", error);
    return { success: false, error: "Failed to delete order" };
  }
}
