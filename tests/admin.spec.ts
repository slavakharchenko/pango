import { test } from 'fixtures';
import { mainUser } from 'data';

test('Search user', async ({ userManagementPage }) => {
  await userManagementPage.open();
  await userManagementPage.searchUser(mainUser.login);
  await userManagementPage.expectUsersRecords(1);
});

