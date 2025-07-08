import { Response } from 'express';
import { AuthRequest } from '../../auth/auth.types';
import { getUsersByQuery } from '../users.db';
import { getPaginationQuery } from '../../../../utils/request.utils';
import { getPaginationResponse } from '../../../../utils/respond.utils';

export async function getUserListController(req: AuthRequest, res: Response) {
  const query = getPaginationQuery(req, {});

  const users = await getUsersByQuery(query);
  res.json(getPaginationResponse(users, query));
}
