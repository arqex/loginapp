import { Response } from 'express';
import { getTodoListsByAccount } from './todoList/todoList.db';
import { AuthRequest } from '../loginapp/auth/auth.types';

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
