import { BrowserContext, Page } from "@playwright/test";
import { ApiClient } from "../../webapp/packages/api-client";
import { login } from "../../webapp/packages/api-client";

/**
 * Logs in a user via API and sets the authentication cookie in the browser page
 * @param page - Playwright page object
 * @param email - User email
 * @param password - User password
 * @returns The authenticated user ID
 */
export async function cookieLogin(
  page: Page,
  email: string,
  password: string
): Promise<string> {
  // Create API client for authentication
  const apiClient = new ApiClient({
    apiURL: "http://localhost:3000",
  });

  try {
    // Login via API to get the cookie and user ID
    const response = await login(apiClient, email, password);

    if (!response.ok) {
      throw new Error(
        `Login failed: ${response.status} ${response.statusText}`
      );
    }

    const { authenticatedId } = response.data;

    if (!authenticatedId) {
      throw new Error("No authenticated ID returned from login");
    }

    // Extract the cookie from the response headers
    const setCookieHeader = response.headers["set-cookie"];
    if (!setCookieHeader) {
      throw new Error("No authentication cookie received from login");
    }

    // Parse the cookie (assuming it's in format: "cookieName=cookieValue; Path=/; HttpOnly")
    const cookieMatch = setCookieHeader.match(/([^=]+)=([^;]+)/);
    if (!cookieMatch) {
      throw new Error("Could not parse authentication cookie");
    }

    const [, cookieName, cookieValue] = cookieMatch;

    // Add the cookie to the browser context
    await page.context().addCookies([
      {
        name: cookieName,
        value: cookieValue,
        domain: "localhost:3000",
        path: "/",
        httpOnly: true,
        secure: false, // Since we're using localhost HTTP
      },
    ]);

    await page.goto("http://localhost:5173");

    // Set the authenticated ID in localStorage on the current page
    await page.evaluate((authId) => {
      localStorage.setItem("la_AUTH_ID", `"${authId}"`);
    }, authenticatedId);

    // Reload the page to apply the authentication state
    await page.reload();

    await page.goto("http://localhost:5173/#/home");

    return authenticatedId;
  } catch (error) {
    throw new Error(
      `Cookie login failed: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}
