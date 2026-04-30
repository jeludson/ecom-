import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any).role !== "SELLER") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sellerId = (session.user as any).id;

  try {
    const products = await prisma.product.findMany({
      where: { sellerId },
      include: {
        orderItems: {
          include: {
            order: {
              include: {
                user: true
              }
            }
          }
        }
      }
    });

    // Extract unique customers who bought from this seller
    const customersMap = new Map();
    products.forEach(product => {
      product.orderItems.forEach(item => {
        const user = item.order.user;
        if (!customersMap.has(user.id)) {
          customersMap.set(user.id, {
            id: user.id,
            name: user.name,
            email: user.email,
            totalSpent: 0,
            ordersCount: 0,
          });
        }
        const customer = customersMap.get(user.id);
        customer.totalSpent += item.price * item.quantity;
        customer.ordersCount += 1;
      });
    });

    const customers = Array.from(customersMap.values());

    return NextResponse.json({
      products,
      customers,
    });
  } catch (error) {
    console.error("Seller data fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch seller data" }, { status: 500 });
  }
}
