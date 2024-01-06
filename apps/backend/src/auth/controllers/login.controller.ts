import { Request, Response } from 'express';
import { findAuth } from '../auth.db';
import { isValidPassword, createJWT } from '../auth.utils';
import { AUTH_COOKIE_NAME } from '../strategies/jwt.strategy';
import {
  resError,
  resInvalidEmail,
  resUnauthorized,
} from 'src/utils/respond.utils';
import { isValidEmailAddress } from 'src/utils/validation.utils';
import { JsonObject } from '@prisma/client/runtime/library';
import { sendEmail } from 'src/email/sender';
import { getEmailVerifyTemplate } from 'src/email/templates/verifyEmail.template';

export async function loginController(req: Request, res: Response) {
  const { email, password } = req.body;
  const { useCookie } = req.query;
  if (!isValidEmailAddress(email)) return resInvalidEmail(res);

  const auth = await findAuth(email);
  if (!auth || !(await isValidPassword(auth, password)))
    return resUnauthorized(res);

  const vc = (auth.meta as JsonObject).vc as string;
  if (vc) {
    await sendEmail(email, getEmailVerifyTemplate(email, vc));
    return resError(res, 'verification_required', 400);
  }

  await respondLogin(auth.userId, res, useCookie !== 'false');
}

export async function respondLogin(
  authenticatedId: string,
  res: Response,
  useCookie: boolean = true,
) {
  if (useCookie) {
    res.cookie(AUTH_COOKIE_NAME, await createJWT(authenticatedId, ['all']), {
      httpOnly: true,
    });
    res.status(201).json({ authenticatedId });
  } else {
    res.status(201).json({
      authenticatedId,
      token: await createJWT(authenticatedId, ['all']),
    });
  }
}
