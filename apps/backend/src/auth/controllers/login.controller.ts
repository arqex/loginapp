import { Request, Response } from 'express';
import { findAuth } from '../auth.db';
import { isValidPassword, createJWT } from '../auth.utils';
import { AuthToken } from '@prisma/client';
import { AUTH_COOKIE_NAME } from '../strategies/jwt.strategy';
import { resInvalidEmail, resUnauthorized } from 'src/utils/respond.utils';
import { isValidEmailAddress } from 'src/utils/validation.utils';

export async function loginController(req: Request, res: Response) {
  const { email, password } = req.body;
  const { useCookie } = req.query;
  if (!isValidEmailAddress(email)) return resInvalidEmail(res);

  const auth = await findAuth(email);
  if (!auth || !(await isValidPassword(auth, password)))
    return resUnauthorized(res);

  await respondLogin(auth, res, useCookie !== 'false');
}

export async function respondLogin(
  auth: AuthToken,
  res: Response,
  useCookie: boolean = true,
) {
  if (useCookie) {
    res.cookie(AUTH_COOKIE_NAME, await createJWT(auth.userId, ['all']), {
      httpOnly: true,
    });
    res.status(201).json({ authenticatedId: auth.userId });
  } else {
    res.status(201).json({
      authenticatedId: auth.userId,
      token: await createJWT(auth.userId, ['all']),
    });
  }
}
