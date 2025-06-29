import { Router } from 'express';
import { getAccountController } from './controllers/getAccount.controller';
import { createAccountController } from './controllers/createAccount.controller';
import { updateAccountController } from './controllers/updateAccount.controller';
import { withJWTAuth } from '../auth/strategies/jwt.strategy';
import { getAccountUserListController } from './controllers/getAccountUserList.controller';
import { getAccountTodoListController } from './controllers/getAccountTodoList.controller';
import { createAccountTodoListController } from './controllers/createAccountTodoList.controller';
import { requireAdmin, requireCollaborator } from '../utils/permissions.utils';

const accountRouter = Router();

// Create a new account (authenticated users only)
accountRouter.post('/', withJWTAuth, createAccountController);

accountRouter.get('/:accountId', withJWTAuth, getAccountController);

accountRouter.patch(
  '/:accountId',
  withJWTAuth,
  requireAdmin(),
  updateAccountController,
);

accountRouter.get(
  '/:accountId/users',
  withJWTAuth,
  requireCollaborator(),
  getAccountUserListController,
);

accountRouter.get(
  '/:accountId/lists',
  withJWTAuth,
  requireCollaborator(),
  getAccountTodoListController,
);

accountRouter.post(
  '/:accountId/lists',
  withJWTAuth,
  requireAdmin(),
  createAccountTodoListController,
);

export default accountRouter;
