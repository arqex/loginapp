import { AuthTokenType } from '@prisma/client';
import { Request, Response } from 'express';
import { createAuth, findAuth, findAuthByUserId, updateAuth } from '../auth.db';
import { respondLogin } from './login.controller';
import { createUser, getUserByEmail } from 'src/users/users.db';
import { resError, resUnauthorized } from 'src/utils/respond.utils';
import { JsonObject } from '@prisma/client/runtime/library';
import { providerDecoders } from 'src/utils/providers.utils';

export async function signupByProviderController(req: Request, res: Response) {
  const { provider, token } = req.body;
  const decoder = providerDecoders[provider];
  if (!decoder) return resError(res, 'unknown_provider');

  let providerId, email;
  try {
    const decoded = await decoder(token);
    providerId = decoded.id;
    email = decoded.email;
  } catch (err) {
    return resUnauthorized(res);
  }

  const auth = await findAuth(providerId);
  const { useCookie } = req.query;
  if (auth) {
    // The user already exists, we can just login
    return await respondLogin(auth.userId, res, useCookie !== 'false');
  }

  // Apple only send the email with the first registration
  // If we don't have the auth, and we can't get the email
  // from apple, we can't authenticate the user
  if (!email) {
    return await resError(res, 'email_not_provided');
  }

  // Check the user hasn't registered through other method
  let user = await getUserByEmail(email);
  if (user) {
    // User was registered, find their auths
    const auths = await findAuthByUserId(user.id);
    const emailAuth = auths.find((a) => a.type === AuthTokenType.EMAIL_LOGIN);

    // If there was an email auth, not verified it gets verified now
    if (emailAuth && (emailAuth.meta as JsonObject).vc) {
      const meta = { ...(emailAuth.meta as JsonObject) };
      delete meta.vc;
      await updateAuth(emailAuth.key, { meta });
    }
  } else {
    // User is new, create them
    user = await createUser({
      email: email,
      meta: {},
    });
  }

  await createAuth({
    key: providerId,
    type: AuthTokenType.PROVIDER_LOGIN,
    userId: user.id,
    meta: {
      provider,
      token,
    },
  });

  return await respondLogin(user.id, res, useCookie !== 'false');
}
