import { test, expect } from "@playwright/test";
import { PageManager } from "../page-objects/PageManager";

test.describe("Login", () => {
  let pm: PageManager;

  test.beforeEach(async ({ page }) => {
    pm = new PageManager(page);
    await pm.login.open();
  });

  test("standard user can log in", async ({ page }) => {
    await pm.login.login(process.env.STANDARD_USER!, process.env.PASSWORD!);
    await expect(page).toHaveURL(/inventory/);
    await expect(pm.inventory.title).toHaveText("Products");
  });

  test("locked out user sees an error", async () => {
    await pm.login.login(process.env.LOCKED_USER!, process.env.PASSWORD!);
    await expect(pm.login.errorMessage).toContainText("locked out");
  });

  test("empty password shows an error", async () => {
    await pm.login.login(process.env.STANDARD_USER!, "");
    await expect(pm.login.errorMessage).toContainText("Password is required");
  });

  test("empty username shows an error", async () => {
    await pm.login.login("", process.env.PASSWORD!);
    await expect(pm.login.errorMessage).toContainText("Username is required");
  });

  test("wrong password", async () => {
    await pm.login.login(process.env.STANDARD_USER!, process.env.PASSWORD + 1);
    await expect(pm.login.errorMessage).toContainText("do not match");
  });
});
