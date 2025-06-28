// Router for TodoItem CRUD endpoints
import { Router } from 'express';
import { withJWTAuth } from '../auth/strategies/jwt.strategy';
import {
  hasRequiredRole,
  requireRoleForTodoItem,
} from '../utils/permissions.utils';
import { AuthRequest } from '../auth/auth.types';
import * as db from './todoItem.db';

const router = Router();

// Get single TodoItem - requires COLLABORATOR role
router.get(
  '/:id',
  withJWTAuth,
  requireRoleForTodoItem('COLLABORATOR'),
  async (req: AuthRequest, res) => {
    try {
      const item = await db.getTodoItemById(req.params.id);
      if (!item) return res.status(404).json({ error: 'Not found' });
      res.json(item);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },
);

// Update TodoItem - requires COLLABORATOR for status changes, EDITOR for other changes
router.patch(
  '/:id',
  withJWTAuth,
  requireRoleForTodoItem('COLLABORATOR'),
  async (req: AuthRequest, res) => {
    try {
      // Check if this is only a status change (completed field)
      const updateKeys = Object.keys(req.body);
      const isOnlyStatusChange =
        updateKeys.length === 1 && updateKeys[0] === 'completed';

      // If trying to update more than just status, require EDITOR role
      if (
        !isOnlyStatusChange &&
        !hasRequiredRole(req.user?.accountRole, 'EDITOR')
      ) {
        return res.status(403).json({
          error: 'forbidden',
          reason: 'Editor role required for non-status updates',
        });
      }

      const item = await db.updateTodoItem(req.params.id, req.body);
      res.json(item);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },
);

// Delete TodoItem - requires ADMIN role
router.delete(
  '/:id',
  withJWTAuth,
  requireRoleForTodoItem('EDITOR'),
  async (req: AuthRequest, res) => {
    try {
      await db.deleteTodoItem(req.params.id);
      res.status(204).end();
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },
);

export default router;
