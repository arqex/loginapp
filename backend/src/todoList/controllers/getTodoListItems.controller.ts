import { Response } from 'express';
import { AuthRequest } from '../../auth/auth.types';
import * as todoItemDb from '../../todoItem/todoItem.db';

export async function getTodoListItemsController(
  req: AuthRequest,
  res: Response,
): Promise<void> {
  const items = await todoItemDb.getTodoItemsByList(req.params.id);
  res.json(items);
}
