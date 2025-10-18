import { defineConfig, devices } from '@playwright/test'

const PORT = Number.parseInt(process.env.PLAYWRIGHT_PORT ?? '3100', 10)
const HOST = process.env.PLAYWRIGHT_HOST ?? '127.0.0.1'
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? `http://${HOST}:${PORT}`
const useDevServer = process.env.PLAYWRIGHT_USE_DEV === '1'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: [['list']],
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },
  use: {
    baseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  webServer: {
    command: `${useDevServer ? 'npm run dev' : 'npm run start'} -- --port ${PORT}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    stdout: 'ignore',
    stderr: 'pipe',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
})
