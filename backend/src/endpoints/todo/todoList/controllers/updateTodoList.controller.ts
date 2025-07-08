import { Response } from 'express';
import { AuthRequest } from '../../../loginapp/auth/auth.types';
import * as db from '../todoList.db';

export async function updateTodoListController(
  req: AuthRequest,
  res: Response,
): Promise<void> {
  const list = await db.updateTodoList(req.params.id, req.body);
  res.json(list);
}
