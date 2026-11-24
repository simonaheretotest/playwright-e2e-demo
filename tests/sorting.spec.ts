import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/PageManager';

test.describe('Sorting', () => {
let pm: PageManager;

  test.beforeEach(async ({ page }) => {
    pm = new PageManager(page);
    await pm.login.open();
    await pm.login.login(process.env.STANDARD_USER!, process.env.PASSWORD!);
    await expect(page).toHaveURL(/inventory/);
  });

test("prices are sorted from low to high", async () => {
  await pm.inventory.sortBy("lohi");
  const actualPrices = await pm.inventory.getAllPrices();
  const expectedPrices = [...actualPrices].sort((a, b) => a - b);
  expect(actualPrices).toEqual(expectedPrices);
   expect(actualPrices.length).toBeGreaterThan(1);
});

test("prices are sorted from high to low", async () => {
  await pm.inventory.sortBy("hilo");
  const actualPrices = await pm.inventory.getAllPrices();
  const expectedPrices = [...actualPrices].sort((a, b) => b - a);
  expect(actualPrices).toEqual(expectedPrices);
  expect(actualPrices.length).toBeGreaterThan(1);
});

test("item names are sorted from a to z", async () => {
  await pm.inventory.sortBy("az");
  const actualNames = await pm.inventory.getAllNames();
  const expectedNames = [...actualNames].sort((a, b) => a.localeCompare(b));
  expect(actualNames).toEqual(expectedNames);
  expect(actualNames.length).toBeGreaterThan(1);
});

test("item names are sorted from z to a", async () => {
  await pm.inventory.sortBy("za");
  const actualNames = await pm.inventory.getAllNames();
  const expectedNames = [...actualNames].sort((a, b) => b.localeCompare(a));
  expect(actualNames).toEqual(expectedNames);
  expect(actualNames.length).toBeGreaterThan(1);
});

})
