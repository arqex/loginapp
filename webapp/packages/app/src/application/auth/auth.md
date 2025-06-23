Authentication in the frontend
------------------------------

## The login process

The authentication in the frontend is based on a cookie that is set automatically by the API when the right credentials are provided.

The API sets that cookie when some authentication endpoints like /login are called and, from that point, all requests that are made to the API are authenticated as the user whose credentials were given.

Besides the auth cookie, the authentication endpoints return the id of the authenticated  user (`authenticatedId`) in the body of the response. That user id is stored in the local storage by the web application, to be used on a reload.

The web application doesn't have access to the cookie so the user id in the local storage is the only way for the frontend to know if it's authenticated.

So the login process have just 2 steps:
* Getting the cookie
* Storing the id in the local storage

## Loading initialization data

In order to allow the application work in an authenticated mode, there are some data that needs to be always loaded. That is:

* The user data, to display information about the authenticated user
* The organization data, to know what are the context the user is working in.