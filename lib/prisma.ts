import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createClient(): PrismaClient {
  const dbUrl = process.env.MONGODB_URL;
  if (!dbUrl) {
    throw new Error("MONGODB_URL is not defined");
  }
  return new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? (["warn", "error"] as const)
        : (["error"] as const),
  });
}

function getClient(): PrismaClient {
  if (globalForPrisma.prisma) return globalForPrisma.prisma;
  const client = createClient();
  globalForPrisma.prisma = client;
  return client;
}

/**
 * Lazy proxy so importing this module during `next build` does not construct PrismaClient
 * (avoids engine/env edge cases while Next collects route data).
 */
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    const client = getClient();
    const value = Reflect.get(client, prop, receiver);
    if (typeof value === "function") {
      return value.bind(client);
    }
    return value;
  },
}) as PrismaClient;
