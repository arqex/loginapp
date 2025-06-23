import { Response } from 'express';
import { AuthRequest } from 'src/auth/auth.types';
import { getUsersByQuery } from '../../users/users.db';
import { getPaginationQuery } from '../../utils/request.utils';
import { getPaginationResponse } from '../../utils/respond.utils';

export async function getAccountUserListController(
  req: AuthRequest,
  res: Response,
) {
  const { accountId } = req.params;

  const query = getPaginationQuery(req, {
    where: { accounts: { some: { accountId } } },
  });

  const users = await getUsersByQuery(query);

  return res.json(getPaginationResponse(users, query));
}
