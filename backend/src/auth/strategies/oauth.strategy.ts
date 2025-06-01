import * as passport from 'passport';
import './oauth/googleOauth.strategy';
import { Request, Response } from 'express';
import { resError } from '../../utils/respond.utils';

export function oauthStart(req: Request, res: Response, next: any) {
  const { provider, returnTo } = req.query;
  const { referer } = req.headers;

  if (!isValidReferer(referer)) return resError(res, 'invalid_referer');
  if (typeof returnTo !== 'string' || !returnTo.startsWith(referer))
    return resError(res, 'invalid_return_to');

  if (provider === 'google') {
    const authenticator = passport.authenticate('google', {
      scope: ['profile', 'email'],
      state: returnTo,
    });
    return authenticator(req, res, next);
  }

  return resError(res, 'invalid_provider');
}

export function oauthCallback(req: Request, res: Response, next: any) {
  const { scope, state: returnTo } = req.query;
  if (!isValidReferer(returnTo)) return resError(res, 'invalid_return_to');

  const onSuccess = (none: null, user: any) => {
    req.user = user;
    next();
  };

  if (typeof scope === 'string' && scope.includes('google')) {
    // @ts-ignore
    req.returnTo = returnTo;
    return passport.authenticate(
      'google',
      {
        failureRedirect: returnTo as string,
      },
      onSuccess,
    )(req, res, next);
  }
  return resError(res, 'invalid_provider');
}

const validReferers = ['http://localhost:5173/'];
function isValidReferer(url: any) {
  if (typeof url !== 'string') return false;
  return validReferers.some((validReferer) => url.startsWith(validReferer));
}
