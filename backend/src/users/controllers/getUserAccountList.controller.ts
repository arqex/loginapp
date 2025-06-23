import { Response } from 'express';
import { AuthRequest } from 'src/auth/auth.types';
import { getPaginationResponse, resForbidden } from '../../utils/respond.utils';
import { getPaginationQuery } from '../../utils/request.utils';
import { getAccountsByQuery } from '../../account/account.db';

export async function getUserAccountListController(
  req: AuthRequest,
  res: Response,
) {
  const { id: authenticatedUserId } = req.user!;
  const userId = req.params.id;

  if (userId !== authenticatedUserId) {
    return resForbidden(res);
  }

  const query = getPaginationQuery(req, {
    where: { users: { some: { userId } } },
  });

  const accounts = await getAccountsByQuery(query);
  return res.json(getPaginationResponse(accounts, query));
}
