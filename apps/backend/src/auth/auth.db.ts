import { AuthToken, Prisma, PrismaClient } from '@prisma/client';
import { JsonObject } from '@prisma/client/runtime/library';

export async function findAuth(key: string): Promise<AuthToken | null> {
  const prisma = new PrismaClient();
  return await prisma.authToken.findUnique({ where: { key } });
}

export async function findAuthByUserId(id: string): Promise<AuthToken[]> {
  const prisma = new PrismaClient();
  return await prisma.authToken.findMany({ where: { userId: id } });
}

export async function createAuth(auth: Prisma.AuthTokenUncheckedCreateInput) {
  const prisma = new PrismaClient();
  return await prisma.authToken.create({ data: auth });
}

export async function updateAuth(
  key: string,
  update: Prisma.AuthTokenUpdateInput,
) {
  const prisma = new PrismaClient();
  return await prisma.authToken.update({ where: { key }, data: update });
}

export async function invalidateOTT(key: string) {
  const auth = await findAuth(key);
  if (!auth) return;
  const meta = { ...(auth.meta as JsonObject) };
  delete meta.ott;

  const prisma = new PrismaClient();
  return await prisma.authToken.update({
    where: { key },
    data: { meta },
  });
}
