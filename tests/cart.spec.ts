import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/PageManager';

test.describe('Cart', () => {
  let pm: PageManager;

  test.beforeEach(async ({ page }) => {
    pm = new PageManager(page);
    await pm.login.open();
    await pm.login.login(process.env.STANDARD_USER!, process.env.PASSWORD!);
  });

  test('adding one product shows 1 in the cart badge', async () => {
    await pm.inventory.addToCart('sauce-labs-backpack');
    await expect(pm.inventory.cartBadge).toHaveText('1');
  });

  // TODO: add two products -> badge shows 2
  // TODO: remove a product -> badge disappears
  // TODO: products in the cart page match what you added
});
