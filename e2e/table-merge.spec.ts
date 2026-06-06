import { test, expect } from '@playwright/test';

test('table merge keeps row count', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Wait for editor
  const editor = page.locator('.ProseMirror');
  await editor.waitFor();
  await editor.click();

  // Insert 2x4 table via toolbar
  await page.locator('button[title="插入表格"]').click();
  // The grid picker: hover to 2 rows x 4 cols then click
  const grid = page.locator('div').filter({ has: page.locator('div[style*="gridTemplateColumns"]') }).first();
  // Click the cell at row 2 col 4 in the 7x7 grid
  const cells = grid.locator('div > div');
  // index = (row-1)*7 + (col-1) = (2-1)*7 + (4-1) = 10
  await cells.nth(10).hover();
  await cells.nth(10).click();

  // Verify table has 2 rows
  await expect(editor.locator('table tbody tr')).toHaveCount(2);

  // Merge left 4 cells: first row first two cells, then extend to second row
  // We simulate by clicking first cell then shift-clicking the cell at row2 col2
  const firstCell = editor.locator('table tbody tr').nth(0).locator('td').nth(0);
  const secondRowSecondCol = editor.locator('table tbody tr').nth(1).locator('td').nth(1);
  await firstCell.click();
  await secondRowSecondCol.click({ modifiers: ['Shift'] });

  // Click merge button if enabled
  const mergeBtn = page.locator('button[title="合并单元格"]');
  await expect(mergeBtn).toBeVisible();
  await mergeBtn.click();

  // Table should still have 2 rows
  await expect(editor.locator('table tbody tr')).toHaveCount(2);

  // Merge right 4 cells: row1 col3 to row2 col4
  const firstRowThirdCol = editor.locator('table tbody tr').nth(0).locator('td').nth(2);
  const secondRowFourthCol = editor.locator('table tbody tr').nth(1).locator('td').nth(3);
  await firstRowThirdCol.click();
  await secondRowFourthCol.click({ modifiers: ['Shift'] });

  await expect(mergeBtn).toBeVisible();
  await mergeBtn.click();

  // Final assertion: still 2 rows
  await expect(editor.locator('table tbody tr')).toHaveCount(2);
});
