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

## Configure google auth
It's so hard to configure proper one-tap google auth in react native, that we decided to use the oauth version of it.

To make it work:
* in your `app.json` make sure that you have your own `expo.android.package` and `expo.ios.bundleIdentifier` set up properly. Also `expo.scheme` to redirect the oauth flow to your app. Take note of all of these are needed to set the google application up.
* create your own google application at https://console.cloud.google.com/apis.
* create credentials for your ios or android apps by > Create credentials > Oauth client Id
* In package name (android) or package id (ios) use the `package` and `bundleIdentifier` from the `app.json` that we defined before.
* In android we will also need our app's sha1 fingerprint. To get it from expo:
  * Install `expo-cli` globally by `npm install -g expo-cli`
  * Run `expo credentials:manager` from the webapp folder
  * Select android > update keystore > generate new
  * Copy the SHA-1 version of the google certificate and add it to your google app

* 


There 


## Configure apple auth
Apple sign in button will be visible when you run the app in iOS. That button will prmmpt the user to allow the app 