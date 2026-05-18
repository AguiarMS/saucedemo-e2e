import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { ProductPage } from '../pages/ProductPage';
import { loginAsStandardUser } from '../utils/helpers';
import { Products } from '../data/testData';
import { formatPrice } from '../utils/helpers';

test.describe('Detalhes do Produto', () => {
  let inventoryPage: InventoryPage;
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    productPage = new ProductPage(page);
    await loginAsStandardUser(page);
  });

  test('TC-013 | Página de detalhes deve exibir nome, preço, descrição e imagem do produto', async () => {
    await inventoryPage.goToProductDetails(Products.backpack.name);

    await productPage.assertProductName(Products.backpack.name);
    await productPage.assertProductPrice(formatPrice(Products.backpack.price));
    await productPage.assertDescriptionVisible();
    await productPage.assertProductImageVisible();
  });

  test('TC-014 | Adicionar ao carrinho pela página de detalhes deve atualizar o contador', async ({ page }) => {
    await inventoryPage.goToProductDetails(Products.backpack.name);
    await productPage.addToCart();

    const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    await expect(cartBadge).toHaveText('1');
  });

  test('TC-015 | Botão "Back to products" deve retornar ao catálogo sem perder o estado', async ({ page }) => {
    // Adiciona produto ao carrinho antes de navegar para detalhes
    await inventoryPage.addProductToCart(Products.bikeLight.name);
    await inventoryPage.goToProductDetails(Products.backpack.name);

    await productPage.backToProducts();

    await expect(page).toHaveURL(/.*inventory\.html/);
    // Verifica que o carrinho ainda tem 1 item após voltar
    await inventoryPage.assertCartBadge('1');
  });
});