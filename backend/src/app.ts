import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';

import accountRouter from './account/account.router';
import authRouter from './auth/auth.router';
import usersRouter from './users/users.router';
import todoListRouter from './todoList/todoList.router';
import todoItemRouter from './todoItem/todoItem.router';

const app = express();

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

export default app;
