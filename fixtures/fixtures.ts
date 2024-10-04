import { test as base } from '@playwright/test';
import { LoginPage, DashboardPage, UserManagementPage } from 'app';

type Fixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  userManagementPage: UserManagementPage;
};
export const test = base.extend<Fixtures>({
  loginPage: async ({ page, context }, use) => {
    const loginPage = new LoginPage(page);
    await context.clearCookies();
    await loginPage.open();
    await use(loginPage);
  },
  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },
  userManagementPage: async ({ page }, use) => {
    const userManagementPage = new UserManagementPage(page);
    await use(userManagementPage);
  },
});

export { expect } from '@playwright/test';
