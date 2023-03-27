import { PrismaClient, Prisma } from '@prisma/client';

export type PrismaHelperCallback<T> = (prisma: PrismaClient) => Promise<T>;

export async function prismaHelper<T>(callback: PrismaHelperCallback<T>): Promise<T> {
  const prisma = new PrismaClient();

  try {
    const result = await callback(prisma);
    return result;
  } catch (err) {
    throw err;
  } finally {
    await prisma.$disconnect();
  }
}
