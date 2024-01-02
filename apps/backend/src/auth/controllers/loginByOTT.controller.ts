import { Response } from 'express';
import { AuthRequest } from 'src/auth/auth.types';
import { resUnauthorized } from 'src/utils/respond.utils';
import { isValidOTT } from '../auth.utils';
import { respondLogin } from './login.controller';
import { findAuth, invalidateOTT } from '../auth.db';

export async function loginByOTTController(req: AuthRequest, res: Response) {
  const { key, ott } = req.body;
  const { useCookie } = req.query;

  const auth = await findAuth(key);
  if (!auth || !isValidOTT(auth, ott)) return resUnauthorized(res);

  await invalidateOTT(key);

  respondLogin(auth.userId, res, useCookie !== 'false');
}
