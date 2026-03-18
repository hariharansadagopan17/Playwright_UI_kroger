import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToApp(url: string) {
    await this.page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  }

  async clickUsernameField() {
    await this.page.getByRole('textbox', { name: 'Username' }).click();
  }

  async clickKrogerPingSSO() {
    await this.page.getByRole('link', { name: 'KROGERping' }).click();
  }

  async enterEUID(euid: string) {
    await this.page.getByRole('textbox', { name: 'EUID or Email Address' }).click();
    await this.page.getByRole('textbox', { name: 'EUID or Email Address' }).fill(euid);
  }

  async clickContinue() {
    await this.page.getByRole('button', { name: 'Continue' }).click();
  }

  async enterPassword(password: string) {
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
  }

  async clickSignIn() {
    await this.page.getByRole('button', { name: 'Sign In' }).click();
  }

  async login(url: string, username: string, password: string) {
    await this.navigateToApp(url);
    await this.clickUsernameField();
    await this.clickKrogerPingSSO();
    await this.enterEUID(username);
    await this.clickContinue();
    await this.enterPassword(password);
    await this.clickSignIn();
    await this.page.waitForURL('**/udc/landing', { timeout: 30000 });
  }

  async enterUsername(username: string) {
    await this.page.getByRole('textbox', { name: 'Username' }).fill(username);
  }

  async clickLogIn() {
    await this.page.getByRole('button', { name: 'Log In' }).click();
  }

  async directLogin(url: string, username: string, password: string) {
    await this.navigateToApp(url);
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogIn();
    await this.page.waitForURL('**/udc/landing', { timeout: 30000 });
  }

  async isDashboardLoaded() {
    return await this.page.waitForURL('**/udc/landing', { timeout: 15000 })
      .then(() => true)
      .catch(() => false);
  }
}
