import { expect, test } from '@playwright/test'

test.describe('Quick Admin Smoke Suite', () => {
  test.beforeEach(async ({ page }) => {
    page.on('pageerror', (error) => {
      console.error('pageerror:', error)
    })
    page.on('console', (message) => {
      if (message.type() === 'error') {
        console.error(`console.error: ${message.text()}`)
      }
    })
  })

  test('dashboard renders key widgets', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    await expect(page.getByText(/weekly overview/i)).toBeVisible()
    await expect(page.getByText(/total earning/i)).toBeVisible()
    await expect(page.getByText(/total profit/i)).toBeVisible()
  })

  test('login page shows credential form', async ({ page }) => {
    await page.goto('/pages/login', { waitUntil: 'networkidle' })
    await expect(page.getByRole('heading', { name: /welcome to materio/i })).toBeVisible()
    await expect(page.getByLabel(/email/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /login/i })).toBeVisible()
  })

  test('tables page lists table demos', async ({ page }) => {
    await page.goto('/tables', { waitUntil: 'networkidle' })
    await expect(page.getByText(/basic table/i)).toBeVisible()
    await expect(page.getByText(/collapsible table/i)).toBeVisible()
    await expect(page.getByRole('link', { name: /mui tables/i })).toBeVisible()
  })

  test('account settings tabs render forms', async ({ page }) => {
    await page.goto('/account-settings', { waitUntil: 'networkidle' })
    const tabs = page.getByRole('tablist', { name: /account-settings tabs/i })
    await expect(tabs).toBeVisible()
    await page.getByRole('tab', { name: /security/i }).click()
    await expect(page.getByText(/two factor authentication/i)).toBeVisible()
    await page.getByRole('tab', { name: /account/i }).click()
    await expect(page.getByRole('button', { name: /upload new photo/i })).toBeVisible()
  })

  test('cards gallery exposes sample widgets', async ({ page }) => {
    await page.goto('/cards', { waitUntil: 'networkidle' })
    await expect(page.getByRole('heading', { name: /basic cards/i })).toBeVisible()
    await expect(page.getByText(/apple watch/i)).toBeVisible()
    await expect(page.getByRole('heading', { name: /^support$/i })).toBeVisible()
  })

  test('form layouts render inputs and actions', async ({ page }) => {
    await page.goto('/form-layouts', { waitUntil: 'networkidle' })
    await expect(page.getByRole('textbox', { name: /^name$/i }).first()).toBeVisible()
    await expect(page.getByRole('textbox', { name: /^email$/i }).first()).toBeVisible()
    await expect(page.getByRole('button', { name: /get started!/i })).toBeVisible()
  })
})
