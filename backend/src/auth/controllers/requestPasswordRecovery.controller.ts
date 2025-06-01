import { Response } from 'express';
import { findAuth, updateAuth } from '../auth.db';
import { JsonObject } from '@prisma/client/runtime/library';
import { generateOtt } from '../auth.utils';
import { AuthToken } from '@prisma/client';
import { sendEmail } from '../../email/sender';
import { getPasswordRecoveryTemplate } from '../../email/templates/passwordRecoveryEmail.template';
import { resInvalidEmail } from '../../utils/respond.utils';
import { isValidEmailAddress } from '../../utils/validation.utils';
import { AuthRequest } from '../auth.types';

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
