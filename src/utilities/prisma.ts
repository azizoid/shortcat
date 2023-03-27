import { PrismaClient, Prisma } from '@prisma/client';

// Initialize a global Prisma client instance
const prisma = new PrismaClient();

export type PrismaHelperCallback<T> = (prisma: PrismaClient) => Promise<T>;

export async function prismaHelper<T>(callback: PrismaHelperCallback<T>): Promise<T> {
  try {
    const result = await callback(prisma);
    return result;
  } catch (err) {
    throw err;
  } finally {
    await prisma.$disconnect();
  }
}
