# Backend of login app

* The backend is a REST API that allows users to register, log in, and authenticate for other endpoints.
* Endpoints for authentication are defined in [auth.router.ts](../src/auth/auth.router.ts)
* The API sends emails (for confirmation and password reset) using SendGrid, configured via environment variables.
* The backend uses a MySQL database, managed via Prisma ORM.
* Database connection and queries are handled through a singleton Prisma client (prismaclient.ts).
* The backend uses a MySQL database, managed with Prisma ORM.
* Database connection and queries are handled through a singleton Prisma client ([src/prismaclient.ts](../src/prismaclient.ts)).
* User and authentication data are managed with functions in [src/users/users.db.ts](../src/users/users.db.ts) and [src/auth/auth.db.ts](../src/auth/auth.db.ts), which use Prisma to interact with the database.
* The database models are defined in the Prisma schema file ([prisma/schema.prisma](../prisma/schema.prisma)).
* You can extend the models as needed by editing the Prisma schema and running migrations.
* The backend is sessionless. When a user logs in or signs up, the server generates a JWT (JSON Web Token) signed with a secret key (JWT_SECRET in your .env). The server does not store session data; the JWT itself contains the user's ID and permissions.
* JWTs are sent back as cookies or in the Authorization header by the client, and are required for authenticated API calls. 
* With the JWT, the authenticated user id is always returned in the body of the response:

```js
{
  "authenticatedId": "user_id_here",
  "token": "jwt_token_here" // if useCookie=false
}
```

* The backend uses a [JWT strategy](../src/auth/strategies/jwt.strategy.ts)  to extract and verify the token from the header or cookie
* For passwordless logins, password resets, and OAuth, the backend generates a short-lived one-time token (OTT). OTTs are stored in the user's auth metadata and sent via email or OAuth redirect.
* When the client presents a valid OTT, the backend logs in the user and issues a JWT.