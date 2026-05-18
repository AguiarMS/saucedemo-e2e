import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object da página de detalhes de produto (/inventory-item.html).
 */
export class ProductPage {
  readonly page: Page;

  readonly productName: Locator;
  readonly productDescription: Locator;
  readonly productPrice: Locator;
  readonly productImage: Locator;
  readonly addToCartButton: Locator;
  readonly removeButton: Locator;
  readonly backToProductsButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = page.locator('[data-test="inventory-item-name"]');
    this.productDescription = page.locator('[data-test="inventory-item-desc"]');
    this.productPrice = page.locator('[data-test="inventory-item-price"]');
    this.productImage = page.locator('[data-test="item-sauce-labs-backpack-img"]');
    this.addToCartButton = page.locator('[data-test^="add-to-cart"]');
    this.removeButton = page.locator('[data-test^="remove"]');
    this.backToProductsButton = page.locator('[data-test="back-to-products"]');
  }

  /** Adiciona o produto ao carrinho pela página de detalhes */
  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  /** Remove o produto do carrinho pela página de detalhes */
  async removeFromCart(): Promise<void> {
    await this.removeButton.click();
  }

  /** Volta para o catálogo */
  async backToProducts(): Promise<void> {
    await this.backToProductsButton.click();
    await this.page.waitForURL('**/inventory.html');
  }

  /** Valida que o nome do produto é o esperado */
  async assertProductName(expectedName: string): Promise<void> {
    await expect(this.productName).toHaveText(expectedName);
  }

  /** Valida que o preço exibido é o esperado */
  async assertProductPrice(expectedPrice: string): Promise<void> {
    await expect(this.productPrice).toHaveText(expectedPrice);
  }

  /** Valida que a imagem do produto está visível */
  async assertProductImageVisible(): Promise<void> {
    await expect(this.page.locator('.inventory_details_img')).toBeVisible();
  }

  /** Valida que a descrição do produto está visível e não vazia */
  async assertDescriptionVisible(): Promise<void> {
    await expect(this.productDescription).toBeVisible();
    const text = await this.productDescription.textContent();
    expect(text?.trim().length).toBeGreaterThan(0);
  }
}