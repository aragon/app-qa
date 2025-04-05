import type { Locator, Page } from '@playwright/test';

class TestUtils {
    private maxRetries = 10;

    refreshUntilVisible = async (page: Page, locator: Locator): Promise<void> => {
        let retries = 0;
        let elementVisible = false;

        while (retries < this.maxRetries && !elementVisible) {
            await page.reload();
            elementVisible = await this.isLocatorVisible(locator);
            retries++;
        }

        if (!elementVisible) {
            throw new Error(`refreshUntilVisible: locator not visible after ${this.maxRetries.toString()} retries.`);
        }
    };

    private isLocatorVisible = async (locator: Locator): Promise<boolean> => {
        try {
            await locator.waitFor({ state: 'visible', timeout: 1_000 });
            return true;
        } catch (error: unknown) {
            return false;
        }
    };
}

export const testUtils = new TestUtils();
