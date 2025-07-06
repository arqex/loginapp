import { test, expect } from "@playwright/test";

test.describe("Login Flow", () => {
  test("successful login with valid credentials", async ({ page }) => {
    await page.goto("http://localhost:5173");

    // Verify we're on the login page
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();

    // Fill in the login form
    await page
      .getByRole("textbox", { name: "Email" })
      .fill("simple@example.com");
    await page.getByRole("textbox", { name: "Password" }).fill("Apptest0");

    // Click the login button
    await page.getByRole("button", { name: "Log in" }).click();

    // Wait for navigation to complete
    await page.waitForURL(/.*\/#\/home/);

    // Verify successful login by checking for elements that appear after authentication
    await expect(
      page.getByRole("heading", { name: "Welcome Simple Rodriguez!" })
    ).toBeVisible();
  });

  test("login with wrong password shows error message", async ({ page }) => {
    await page.goto("http://localhost:5173");

    // Verify we're on the login page
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();

    // Fill in the login form with wrong password
    await page
      .getByRole("textbox", { name: "Email" })
      .fill("simple@example.com");
    await page.getByRole("textbox", { name: "Password" }).fill("wrongpassword");

    // Click the login button
    await page.getByRole("button", { name: "Log in" }).click();

    // Wait for error message to appear
    await expect(page.getByText("Email or password not valid")).toBeVisible();

    // Verify we're still on the login page
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();

    // Verify we haven't navigated away from the login page
    await expect(page).toHaveURL("http://localhost:5173/");
  });
});
