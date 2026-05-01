import { PrismaClient } from "@prisma/client";

const dbUrl = process.env.MONGODB_URL;
const globalForPrisma = global as unknown as { prisma: PrismaClient };

const createUnavailablePrisma = (message: string) =>
  new Proxy({} as PrismaClient, {
    get() {
      throw new Error(message);
    },
  }) as PrismaClient;

let prismaClient: PrismaClient;

if (!dbUrl) {
  prismaClient = createUnavailablePrisma("MONGODB_URL is not defined");
} else {
  try {
    prismaClient =
      globalForPrisma.prisma ||
      new PrismaClient({
        log: ["query"],
      });
  } catch (error: any) {
    prismaClient = createUnavailablePrisma(
      `Failed to initialize Prisma client: ${error?.message || "Unknown error"}`
    );
  }
}

export const prisma = prismaClient;

if (dbUrl && process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
