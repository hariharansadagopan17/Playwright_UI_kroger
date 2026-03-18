import { defineConfig, devices } from '@playwright/test';
import { testConfig } from './src/config';

export default defineConfig({
  testDir: './features',
  fullyParallel: false,        // ✅ run tests sequentially, not in parallel
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,                  // ✅ only one browser at a time
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
  ],
  use: {
    headless: false,
    baseURL: testConfig.landingURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    proxy: {
      server: testConfig.proxy.server,
      username: testConfig.proxy.username,
      password: testConfig.proxy.password,
    },
  },

 projects: [
  {
    name: 'firefox',
    use: { ...devices['Desktop Firefox'] },
  },
],

  webServer: undefined,
});