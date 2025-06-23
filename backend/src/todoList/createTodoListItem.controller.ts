import { Response } from 'express';
import { AuthRequest } from '../auth/auth.types';
import { createTodoItem } from '../todoItem/todoItem.db';

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
