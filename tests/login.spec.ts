import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { Users } from '../data/testData';
import { ErrorMessages } from '../constants/messages';

test.describe('Autenticação — Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('TC-001 | Login com credenciais válidas deve redirecionar para o catálogo', async () => {
    await loginPage.login(Users.standard.username, Users.standard.password);
    await loginPage.assertLoginSuccess();
  });

  test('TC-002 | Login com usuário bloqueado deve exibir mensagem de erro específica', async () => {
    await loginPage.login(Users.lockedOut.username, Users.lockedOut.password);
    await loginPage.assertErrorMessage(ErrorMessages.login.userLocked);
  });

  test('TC-003 | Login sem preencher nenhum campo deve exibir erro de username obrigatório', async () => {
    await loginPage.clickLoginButton();
    await loginPage.assertErrorMessage(ErrorMessages.login.usernameRequired);
  });

  test('TC-004 | Login sem preencher a senha deve exibir erro de password obrigatório', async () => {
    await loginPage.fillUsername(Users.standard.username);
    await loginPage.clickLoginButton();
    await loginPage.assertErrorMessage(ErrorMessages.login.passwordRequired);
  });

  test('TC-005 | Login com senha incorreta deve exibir mensagem de credenciais inválidas', async () => {
    await loginPage.login(
      Users.validUserWrongPassword.username,
      Users.validUserWrongPassword.password
    );
    await loginPage.assertErrorMessage(ErrorMessages.login.credentialsInvalid);
  });

  test('TC-005b | Mensagem de erro deve ser fechada ao clicar no botão X', async () => {
    await loginPage.login(Users.lockedOut.username, Users.lockedOut.password);
    await loginPage.assertErrorMessage(ErrorMessages.login.userLocked);
    await loginPage.closeErrorMessage();
    await expect(loginPage.errorMessage).not.toBeVisible();
  });
});