import * as passport from 'passport';
import * as GoogleStrategy from 'passport-google-oauth20';
import { handleOauthCallback } from '../../auth.utils';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      // URL needs to be defined in the Google API console
      callbackURL:
        'https://redirectmeto.com/http://localhost:3000/auth/oauth_callback',
      scope: ['profile', 'email'],
    },
    async function verify(accessToken, refreshToken, profile, done) {
      const user = await handleOauthCallback(
        accessToken,
        refreshToken,
        profile,
      );
      try {
        done(null, user);
      } catch (err) {
        done(err);
      }
    },
  ),
);
