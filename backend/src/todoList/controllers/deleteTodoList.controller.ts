import { Response } from 'express';
import { AuthRequest } from '../../auth/auth.types';
import * as db from '../todoList.db';

export async function deleteTodoListController(
  req: AuthRequest,
  res: Response,
): Promise<void> {
  await db.deleteTodoList(req.params.id);
  res.status(204).end();
}
