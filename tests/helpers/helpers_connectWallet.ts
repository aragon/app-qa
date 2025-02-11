import { Page } from "@playwright/test";
import { MetaMask } from "@synthetixio/synpress/playwright";

export async function setupMetamaskAndConnect(page: Page, metamask: MetaMask) {
  await page.getByRole("button", { name: "Connect" }).click();
  await page.waitForTimeout(3000);
  await page.getByRole("button", { name: "Connect" }).click();
  await page
    .locator("wui-text")
    .filter({ hasText: "MetaMask" })
    .locator("slot")
    .click();
  await metamask.connectToDapp();
  await metamask.approveSwitchNetwork();
  await page.waitForTimeout(3000);
  await metamask.switchNetwork("Sepolia", true);
}
