import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.google.com/?zx=1765905643415&no_sw_cr=1');
  await page.getByRole('button', { name: 'Не цікавить' }).click();
  await page.getByRole('combobox', { name: 'Пошук' }).click();
  await page.getByRole('combobox', { name: 'Пошук' }).fill('test');
  await page.locator('#LS8OJ').click();
  await page.locator('#LS8OJ').click();
  await page.getByRole('button', { name: 'Пошук Google' }).click();
  await page
    .locator('iframe[name="a-ddsaw71nyjm"]')
    .contentFrame()
    .getByRole('checkbox', { name: "I'm not a robot" })
    .click();
  await page
    .locator('iframe[name="a-ddsaw71nyjm"]')
    .contentFrame()
    .getByRole('checkbox', { name: "I'm not a robot" })
    .click();
});
