import { Response } from 'express';
import { createTodoItem } from '../todoItem/todoItem.db';
import { AuthRequest } from '../../loginapp/auth/auth.types';

export async function createTodoListItemController(
  req: AuthRequest,
  res: Response,
) {
  const { id: todoListId } = req.params;
  try {
    const item = await createTodoItem({ ...req.body, todoListId });
    res.status(201).json(item);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}
