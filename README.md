# Login app
This is a quick bootstrap repo for creating mobile and web apps that need a login system.

It contains 3 main apps:
* A Node.js API that handles the authentication and provides authenticated endpoints.
* A React web app that handles the UI for the login system and redirects to the authenticated app when logged in.
* A React Native app that handles the UI for the login system and redirects to the authenticated app when logged in.


## Getting started
First clone this repository.

This repository looks like a monorepo, but it's not. It's a collection of 3 different apps that are related to each other. Each app has its own dependencies and scripts. But for the sake of simplicity, there is a root package.json that contains scripts to run all the apps at once.

To install everything, just run:
```bash
npm install
```

To run the apps:
```bash
npm run backend:serve # runs the backend
npm run webapp:serve # runs the frontend
npm run ios # runs the mobile app in ios
npm run android # runs the mobile app in android
```

## Packages
This repo also provides a package to communicate with the API at `packages/api-client` making easy to authenticate. 

This first package is already linked to the applications, but since this is not a monorepo, any new package will need to be linked manually to the applications. To do so, just run the following in any app that need the new package:
```bash
cd apps/webapp
npm install ../../packages/my-new-package
```


