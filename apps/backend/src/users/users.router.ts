import { Router } from 'express';
import { getUserController } from './controllers/getUser.controller';
import { withJWTAuth } from '../auth/strategies/jwt.strategy';
import { getUserListController } from './controllers/getUserList.controller';

const usersRouter = Router();

// This user list an example on how to use pagination
// delete before publishing the API
usersRouter.get('/', withJWTAuth, getUserListController);
usersRouter.get('/:id', withJWTAuth, getUserController);

export default usersRouter;
