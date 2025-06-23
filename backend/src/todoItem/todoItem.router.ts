// Router for TodoItem CRUD endpoints
import { Router } from 'express';
import * as db from './todoItem.db';

const router = Router();

// Get single TodoItem
router.get('/:id', async (req, res) => {
  try {
    const item = await db.getTodoItemById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Update TodoItem
router.put('/:id', async (req, res) => {
  try {
    const item = await db.updateTodoItem(req.params.id, req.body);
    res.json(item);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Delete TodoItem
router.delete('/:id', async (req, res) => {
  try {
    await db.deleteTodoItem(req.params.id);
    res.status(204).end();
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

export default router;
