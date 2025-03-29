// File: frontend/e2e/import-pdf.spec.js
import { test, expect } from '@playwright/test';

test.describe('PDF Import Flow', () => {
  test('User can load editor and paste a PDF URL', async ({ page }) => {
    try {
      await page.goto('http://localhost:5173/editor', { waitUntil: 'load' });
    } catch (err) {
      console.error('💥 Could not connect to Vite dev server. Is it running on http://localhost:5173?');
      throw err;
    }

    const pdfInput = page.getByPlaceholder('Enter PDF URL');
    await expect(pdfInput).toBeVisible();

    await pdfInput.fill('https://example.com/policy.pdf');
    const importButton = page.getByRole('button', { name: /import/i });
    await expect(importButton).toBeVisible();
    await importButton.click();

    const editor = page.locator('textarea');
    await expect(editor).toBeVisible();
  });
});
