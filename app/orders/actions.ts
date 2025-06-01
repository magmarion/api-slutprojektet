// app/orders/actions.ts
import { db } from "@/prisma/client";
import { orderSchema, updateOrderSchema } from "@/lib/schemas";

// Typ för order med relationer
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
    console.error("Fel vid hämtning av order:", error);
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
      error: "Validering misslyckades",
      details: result.error.flatten().fieldErrors,
    };
  }

  // Kontrollera att användaren finns
  const user = await db.user.findUnique({ where: { id: data.userId } });
  if (!user) {
    return {
      success: false,
      error: `Användare med id ${data.userId} hittades inte`,
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
        error: `Produkt med id ${item.productId} hittades inte`,
      };
    }
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
    console.error("Fel vid skapande av order:", error);
    return { success: false, error: "Det gick inte att skapa ordern" };
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
    console.error("Fel vid hämtning av order med ID:", error);
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
      error: "Validering misslyckades",
      details: result.error.flatten().fieldErrors,
    };
  }

  type UpdateData = {
    userId?: string;
    items?: { productId: string; quantity: number }[];
    total?: number;
    status?: string;
  };
  // Skapa en kopia och filtrera bort undefined
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
    console.error("Fel vid uppdatering av order:", error);
    return { success: false, error: "Det gick inte att uppdatera ordern" };
  }
}

export async function deleteOrder(id: string) {
  try {
    await db.order.delete({ where: { id } });
    return { success: true };
  } catch (error) {
    console.error("Fel vid radering av order:", error);
    return { success: false, error: "Det gick inte att ta bort ordern" };
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
