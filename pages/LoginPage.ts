import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object da tela de login (/index.html).
 * Encapsula todos os seletores e interações da página de autenticação.
 */
export class LoginPage {
  readonly page: Page;

  // Locators
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly errorCloseButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.errorCloseButton = page.locator('[data-test="error-button"]');
  }

  /** Navega para a página de login */
  async navigate(): Promise<void> {
    await this.page.goto('/');
  }

  /** Preenche o campo de usuário */
  async fillUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  /** Preenche o campo de senha */
  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  /** Clica no botão de login */
  async clickLoginButton(): Promise<void> {
    await this.loginButton.click();
  }

  /**
   * Realiza o fluxo completo de login com as credenciais fornecidas.
   * Não valida o resultado — use assertLoginSuccess ou assertLoginError para isso.
   */
  async login(username: string, password: string): Promise<void> {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLoginButton();
  }

  /** Valida que o login foi bem-sucedido verificando a URL de destino */
  async assertLoginSuccess(): Promise<void> {
    await expect(this.page).toHaveURL(/.*inventory\.html/);
  }

  /** Valida que uma mensagem de erro é exibida com o texto esperado */
  async assertErrorMessage(expectedMessage: string): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(expectedMessage);
  }

  /** Fecha a mensagem de erro clicando no botão X */
  async closeErrorMessage(): Promise<void> {
    await this.errorCloseButton.click();
  }
}