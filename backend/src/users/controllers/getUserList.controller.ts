import { Response } from 'express';
import { AuthRequest } from 'src/auth/auth.types';
import { getPaginationResponse } from '../../utils/respond.utils';
import { getPaginationQuery } from '../../utils/request.utils';
import { getUsersByQuery } from '../users.db';

export async function getUserListController(req: AuthRequest, res: Response) {
  const query = getPaginationQuery(req, {});

  const users = await getUsersByQuery(query);
  res.json(getPaginationResponse(users, query));
}
