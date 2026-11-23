import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly cartBadge: Locator;
  readonly sortDropdown: Locator;
  readonly itemPrices: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByTestId('title');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.sortDropdown = page.getByTestId('product-sort-container');
    this.itemPrices = page.getByTestId('inventory-item-price');
  }

  // productId example: 'sauce-labs-backpack'
  async addToCart(productId: string) {
    await this.page.getByTestId(`add-to-cart-${productId}`).click();
  }

  // TODO: removeFromCart(productId)
  // TODO: sortBy(option: 'az' | 'za' | 'lohi' | 'hilo')
  // TODO: getAllPrices(): Promise<number[]>
  // TODO: openCart()
}
