// Example: Updated TodoList router with permissions middleware
import { Router } from 'express';
import { withJWTAuth } from '../auth/strategies/jwt.strategy';
import { requireRoleForTodoList } from '../utils/permissions.utils';
import * as db from '../todoList/todoList.db';
import * as todoItemDb from '../todoItem/todoItem.db';
import { createTodoListItemController } from '../todoList/createTodoListItem.controller';

const router = Router();

// Get single TodoList - requires COLLABORATOR role (account ID extracted from TodoList)
router.get(
  '/:id',
  withJWTAuth,
  requireRoleForTodoList('COLLABORATOR'),
  async (req, res) => {
    try {
      const list = await db.getTodoListById(req.params.id);
      if (!list) return res.status(404).json({ error: 'Not found' });
      res.json(list);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },
);

// Get all TodoItems for a specific TodoList - requires COLLABORATOR role
router.get(
  '/:id/items',
  withJWTAuth,
  requireRoleForTodoList('COLLABORATOR'),
  async (req, res) => {
    try {
      const items = await todoItemDb.getTodoItemsByList(req.params.id);
      res.json(items);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },
);

// Create a new TodoItem for a specific TodoList - requires EDITOR role
router.post(
  '/:id/items',
  withJWTAuth,
  requireRoleForTodoList('EDITOR'),
  createTodoListItemController,
);

// Update TodoList - requires ADMIN role
router.patch(
  '/:id',
  withJWTAuth,
  requireRoleForTodoList('ADMIN'),
  async (req, res) => {
    try {
      const list = await db.updateTodoList(req.params.id, req.body);
      res.json(list);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },
);

// Delete TodoList - requires ADMIN role
router.delete(
  '/:id',
  withJWTAuth,
  requireRoleForTodoList('ADMIN'),
  async (req, res) => {
    try {
      await db.deleteTodoList(req.params.id);
      res.status(204).end();
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },
);

export default router;
