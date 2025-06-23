import { Response } from 'express';
import { AuthRequest } from '../../auth/auth.types';
import { getTodoListsByAccount } from '../../todoList/todoList.db';

export async function getAccountTodoListController(
  req: AuthRequest,
  res: Response,
) {
  const { accountId } = req.params;
  try {
    const lists = await getTodoListsByAccount(accountId);
    res.json(lists);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}
