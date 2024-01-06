# Mobile application for login app

This is a react native application that can be used as a bootstrap for any react native application that needs to authenticate users.

It uses:
* React navigation for the routes
* React native paper for the UI

## Setup
This application seems to be in a monorepo but it's not. If you use the whole repo you can just run `npm install` from this folder and everything should work.

If you are not using the the whole repo be sure to copy the packages `api-clien` and `ui-store` available in the `packages` folder, and update package.json to point to those packages outside of this folder.

It also needs the backend running in order to work. You can find the backend in the `apps/backend` folder. Follow the instructions in the backend readme to get it running.

Once it's running, update the URLs in `application/stores/apiClient.ts` to point to the API.

## Configure google auth in android
Need to create a google app, and create WEB oauth client id. 

Copy the client id and add it to the `GoogleOneTapSignIn` configuration at the `SocialLoginButton.tsx` file.

## Configure apple auth
Apple sign in button will be visible when you run the app in iOS. That button will prmmpt the user to allow the app sign in or sign up with apple.

NOTE: Apple will only return the email the first time the user accept, so the backend will register that apple login and match the apple id with the user email at that chance. If there is some error in this first time authentication, we won't be able to log that user in again with apple as we won't have an email to match with the user table.
