import { defineConfig, devices } from "@playwright/test";

// Define environment-specific base URLs
const ENV_URLS = {
  local: "http://localhost:3000",
  preview: process.env.PREVIEW_URL,
  development: "https://dev.app-next.aragon.org",
  dev: "https://dev.app-next.aragon.org",
  staging: "https://stg.app-next.aragon.org/",
  stg: "https://stg.app-next.aragon.org/",
  production: "https://app-next.aragon.org",
  prd: "https://app-next.aragon.org",
};

ENV_URLS.dev = ENV_URLS.develop;

// Get the environment variable, default to "local"
const ENV = process.env.TEST_ENV || "production";
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
      timeout: 90000, // 2 minutes
    },
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        baseURL, // Pass the dynamically set baseURL to this project
      },
      timeout: 180000, // 3 minutes
    },
    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
        baseURL, // Pass the dynamically set baseURL to this project
      },
      timeout: 180000, // 3 minutes
    },
  ],
});
