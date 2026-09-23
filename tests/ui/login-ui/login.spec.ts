import {test, expect} from '@playwright/test';
import {LoginPage} from '../../pages/login-pages/LoginPage';
import { testDataLogin } from '../../fixtures/test_data_login';

for (const data of testDataLogin) {
  test(`Login Test ${testDataLogin.indexOf(data) + 1} -  ${data.scenario}`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://testing-pips.groovingspaces.com/login'); 

    await expect(page).toHaveTitle('Sign in to your account to continue');
    await loginPage.login(data.email, data.password);
  });
}