'use server';

import { db } from '@/prisma/client';

// Type för order med relationer
export type OrderWithRelations = {
  id: string;
  total: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  user: { id: string; name: string };
  items: Array<{ id: string; quantity: string; product: { id: string; title: string } }>;
};

export async function getOrders(): Promise<OrderWithRelations[]> {
  return db.order.findMany({
    include: {
      user: { select: { id: true, name: true } },
      items: { include: { product: { select: { id: true, title: true } } } },
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function createOrder(data: {
  userId: string;
  items: Array<{ productId: string; quantity: string }>;
  total: number;
  status: string;
}) {
  return db.order.create({
    data: {
      userId: data.userId,
      total: data.total,
      status: data.status,
      items: {
        create: data.items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
      },
    },
    include: {
      user: { select: { id: true, name: true } },
      items: { include: { product: { select: { id: true, title: true } } } },
    },
  });
}

export async function getOrderById(id: string): Promise<OrderWithRelations> {
  const order = await db.order.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, name: true } },
      items: { include: { product: { select: { id: true, title: true } } } },
    },
  });
  if (!order) throw new Error('Order not found');
  return order;
}

export async function updateOrder(
  id: string,
  data: { status?: string; total?: number }
) {
  return db.order.update({
    where: { id },
    data: {
      status: data.status,
      total: data.total,
    },
    include: {
      user: { select: { id: true, name: true } },
      items: { include: { product: { select: { id: true, title: true } } } },
    },
    });
    }

export async function deleteOrder(id: string) {
  return db.order.delete({ where: { id } });
}
export async function getOrdersByUserId(userId: string): Promise<OrderWithRelations[]> {
  return db.order.findMany({
    where: { userId },
    include: {
      user: { select: { id: true, name: true } },
      items: { include: { product: { select: { id: true, title: true } } } },
    },
    orderBy: { createdAt: 'desc' },
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
      orderBy: { createdAt: 'desc' },
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
    orderBy: { createdAt: 'desc' },
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
    orderBy: { createdAt: 'desc' },
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
      orderBy: { createdAt: 'desc' },
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