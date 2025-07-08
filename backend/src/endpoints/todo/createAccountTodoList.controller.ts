import { Response } from 'express';
import { createTodoList } from './todoList/todoList.db';
import { AuthRequest } from '../loginapp/auth/auth.types';

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
