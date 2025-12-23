import { test, expect } from '@playwright/test';

test('home page loads and has title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Onregelmatige Werkwoorden Trainer/i);
  await expect(page.locator('#root')).toBeVisible();
});
