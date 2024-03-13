import { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  projects: [
    {
      name: 'Chromium',
      use: {
        browserName: 'chromium',
        viewport: { width: 1280, height: 720 }, // Размеры окна браузера
      },
    },
  ],

  // GENERAL_SETTINGS_FOR_ALL_PROJECTS
  use: {
    actionTimeout: 7_000,
    navigationTimeout: 20_000,
    trace: 'retain-on-failure',
    headless: !process.env.HEADLESS,
    screenshot: 'only-on-failure',
  },

  // ADDITIONAL_GLOBAL_SETTINGS
  testDir: './tests',
  timeout: 60_000,
  workers: 1,
  reporter: [['line'], ['allure-playwright']],
}

export default config
