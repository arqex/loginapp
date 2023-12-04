import { Request } from 'express';
import * as passport from 'passport';
import { Strategy } from 'passport-jwt';

export const AUTH_COOKIE_NAME = 'auth_token';

const options = {
  jwtFromRequest: (req: Request) => {
    let token = null;
    if (req && req.cookies) {
      token = req.cookies[AUTH_COOKIE_NAME];
    }
    return token;
  },
  secretOrKey: process.env.JWT_SECRET,
};

const jwtStrategy = new Strategy(
  options,
  async ({ userId, permissions }, done) => {
    done(null, { id: userId, sessionPermissions: permissions || [] });
  },
);

passport.use(jwtStrategy);

export const withJWTAuth = passport.authenticate('jwt', { session: false });
