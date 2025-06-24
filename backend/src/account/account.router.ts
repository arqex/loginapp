import { Router } from 'express';
import { getAccountController } from './controllers/getAccount.controller';
import { withJWTAuth } from '../auth/strategies/jwt.strategy';
import { getAccountUserListController } from './controllers/getAccountUserList.controller';
import { getAccountTodoListController } from './controllers/getAccountTodoList.controller';
import { createAccountTodoListController } from './controllers/createAccountTodoList.controller';

const accountRouter = Router();

accountRouter.get('/:accountId', withJWTAuth, getAccountController);

accountRouter.get(
  '/:accountId/users',
  withJWTAuth,
  getAccountUserListController,
);

accountRouter.get(
  '/:accountId/lists',
  withJWTAuth,
  getAccountTodoListController,
);

accountRouter.post(
  '/:accountId/lists',
  withJWTAuth,
  createAccountTodoListController,
);

export default accountRouter;
