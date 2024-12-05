import { defineConfig, devices } from "@playwright/test";

// Define environment-specific base URLs
const ENV_URLS = {
  local: "http://localhost:3000",
  develop: "https://dev.app-next.aragon.org",
  staging: "https://stg.app-next.aragon.org/",
  production: "https://app-next.aragon.org",
};

// Get the environment variable, default to "local"
const ENV = process.env.TEST_ENV || "local";
const baseURL = ENV_URLS[ENV];

if (!baseURL) {
  throw new Error(`Invalid TEST_ENV: ${ENV}`);
}

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
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
      timeout: 180000,
    },
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        baseURL, // Pass the dynamically set baseURL to this project
      },
    },
    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
        baseURL, // Pass the dynamically set baseURL to this project
      },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: "cd ./app-next && yarn dev",
  //   url: ENV === "local" ? "http://localhost:3000" : undefined, // Only run server for local environment
  //   reuseExistingServer: true,
  //   timeout: 120 * 1000,
  // },
});

// import { defineConfig, devices } from "@playwright/test";

// /**
//  * Read environment variables from file.
//  * https://github.com/motdotla/dotenv
//  */
// // import dotenv from 'dotenv';
// // dotenv.config({ path: path.resolve(__dirname, '.env') });

// /**
//  * See https://playwright.dev/docs/test-configuration.
//  */
// export default defineConfig({
//   testDir: "./tests",
//   /* Run tests in files in parallel */
//   fullyParallel: true,
//   /* Fail the build on CI if you accidentally left test.only in the source code. */
//   forbidOnly: !!process.env.CI,
//   /* Retry on CI only */
//   retries: process.env.CI ? 2 : 0,
//   /* Opt out of parallel tests on CI. */
//   workers: process.env.CI ? 1 : undefined,
//   /* Reporter to use. See https://playwright.dev/docs/test-reporters */
//   reporter: "html",
//   /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
//   use: {
//     /* Base URL to use in actions like `await page.goto('/')`. */
//     // baseURL: 'http://127.0.0.1:3000',

//     /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
//     video: "on-first-retry",
//     trace: "on-first-retry",
//     screenshot: "only-on-failure",
//   },

//   /* Configure projects for major browsers */
//   projects: [
//     {
//       name: "chromium",
//       use: { ...devices["Desktop Chrome"] },
//       // use: {
//       //   ...devices["Desktop Chrome"], // Use the predefined device configuration
//       //   browserName: "chromium",
//       //   launchOptions: {
//       //     args: ["--no-sandbox", "--disable-gpu"], // Pass additional Chromium flags
//       //   },
//       // },
//       timeout: 180000, // Set a timeout of 180 seconds for each test in this project
//     },

//     {
//       name: "firefox",
//       use: { ...devices["Desktop Firefox"] },
//     },

//     {
//       name: "webkit",
//       use: { ...devices["Desktop Safari"] },
//     },

//     /* Test against mobile viewports. */
//     // {
//     //   name: 'Mobile Chrome',
//     //   use: { ...devices['Pixel 5'] },
//     // },
//     // {
//     //   name: 'Mobile Safari',
//     //   use: { ...devices['iPhone 12'] },
//     // },

//     /* Test against branded browsers. */
//     // {
//     //   name: 'Microsoft Edge',
//     //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
//     // },
//     // {
//     //   name: 'Google Chrome',
//     //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
//     // },
//   ],

//   /* Run your local dev server before starting the tests */
//   // webServer: {
//   //   command: "cd ./app-next && yarn dev",
//   //   url: "http://localhost:3000",
//   //   reuseExistingServer: true,
//   //   timeout: 120 * 1000, // 2 minutes for the server to start
//   //   // use: {
//   //   //   baseURL: "http://localhost:3000/",
//   //   // },
//   // },
//   // webServer: {
//   //   command: 'npm run start',
//   //   url: 'http://127.0.0.1:3000',
//   //   reuseExistingServer: !process.env.CI,
//   // },
// });
