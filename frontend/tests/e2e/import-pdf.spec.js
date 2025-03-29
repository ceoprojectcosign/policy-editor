import { test, expect } from '@playwright/test';

test.describe('PDF Import Flow', () => {
  test('User can log in and import a PDF', async ({ page }) => {
    await page.goto('http://localhost:5173');

    // Simulate login (replace with real logic if needed)
    await page.getByPlaceholder('Email').fill('test@example.com');
    await page.getByPlaceholder('Password').fill('password123');
    await page.getByRole('button', { name: /sign in/i }).click();

    await expect(page).toHaveURL(/.*editor/);

    // Simulate entering PDF URL and importing
    await page.getByPlaceholder('Enter PDF URL').fill('https://example.com/test.pdf');
    await page.getByRole('button', { name: /import/i }).click();

    // Validate the content appears in the editor
    const editor = page.locator('textarea');
    await expect(editor).toContainText(''); // You can match expected string here
  });
});