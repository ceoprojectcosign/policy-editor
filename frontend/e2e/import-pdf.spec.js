import { test, expect } from '@playwright/test';

test.describe('PDF Import Flow', () => {
  test('User can load editor and paste a PDF URL', async ({ page }) => {
    // Go directly to the editor route
    await page.goto('http://localhost:5173/editor');

    // Wait for the import bar to show up
    const pdfInput = page.getByPlaceholder('Enter PDF URL');

    await expect(pdfInput).toBeVisible({ timeout: 10000 });

    // Simulate a PDF import
    await pdfInput.fill('https://example.com/policy.pdf');

    const importButton = page.getByRole('button', { name: /import/i });

    await expect(importButton).toBeVisible();
    await importButton.click();

    // Check for content to appear (depends on your editor setup)
    const editor = page.locator('textarea');
    await expect(editor).toBeVisible({ timeout: 10000 });

    // Optional: check if content changes or a success message appears
    await expect(editor).toContainText(/pdf|policy/i);
  });
});
