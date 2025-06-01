import { AuthToken, Prisma } from '@prisma/client';
import { JsonObject } from '@prisma/client/runtime/library';
import { getPrismaClient } from '../prismaclient';

export async function findAuth(key: string): Promise<AuthToken | null> {
  return await getPrismaClient().authToken.findUnique({ where: { key } });
}

export async function findAuthByUserId(id: string): Promise<AuthToken[]> {
  return await getPrismaClient().authToken.findMany({ where: { userId: id } });
}

export async function createAuth(auth: Prisma.AuthTokenUncheckedCreateInput) {
  return await getPrismaClient().authToken.create({ data: auth });
}

export async function updateAuth(
  key: string,
  update: Prisma.AuthTokenUpdateInput,
) {
  return await getPrismaClient().authToken.update({
    where: { key },
    data: update,
  });
}

export async function invalidateOTT(key: string) {
  const auth = await findAuth(key);
  if (!auth) return;
  const meta = { ...(auth.meta as JsonObject) };
  delete meta.ott;

  return await getPrismaClient().authToken.update({
    where: { key },
    data: { meta },
  });
}
