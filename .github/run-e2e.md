# Run E2E Tests

This application uses Playwright for end-to-end testing. It's recommended to install the playwright extension in vs code.

The webapp is already running in `http://localhost:5173` and the backend in `http://localhost:3000` for the tests to work correctly.

## Test Structure

The e2e directory is organized as follows:

- `e2e/tests/` - Contains all test files (should be named with a `.spec.ts` suffix)
- `e2e/utils/` - Contains utility files and helper functions

## Authentication Utilities

The `e2e/utils/playwright.utils.ts` file provides convenient utilities for authentication in tests:

### `cookieLogin(page, email, password)`

Logs in a user via the API and sets the authentication cookie in the browser page. Also stores the authenticated user ID in localStorage and reloads the page to apply the authentication state.

```typescript
import { cookieLogin } from '../utils/playwright.utils';

test('authenticated test', async ({ context }) => {
  const page = await context.newPage();
  await page.goto('http://localhost:5173');
  
  const authenticatedId = await cookieLogin(page, 'simple@example.com', 'Apptest0');
  // User is now logged in on the current page
});
```

### `loginAndNavigate(context, email, password, path)`

Logs in a user and navigates to a specific page, returning both the page and the authenticated user ID.

```typescript
import { loginAndNavigate } from '../utils/playwright.utils';

test('authenticated test with navigation', async ({ context }) => {
  const { page, authenticatedId } = await loginAndNavigate(
    context, 
    'admin@example.com', 
    'Apptest0',
    '/dashboard'
  );
  
  // User is logged in and on the /dashboard page
  expect(page.url()).toContain('/dashboard');
});
```

## Available Test Users

The application comes with pre-configured test accounts:

- **Simple Account**: `simple@example.com` (ADMIN role)
- **Collaboration Account**:
  - `admin@example.com` (ADMIN)
  - `editor@example.com` (EDITOR) 
  - `contributor@example.com` (CONTRIBUTOR)
- All test users have password: `Apptest0`

## Running Tests

```bash
# Run all tests
npx playwright test

# Run tests in UI mode
npx playwright test --ui

# Run a specific test file
npx playwright test e2e/tests/001.render.spec.ts
```

There is a playwright MCP available to let copilot interact with playwright. The way you can create the tests is by using the playwright MCP to run the app and inspect the elements that need to be tested. 