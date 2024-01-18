import { Router } from 'express';
import { getUserController } from './controllers/getUser.controller';
import { withJWTAuth } from '../auth/strategies/jwt.strategy';

const usersRouter = Router();

usersRouter.get('/:id', withJWTAuth, getUserController);

export default usersRouter;
