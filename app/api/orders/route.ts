import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;

    const body = await req.json();
    const { items, total, paymentMethod } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items in order" }, { status: 400 });
    }

    // Create order and order items in a transaction
    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          userId,
          total: total,
          status: "PENDING",
          orderItems: {
            create: items.map((item: any) => ({
              productId: item.id,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
      });

      // Create a transaction record
      await tx.transaction.create({
        data: {
          amount: total,
          status: "SUCCESS",
          paymentMethod: paymentMethod,
          orderId: newOrder.id,
          userId,
        },
      });

      return newOrder;
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
