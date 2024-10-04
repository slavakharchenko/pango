import { test } from 'fixtures';
import { mainUser } from 'data';

test('Login: valid credentials', async ({ loginPage, dashboardPage }) => {
  await loginPage.login(mainUser);

  await dashboardPage.expectUserName(mainUser.username);
});

test('Login: invalid credentials', async ({ loginPage }) => {
  await loginPage.login({ login: 'test', password: '12345', username: 'test' });

  await loginPage.expectLoginAlert();
});
