import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object da página de confirmação do pedido (/checkout-complete.html).
 */
export class ConfirmationPage {
  readonly page: Page;

  readonly confirmationHeader: Locator;
  readonly confirmationText: Locator;
  readonly backHomeButton: Locator;
  readonly confirmationImage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.confirmationHeader = page.locator('[data-test="complete-header"]');
    this.confirmationText = page.locator('[data-test="complete-text"]');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
    this.confirmationImage = page.locator('[data-test="pony-express"]');
  }

  /** Valida que a mensagem principal de confirmação está correta */
  async assertConfirmationHeader(expectedText: string): Promise<void> {
    await expect(this.confirmationHeader).toHaveText(expectedText);
  }

  /** Valida que a imagem de confirmação está visível */
  async assertConfirmationImageVisible(): Promise<void> {
    await expect(this.confirmationImage).toBeVisible();
  }

  /** Volta para o catálogo clicando em "Back Home" */
  async backToHome(): Promise<void> {
    await this.backHomeButton.click();
    await this.page.waitForURL('**/inventory.html');
  }
}