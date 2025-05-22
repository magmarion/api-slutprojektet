// app/api/orders/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/prisma/client';

export async function GET(req: NextRequest) {
  const orders = await db.order.findMany();
  return NextResponse.json(orders);
}

export async function POST(req: NextRequest) {
  const { userId, items, total, status } = await req.json();
  const order = await db.order.create({
    data: { userId, items, total, status },
  });
  return NextResponse.json(order, { status: 201 });
}
