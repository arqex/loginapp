import appleSigninAuth from 'apple-signin-auth';
import { OAuth2Client } from 'google-auth-library';

export const providerDecoders = {
  apple: async (token: string) => {
    const { sub: id, email } = await appleSigninAuth.verifyIdToken(token);
    return { id, email };
  },
  google: async (idToken: string) => {
    const oAuth2Client = new OAuth2Client();
    const result = await oAuth2Client.verifyIdToken({
      idToken,
    });

    const { sub, email } = result.getPayload();

    return {
      id: sub,
      email,
    };
  },
};
