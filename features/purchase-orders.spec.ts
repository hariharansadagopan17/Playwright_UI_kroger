import { test, expect } from '@playwright/test';

test.setTimeout(120000);

test('test', async ({ page }) => {
  await page.goto('https://krogs-auth.sce.manh.com/auth/realms/maactive/protocol/openid-connect/auth?scope=openid&client_id=zuulserver.1.0.0&redirect_uri=https://krogs.sce.manh.com/login&response_type=code&state=DFmEiE');
  await page.getByRole('link', { name: 'KROGERping' }).click();
  await page.getByRole('textbox', { name: 'EUID or Email Address' }).click();
  await page.getByRole('textbox', { name: 'EUID or Email Address' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'EUID or Email Address' }).fill('CZT6189');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).press('ControlOrMeta+V');
  await page.getByRole('textbox', { name: 'Password' }).fill('/*ilmCtii17$*/');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.waitForURL('**/udc/landing', { timeout: 60000 });
  // Wait for the loading spinner to disappear
  await page.getByText('Please Wait...').waitFor({ state: 'hidden', timeout: 60000 });
  await page.getByText('Purchase Orders', { exact: true }).click();
  await page.getByRole('button', { name: 'DISMISS' }).click();
  await page.locator('ion-menu-toggle').getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByRole('button', { name: 'Home' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button').filter({ hasText: /^$/ }).nth(5).click({ force: true });
  await page.locator('a').filter({ hasText: 'Sign out' }).click();
  await page.getByRole('button', { name: 'Yes' }).click();
});
