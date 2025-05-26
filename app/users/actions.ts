import { db } from "@/prisma/client"

export async function getMyOrders(userId: string) {
  "use server"

  const orders = await db.order.findMany({
    where: { userId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: { createdAt: "desc" }
  });

  return orders;
}