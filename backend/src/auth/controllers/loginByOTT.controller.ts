import { Response } from 'express';
import { isValidOTT } from '../auth.utils';
import { respondLogin } from './login.controller';
import { findAuth, invalidateOTT } from '../auth.db';
import { resUnauthorized } from '../../utils/respond.utils';
import { AuthRequest } from '../auth.types';

export async function loginByOTTController(req: AuthRequest, res: Response) {
  const { key, ott } = req.body;
  const { useCookie } = req.query;

  const auth = await findAuth(key);
  if (!auth || !isValidOTT(auth, ott)) return resUnauthorized(res);

  await invalidateOTT(key);

  respondLogin(auth.userId, res, useCookie !== 'false');
}
