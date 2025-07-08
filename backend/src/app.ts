import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import { errorHandler } from './utils/errorHandler.middleware';
import { requestLogger } from './utils/requestLogger.middleware';

import accountRouter from './endpoints/loginapp/account/account.router';
import authRouter from './endpoints/loginapp/auth/auth.router';
import usersRouter from './endpoints/loginapp/users/users.router';
import todoListRouter from './endpoints/todo/todoList/todoList.router';
import todoItemRouter from './endpoints/todo/todoItem/todoItem.router';
import invitationRouter from './endpoints/loginapp/invitation/invitation.router';
import invitationReplyRouter from './endpoints/loginapp/invitation/invitationReply.router';

const app = express();

// Request logging middleware should be added early to capture all requests
app.use(requestLogger);
app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.get('/', (req, res) => {
  res.send('Hello Worldo!');
});

app.use('/accounts', accountRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/lists', todoListRouter);
app.use('/items', todoItemRouter);
app.use('/invitations', invitationRouter);
app.use('/invitation_reply', invitationReplyRouter);

// Error handling middleware should be added last
app.use(errorHandler);

export default app;
