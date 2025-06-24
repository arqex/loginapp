import { UsersOnAccountRole } from '@prisma/client';
import { getPrismaClient } from '../prismaclient';

export async function createAccountMembers(
  data: {
    userId: string;
    accountId: string;
    role: UsersOnAccountRole;
  }[],
) {
  return await getPrismaClient().usersOnAccount.createMany({
    data,
  });
}

export async function updateAccountMember(
  userId: string,
  accountId: string,
  role: UsersOnAccountRole,
) {
  return await getPrismaClient().usersOnAccount.update({
    where: { userId_accountId: { userId, accountId } },
    data: { role },
  });
}

export async function deleteAccountMember(userId: string, accountId: string) {
  return await getPrismaClient().usersOnAccount.delete({
    where: { userId_accountId: { userId, accountId } },
  });
}

export async function getUsersOnAccountRoleOnAccount(
  userId: string,
  accountId: string,
): Promise<UsersOnAccountRole | undefined> {
  const user = await getPrismaClient().usersOnAccount.findFirst({
    where: { userId, accountId },
    select: { role: true },
  });

  return user?.role;
}

export async function getUsersOnAccountRolesOnAccounts(userId: string) {
  return await getPrismaClient().usersOnAccount.findMany({
    where: { userId },
    select: { accountId: true, role: true },
  });
}

export async function getAccountMemberList(accountId: string) {
  return await getPrismaClient().usersOnAccount.findMany({
    where: { accountId },
    select: { userId: true, role: true },
  });
}
