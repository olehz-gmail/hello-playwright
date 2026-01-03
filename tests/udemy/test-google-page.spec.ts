import { test, expect } from '@playwright/test';

test.describe('Assignments on the google page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/docs/intro');
    await expect(page).toHaveTitle(/Playwright/);

    await page.getByRole('button', { name: 'Search (Ctrl+K)' }).click();
    await expect(page.getByRole('searchbox', { name: 'Search' })).toBeVisible();
  });

  test('Walk through the Search results directly', async ({ page }) => {
    await page.getByRole('searchbox', { name: 'Search' }).fill('input');
    const suggestions = await page.locator('#docsearch-list > li a');
    await expect(suggestions.last()).toBeVisible();
    const suggestionsCount = await suggestions.count();
    await expect(suggestionsCount).toBeGreaterThan(5);

    for (const element of await suggestions.filter({ hasText: /(:?Input|Handle)/g }).all()) {
      const text = await element.innerText();
      const url = await element.getAttribute('href');
      console.log(`${text} --- ${url}`);
    }
  });

  test('Validate Search suggestions', async ({ page }) => {
    await page.getByRole('searchbox', { name: 'Search' }).fill('getting');
    const sections = await page.locator('section:has(.DocSearch-Hit-source)');
    await expect(await sections.last()).toBeVisible();
    await expect(await sections.count()).toBeGreaterThan(2);
    for (const section of await sections.all()) {
      const sectionTitle = await section.locator('.DocSearch-Hit-source').innerText();
      console.log(`Section: ${sectionTitle}`);
      const suggestions = await section.locator('li.DocSearch-Hit');
      await expect(suggestions.last()).toBeVisible();
      for (const suggestion of await suggestions.all()) {
        const text = await suggestion.innerText();
        const url = await suggestion.locator('a').getAttribute('href');
        console.log(`  ${text} --- ${url}`);
      }
    }
  });
});
