// app/orders/actions.ts
import { db } from '@/prisma/client';

export async function getOrders() {
    'use server';
    return await db.order.findMany();
}

export async function createOrder(data: {
    userId: string;
    items: any[];
    total: number;
    status: string;
}) {
    'use server';
    const order = await db.order.create({ data });
    return order;
}

export async function getOrderById(id: string) {
    'use server';
    const order = await db.order.findUnique({ where: { id } });
    if (!order) throw new Error('Order not found');
    return order;
}

export async function updateOrder(id: string, data: {
    userId?: string;
    items?: any[];
    total?: number;
    status?: string;
}) {
    'use server';
    return await db.order.update({ where: { id }, data });
}

export async function deleteOrder(id: string) {
    'use server';
    await db.order.delete({ where: { id } });
}