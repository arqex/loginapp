This repo contains the login app. It's bootstrap code that can be used to start any application that needs authentication. It includes:
* A database definition using Prisma and MySQL.
* A Node.js API that handles the authentication and provides authenticated endpoints.
* A React web app that handles the UI for the login system, with a gallery of components to be used as the base for the specific web app.
* A React Native app that handles the UI for the login and can be used as the base for Android and iOS apps.

The code for the database and the API is in the `/backend` folder.
The code for the web app is in `/webapp`.
The code for the mobile app is in `/mobile`.

To know more about how the backend works, check the [backend documentation](backend/docs/introduction_backend.md).
To know about the test application, check the [test application documentation](./test-application.md).
The task we are working currently is [Add some test data into the database)[./task-instructions.md].