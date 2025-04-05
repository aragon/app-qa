import { defineConfig, devices } from '@playwright/test';

const aragonEnvironments = {
    local: 'http://localhost:3000',
    development: 'https://dev.app.aragon.org',
    staging: 'https://stg.app.aragon.org/',
    production: 'https://app.aragon.org',
};

const extendedEnvironments: Record<string, string | undefined> = {
    local: aragonEnvironments.local,
    custom: process.env.CUSTOM_URL,
    development: aragonEnvironments.development,
    dev: aragonEnvironments.development,
    staging: aragonEnvironments.staging,
    stg: aragonEnvironments.staging,
    production: aragonEnvironments.production,
    prd: aragonEnvironments.production,
};

const baseURL = extendedEnvironments[process.env.TEST_ENV ?? 'development'];

if (!baseURL) {
    throw new Error(`Invalid TEST_ENV: ${process.env.TEST_ENV!}`);
}

const config = defineConfig({
    testDir: './src',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',
    timeout: 60_000,
    use: {
        baseURL,
        video: 'on-first-retry',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
    },
    projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'], baseURL } }],
});

export default config;
