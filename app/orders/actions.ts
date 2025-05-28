// app/orders/actions.ts
import { orderSchema, updateOrderSchema } from "@/lib/schemas";
import { db } from "@/prisma/client";

// Type för order med relationer
export type OrderWithRelations = {
  id: string;
  total: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  user: { id: string; name: string };
  items: Array<{
    id: string;
    quantity: number;
    product: { id: string; title: string };
  }>;
};

export async function getOrders(): Promise<OrderWithRelations[]> {
  try {
    return await db.order.findMany({
      include: {
        user: { select: { id: true, name: true } },
        items: { include: { product: { select: { id: true, title: true } } } },
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return []; // Returnera en tom lista som fallback
  }
}

export async function createOrder(data: {
  userId: string;
  items: Array<{ productId: string; quantity: number }>;
  total: number;
  status: string;
}) {
  // Validera inkommande data med zod
  const result = orderSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      error: "Validation failed",
      details: result.error.flatten().fieldErrors,
    };
  }

  // Kontrollera att användaren finns
  const user = await db.user.findUnique({ where: { id: data.userId } });
  if (!user) {
    return {
      success: false,
      error: `User with id ${data.userId} not found`,
    };
  }

  // Kontrollera att alla produkter finns
  for (const item of data.items) {
    const product = await db.product.findUnique({
      where: { id: item.productId },
    });
    if (!product) {
      return {
        success: false,
        error: `Product with id ${item.productId} not found`,
      };
    }
    if (product.stock < item.quantity) {
      return {
        success: false,
        error: `Not enough in stock for ${product.title}`,
      };
    }
    await db.product.update({
        where: { id: item.productId },
        data: { stock: product.stock - item.quantity }
    })
  }

  // Skapa ordern
  try {
    const order = await db.order.create({
      data: {
        userId: data.userId,
        total: data.total,
        status: data.status,
        items: {
          create: data.items.map((i) => ({
            productId: i.productId,
            quantity: i.quantity,
          })),
        },
      },
      include: {
        user: { select: { id: true, name: true } },
        items: { include: { product: { select: { id: true, title: true } } } },
      },
    });


    return { success: true, order };
  } catch (error) {
    console.error("Error creating order:", error);
    return { success: false, error: "Failed to create order" };
  }
}

export async function getOrderById(
  id: string
): Promise<OrderWithRelations | null> {
  try {
    return await db.order.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true } },
        items: { include: { product: { select: { id: true, title: true } } } },
      },
    });
  } catch (error) {
    console.error("Error fetching order by ID:", error);
    return null;
  }
}

export async function updateOrder(
  id: string,
  data: {
    userId?: string;
    items?: { productId: string; quantity: number }[];
    total?: number;
    status?: string;
  }
) {
  const result = updateOrderSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      error: "Validation failed",
      details: result.error.flatten().fieldErrors,
    };
  }

  type UpdateData = {
    userId?: string;
    items?: { productId: string; quantity: number }[];
    total?: number;
    status?: string;
  };
  // Skapa en kopia och filtrera undefined
  const filteredData = Object.fromEntries(
    Object.entries(result.data).filter(([_, value]) => value !== undefined)
  ) as UpdateData;

  const prismaData: any = { ...filteredData };

  // Om userId finns, använd relationsformat
  if (filteredData.userId) {
    prismaData.user = { connect: { id: filteredData.userId } };
    delete prismaData.userId;
  }

  // Om items finns, använd create + set (eller updateMany)
  if (filteredData.items) {
    prismaData.items = {
      set: [], // Rensar gamla rader
      create: filteredData.items.map(
        (item: { productId: string; quantity: number }) => ({
          productId: item.productId,
          quantity: item.quantity,
        })
      ),
    };
    delete prismaData.items;
  }

  try {
    const updatedOrder = await db.order.update({
      where: { id },
      data: prismaData,
      include: {
        user: { select: { id: true, name: true } },
        items: {
          include: {
            product: { select: { id: true, title: true } },
          },
        },
      },
    });

    return { success: true, updatedOrder };
  } catch (error) {
    console.error("Error updating order:", error);
    return { success: false, error: "Failed to update order" };
  }
}

export async function deleteOrder(id: string) {
  try {
    await db.order.delete({ where: { id } });
    return { success: true };
  } catch (error) {
    console.error("Error deleting order:", error);
    return { success: false, error: "Failed to delete order" };
  }
}
export async function getOrdersByUserId(
  userId: string
): Promise<OrderWithRelations[]> {
  return db.order.findMany({
    where: { userId },
    include: {
      user: { select: { id: true, name: true } },
      items: { include: { product: { select: { id: true, title: true } } } },
    },
    orderBy: { createdAt: "desc" },
  });
}
export async function getOrderCount(): Promise<number> {
  return db.order.count();
}
export async function getTotalSales(): Promise<number> {
  const result = await db.order.aggregate({
    _sum: { total: true },
  });
  return result._sum.total || 0;
}
export async function getOrdersWithPagination(
  page: number,
  limit: number
): Promise<{ orders: OrderWithRelations[]; totalCount: number }> {
  const [orders, totalCount] = await Promise.all([
    db.order.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: {
        user: { select: { id: true, name: true } },
        items: { include: { product: { select: { id: true, title: true } } } },
      },
      orderBy: { createdAt: "desc" },
    }),
    db.order.count(),
  ]);
  return { orders, totalCount };
}
export async function getOrdersByStatus(
  status: string
): Promise<OrderWithRelations[]> {
  return db.order.findMany({
    where: { status },
    include: {
      user: { select: { id: true, name: true } },
      items: { include: { product: { select: { id: true, title: true } } } },
    },
    orderBy: { createdAt: "desc" },
  });
}
export async function getOrdersByDateRange(
  startDate: Date,
  endDate: Date
): Promise<OrderWithRelations[]> {
  return db.order.findMany({
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    include: {
      user: { select: { id: true, name: true } },
      items: { include: { product: { select: { id: true, title: true } } } },
    },
    orderBy: { createdAt: "desc" },
  });
}
export async function getOrdersByUserIdWithPagination(
  userId: string,
  page: number,
  limit: number
): Promise<{ orders: OrderWithRelations[]; totalCount: number }> {
  const [orders, totalCount] = await Promise.all([
    db.order.findMany({
      where: { userId },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        user: { select: { id: true, name: true } },
        items: { include: { product: { select: { id: true, title: true } } } },
      },
      orderBy: { createdAt: "desc" },
    }),
    db.order.count({ where: { userId } }),
  ]);
  return { orders, totalCount };
}
export async function getOrderTotalByUserId(userId: string): Promise<number> {
  const result = await db.order.aggregate({
    where: { userId },
    _sum: { total: true },
  });
  return result._sum.total || 0;
}
//           <td className='border px-4 py-2'>
