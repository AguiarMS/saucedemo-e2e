import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { ConfirmationPage } from '../pages/ConfirmationPage';
import { loginAsStandardUser } from '../utils/helpers';
import { Products, CheckoutInfo, Tax } from '../data/testData';
import { ErrorMessages, ConfirmationMessages } from '../constants/messages';
import { calculateSubtotal, calculateExpectedTotal } from '../utils/helpers';

test.describe('Checkout — Fluxo Completo e Validações', () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;
  let confirmationPage: ConfirmationPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    confirmationPage = new ConfirmationPage(page);

    // Setup: login e adição de produto ao carrinho
    await loginAsStandardUser(page);
    await inventoryPage.addProductToCart(Products.backpack.name);
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();
  });

  // ─── Validações da etapa 1 ──────────────────────────────────────────────

  test('TC-018 | Checkout sem First Name deve exibir erro de campo obrigatório', async () => {
    await checkoutPage.fillPersonalInfo(
      CheckoutInfo.missingFirstName.firstName,
      CheckoutInfo.missingFirstName.lastName,
      CheckoutInfo.missingFirstName.postalCode
    );
    await checkoutPage.clickContinue();
    await checkoutPage.assertErrorMessage(ErrorMessages.checkout.firstNameRequired);
  });

  test('TC-019 | Checkout sem Last Name deve exibir erro de campo obrigatório', async () => {
    await checkoutPage.fillPersonalInfo(
      CheckoutInfo.missingLastName.firstName,
      CheckoutInfo.missingLastName.lastName,
      CheckoutInfo.missingLastName.postalCode
    );
    await checkoutPage.clickContinue();
    await checkoutPage.assertErrorMessage(ErrorMessages.checkout.lastNameRequired);
  });

  test('TC-020 | Checkout sem Postal Code deve exibir erro de campo obrigatório', async () => {
    await checkoutPage.fillPersonalInfo(
      CheckoutInfo.missingPostalCode.firstName,
      CheckoutInfo.missingPostalCode.lastName,
      CheckoutInfo.missingPostalCode.postalCode
    );
    await checkoutPage.clickContinue();
    await checkoutPage.assertErrorMessage(ErrorMessages.checkout.postalCodeRequired);
  });

  test('TC-022 | Cancelar na etapa 1 deve retornar ao carrinho', async ({ page }) => {
    await checkoutPage.clickCancelStep1();
    await expect(page).toHaveURL(/.*cart\.html/);
  });

  // ─── Validações da etapa 2 ──────────────────────────────────────────────

  test('TC-021 | Total no resumo deve ser a soma correta do subtotal e da taxa', async () => {
    // Adiciona segundo produto para teste mais robusto
    await checkoutPage.clickCancelStep1();
    await cartPage.continueShopping();
    await inventoryPage.addProductToCart(Products.bikeLight.name);
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();

    await checkoutPage.fillPersonalInfo(
      CheckoutInfo.valid.firstName,
      CheckoutInfo.valid.lastName,
      CheckoutInfo.valid.postalCode
    );
    await checkoutPage.clickContinue();

    // Valida que o cálculo está correto
    await checkoutPage.assertTotalIsCorrect();

    // Valida os valores específicos
    const subtotal = await checkoutPage.getSubtotal();
    const tax = await checkoutPage.getTax();
    const total = await checkoutPage.getTotal();

    const expectedSubtotal = calculateSubtotal([
      Products.backpack.price,
      Products.bikeLight.price,
    ]);
    const expectedTotal = calculateExpectedTotal(
      [Products.backpack.price, Products.bikeLight.price],
      Tax.rate
    );

    expect(subtotal).toBe(expectedSubtotal);
    expect(tax).toBe(Tax.rate);
    expect(total).toBe(expectedTotal);
  });

  test('TC-023 | Cancelar na etapa 2 deve retornar ao catálogo', async ({ page }) => {
    await checkoutPage.fillPersonalInfo(
      CheckoutInfo.valid.firstName,
      CheckoutInfo.valid.lastName,
      CheckoutInfo.valid.postalCode
    );
    await checkoutPage.clickContinue();
    await checkoutPage.clickCancelStep2();
    await expect(page).toHaveURL(/.*inventory\.html/);
  });

  // ─── Fluxo E2E completo ─────────────────────────────────────────────────

  test('TC-024 | Fluxo E2E completo: login → produto → carrinho → checkout → confirmação', async ({
    page,
  }) => {
    // Passo 1 — Preencher dados pessoais na etapa 1
    await checkoutPage.fillPersonalInfo(
      CheckoutInfo.valid.firstName,
      CheckoutInfo.valid.lastName,
      CheckoutInfo.valid.postalCode
    );
    await checkoutPage.clickContinue();

    // Passo 2 — Verificar resumo na etapa 2
    await expect(page).toHaveURL(/.*checkout-step-two\.html/);
    await checkoutPage.assertTotalIsCorrect();

    // Passo 3 — Finalizar pedido
    await checkoutPage.clickFinish();

    // Passo 4 — Validar confirmação
    await expect(page).toHaveURL(/.*checkout-complete\.html/);
    await confirmationPage.assertConfirmationHeader(ConfirmationMessages.header);
    await confirmationPage.assertConfirmationImageVisible();
  });
});