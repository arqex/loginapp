# Authentication methods




# Google sign in by oauth

To be able to use this method you need to create a project in the [Google Cloud Platform](https://console.cloud.google.com/). You can follow the steps in the [Google documentation](https://developers.google.com/identity/sign-in/web/sign-in) to create the project and enable the Google Sign-In method.

Once you have created a project in the Google Cloud Platform you need to create an oauth client id for the WEB, and update the .env file with the client id and secret in the `GOOGLE_OAUTH_CLIENT_ID` and `GOOGLE_OAUTH_CLIENT_SECRET` variables.