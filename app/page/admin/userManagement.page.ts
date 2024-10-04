import { expect, type Page } from '@playwright/test';
import { AppPage, SidePanelComponent } from 'app';
import { step } from 'utils';

export class UserManagementPage extends AppPage {
  protected pagePath = '/admin/viewSystemUsers';

  // Toolbar
  private readonly toolbarRoot = this.page.locator('nav[aria-label="Topbar Menu"]') // move to component

  // User Filter
  private readonly systemUsersFilterRoot = this.page.locator('.oxd-table-filter');
  private readonly systemUserFilterInput = this.systemUsersFilterRoot.locator('input.oxd-input');
  private readonly systemUserFilterSubmitButton = this.systemUsersFilterRoot.locator('button[type="submit"]');

  // User records
  private readonly userRecords = this.page.locator('span.oxd-text--span', { hasText: 'Found' });

  public sidePanel: SidePanelComponent;

  constructor(page: Page) {
    super(page);
    this.sidePanel = new SidePanelComponent(this.page);
  }

  @step
  async searchUser(userName: string) {
    await this.systemUserFilterInput.fill(userName);
    await this.systemUserFilterSubmitButton.click();
  }

  @step
  async expectUsersRecords(count: number) {
    await expect(this.userRecords).toHaveText(`(${count.toString()}) ${count > 1 ? 'Records Found' : 'Record Found' }`);
  }

  @step
  async expectLoaded() {
    await expect(this.toolbarRoot, `Page: ${this.pagePath} is not loaded`).toContainText('User Management');
  }
}
