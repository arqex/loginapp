import { Response } from 'express';
import { AuthRequest } from '../../../loginapp/auth/auth.types';
import * as db from '../todoList.db';
import { resError } from '../../../../utils/respond.utils';

export async function getTodoListController(
  req: AuthRequest,
  res: Response,
): Promise<void> {
  const list = await db.getTodoListById(req.params.id);
  if (!list) {
    return resError(res, 'not_found', 404);
  }
  res.json(list);
}
