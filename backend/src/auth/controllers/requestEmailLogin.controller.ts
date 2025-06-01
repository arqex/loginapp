import { Response } from 'express';
import { findAuth } from '../auth.db';
import { refreshOTT } from '../auth.utils';
import { AuthToken } from '@prisma/client';
import { sendEmail } from '../../email/sender';
import { getLoginByEmailTemplate } from '../../email/templates/loginByEmail.template';
import { resInvalidEmail } from '../../utils/respond.utils';
import { isValidEmailAddress } from '../../utils/validation.utils';
import { AuthRequest } from '../auth.types';

export async function requestEmailLoginController(
  req: AuthRequest,
  res: Response,
) {
  const { email } = req.body;

  if (!isValidEmailAddress(email)) return resInvalidEmail(res);

  const auth = await findAuth(email);

  if (auth) {
    handleEmailLoginRequest(auth);
  }

  // Always return 204, to prevent email enumeration
  return res.status(204).send();
}

export async function handleEmailLoginRequest(auth: AuthToken) {
  const ott = await refreshOTT(auth);
  await sendEmail(auth.key, getLoginByEmailTemplate(auth.key, ott.token));
}
