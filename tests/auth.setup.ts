import { test as setup } from '@playwright/test';
import { mainUser } from 'data';

const authFile = 'playwright/.auth/user.json';

setup('Authenticate', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/auth/login');
  await page.locator('input[name="username"]').fill(mainUser.login);
  await page.locator('input[name="password"]').fill(mainUser.password);
  await page.locator('button[type="submit"]').click();

  await page.waitForURL('https://opensource-demo.orangehrmlive.com/dashboard/index');

  await page.context().storageState({ path: authFile });
});