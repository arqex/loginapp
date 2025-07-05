# Run E2E Tests

This application uses Playwright for end-to-end testing. It's recommended to install the playwright extension in vs code.

The webapp is already running in `http://localhost:5173` and the backend in `http://localhost:3000` for the tests to work correctly.

Test files are in the `e2e` directory and should be named with a `.spec.ts` suffix.

There is a playwright MPC available to let copilot interact with playwright. The way you can create the tests is by using the playwright MPC to run the app and inspect the elements that need to be tested.