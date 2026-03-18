import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { chromium, Browser, Page, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/login-page';
import { WarehousePage } from '../../src/pages/warehouse-page';
import { testConfig } from '../../src/config';

let browser: Browser;
let page: Page;
let loginPage: LoginPage;
let warehousePage: WarehousePage;

Before(async function () {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  loginPage = new LoginPage(page);
  warehousePage = new WarehousePage(page);
  console.log('Browser launched and pages initialized');
});

After(async function () {
  if (page) {
    await page.close();
  }
  if (browser) {
    await browser.close();
  }
  console.log('Browser closed');
});

// Login Steps

Given('I navigate to the Manhattan application', async function () {
  console.log('Navigating to Manhattan application');
  await loginPage.navigateToApp(testConfig.baseURL);
  console.log('Successfully navigated to the application');
});

When('I click on the Username field', async function () {
  console.log('Clicking on Username field');
  await loginPage.clickUsernameField();
  console.log('Username field clicked');
});

When('I select KROGERping SSO login', async function () {
  console.log('Selecting KROGERping SSO');
  await loginPage.clickKrogerPingSSO();
  console.log('KROGERping SSO selected');
});

When('I enter my EUID credentials', async function () {
  console.log('Entering EUID credentials');
  await loginPage.enterEUID(testConfig.credentials.username);
  console.log('EUID entered');
});

When('I click Continue', async function () {
  console.log('Clicking Continue');
  await loginPage.clickContinue();
  console.log('Continue clicked');
});

When('I enter my password', async function () {
  console.log('Entering password');
  await loginPage.enterPassword(testConfig.credentials.password);
  console.log('Password entered');
});

When('I click Sign In', async function () {
  console.log('Clicking Sign In');
  await loginPage.clickSignIn();
  console.log('Sign In clicked');
});

Then('I should see the dashboard landing page', async function () {
  console.log('Verifying dashboard landing page');
  await page.waitForURL('**/udc/landing', { timeout: 30000 });
  const currentURL = page.url();
  expect(currentURL).toContain('/udc/landing');
  console.log(`Dashboard verified - URL: ${currentURL}`);
});

// Purchase Orders Steps

When('I click on Purchase Orders', async function () {
  console.log('Clicking on Purchase Orders');
  await warehousePage.clickPurchaseOrders();
  console.log('Purchase Orders clicked');
});

When('I dismiss the popup notification', async function () {
  console.log('Dismissing popup notification');
  await warehousePage.dismissPopup();
  console.log('Popup dismissed');
});

Then('I should see the Purchase Orders page loaded', async function () {
  console.log('Verifying Purchase Orders page is loaded');
  await page.waitForTimeout(2000);
  const isLoaded = await warehousePage.isPurchaseOrdersPageLoaded();
  expect(isLoaded).toBeTruthy();
  console.log('Purchase Orders page verified');
});

// Navigation Steps

When('I click on the menu toggle', async function () {
  console.log('Clicking menu toggle');
  await warehousePage.clickMenuToggle();
  console.log('Menu toggle clicked');
});

When('I click on Home', async function () {
  console.log('Clicking Home');
  await warehousePage.clickHome();
  console.log('Home clicked');
});

// Direct Login Steps

When('I enter my username', async function () {
  console.log('Entering username');
  await loginPage.enterUsername(testConfig.directCredentials.username);
  console.log('Username entered');
});

When('I click Log In', async function () {
  console.log('Clicking Log In');
  await loginPage.clickLogIn();
  console.log('Log In clicked');
});

// Composite Steps

Given('I am directly logged in and on the dashboard', async function () {
  console.log('Performing direct login flow');
  await loginPage.directLogin(
    testConfig.baseURL,
    testConfig.directCredentials.username,
    testConfig.directCredentials.password
  );
  console.log('Directly logged in and on dashboard');
});

Given('I am logged in and on the dashboard', async function () {
  console.log('Performing full login flow');
  await loginPage.login(
    testConfig.baseURL,
    testConfig.credentials.username,
    testConfig.credentials.password
  );
  console.log('Logged in and on dashboard');
});
