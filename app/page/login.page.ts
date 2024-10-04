import { expect, type Page } from '@playwright/test';
import { AppPage } from 'app';
import { step } from 'utils';
import { UserProfile } from 'data';

export class LoginPage extends AppPage {
  protected pagePath = '/auth/login';

  private readonly formHeader = this.page.locator('h5.orangehrm-login-title');
  private readonly loginAlert = this.page.locator('div[role="alert"]');
  private readonly usernameInput = this.page.locator('input[name="username"]');
  private readonly passwordInput = this.page.locator('input[name="password"]');
  private readonly submitButton = this.page.locator('button[type="submit"]');

  constructor(page: Page) {
    super(page);
  }

  @step
  async login(userProfile: UserProfile) {
    await this.usernameInput.fill(userProfile.login);
    await this.passwordInput.fill(userProfile.password);

    await this.submitButton.click();
  }

  @step
  async expectLoaded() {
    await expect(this.formHeader, `Page: ${this.pagePath} is not loaded`).toBeVisible();
  }

  @step
  async expectLoginAlert() {
    await expect(this.loginAlert).toHaveText('Invalid credentials');
  }
}
