import { AuthTokenType } from '@prisma/client';
import { Request, Response } from 'express';
import { createAuth, findAuth } from '../auth.db';
import {
  generatePasswordAuth,
  generateVerificationCode,
  isValidPassword,
} from '../auth.utils';
import { respondLogin } from './login.controller';
import { JsonObject } from '@prisma/client/runtime/library';
import { sendEmail } from '../../email/sender';
import { getEmailVerifyTemplate } from '../../email/templates/verifyEmail.template';
import { createUser } from '../../users/users.db';
import { resInvalidEmail } from '../../utils/respond.utils';
import { isValidEmailAddress } from '../../utils/validation.utils';
import { handleEmailLoginRequest } from './requestEmailLogin.controller';

export async function signupController(req: Request, res: Response) {
  const { email, password } = req.body;
  const { useCookie } = req.query;

  if (!isValidEmailAddress(email)) return resInvalidEmail(res);
  const auth = await findAuth(email);
  if (auth) {
    // Username already exists
    if (await isValidPassword(auth, password)) {
      // Check the user is verified
      const vc = (auth.meta as JsonObject).vc as string;
      if (vc) {
        await sendEmail(email, getEmailVerifyTemplate(email, vc));
        // return 204, to not enumerate already register accounts
        return res.status(204).send();
      }

      // User is verified, and passowrd is ok, we can just login
      return await respondLogin(auth.userId, res, useCookie !== 'false');
    } else {
      // Password not valid, send email to login by email
      await handleEmailLoginRequest(auth);
      return res.status(204).send();
    }
  }

  const user = await createUser({
    email: email,
    meta: {},
  });

  const verificationCode = generateVerificationCode();
  await createAuth({
    key: email,
    type: AuthTokenType.EMAIL_LOGIN,
    userId: user.id,
    meta: {
      ...(await generatePasswordAuth(password)),
      vc: verificationCode,
    },
  });
  await sendEmail(email, getEmailVerifyTemplate(email, verificationCode));
  res.status(204).send();
}
