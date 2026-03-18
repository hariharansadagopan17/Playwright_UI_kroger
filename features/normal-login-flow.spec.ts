import { test, expect } from '@playwright/test';
import { testConfig } from '../src/config';

test.setTimeout(120000);

test('Normal login flow', async ({ page }) => {

  // ✅ Attach proxy auth header to bypass ERR_INVALID_AUTH_CREDENTIALS
  await page.context().setExtraHTTPHeaders({
    'Proxy-Authorization': 'Basic ' + Buffer.from(
      `${testConfig.proxy.username}:${testConfig.proxy.password}`
    ).toString('base64'),
  });

  // Navigate to auth page
  await page.goto('https://krogs-auth.sce.manh.com/auth/realms/maactive/protocol/openid-connect/auth?scope=openid&client_id=zuulserver.1.0.0&redirect_uri=https://krogs.sce.manh.com/login&response_type=code&state=j3aGT1');

  // Login
  await page.getByRole('textbox', { name: 'Username' }).fill('hardik.sharma@kroger.com');
  await page.getByPlaceholder('Password').fill('Element92u17$');
  await page.getByRole('button', { name: 'Log In' }).click();

  // Verify landing page loads
  await page.waitForURL('**/udc/landing', { timeout: 60000 });
  await expect(page).toHaveURL(/\/udc\/landing/);

  // Navigate to Purchase Orders
  await page.getByRole('button', { name: 'Purchase Orders' }).click();
  await page.getByRole('button', { name: 'DISMISS' }).click();

  // Navigate back to Home
  await page.locator('ion-menu-toggle').getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByRole('button', { name: 'Home' }).click();
  await expect(page).toHaveURL(/\/udc\/landing/);
});