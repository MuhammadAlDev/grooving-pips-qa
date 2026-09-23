import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

declare const process: {
  env: Record<string, string | undefined>;
};

dotenv.config();

export default defineConfig({
  testDir: './tests',

  use: {
    baseURL: process.env.BASE_URL,

    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});