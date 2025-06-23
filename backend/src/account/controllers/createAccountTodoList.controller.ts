import { Response } from 'express';
import { AuthRequest } from '../../auth/auth.types';
import { createTodoList } from '../../todoList/todoList.db';

export async function createAccountTodoListController(
  req: AuthRequest,
  res: Response,
) {
  const { accountId } = req.params;
  try {
    const todoList = await createTodoList({ ...req.body, accountId });
    res.status(201).json(todoList);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}
