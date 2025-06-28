import { Response } from 'express';
import { AuthRequest } from 'src/auth/auth.types';
import { resForbidden } from '../../utils/respond.utils';
import { getUserAccountsWithDetails } from '../../userRole/userRole.db';
import { JsonObject } from '@prisma/client/runtime/library';

export async function getUserAccountsController(
  req: AuthRequest,
  res: Response,
) {
  const { id: authenticatedUserId } = req.user!;
  const userId = req.params.id;

  if (userId !== authenticatedUserId) {
    return resForbidden(res);
  }

  // Get all accounts with roles and details in one query
  const userAccounts = (await getUserAccountsWithDetails(userId))
    .filter(({ account }) => !!account)
    .map((userAccount) => ({
      ...userAccount,
      account: {
        ...userAccount.account,
        ...(userAccount.account.meta as JsonObject),
      },
    }));

  res.json(userAccounts);
}
