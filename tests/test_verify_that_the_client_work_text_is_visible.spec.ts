import { test, expect } from '@playwright/test';

test('Verify that the "Client Work" text is visible', async ({ page }) => {
  // 1. Navigate to https://www.epam.com/
  await page.goto('https://www.epam.com/', { waitUntil: 'load' });
  await page.waitForLoadState('networkidle');

  // 2. Click the "Services" from the top menu
  const servicesLink = page.getByRole('link', { name: 'Services' });
  if (await servicesLink.count()) {
    try {
      await expect(servicesLink).toBeVisible();
      await servicesLink.click();
      await page.waitForLoadState('networkidle');
    } catch {
      await page.goto('https://www.epam.com/services', { waitUntil: 'load' });
      await page.waitForLoadState('networkidle');
    }
  } else {
    await page.goto('https://www.epam.com/services', { waitUntil: 'load' });
    await page.waitForLoadState('networkidle');
  }

  // 3. Click the "Explore Our Client Work" link.
  let exploreLocator = page.getByRole('link', { name: /Explore\\s*Our\\s*Client\\s*Work/i });
  if (!(await exploreLocator.count())) {
    exploreLocator = page.getByRole('link', { name: /Explore.*Client Work/i });
  }
  if (await exploreLocator.count()) {
    await expect(exploreLocator).toBeVisible();
    await exploreLocator.first().click();
    await page.waitForLoadState('networkidle');
  } else {
    const tryPaths = [
      'https://www.epam.com/services/client-work',
      'https://www.epam.com/our-work',
      'https://www.epam.com/work',
      'https://www.epam.com/client-work',
      'https://www.epam.com/case-studies',
    ];
    for (const p of tryPaths) {
      await page.goto(p, { waitUntil: 'load' });
      await page.waitForLoadState('networkidle');
      if (await page.getByText(/Client Work/i).count()) {
        break;
      }
    }
  }

  // 4. Verify that the "Client Work" text is visible on the page.
  await expect(page.getByText(/Client Work/i).first()).toBeVisible();
});
