import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/PageManager';

test.describe('Cart', () => {
  let pm: PageManager;

  test.beforeEach(async ({ page }) => {
    pm = new PageManager(page);
    await pm.login.open();
    await pm.login.login(process.env.STANDARD_USER!, process.env.PASSWORD!);
    await expect(page).toHaveURL(/inventory/);
  });


  test('adding one product shows 1 in the cart badge', async () => {
    await pm.inventory.addToCart('sauce-labs-backpack');
    await expect(pm.inventory.cartBadge).toHaveText('1');
  });

    test('adding two products shows 2 in the cart badge', async () => {
    await pm.inventory.addToCart('sauce-labs-backpack');
    await pm.inventory.addToCart('sauce-labs-bike-light');
    await expect(pm.inventory.cartBadge).toHaveText('2');
  });

      test('removing the last product hides the cart badge', async () => {
         await pm.inventory.addToCart('sauce-labs-bike-light');
         await expect(pm.inventory.cartBadge).toHaveText("1");
    await pm.inventory.removeFromCart('sauce-labs-bike-light');
    await expect(pm.inventory.cartBadge).toBeHidden();
      })

       test('removing one of two products decreases the cart badge', async () => {
    await pm.inventory.addToCart('sauce-labs-backpack');
    await pm.inventory.addToCart('sauce-labs-bike-light');
    await expect(pm.inventory.cartBadge).toHaveText('2');
    await pm.inventory.removeFromCart('sauce-labs-bike-light');
    await expect(pm.inventory.cartBadge).toHaveText('1');
  });

 
 test("cart contains the correct products", async () => {
  await pm.inventory.addToCart('sauce-labs-backpack');
    await pm.inventory.addToCart('sauce-labs-bike-light');
    await pm.inventory.openCart()
  await expect(await pm.cart.title).toHaveText('Your Cart')
    const actualNames = await pm.cart.getAllNames();
     const expectedNames = ["Sauce Labs Backpack", "Sauce Labs Bike Light"];
     expect([...actualNames].sort()).toEqual([...expectedNames].sort());
});

});
