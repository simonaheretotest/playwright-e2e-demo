import { Page, Locator } from "@playwright/test";

export class CheckoutPage {
  readonly page: Page;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly completeHeader: Locator;
  readonly errorMessage: Locator;
  readonly cancelButton: Locator;
  readonly itemPrices: Locator;
  readonly itemTotal: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.getByPlaceholder("First Name");
    this.lastName = page.getByPlaceholder("Last Name");
    this.postalCode = page.getByPlaceholder("Zip/Postal Code");
    this.continueButton = page.getByTestId("continue");
    this.finishButton = page.getByTestId("finish");
    this.completeHeader = page.getByTestId("complete-header");
    this.errorMessage = page.getByTestId("error");
    this.cancelButton = page.getByTestId("cancel");
    this.itemPrices = page.getByTestId("inventory-item-price");
    this.itemTotal = page.getByTestId("subtotal-label");
  }

  async fillInformation(firstName: string,
  lastName: string,
  postalCode: string) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);
  }

  async continueCheckout(){
    await this.continueButton.click()
  }
 async finishCheckout(){
    await this.finishButton.click()
  }

 async cancelCheckout(){
    await this.cancelButton.click()
  }

  async getAllPrices(): Promise<number[]>{
    const prices = await this.itemPrices.allTextContents();
    const pricesNumbers = prices.map((price) =>
      parseFloat(price.replace("$", "")),
    );
    return pricesNumbers;
  }
async getItemTotal(): Promise<number> {
  const total = await this.itemTotal.textContent();

  if (total === null) {
    throw new Error("Item total text is missing");
  }

  const totalNumber = parseFloat(total.replace("Item total: $", ""));

  return totalNumber;
}
}