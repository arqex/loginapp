import { Prisma, PrismaClient, User } from '@prisma/client';

export async function createUser(user: Prisma.UserCreateInput) {
  const prisma = new PrismaClient();
  const createdUser = await prisma.user.create({ data: user });
  return createdUser;
}

export async function getUserById(id: string): Promise<User | null> {
  const prisma = new PrismaClient();
  return await prisma.user.findUnique({ where: { id } });
}

export async function updateUser(id: string, user: Prisma.UserUpdateInput) {
  const prisma = new PrismaClient();
  return await prisma.user.update({ where: { id }, data: user });
}
