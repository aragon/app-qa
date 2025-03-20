import { defineConfig, devices } from "@playwright/test";

// Environment-specific base URLs
const ENV_URLS = {
  local: "http://localhost:3000",
  preview: process.env.PREVIEW_URL,
  development: "https://dev.app.aragon.org",
  dev: "https://dev.app.aragon.org",
  staging: "https://stg.app.aragon.org/",
  stg: "https://stg.app.aragon.org/",
  production: "https://app.aragon.org",
  prd: "https://app.aragon.org",
};

// Define or get environment variable
const ENV = process.env.TEST_ENV || "development";
const baseURL = ENV_URLS[ENV];

if (!baseURL) {
  throw new Error(`Invalid TEST_ENV: ${ENV}`);
}

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 0 : 0,
  workers: process.env.CI ? 1 : 1,
  reporter: "html",
  use: {
    baseURL, // Dynamically set the baseURL based on the environment
    video: "on-first-retry",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        baseURL, // Pass the dynamically set baseURL to this project
      },
      timeout: 150000, // 2 minutes 30 seconds
    },
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        baseURL, // Pass the dynamically set baseURL to this project
      },
      timeout: 150000, // 2 minutes 30 seconds
    },
    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
        baseURL, // Pass the dynamically set baseURL to this project
      },
      timeout: 150000, // 2 minutes 30 seconds
    },
  ],
});
