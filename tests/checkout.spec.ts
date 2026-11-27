import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/PageManager';
import { faker } from "@faker-js/faker";

test.describe('Checkout', () => {

    let pm: PageManager;

  test.beforeEach(async ({ page }) => {
    pm = new PageManager(page);
    await pm.login.open();
    await pm.login.login(process.env.STANDARD_USER!, process.env.PASSWORD!);
    await expect(page).toHaveURL(/inventory/);
   await pm.inventory.addToCart("sauce-labs-backpack");
await pm.inventory.addToCart("sauce-labs-bike-light");
    await pm.inventory.openCart()
    await pm.cart.openCheckout()

  });

test("customer can successfully complete checkout", async () => {
 await pm.checkout.fillInformation(
  faker.person.firstName(),
  faker.person.lastName(),
  faker.location.zipCode(),
 );
 await pm.checkout.continueCheckout();
 await pm.checkout.finishCheckout();
 await expect(pm.checkout.completeHeader).toHaveText('Thank you for your order!');
});


const checkoutCases = [
  {
    name: "missing first name",
    firstName: "",
  lastName: faker.person.lastName(),
  postalCode: faker.location.zipCode(),
    expectedError: "Error: First Name is required"
  },
    {
    name: "missing last name",
    firstName: faker.person.firstName(),
  lastName: "",
  postalCode: faker.location.zipCode(),
    expectedError: "Error: Last Name is required"
  },
      {
    name: "missing postal code",
    firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  postalCode: "",
    expectedError: "Error: Postal Code is required"
  }
];
for (const checkoutCase of checkoutCases) {
  test(checkoutCase.name, async () => {
    await pm.checkout.fillInformation(
      checkoutCase.firstName,
      checkoutCase.lastName,
      checkoutCase.postalCode
    );

    await pm.checkout.continueCheckout();

    await expect(pm.checkout.errorMessage).toHaveText(
      checkoutCase.expectedError
    );
  });
}

test("item total equals the sum of product prices", async () => {
  await pm.checkout.fillInformation(
    faker.person.firstName(),
    faker.person.lastName(),
    faker.location.zipCode()
  );

  await pm.checkout.continueCheckout();

  await expect(pm.checkout.itemPrices).toHaveCount(2);

  const prices = await pm.checkout.getAllPrices();
  const actualTotal = await pm.checkout.getItemTotal();
  const expectedTotal = prices.reduce((sum, price) => sum + price, 0);

  expect(actualTotal).toBeCloseTo(expectedTotal, 2);
});
});
