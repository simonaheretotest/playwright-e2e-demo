import { Page } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { InventoryPage } from './InventoryPage';
import { CartPage } from './CartPage';


export class PageManager {
  readonly login: LoginPage;
  readonly inventory: InventoryPage;
  readonly cart: CartPage;
  // TODO: add cart and checkout pages when you create them

  constructor(page: Page) {
    this.login = new LoginPage(page);
    this.inventory = new InventoryPage(page);
    this.cart = new CartPage(page);
  }
}
