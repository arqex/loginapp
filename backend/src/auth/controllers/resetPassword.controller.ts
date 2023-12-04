import { Response } from 'express';
import { AuthRequest } from 'src/auth/auth.types';
import {
  resError,
  resInvalidEmail,
  resUnauthorized,
} from 'src/utils/respond.utils';
import { isValidEmailAddress } from 'src/utils/validation.utils';
import { findAuth, updateAuth } from '../auth.db';
import { generatePasswordAuth, isValidOTT } from '../auth.utils';
import { respondLogin } from './login.controller';
import { JsonObject } from '@prisma/client/runtime/library';

export async function resetPasswordController(req: AuthRequest, res: Response) {
  const { ott, email, password } = req.body;

  if (!isValidEmailAddress(email)) return resInvalidEmail(res);
  if (!ott || !password) return resError(res, 'missing_ott_or_password', 400);

  const auth = await findAuth(email);
  console.log('auth', auth);
  if (!auth || !isValidOTT(auth, ott)) return resUnauthorized(res);

  const updatedMeta = {
    ...(auth.meta as JsonObject),
    ...(await generatePasswordAuth(password)),
    ott: undefined,
  };

  await updateAuth(email, { meta: updatedMeta });

  respondLogin(auth, res);
}
