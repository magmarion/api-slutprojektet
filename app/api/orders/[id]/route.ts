// app/api/orders/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/prisma/client';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const order = await db.order.findUnique({ where: { id: params.id } });
  if (!order)
    return NextResponse.json({ message: 'Order ej hittad' }, { status: 404 });
  return NextResponse.json(order);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await req.json();
  const updated = await db.order.update({ where: { id: params.id }, data });
  return NextResponse.json(updated);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await db.order.delete({ where: { id: params.id } });
  return new Response(null, { status: 204 });
}
