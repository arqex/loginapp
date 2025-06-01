import { Response } from 'express';
import { OauthRequest } from '../auth.types';

export async function oauthCallbackController(
  req: OauthRequest,
  res: Response,
) {
  const { user, returnTo } = req;
  const separator = returnTo.includes('?') ? '&' : '?';

  const redirectURL = `${returnTo}${separator}key=${user.id}&ott=${user.ott}&source=oauth`;
  res.redirect(redirectURL);
}
