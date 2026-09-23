import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login-page';
import { testDataLogin } from '../../fixtures/test_data_login';

for (const data of testDataLogin) {
  test(`Login - ${data.scenario}`, async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Open login page
    await loginPage.goto();

    // Verify login page
    await expect(
      page.getByText('Sign in to your account to continue')
    ).toBeVisible();

    // Perform login
    await loginPage.login(
      data.email,
      data.password
    );

    // =========================
    // VALID LOGIN
    // =========================
    if (data.expectedType === 'success') {
      // Sesuaikan dengan halaman setelah login berhasil
      await expect(page).not.toHaveURL(/login/);
    }

    // =========================
    // INVALID EMAIL / PASSWORD
    // =========================
    if (data.expectedType === 'error') {
      await expect(
        page.getByText(data.expectedResult, {
          exact: false,
        })
      ).toBeVisible();
    }

    // =========================
    // EMPTY CREDENTIALS
    // =========================
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