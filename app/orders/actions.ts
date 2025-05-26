// Fil: app/orders/actions.ts
'use server';

import { db } from '@/prisma/client';

export type OrderWithRelations = {
  id: string;
  total: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  user: { id: string; name: string };
  items: Array<{
    id: string;
    qty: number;
    product: { id: string; title: string };
  }>;
};

export async function getOrders(): Promise<OrderWithRelations[]> {
  return await db.order.findMany({
    include: {
      user: {
        select: { id: true, name: true },
      },
      items: {
        include: {
          product: {
            select: { id: true, title: true },
          },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function createOrder(data: {
  userId: string;
  items: Array<{ productId: string; qty: number }>;
  total: number;
  status: string;
}) {
  return await db.order.create({
    data: {
      userId: data.userId,
      total: data.total,
      status: data.status,
      items: {
        create: data.items.map((i) => ({
          productId: i.productId,
          qty: i.qty,
        })),
      },
    },
    include: {
      user: { select: { id: true, name: true } },
      items: {
        include: { product: { select: { id: true, title: true } } },
      },
    },
  });
}

export async function getOrderById(id: string): Promise<OrderWithRelations> {
  const order = await db.order.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, name: true } },
      items: {
        include: { product: { select: { id: true, title: true } } },
      },
    },
  });
  if (!order) throw new Error('Order not found');
  return order;
}

export async function updateOrder(
  id: string,
  data: { status?: string; total?: number }
) {
  return await db.order.update({
    where: { id },
    data: {
      status: data.status,
      total: data.total,
    },
    include: {
      user: { select: { id: true, name: true } },
      items: {
        include: { product: { select: { id: true, title: true } } },
      },
    },
  });
}

export async function deleteOrder(id: string) {
  await db.order.delete({ where: { id } });
}
export async function getOrdersCount(): Promise<number> {
  return await db.order.count();
}
export async function getOrdersTotal(): Promise<number> {
  const result = await db.order.aggregate({
    _sum: {
      total: true,
    },
  });
  return result._sum.total || 0;
}
export async function getOrdersByUserId(
  userId: string
): Promise<OrderWithRelations[]> {
  return await db.order.findMany({
    where: { userId },
    include: {
      user: { select: { id: true, name: true } },
      items: {
        include: { product: { select: { id: true, title: true } } },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
}
export async function getOrdersByStatus(
  status: string
): Promise<OrderWithRelations[]> {
  return await db.order.findMany({
    where: { status },
    include: {
      user: { select: { id: true, name: true } },
      items: {
        include: { product: { select: { id: true, title: true } } },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
}
