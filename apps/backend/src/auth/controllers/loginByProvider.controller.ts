import { Response } from 'express';
import { AuthRequest } from 'src/auth/auth.types';
import { resError, resUnauthorized } from 'src/utils/respond.utils';
import { respondLogin } from './login.controller';
import { createAuth, findAuth, findAuthByUserId, updateAuth } from '../auth.db';
import { providerDecoders } from 'src/utils/providers.utils';
import { AuthTokenType } from '@prisma/client';
import { JsonObject } from '@prisma/client/runtime/library';
import { getUserByEmail } from 'src/users/users.db';

export async function loginByProviderController(
  req: AuthRequest,
  res: Response,
) {
  const { provider, token } = req.body;
  const decoder = providerDecoders[provider];
  if (!decoder) return resError(res, 'unknown_provider');

  let providerId, email;
  try {
    const decoded = await decoder(token);
    console.log('DECODED!!!', decoded);
    providerId = decoded.id;
    email = decoded.email;
  } catch (err) {
    return resUnauthorized(res);
  }

  const auth = await findAuth(providerId);
  const { useCookie } = req.query;
  if (auth) {
    return respondLogin(auth.userId, res, useCookie !== 'false');
  }

  // Apple only send the email with the first registration
  // If we don't have the auth, and we can't get the email
  // from apple, we can't authenticate the user
  if (!email) {
    return await resError(res, 'email_not_provided');
  }

  // Maybe the user was registered by other methods
  const user = await getUserByEmail(email);
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

    // Create the new auth for the provider
    await createAuth({
      key: providerId,
      type: AuthTokenType.PROVIDER_LOGIN,
      userId: user.id,
      meta: {
        provider,
        token,
      },
    });

    return respondLogin(user.id, res, useCookie !== 'false');
  }

  // If the user wasn't registered, just return an error
  return resUnauthorized(res);
}
