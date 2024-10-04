import { expect, type Page } from '@playwright/test';
import { AppPage, SidePanelComponent } from 'app';
import { step } from 'utils';

export class DashboardPage extends AppPage {
  protected pagePath = '/dashboard/index';

  private readonly userName = this.page.locator('.oxd-userdropdown-name');

  public sidePanel: SidePanelComponent;

  constructor(page: Page) {
    super(page);
    this.sidePanel = new SidePanelComponent(this.page);
  }

  @step
  async expectUserName(userName: string) {
    await expect(this.userName, 'User has wrong name').toHaveText(userName);
  }

  @step
  async expectLoaded() {
    await expect(this.userName, `Page: ${this.pagePath} is not loaded`).toBeVisible();
  }
}
