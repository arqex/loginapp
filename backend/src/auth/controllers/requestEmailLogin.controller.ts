import { Response } from 'express';
import { AuthRequest } from 'src/auth/auth.types';
import { findAuth, updateAuth } from '../auth.db';
import { JsonObject } from '@prisma/client/runtime/library';
import { generateOtt } from '../auth.utils';
import { sendEmail } from 'src/email/sender';
import { getLoginByEmailTemplate } from 'src/email/templates/loginByEmail.template';
import { AuthToken } from '@prisma/client';
import { resInvalidEmail } from 'src/utils/respond.utils';
import { isValidEmailAddress } from 'src/utils/validation.utils';

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
  const ott = generateOtt();
  const meta = {
    ...(auth.meta as JsonObject),
    ott,
  };
  await updateAuth(auth.key, { meta });
  await sendEmail(auth.key, getLoginByEmailTemplate(auth.key, ott.token));
}
