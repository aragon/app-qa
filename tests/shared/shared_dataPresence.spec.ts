import { testWithSynpress } from "@synthetixio/synpress";
import { metaMaskFixtures } from "@synthetixio/synpress/playwright";
import basicSetup from "../helpers/helpers_wallet.setup";
import { connectWallet } from "../helpers/helpers_connectWallet";
import { expect } from "@playwright/test";

const test = testWithSynpress(metaMaskFixtures(basicSetup));

test("Shared - Check Data Presence", async ({ page, metamask }) => {
  await connectWallet(page, metamask);
  await page.goto(
    "/dao/ethereum-mainnet-0xB2EcFF866C75c640F335AFbE5b09D5B03d464362/dashboard" // ethereum-mainnet DAO
  );
  //   await expect(page.locator("text=DAO Dashboard")).toBeVisible();
  await page.getByRole("banner").getByText("Proposals").click();
  await page.getByText("15", { exact: true }).click();
  await page.getByRole("banner").getByText("Members").click();
  await page.getByText("5", { exact: true }).click();
  await page.getByRole("banner").getByText("Treasury value").click();
  await page.getByText("$1.76M", { exact: true }).click();
  //   await expect(page.locator("text=Latest proposals")).toBeVisible();
});
