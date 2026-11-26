import { Page, Locator } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly title: Locator;
  readonly cartBadge: Locator;
  readonly itemPrices: Locator;
  readonly itemNames: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByTestId("title");
    this.cartBadge = page.getByTestId("shopping-cart-badge");
    this.itemPrices = page.getByTestId("inventory-item-price");
    this.itemNames = page.getByTestId("inventory-item-name");
  }

  async removeFromCart(productId: string) {
    await this.page.getByTestId(`remove-${productId}`).click();
  }


async getAllPrices(): Promise<number[]> {
    const prices = await this.itemPrices.allTextContents();
    const pricesNumbers = prices.map((price) =>
      parseFloat(price.replace("$", "")),
    );
    return pricesNumbers;
  }
   async getAllNames(): Promise<string[]> {
    const items = await this.itemNames.allTextContents();
  
    return items;
  }
}