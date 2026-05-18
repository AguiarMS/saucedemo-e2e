import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object das etapas de checkout.
 * Cobre checkout-step-one.html e checkout-step-two.html.
 */
export class CheckoutPage {
  readonly page: Page;

  // Step 1 — Formulário de informações pessoais
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessage: Locator;

  // Step 2 — Resumo do pedido
  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  readonly finishButton: Locator;
  readonly cancelButtonStep2: Locator;

  constructor(page: Page) {
    this.page = page;

    // Step 1
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.errorMessage = page.locator('[data-test="error"]');

    // Step 2
    this.subtotalLabel = page.locator('[data-test="subtotal-label"]');
    this.taxLabel = page.locator('[data-test="tax-label"]');
    this.totalLabel = page.locator('[data-test="total-label"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.cancelButtonStep2 = page.locator('[data-test="cancel"]');
  }

  /** Preenche o formulário da etapa 1 com os dados fornecidos */
  async fillPersonalInfo(
    firstName: string,
    lastName: string,
    postalCode: string
  ): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  /** Clica em Continue na etapa 1 */
  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }

  /** Clica em Cancel na etapa 1 — retorna ao carrinho */
  async clickCancelStep1(): Promise<void> {
    await this.cancelButton.click();
    await this.page.waitForURL('**/cart.html');
  }

  /** Clica em Finish na etapa 2 — finaliza o pedido */
  async clickFinish(): Promise<void> {
    await this.finishButton.click();
    await this.page.waitForURL('**/checkout-complete.html');
  }

  /** Clica em Cancel na etapa 2 — retorna ao catálogo */
  async clickCancelStep2(): Promise<void> {
    await this.cancelButtonStep2.click();
    await this.page.waitForURL('**/inventory.html');
  }

  /** Valida mensagem de erro na etapa 1 */
  async assertErrorMessage(expectedMessage: string): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(expectedMessage);
  }

  /** Extrai o valor numérico de um label de preço (ex: "Item total: $39.98" → 39.98) */
  private async extractPriceFromLabel(locator: Locator): Promise<number> {
    const text = await locator.textContent();
    const match = text?.match(/\$(\d+\.\d{2})/);
    if (!match) throw new Error(`Preço não encontrado no texto: "${text}"`);
    return parseFloat(match[1]);
  }

  /** Retorna o subtotal exibido na etapa 2 como número */
  async getSubtotal(): Promise<number> {
    return this.extractPriceFromLabel(this.subtotalLabel);
  }

  /** Retorna o valor do tax exibido na etapa 2 como número */
  async getTax(): Promise<number> {
    return this.extractPriceFromLabel(this.taxLabel);
  }

  /** Retorna o total exibido na etapa 2 como número */
  async getTotal(): Promise<number> {
    return this.extractPriceFromLabel(this.totalLabel);
  }

  /** Valida que o total exibido é a soma correta de subtotal + tax */
  async assertTotalIsCorrect(): Promise<void> {
    const subtotal = await this.getSubtotal();
    const tax = await this.getTax();
    const total = await this.getTotal();
    const expectedTotal = parseFloat((subtotal + tax).toFixed(2));
    expect(total).toBe(expectedTotal);
  }
}