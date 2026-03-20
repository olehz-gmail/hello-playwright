import { test, expect } from '@playwright/test';
// Import page object fixture (adjust path if your project uses a different fixtures file)
import { test as pageTest } from '../fixtures'; // <- adjust or remove if not needed

test('Verify that the "Client Work" text is visible', async ({ page }) => {
  // 1. Navigate to https://www.epam.com/
  await page.goto('https://www.epam.com/');

  // 2. Click the "Services" from the top menu
  const servicesLink = page.getByRole('link', { name: 'Services' });
  await expect(servicesLink).toBeVisible();
  await servicesLink.click();

  // 4. Click the "Explore Our Client Work" link.
  const exploreClientWork = page.getByRole('link', { name: /Explore (Our )?Client Work/i });
  await expect(exploreClientWork).toBeVisible();
  await exploreClientWork.click();

  // 5. Verify that the "Client Work" text is visible on the page.
  await expect(page.getByText(/Client Work/i)).toBeVisible();

  // Always close the browser once the test is executed
  const browser = page.context().browser();
  if (browser) {
    await browser.close();
  }
});
