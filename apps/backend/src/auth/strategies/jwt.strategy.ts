import { Request } from 'express';
import * as passport from 'passport';
import { Strategy } from 'passport-jwt';

const options = {
  jwtFromRequest: (req: Request) => {
    const token = jwtFromHeader(req) || jwtFromCookie(req);
    return token;
  },
  secretOrKey: process.env.JWT_KEY,
};

const jwtStrategy = new Strategy(
  options,
  async ({ userId, permissions }, done) => {
    done(null, { id: userId, sessionPermissions: permissions || [] });
  },
);

passport.use(jwtStrategy);

export const withJWTAuth = passport.authenticate('jwt', { session: false });

function jwtFromHeader(req: Request) {
  const authorization = req?.headers.authorization;
  if (authorization && authorization.split(' ')[0] === 'Bearer') {
    return authorization.split(' ')[1];
  }
  return null;
}

export const AUTH_COOKIE_NAME = 'auth_token';
function jwtFromCookie(req: Request) {
  return req?.cookies?.[AUTH_COOKIE_NAME] || null;
}
