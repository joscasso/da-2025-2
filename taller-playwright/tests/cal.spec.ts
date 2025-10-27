import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.desmos.com/scientific?lang=es');
  await page.getByText('Loading... Logotipo de Desmos').click();
  await page.getByText('Loading... Logotipo de Desmos').click();
  await page.getByRole('button', { name: '5' }).click();
  await page.getByRole('button', { name: 'Más' }).click();
  await page.getByRole('button', { name: '8' }).click();
  await page.getByLabel('Lista de expresiones').getByText('1', { exact: true }).click();
  await page.getByText('Loading... Logotipo de Desmos').click();
  await page.getByRole('button', { name: 'Enter' }).click();
  await page.getByLabel('Lista de expresiones').getByText('3', { exact: true }).click();
  await expect(page.getByLabel('Lista de expresiones')).toContainText('3');
  await page.getByText('Loading... Logotipo de Desmos').click();
  await page.getByLabel('Lista de expresiones').getByText('3', { exact: true }).click();
  await expect(page.getByLabel('Lista de expresiones')).toContainText('equals 13=13');
});