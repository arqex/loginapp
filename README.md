# Login app
This is a quick boilerplate for creating webapps that need a login system.

It has 2 parts:
* The backend: a REST API that handles user registration, login, and session management. Using express, passport, mysql and prisma, manage sessions using jwt tokens. Supports hot reloading development using nestjs.
* The frontend: a react app that handles the UI for the login system and redirects to the authenticated app when logged in. Uses Core UI to have a component collection ready to use.