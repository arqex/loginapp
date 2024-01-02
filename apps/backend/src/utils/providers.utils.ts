import appleSigninAuth from 'apple-signin-auth';

export const providerDecoders = {
  apple: async (token: string) => {
    const { sub: id, email } = await appleSigninAuth.verifyIdToken(token);
    return { id, email };
  },
};
