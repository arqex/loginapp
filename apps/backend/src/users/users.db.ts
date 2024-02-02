import { Prisma, User } from '@prisma/client';
import { getPrismaClient } from '../prismaclient';

export async function createUser(user: Prisma.UserCreateInput) {
  return await getPrismaClient().user.create({ data: user });
}

export async function getUserById(id: string): Promise<User | null> {
  return await getPrismaClient().user.findUnique({ where: { id } });
}

export async function getUserByEmail(email: string): Promise<User | null> {
  return await getPrismaClient().user.findFirst({ where: { email } });
}

export async function updateUser(id: string, user: Prisma.UserUpdateInput) {
  return await getPrismaClient().user.update({ where: { id }, data: user });
}
