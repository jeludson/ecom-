/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.transaction.deleteMany({});
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.user.deleteMany({});

  const hashedAdminPassword = await bcrypt.hash("admin123", 10);
  const hashedSellerPassword = await bcrypt.hash("seller123", 10);
  const hashedBuyerPassword = await bcrypt.hash("buyer123", 10);

  // Create Admin
  const admin = await prisma.user.create({
    data: {
      email: "admin@novacommerce.com",
      password: hashedAdminPassword,
      name: "Super Admin",
      role: "ADMIN",
    },
  });

  // Create Seller
  const seller = await prisma.user.create({
    data: {
      email: "seller@novacommerce.com",
      password: hashedSellerPassword,
      name: "Elite Tech Seller",
      role: "SELLER",
    },
  });

  // Create Buyer
  const buyer = await prisma.user.create({
    data: {
      email: "buyer@novacommerce.com",
      password: hashedBuyerPassword,
      name: "John Doe",
      role: "BUYER",
    },
  });

  // Create some products for the seller
  const productsData = [
    {
      name: "AeroPod Pro Max",
      description: "Experience the next level of audio with the AeroPod Pro Max. Featuring active noise cancellation, transparency mode, and spatial audio for an immersive listening experience.",
      price: 549,
      images: JSON.stringify(["https://images.unsplash.com/photo-1505740420928-5e560c06d30e"]),
      category: "Audio",
    },
    {
      name: "NovaWatch V2",
      description: "The ultimate smartwatch for the digital age. Track your health, stay connected, and customize your look with the NovaWatch V2.",
      price: 399,
      images: JSON.stringify(["https://images.unsplash.com/photo-1523275335684-37898b6baf30"]),
      category: "Wearables",
    },
    {
      name: "Zenith Laptop X1",
      description: "Power meets portability. The Zenith X1 features the latest M3 chip, 32GB RAM, and a stunning 16-inch OLED display for professionals.",
      price: 2499,
      images: JSON.stringify(["https://images.unsplash.com/photo-1496181133206-80ce9b88a853"]),
      category: "Laptops",
    },
    {
      name: "Quantum Phone 15",
      description: "The most advanced smartphone ever. Featuring a titanium body, pro-camera system, and the fastest chip in a smartphone.",
      price: 1099,
      images: JSON.stringify(["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"]),
      category: "Phones",
    },
    {
      name: "Nebula Gaming Console",
      description: "Enter the world of 8K gaming. The Nebula Console delivers lightning-fast load times and breathtaking graphics for the ultimate gaming experience.",
      price: 499,
      images: JSON.stringify(["https://images.unsplash.com/photo-1486401899868-0e435ed85128"]),
      category: "Gaming",
    },
    {
      name: "Sonic Boom Speaker",
      description: "Fill any room with rich, crystal-clear sound. The Sonic Boom Speaker features 360-degree audio and deep bass that you can feel.",
      price: 299,
      images: JSON.stringify(["https://images.unsplash.com/photo-1545454675-3531b543be5d"]),
      category: "Audio",
    },
    {
      name: "Vision VR Headset",
      description: "Immerse yourself in virtual reality. The Vision VR offers 4K resolution per eye and advanced tracking for a truly realistic experience.",
      price: 3499,
      images: JSON.stringify(["https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac"]),
      category: "Wearables",
    },
    {
      name: "Elite Gaming Mouse",
      description: "Precision at your fingertips. The Elite Mouse features a 26K DPI sensor and customizable RGB lighting for competitive gamers.",
      price: 129,
      images: JSON.stringify(["https://images.unsplash.com/photo-1527814050087-37a3d71eaea1"]),
      category: "Gaming",
    }
  ];

  const createdProducts = [];
  for (const product of productsData) {
    const p = await prisma.product.create({
      data: {
        ...product,
        sellerId: seller.id,
      },
    });
    createdProducts.push(p);
  }

  const product1 = createdProducts[0];
  const product2 = createdProducts[1];

  // Create a sample order and transaction
  const order = await prisma.order.create({
    data: {
      userId: buyer.id,
      total: 948,
      status: "DELIVERED",
      orderItems: {
        create: [
          { productId: product1.id, quantity: 1, price: 549 },
          { productId: product2.id, quantity: 1, price: 399 },
        ],
      },
    },
  });

  await prisma.transaction.create({
    data: {
      amount: 948,
      status: "SUCCESS",
      paymentMethod: "STRIPE",
      orderId: order.id,
      userId: buyer.id,
    },
  });

  console.log("MongoDB Seed data created successfully");
  console.log("Admin: admin@novacommerce.com / admin123");
  console.log("Seller: seller@novacommerce.com / seller123");
  console.log("Buyer: buyer@novacommerce.com / buyer123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
