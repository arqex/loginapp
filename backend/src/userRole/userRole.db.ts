import { UserRole } from '@prisma/client';
import { getPrismaClient } from '../prismaclient';

export async function createAccountMembers(
  data: {
    userId: string;
    accountId: string;
    role: UserRole;
  }[],
) {
  return await getPrismaClient().userOnAccount.createMany({
    data,
  });
}

export async function updateAccountMember(
  userId: string,
  accountId: string,
  role: UserRole,
) {
  return await getPrismaClient().userOnAccount.update({
    where: { userId_accountId: { userId, accountId } },
    data: { role },
  });
}

export async function deleteAccountMember(userId: string, accountId: string) {
  return await getPrismaClient().userOnAccount.delete({
    where: { userId_accountId: { userId, accountId } },
  });
}

export async function getUserRoleOnAccount(
  userId: string,
  accountId: string,
): Promise<UserRole | undefined> {
  const user = await getPrismaClient().userOnAccount.findFirst({
    where: { userId, accountId },
    select: { role: true },
  });

  return user?.role;
}

export async function getUserRolesOnAccounts(userId: string) {
  return await getPrismaClient().userOnAccount.findMany({
    where: { userId },
    select: { accountId: true, role: true },
  });
}

export async function getAccountMemberList(accountId: string) {
  return await getPrismaClient().userOnAccount.findMany({
    where: { accountId },
    select: { userId: true, role: true },
  });
}
