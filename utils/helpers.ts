import { Page } from '@playwright/test';
import { Users } from '../data/testData';

/**
 * Realiza login com o usuário padrão sem passar pela tela de login visualmente.
 * Útil para testes que não precisam validar o login em si.
 */
export async function loginAsStandardUser(page: Page): Promise<void> {
  await page.goto('/');
  await page.locator('[data-test="username"]').fill(Users.standard.username);
  await page.locator('[data-test="password"]').fill(Users.standard.password);
  await page.locator('[data-test="login-button"]').click();
  await page.waitForURL('**/inventory.html');
}

/**
 * Formata um número como string de preço no padrão da aplicação.
 * Exemplo: 29.99 → "$29.99"
 */
export function formatPrice(value: number): string {
  return `$${value.toFixed(2)}`;
}

/**
 * Calcula o total esperado dado um array de preços e a taxa fixa.
 */
export function calculateExpectedTotal(prices: number[], tax: number): number {
  const subtotal = prices.reduce((sum, price) => sum + price, 0);
  return parseFloat((subtotal + tax).toFixed(2));
}

/**
 * Calcula o subtotal esperado dado um array de preços.
 */
export function calculateSubtotal(prices: number[]): number {
  return parseFloat(
    prices.reduce((sum, price) => sum + price, 0).toFixed(2)
  );
}