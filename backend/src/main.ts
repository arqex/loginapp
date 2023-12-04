import './config';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';

import authRouter from './auth/auth.router';
import usersRouter from './users/users.router';

const app = express();
const port = 3000;

app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.get('/', (req, res) => {
  res.send('Hello Worldo!');
});

app.use('/auth', authRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
