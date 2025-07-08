// Router for TodoList CRUD endpoints

import { createTodoListItemController } from './createTodoListItem.controller';
import { getTodoListController } from './controllers/getTodoList.controller';
import { getTodoListItemsController } from './controllers/getTodoListItems.controller';
import { updateTodoListController } from './controllers/updateTodoList.controller';
import { deleteTodoListController } from './controllers/deleteTodoList.controller';
import { createAsyncRouter } from '../../../utils/asyncRouter';
import { requireRoleForTodoList } from '../../../utils/permissions.utils';
import { withJWTAuth } from '../../loginapp/auth/strategies/jwt.strategy';

const router = createAsyncRouter();

// Get single TodoList - requires COLLABORATOR role
router.get(
  '/:id',
  withJWTAuth,
  requireRoleForTodoList('COLLABORATOR'),
  getTodoListController,
);

// Get all TodoItems for a specific TodoList - requires COLLABORATOR role
router.get(
  '/:id/items',
  withJWTAuth,
  requireRoleForTodoList('COLLABORATOR'),
  getTodoListItemsController,
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
  updateTodoListController,
);

// Delete TodoList - requires ADMIN role
router.delete(
  '/:id',
  withJWTAuth,
  requireRoleForTodoList('ADMIN'),
  deleteTodoListController,
);

export default router.getRouter();
