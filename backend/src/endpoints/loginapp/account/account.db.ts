import { Prisma, Account } from '@prisma/client';
import { getPrismaClient } from '../../../prismaclient';

export async function createAccount(account: Prisma.AccountCreateInput) {
  return await getPrismaClient().account.create({ data: account });
}

export async function getAccountById(id: string): Promise<Account | null> {
  return await getPrismaClient().account.findUnique({ where: { id } });
}

export async function updateAccount(
  id: string,
  account: Prisma.AccountUpdateInput,
) {
  return await getPrismaClient().account.update({
    where: { id },
    data: account,
  });
}

export async function deleteAccount(id: string) {
  return await getPrismaClient().account.delete({ where: { id } });
}

export async function getAccountsByQuery(
  query: Prisma.AccountFindManyArgs,
): Promise<Account[]> {
  return await getPrismaClient().account.findMany(query);
}
