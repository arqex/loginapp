# Separate loginapp base entities from the test app ones

Loginapp is a base application that provides authentication and user management features, that can be used as a foundation for other applications. 

This repo also contains a test application to manage todo lists. On top of the base loginapp entities, it adds todolists and todo items.

In the API, we should separate the controllers and routers for the base loginapp entities from the test app ones. They need to live in different folders, one `auth` for the base loginapp entities, and another `todo` for the test app entities.

In the webapp, we should also separate the entities:

* The API client should have a folder for the loginapp methods and another for the todo methods.
* The app package contains screens that also need to be separated into `auth` and `todo` folders.
* The prisma schema and migrations should also be separated into `auth` and `todo` entities.

The goal of this separation is that anyone that uses the loginapp as a base application can remove the test app functionality (that is useless for them) and keep only the loginapp entities.


