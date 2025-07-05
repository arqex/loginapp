import { Response } from 'express';
import { createAuth, findAuthByUserId } from '../auth.db';
import { generatePasswordAuth } from '../auth.utils';
import { respondLogin } from './login.controller';
import { AuthTokenType } from '@prisma/client';
import { resError } from '../../utils/respond.utils';
import { AuthRequest } from '../auth.types';
import { getUserById } from '../../users/users.db';

export async function setPasswordController(req: AuthRequest, res: Response) {
  const { password } = req.body;
  const authenticatedUserId = req.user?.id;

  if (!authenticatedUserId) {
    return resError(res, 'unauthorized', 401);
  }

  if (!password) {
    return resError(res, 'missing_password', 400);
  }

  // Check if user already has email auth token
  const existingAuths = await findAuthByUserId(authenticatedUserId);
  const emailAuth = existingAuths.find(
    (auth) => auth.type === AuthTokenType.EMAIL_LOGIN,
  );

  if (emailAuth) {
    return resError(res, 'password_already_set', 400);
  }

  // Get user email to create email auth token
  const user = await getUserById(authenticatedUserId);

  if (!user) {
    return resError(res, 'user_not_found', 404);
  }

  // Create email auth token with password
  const passwordAuth = await generatePasswordAuth(password);
  await createAuth({
    key: user.email,
    type: AuthTokenType.EMAIL_LOGIN,
    userId: authenticatedUserId,
    meta: passwordAuth,
  });

  // Return success response with the same format as login
  respondLogin(authenticatedUserId, res);
}
