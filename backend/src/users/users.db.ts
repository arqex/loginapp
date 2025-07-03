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

export async function getUsersByQuery(query: Prisma.UserFindManyArgs) {
  // Exclude clientData from list queries by default
  const defaultSelect = {
    id: true,
    createdAt: true,
    updatedAt: true,
    email: true,
    meta: true,
    // clientData is intentionally excluded from list queries
  };

  return await getPrismaClient().user.findMany({
    ...query,
    select: query.select || defaultSelect,
  });
}
