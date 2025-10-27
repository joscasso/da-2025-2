import { test, expect } from '@playwright/test';

test.describe('Pruebas de Funcionalidad de Login', () => {

  // Antes de cada prueba, ir a la página de login.
  test.beforeEach(async ({ page }) => {
    await page.goto('https://practicetestautomation.com/practice-test-login/');
  });

  test('Debe iniciar sesión correctamente con credenciales validas', async ({ page }) => {
    // 1. Ingresar Usuario
    await page.locator('#username').fill('student');

    // 2. Ingresar Contraseña
    await page.locator('#password').fill('Password123');

    // 3. Click en Submit
    await page.locator('#submit').click();

    // 4. Afirmación (Assertion): Verificar que la URL es la correcta
    await expect(page).toHaveURL('https://practicetestautomation.com/logged-in-successfully/');

    // 5. Afirmación: Verificar que el texto de éxito es visible.
    await expect(page.locator('h1')).toHaveText('Logged In Successfully');
  });

  test('Debe fallar con una contraseña incorrecta', async ({ page }) => {
    // 1. Ingresar Usuario
    await page.locator('#username').fill('student');

    // 2. Ingresar Contraseña incorrecta
    await page.locator('#password').fill('wrongpassword');

    // 3. Click en Submit
    await page.locator('#submit').click();

    // 4. Afirmación: Verificar que el mensaje de error es visible.
    await expect(page.locator('#error')).toBeVisible();
  });

});
