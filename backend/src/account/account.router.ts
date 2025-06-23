import { Router } from 'express';
import { getAccountController } from './controllers/getAccount.controller';
import { UserRole } from '@prisma/client';
import { requireRole } from '../permission/permission.utils';
import { withJWTAuth } from '../auth/strategies/jwt.strategy';
import { getAccountCatalogListController } from './controllers/getAccountCatalogList.controller';
import { getAccountUserListController } from './controllers/getAccountUserList.controller';
import { createAccountCatalogController } from './controllers/createAccountCatalog.controller';
import { getAccountTodoListController } from './controllers/getAccountTodoList.controller';
import { createAccountTodoListController } from './controllers/createAccountTodoList.controller';

const accountRouter = Router();

accountRouter.get('/:accountId', withJWTAuth, getAccountController);

accountRouter.get(
  '/:accountId/catalogs',
  withJWTAuth,
  requireRole(UserRole.COLLABORATOR),
  getAccountCatalogListController,
);

accountRouter.get(
  '/:accountId/users',
  withJWTAuth,
  requireRole(UserRole.ADMIN),
  getAccountUserListController,
);

accountRouter.post(
  '/:accountId/catalogs',
  withJWTAuth,
  requireRole(UserRole.EDITOR),
  createAccountCatalogController,
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
