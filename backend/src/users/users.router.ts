import { Router } from 'express';
import { getUserController } from './controllers/getUser.controller';
import { withJWTAuth } from '../auth/strategies/jwt.strategy';
import { getUserListController } from './controllers/getUserList.controller';
import { getUserAccountsController } from './controllers/getUserAccounts.controller';
import { requireSelfUser } from '../utils/permissions.utils';

const usersRouter = Router();

// This user list an example on how to use pagination
// delete before publishing the API
usersRouter.get('/', withJWTAuth, getUserListController);
usersRouter.get('/:id', withJWTAuth, requireSelfUser(), getUserController);
usersRouter.get(
  '/:id/accounts',
  withJWTAuth,
  requireSelfUser(),
  getUserAccountsController,
);

export default usersRouter;
