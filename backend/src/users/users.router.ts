import { Router } from 'express';
import { withJWTAuth } from 'src/auth/strategies/jwt.strategy';
import { getUserController } from './controllers/getUser.controller';

const usersRouter = Router();

usersRouter.get('/:id', withJWTAuth, getUserController);

export default usersRouter;
