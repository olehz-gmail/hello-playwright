import { test, expect } from '@playwright/test';

test('Verify that the "Client Work" text is visible', async ({ page }) => {
  // Open the page https://www.epam.com/
  await page.goto('https://www.epam.com/');

  // Select "Services" from the header menu
  // Use the top navigation Services link
  await page.locator('a[href="/services"]').first().click({ force: true });
  await page.waitForLoadState('domcontentloaded');

  // Click the "Explore Our Client Work" link.
  await page.locator('a[href="/services/client-work"]').first().click({ force: true });
  await page.waitForLoadState('domcontentloaded');

  // Verify that the "Client Work" text is visible on the page.
  await expect(page.getByRole('heading', { name: /Client Work/i })).toBeVisible();
});
