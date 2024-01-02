import { Request, Response } from 'express';
import {
  resError,
  resInvalidEmail,
  resUnauthorized,
} from 'src/utils/respond.utils';
import { isValidEmailAddress } from 'src/utils/validation.utils';
import { findAuth, updateAuth } from '../auth.db';
import { JsonObject } from '@prisma/client/runtime/library';
import { respondLogin } from './login.controller';

export async function verifyEmailController(req: Request, res: Response) {
  const { vc, email } = req.body;
  const { useCookie } = req.query;

  if (!vc) return resError(res, 'missing_verification_token');
  if (!isValidEmailAddress(email)) return resInvalidEmail(res);

  const auth = await findAuth(email);
  if (!auth) return resUnauthorized(res);

  const { vc: storedVC } = auth.meta as JsonObject;
  if (storedVC !== vc) return resUnauthorized(res);

  const update = {
    ...(auth.meta as JsonObject),
  };
  delete update.vc;
  await updateAuth(auth.key, { meta: update });

  respondLogin(auth.userId, res, useCookie !== 'false');
}
