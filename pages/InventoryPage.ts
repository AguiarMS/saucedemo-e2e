import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object da página de catálogo de produtos (/inventory.html).
 */
export class InventoryPage {
  readonly page: Page;

  // Locators de estrutura
  readonly pageTitle: Locator;
  readonly productList: Locator;
  readonly cartIcon: Locator;
  readonly cartBadge: Locator;
  readonly sortDropdown: Locator;
  readonly menuButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('[data-test="title"]');
    this.productList = page.locator('[data-test="inventory-list"]');
    this.cartIcon = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.menuButton = page.locator('#react-burger-menu-btn');
  }

  /** Retorna o locator do botão "Add to cart" de um produto pelo nome */
  getAddToCartButton(productName: string): Locator {
    const normalizedName = productName.toLowerCase().replace(/ /g, '-');
    return this.page.locator(`[data-test="add-to-cart-${normalizedName}"]`);
  }

  /** Retorna o locator do botão "Remove" de um produto pelo nome */
  getRemoveButton(productName: string): Locator {
    const normalizedName = productName.toLowerCase().replace(/ /g, '-');
    return this.page.locator(`[data-test="remove-${normalizedName}"]`);
  }

  /** Retorna todos os nomes de produtos exibidos no catálogo */
  getProductNames(): Locator {
    return this.page.locator('[data-test="inventory-item-name"]');
  }

  /** Retorna todos os preços de produtos exibidos no catálogo */
  getProductPrices(): Locator {
    return this.page.locator('[data-test="inventory-item-price"]');
  }

  /** Adiciona um produto ao carrinho pelo nome */
  async addProductToCart(productName: string): Promise<void> {
    await this.getAddToCartButton(productName).click();
  }

  /** Remove um produto do carrinho pelo nome */
  async removeProductFromCart(productName: string): Promise<void> {
    await this.getRemoveButton(productName).click();
  }

  /** Seleciona uma opção no dropdown de ordenação */
  async sortBy(value: string): Promise<void> {
    await this.sortDropdown.selectOption(value);
  }

  /** Navega para o carrinho clicando no ícone */
  async goToCart(): Promise<void> {
    await this.cartIcon.click();
    await this.page.waitForURL('**/cart.html');
  }

  /** Clica no nome de um produto para ir à página de detalhes */
  async goToProductDetails(productName: string): Promise<void> {
    await this.page.locator('[data-test="inventory-item-name"]')
      .filter({ hasText: productName })
      .click();
  }

  /** Abre o menu lateral */
  async openMenu(): Promise<void> {
    await this.menuButton.click();
  }

  /** Realiza logout pelo menu lateral */
  async logout(): Promise<void> {
    await this.openMenu();
    await this.page.locator('#logout_sidebar_link').click();
    await this.page.waitForURL('**/');
  }

  /** Valida que o título da página é "Products" */
  async assertPageTitle(expectedTitle: string): Promise<void> {
    await expect(this.pageTitle).toHaveText(expectedTitle);
  }

  /** Valida que o contador do carrinho exibe o valor esperado */
  async assertCartBadge(expectedCount: string): Promise<void> {
    await expect(this.cartBadge).toHaveText(expectedCount);
  }

  /** Valida que o contador do carrinho não está visível (carrinho vazio) */
  async assertCartBadgeNotVisible(): Promise<void> {
    await expect(this.cartBadge).not.toBeVisible();
  }

  /** Retorna os textos de todos os nomes de produtos como array */
  async getAllProductNames(): Promise<string[]> {
    return await this.getProductNames().allTextContents();
  }

  /** Retorna os preços de todos os produtos como array de números */
  async getAllProductPrices(): Promise<number[]> {
    const priceTexts = await this.getProductPrices().allTextContents();
    return priceTexts.map((text) => parseFloat(text.replace('$', '')));
  }
}