# Signing up the login app

There are 2 ways of signing up in login app:

1. By email and password:
   * This create an AuthToken in the DB of type `EMAIL_LOGIN`, the key is user's email.
   * The meta for the token contains a `hash` with the password, an individual `salt` to generate the salt and a verification token `vc`, used to verify the email address.
   * The verify token is sent to the user inbox, and before being able of using the API, the user needs to send that token to `/auth/verify_email`.
   * Once the email is verified, the `meta.vc` is deleted and the user can access the API with a valid JWT token.

2. By oauth
    * When the user grant permission in the oauth provider, it's sent back to our API with the access token.
    * A new AuthToken is created in the DB with type `OAUTH20`.
    * The key is the provider's id
    * The meta is `{ "provider": "google", "accessToken": "ya29..."}`

