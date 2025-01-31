import { testWithSynpress } from "@synthetixio/synpress";
import { metaMaskFixtures } from "@synthetixio/synpress/playwright";
import basicSetup from "../basic.setup";

const test = testWithSynpress(metaMaskFixtures(basicSetup));

test("Publish Signaling Proposal", async ({ page, metamask }) => {
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
  await page.waitForTimeout(10000);
  await metamask.switchNetwork("Sepolia", true);
  await page.goto(
    "/dao/ethereum-sepolia-0xB161EA70583f066cA00f62E9A749a9eBC1c807A8/dashboard" //sppPlugin DAO
  );
  await page.getByRole("link", { name: "Proposals" }).click();
  await page.getByRole("button", { name: "Proposal", exact: true }).click();
  await page.getByRole("button", { name: "Create" }).click();
  await page.getByPlaceholder("Type a title").click();
  await page.getByPlaceholder("Type a title").fill("Create proposal");
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByRole("button", { name: "Publish proposal" }).click();
  await page.getByRole("button", { name: "Approve transaction" }).click();
  await page.waitForTimeout(10000);
  await metamask.confirmTransaction();
  await page.waitForTimeout(10000);
  await page
    .getByRole("link", { name: "View proposal" })
    .click({ timeout: 10000 });
  await page.waitForTimeout(10000);
});
