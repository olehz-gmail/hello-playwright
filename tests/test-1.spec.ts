import { test, expect } from '@playwright/test';

const elements: { role: 'link' | 'button'; name: string | RegExp; title?: string | RegExp }[] = [
  { role: 'link', name: 'Playwright logo Playwright', title: 'Playwright' },
  { role: 'link', name: 'Docs', title: 'Docs' },
  { role: 'link', name: 'API', title: 'API' },
  { role: 'button', name: 'Node.js', title: 'Node.js' },
  { role: 'link', name: 'Community' },
  { role: 'link', name: 'GitHub repository' },
  { role: 'link', name: 'Discord server' },
  { role: 'button', name: 'Switch between dark and light' },
  { role: 'button', name: 'Search (Ctrl+K)', title: 'Search' + 'K' },
] as const;

test.describe('Playwright homepage elements verification', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('Verify elements visibility on Playwright homepage', async ({ page }) => {
    elements.forEach(async (el) =>
      test.step(`Verify visibility of ${el.name} page detail`, async () => {
        const { role, name } = el;
        await expect(page.getByRole(role, { name })).toBeVisible();
      }),
    );
  });

  test('Verify elements titles', async ({ page }) => {
    elements
      .filter((el) => 'title' in el)
      .forEach(async (el) => {
        const { role, name, title } = el;
        await expect(page.getByRole(role, { name })).toContainText(title || '');
      });
  });

  test('Verify elements refferreneces', async ({ page }) => {
    const elements_links: string[] = ['/docs/intros', '/docs/api/class-playwright'];

    elements
      .filter((el) => 'title' in el)
      .forEach(async (el) => {
        const { role, name, title } = el;
        await expect(page.getByRole(role, { name })).toHaveAttribute('href', /./);
      });
  });
});
