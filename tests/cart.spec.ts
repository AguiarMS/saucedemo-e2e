import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { loginAsStandardUser } from '../utils/helpers';
import { Products } from '../data/testData';
import { PageTitles, CartLabels } from '../constants/messages';

test.describe('Carrinho de Compras', () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    await loginAsStandardUser(page);
  });

  test('TC-016 | Produto adicionado deve aparecer no carrinho com nome e preço corretos', async () => {
    await inventoryPage.addProductToCart(Products.backpack.name);
    await inventoryPage.goToCart();

    await cartPage.assertPageTitle(PageTitles.cart);
    await cartPage.assertItemCount(1);
    await cartPage.assertProductInCart(Products.backpack.name);
  });

  test('TC-016b | Remover item no carrinho deve atualizar a lista de itens', async () => {
    await inventoryPage.addProductToCart(Products.backpack.name);
    await inventoryPage.goToCart();

    await cartPage.removeItem(Products.backpack.name);
    await cartPage.assertCartIsEmpty();
  });

  test('TC-017 | "Continue Shopping" deve retornar ao catálogo preservando o carrinho', async ({ page }) => {
    await inventoryPage.addProductToCart(Products.backpack.name);
    await inventoryPage.goToCart();

    await cartPage.continueShopping();

    await expect(page).toHaveURL(/.*inventory\.html/);
    await inventoryPage.assertCartBadge('1');
  });

  test('TC-015 | Carrinho deve manter itens ao navegar para detalhes e voltar', async () => {
    await inventoryPage.addProductToCart(Products.fleeceJacket.name);
    await inventoryPage.goToProductDetails(Products.backpack.name);

    // Volta ao catálogo sem interagir com o produto dos detalhes
    await inventoryPage.goToCart();

    await cartPage.assertItemCount(1);
    await cartPage.assertProductInCart(Products.fleeceJacket.name);
  });

  test('Adicionar múltiplos produtos deve exibir todos no carrinho', async () => {
    await inventoryPage.addProductToCart(Products.backpack.name);
    await inventoryPage.addProductToCart(Products.bikeLight.name);
    await inventoryPage.goToCart();

    await cartPage.assertItemCount(2);
    await cartPage.assertProductInCart(Products.backpack.name);
    await cartPage.assertProductInCart(Products.bikeLight.name);
  });
});