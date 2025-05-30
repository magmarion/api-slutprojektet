import { db } from "@/prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, items, total } = body;

  if (!email || !items?.length) {
    return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
  }

  try {
    await db.order.create({
      data: {
        user: { connect: { email } },
        status: "completed",
        orderNr: Math.floor(Math.random() * 1000000).toString(), 
        items: {
          create: items.map((item: any) => ({
            title: item.title,
            price: item.price,
            quantity: item.quantity,
          })),
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
