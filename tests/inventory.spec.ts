import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { loginAsStandardUser } from '../utils/helpers';
import { Products, SortOptions } from '../data/testData';
import { PageTitles } from '../constants/messages';

test.describe('Catálogo de Produtos — Inventory', () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    await loginAsStandardUser(page);
  });

  test('TC-006 | Catálogo deve exibir 6 produtos após login', async ({ page }) => {
    const products = page.locator('[data-test="inventory-item"]');
    await expect(products).toHaveCount(6);
    await inventoryPage.assertPageTitle(PageTitles.inventory);
  });

  test('TC-007 | Ordenação por preço crescente deve reordenar os produtos corretamente', async () => {
    await inventoryPage.sortBy(SortOptions.priceLowHigh);
    const prices = await inventoryPage.getAllProductPrices();

    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
    }
  });

  test('TC-008 | Ordenação por preço decrescente deve reordenar os produtos corretamente', async () => {
    await inventoryPage.sortBy(SortOptions.priceHighLow);
    const prices = await inventoryPage.getAllProductPrices();

    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeGreaterThanOrEqual(prices[i + 1]);
    }
  });

  test('TC-009 | Ordenação por nome A→Z deve listar produtos em ordem alfabética', async () => {
    await inventoryPage.sortBy(SortOptions.nameAZ);
    const names = await inventoryPage.getAllProductNames();
    const sortedNames = [...names].sort();
    expect(names).toEqual(sortedNames);
  });

  test('TC-010 | Ordenação por nome Z→A deve listar produtos em ordem alfabética inversa', async () => {
    await inventoryPage.sortBy(SortOptions.nameZA);
    const names = await inventoryPage.getAllProductNames();
    const sortedNames = [...names].sort().reverse();
    expect(names).toEqual(sortedNames);
  });

  test('TC-011 | Adicionar produto ao carrinho deve atualizar o contador do header', async () => {
    await inventoryPage.addProductToCart(Products.backpack.name);
    await inventoryPage.assertCartBadge('1');
  });

  test('TC-012 | Remover produto pelo catálogo deve limpar o contador do carrinho', async () => {
    await inventoryPage.addProductToCart(Products.backpack.name);
    await inventoryPage.assertCartBadge('1');
    await inventoryPage.removeProductFromCart(Products.backpack.name);
    await inventoryPage.assertCartBadgeNotVisible();
  });

  test('TC-025 | Logout pelo menu lateral deve encerrar sessão e redirecionar para login', async ({ page }) => {
    await inventoryPage.logout();
    await expect(page).toHaveURL('/');
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });
});