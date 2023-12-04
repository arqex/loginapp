import { Request, Response } from 'express';
import {
  resError,
  resInvalidEmail,
  resUnauthorized,
} from 'src/utils/respond.utils';
import { isValidEmailAddress } from 'src/utils/validation.utils';
import { findAuth } from '../auth.db';
import { getUserById, updateUser } from 'src/users/users.db';
import { JsonObject } from '@prisma/client/runtime/library';

export async function verifyEmailController(req: Request, res: Response) {
  const { vc, email } = req.body;

  console.log('vc', vc, 'email', email);
  if (!vc) return resError(res, 'missing_verification_token');
  if (!isValidEmailAddress(email)) return resInvalidEmail(res);

  const auth = await findAuth(email);
  if (!auth) return resUnauthorized(res);

  console.log('auth', auth);

  const { vc: storedVC } = auth.meta as JsonObject;
  if (storedVC !== vc) return resUnauthorized(res);

  const user = await getUserById(auth.userId);
  const { verified } = user?.meta as JsonObject;
  if (!user || verified) return resUnauthorized(res);

  const updatedMeta = {
    ...(user.meta as JsonObject),
    verified: true,
  };

  await updateUser(user.id, { meta: updatedMeta });
  res.status(204).send();
}
