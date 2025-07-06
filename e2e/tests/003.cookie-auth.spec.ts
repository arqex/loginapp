import { test, expect } from "@playwright/test";
import { cookieLogin } from "../utils/playwright.utils";

test.describe("Autologin", () => {
  test("should login using cookieLogin utility", async ({ page }) => {
    // Login with pre-existing test user
    const authenticatedId = await cookieLogin(
      page,
      "simple@example.com",
      "Apptest0"
    );

    // Verify successful login by checking for elements that appear after authentication
    await expect(
      page.getByRole("heading", { name: "Welcome Simple Rodriguez!" })
    ).toBeVisible();
  });
});
