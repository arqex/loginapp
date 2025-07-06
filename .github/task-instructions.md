# Create e2e utility to login via cookie before opening the browser

We can use the Playwright API, and the api-client to create a utility that logs in via cookie before opening the browser, so tests can start with the user already logged in.

The folder structure will change. `/e2e` will contain 2 folders:

* `tests`: where the tests will be located
* `utils`: where the utility files will be located

The utility file can be called `playwright.utils.ts`, and will contain a method `cookieLogin` that receives an email and a password, and use the `/login` endpoint of the api-client to get the cookie, and then set the cookie in the browser context.

The `/login` endpoint will also return an `authenticatedId` in the body, which needs to be stored in the browser's local storage under the key `la_AUTH_ID`.

