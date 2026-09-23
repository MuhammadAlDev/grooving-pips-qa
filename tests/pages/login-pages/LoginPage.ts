import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.emailInput = page.getByPlaceholder('Enter your email');

    this.passwordInput = page.getByPlaceholder(
      'Enter your password'
    );

    this.signInButton = page.getByRole('button', {
      name: 'Sign In',
    });
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  async expectEmailRequired() {
    await expect(
      await this.emailInput.evaluate(
        (element: HTMLInputElement) => element.checkValidity()
      )
    ).toBe(false);
  }

  async getEmailValidationMessage() {
    return await this.emailInput.evaluate(
      (element: HTMLInputElement) =>
        element.validationMessage
    );
  }
}