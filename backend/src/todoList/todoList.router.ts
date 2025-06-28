// Router for TodoList CRUD endpoints
import { Router } from 'express';
import * as db from './todoList.db';
import * as todoItemDb from '../todoItem/todoItem.db';
import { createTodoListItemController } from './createTodoListItem.controller';

const router = Router();

// Get single TodoList
router.get('/:id', async (req, res) => {
  try {
    const list = await db.getTodoListById(req.params.id);
    if (!list) return res.status(404).json({ error: 'Not found' });
    res.json(list);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Get all TodoItems for a specific TodoList
router.get('/:id/items', async (req, res) => {
  try {
    const items = await todoItemDb.getTodoItemsByList(req.params.id);
    res.json(items);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Create a new TodoItem for a specific TodoList
router.post('/:id/items', createTodoListItemController);

// Update TodoList
router.patch('/:id', async (req, res) => {
  try {
    const list = await db.updateTodoList(req.params.id, req.body);
    res.json(list);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Delete TodoList
router.delete('/:id', async (req, res) => {
  try {
    await db.deleteTodoList(req.params.id);
    res.status(204).end();
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

export default router;
