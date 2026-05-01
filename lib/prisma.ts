import { PrismaClient } from "@prisma/client";

const dbUrl = process.env.MONGODB_URL;
const globalForPrisma = global as unknown as { prisma: PrismaClient };

const prismaClient =
  dbUrl
    ? globalForPrisma.prisma ||
      new PrismaClient({
        log: ["query"],
      })
    : (new Proxy({} as PrismaClient, {
        get() {
          throw new Error("MONGODB_URL is not defined");
        },
      }) as PrismaClient);

export const prisma = prismaClient;

if (dbUrl && process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
