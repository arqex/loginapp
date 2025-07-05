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

export async function updateUserMetaFields(
  id: string,
  metaUpdates: Record<string, any>,
) {
  const prisma = getPrismaClient();

  // Build the JSON_SET function calls for each field
  const jsonSetCalls = Object.entries(metaUpdates).map(([key, value]) => {
    return `JSON_SET(meta, '$.${key}', ${JSON.stringify(value)})`;
  });

  // If there's only one field, use it directly, otherwise nest them
  const jsonExpression =
    jsonSetCalls.length === 1
      ? jsonSetCalls[0]
      : jsonSetCalls.reduce((acc, call, index) => {
          if (index === 0) return call;
          return call.replace('meta', acc);
        });

  // Use raw SQL to update JSON fields directly
  await prisma.$executeRaw`
    UPDATE User 
    SET meta = ${Prisma.raw(jsonExpression)}, updatedAt = NOW()
    WHERE id = ${id}
  `;

  // Return the updated user
  return await getUserById(id);
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
