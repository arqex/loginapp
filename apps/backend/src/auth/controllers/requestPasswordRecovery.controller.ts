import { Response } from 'express';
import { AuthRequest } from 'src/auth/auth.types';
import { findAuth, updateAuth } from '../auth.db';
import { JsonObject } from '@prisma/client/runtime/library';
import { generateOtt } from '../auth.utils';
import { sendEmail } from 'src/email/sender';
import { AuthToken } from '@prisma/client';
import { resInvalidEmail } from 'src/utils/respond.utils';
import { isValidEmailAddress } from 'src/utils/validation.utils';
import { getPasswordRecoveryTemplate } from 'src/email/templates/passwordRecoveryEmail.template';

export async function requestPasswordRecoveryController(
  req: AuthRequest,
  res: Response,
) {
  const { email } = req.body;

  if (!isValidEmailAddress(email)) return resInvalidEmail(res);

  const auth = await findAuth(email);

  if (auth) {
    handlePasswordRecovery(auth);
  }

  // Always return 204, to prevent email enumeration
  return res.status(204).send();
}

export async function handlePasswordRecovery(auth: AuthToken) {
  const ott = generateOtt();
  const meta = {
    ...(auth.meta as JsonObject),
    ott,
  };
  await updateAuth(auth.key, { meta });
  await sendEmail(auth.key, getPasswordRecoveryTemplate(auth.key, ott.token));
}
