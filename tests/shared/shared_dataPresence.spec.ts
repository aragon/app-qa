import { testWithSynpress } from "@synthetixio/synpress";
import { metaMaskFixtures } from "@synthetixio/synpress/playwright";
import basicSetup from "../helpers/helpers_wallet.setup";
import { connectWallet } from "../helpers/helpers_connectWallet";
import { expect } from "@playwright/test";

const test = testWithSynpress(metaMaskFixtures(basicSetup));

test("Shared Test - Check Data Presence", async ({ page, metamask }) => {
  await connectWallet(page, metamask);
  await page.goto(
    "/dao/ethereum-mainnet-0xB2EcFF866C75c640F335AFbE5b09D5B03d464362/dashboard" // ethereum-mainnet DAO
  );
  await expect(
    page.getByRole("banner").getByRole("img", { name: "avatar" })
  ).toBeVisible();
  await expect(page.getByRole("banner").getByText("Proposals")).toBeVisible();
  await expect(page.getByRole("banner").getByText("Proposals")).toBeVisible();
  await expect(page.getByText("15", { exact: true })).toBeVisible();
  await expect(page.getByRole("banner").getByText("Members")).toBeVisible();
  await expect(page.getByText("5", { exact: true })).toBeVisible();
  await expect(
    page.getByRole("banner").getByText("Treasury value")
  ).toBeVisible();
  await expect(page.getByText("$1.76M", { exact: true })).toBeVisible();
  await expect(page.locator("text=Latest proposals")).toBeVisible();
});
