import { AuthTokenType } from '@prisma/client';
import { Request, Response } from 'express';
import { createAuth, findAuth } from '../auth.db';
import {
  generatePasswordAuth,
  generateVerificationCode,
  isValidPassword,
} from '../auth.utils';
import { respondLogin } from './login.controller';
import { createUser } from 'src/users/users.db';
import { sendEmail } from 'src/email/sender';
import { getEmailVerifyTemplate } from 'src/email/templates/verifyEmail.template';
import { handleEmailLoginRequest } from './requestEmailLogin.controller';
import { isValidEmailAddress } from 'src/utils/validation.utils';
import { resInvalidEmail } from 'src/utils/respond.utils';

export async function signupController(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!isValidEmailAddress(email)) return resInvalidEmail(res);
  const auth = await findAuth(email);
  if (auth) {
    // Username already exists
    if (await isValidPassword(auth, password)) {
      // This is going to return a 201, to signal app to login
      return await respondLogin(auth, res);
    } else {
      // Password not valid, send email to login by email
      await handleEmailLoginRequest(auth);
      return res.status(204).send();
    }
  }

  const user = await createUser({
    email: email,
    meta: { verified: false },
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
