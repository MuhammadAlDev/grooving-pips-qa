import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly loginSubtitle: Locator;

  constructor(page: Page) {
    this.page = page;

    this.emailInput = page.getByPlaceholder('Enter your email');

    this.passwordInput = page.getByPlaceholder(
      'Enter your password'
    );

    this.signInButton = page.getByRole('button', {
      name: 'Sign In',
    });

    this.loginSubtitle = page.getByText(
      'Sign in to your account to continue'
    );
  }

  async goto() {
    await this.page.goto('/login');
  }

  async expectLoginPage() {
    await expect(this.loginSubtitle).toBeVisible();
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  async expectEmailInvalid() {
    const isInvalid = await this.emailInput.evaluate(
      (element: HTMLInputElement) => !element.checkValidity()
    );
    expect(isInvalid).toBe(true);
  }

  async getEmailValidationMessage() {
    return await this.emailInput.evaluate(
      (element: HTMLInputElement) =>
        element.validationMessage
    );
  }
}