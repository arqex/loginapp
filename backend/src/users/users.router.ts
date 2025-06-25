import { Router } from 'express';
import { getUserController } from './controllers/getUser.controller';
import { withJWTAuth } from '../auth/strategies/jwt.strategy';
import { getUserListController } from './controllers/getUserList.controller';
import { getUserAccountsController } from './controllers/getUserAccounts.controller';

const usersRouter = Router();

// This user list an example on how to use pagination
// delete before publishing the API
usersRouter.get('/', withJWTAuth, getUserListController);
usersRouter.get('/:id', withJWTAuth, getUserController);
usersRouter.get('/:id/accounts', withJWTAuth, getUserAccountsController);

export default usersRouter;
