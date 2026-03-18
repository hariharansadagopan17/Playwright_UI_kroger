import { Page } from '@playwright/test';

export class WarehousePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickPurchaseOrders() {
    await this.page.getByRole('button', { name: 'Purchase Orders' }).click();
  }

  async dismissPopup() {
    await this.page.getByRole('button', { name: 'DISMISS' }).click();
  }

  async clickMenuToggle() {
    await this.page.locator('ion-menu-toggle').getByRole('button').filter({ hasText: /^$/ }).click();
  }

  async clickHome() {
    await this.page.getByRole('button', { name: 'Home' }).click();
  }

  async navigateToPurchaseOrders() {
    await this.clickPurchaseOrders();
  }

  async isPurchaseOrdersPageLoaded() {
    try {
      await this.page.getByRole('button', { name: 'Purchase Orders' }).waitFor({ state: 'visible', timeout: 10000 });
      return true;
    } catch {
      return false;
    }
  }

  async isPurchaseOrdersTableVisible() {
    return await this.page.isVisible('table, .grid, .data-table, [role="grid"], ion-content', { timeout: 10000 }).catch(() => false);
  }
}
