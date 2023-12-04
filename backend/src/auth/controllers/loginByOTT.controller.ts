import { Response } from 'express';
import { AuthRequest } from 'src/auth/auth.types';
import { resInvalidEmail, resUnauthorized } from 'src/utils/respond.utils';
import { isValidEmailAddress } from 'src/utils/validation.utils';
import { isValidOTT } from '../auth.utils';
import { respondLogin } from './login.controller';
import { findAuth, invalidateOTT } from '../auth.db';

export async function loginByOTTController(req: AuthRequest, res: Response) {
  const { email, ott } = req.body;
  if (!isValidEmailAddress(email)) return resInvalidEmail(res);
  console.log('email', email, ott);

  const auth = await findAuth(email);
  console.log('auth', auth);
  if (!auth || !isValidOTT(auth, ott)) return resUnauthorized(res);

  await invalidateOTT(email);

  respondLogin(auth, res);
}
