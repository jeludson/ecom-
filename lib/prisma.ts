import { PrismaClient } from "@prisma/client";

const dbUrl = process.env.MONGODB_URL;
if (!dbUrl) {
  console.error("CRITICAL ERROR: MONGODB_URL is not defined!");
} else {
  console.log("MONGODB_URL found, length:", dbUrl.length);
  console.log("Starts with mongodb:", dbUrl.startsWith("mongodb"));
  // Log hex of first few characters to see if there are hidden chars
  const hex = Buffer.from(dbUrl.substring(0, 10)).toString('hex');
  console.log("Hex of first 10 chars:", hex);
}

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
