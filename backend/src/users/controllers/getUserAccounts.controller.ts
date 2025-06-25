import { Response } from 'express';
import { AuthRequest } from 'src/auth/auth.types';
import { resForbidden } from '../../utils/respond.utils';
import { getUserAccounts } from '../../userRole/userRole.db';

export async function getUserAccountsController(
  req: AuthRequest,
  res: Response,
) {
  const { id: authenticatedUserId } = req.user!;
  const userId = req.params.id;

  if (userId !== authenticatedUserId) {
    return resForbidden(res);
  }

  // Get all account-role pairs for the user
  const userAccounts = await getUserAccounts(userId);

  // Filter out any nulls (accounts that no longer exist)
  res.json(userAccounts);
}
