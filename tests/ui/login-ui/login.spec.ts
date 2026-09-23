import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login-pages/LoginPage';
import { testDataLogin } from '../../fixtures/test_data_login';

for (const data of testDataLogin) {
  test(`Login - ${data.scenario}`, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.expectLoginPage();

    await loginPage.login(
      data.email,
      data.password
    );

    if (data.expectedType === 'success') {
      await expect(page).not.toHaveURL(/login/);
    }

    if (data.expectedType === 'error') {
      await expect(
        page.getByText(data.expectedResult, {
          exact: false,
        })
      ).toBeVisible();
    }

    if (data.expectedType === 'validation') {
      await loginPage.expectEmailInvalid();

      const validationMessage =
        await loginPage.getEmailValidationMessage();

      expect(validationMessage).toBe(
        data.expectedResult
      );
    }
  });
}