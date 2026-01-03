import { test, expect } from '@playwright/test';

test.describe('Assignments on the google page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.google.com/');
    await expect(page).toHaveTitle(/Google/);
  });

  test('Verify visibility of Google Search button', async ({ page }) => {
    await page.getByRole('combobox', { name: 'Пошук' }).click();
    await page.getByRole('combobox', { name: 'Пошук' }).fill('way2automation');
    await page.getByRole('button', { name: 'Пошук Google' }).first().click();
    const searchItems = await page.locator('[data-rpos]:has(h3)').all();
    console.log(`Number of search results: ${searchItems.length}`);
  });
});
