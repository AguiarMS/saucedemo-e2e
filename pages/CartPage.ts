import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object da página do carrinho (/cart.html).
 */
export class CartPage {
  readonly page: Page;

  readonly pageTitle: Locator;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('[data-test="title"]');
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  /** Retorna o locator do botão "Remove" de um item do carrinho pelo nome */
  getRemoveButton(productName: string): Locator {
    const normalizedName = productName.toLowerCase().replace(/ /g, '-');
    return this.page.locator(`[data-test="remove-${normalizedName}"]`);
  }

  /** Remove um item do carrinho pelo nome */
  async removeItem(productName: string): Promise<void> {
    await this.getRemoveButton(productName).click();
  }

  /** Prossegue para o checkout */
  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
    await this.page.waitForURL('**/checkout-step-one.html');
  }

  /** Volta para o catálogo */
  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
    await this.page.waitForURL('**/inventory.html');
  }

  /** Valida que o título da página é "Your Cart" */
  async assertPageTitle(expectedTitle: string): Promise<void> {
    await expect(this.pageTitle).toHaveText(expectedTitle);
  }

  /** Valida a quantidade de itens no carrinho */
  async assertItemCount(expectedCount: number): Promise<void> {
    await expect(this.cartItems).toHaveCount(expectedCount);
  }

  /** Valida que um produto específico está no carrinho */
  async assertProductInCart(productName: string): Promise<void> {
    await expect(
      this.page.locator('[data-test="inventory-item-name"]')
        .filter({ hasText: productName })
    ).toBeVisible();
  }

  /** Valida que o carrinho está vazio */
  async assertCartIsEmpty(): Promise<void> {
    await expect(this.cartItems).toHaveCount(0);
  }
}