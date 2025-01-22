import { testWithSynpress } from "@synthetixio/synpress";
import { metaMaskFixtures } from "@synthetixio/synpress/playwright";
import basicSetup from "../basic.setup";

const test = testWithSynpress(metaMaskFixtures(basicSetup));

const { expect } = test;

test("Publish signaling Proposal", async ({ page, metamask }) => {
  // Use a relative URL. The baseURL will be automatically prepended.

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
  await page.getByRole("button", { name: "Connect" }).click();

  await page.getByRole("button", { name: "DAO" }).click();
  await page.getByRole("button", { name: "Get started" }).click();
  await page.getByLabel("Ethereum Sepolia").click();
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByPlaceholder("Type the DAO's name").click();
  await page.getByPlaceholder("Type the DAO's name").fill("E2E Test DAO");
  await page.getByRole("button", { name: "Publish DAO" }).click();
  await page.getByRole("button", { name: "Approve transaction" }).click();
  await page.waitForTimeout(10000);
  await metamask.confirmTransaction();
  await page.waitForTimeout(10000);
  await page.getByRole("link", { name: "View DAO" }).click({ timeout: 10000 });
  await page.waitForTimeout(10000);

  // await page.goto(
  //   // "/dao/ethereum-sepolia-0xAC592AbEEee8812C23375fff6621540e8b861328/dashboard" //multisig dao
  //   "/dao/ethereum-sepolia-0xB161EA70583f066cA00f62E9A749a9eBC1c807A8/dashboard" //spp dao
  // );
  // await page.getByRole("link", { name: "Proposals" }).click();
  // await page.waitForTimeout(10000);
  // try {
  //   await page.getByRole("button", { name: "Proposal" }).click();
  // } catch (e) {
  //   await page.getByRole("link", { name: "Proposal", exact: true }).click();
  // }
  // await page.getByRole("button", { name: "Create" }).click();
  // await page.getByPlaceholder("Type a title").click();
  // await page.getByPlaceholder("Type a title").fill("Create proposal");
  // await page.getByRole("button", { name: "Next" }).click();
  // await page.getByRole("button", { name: "Next" }).click();
  // await page.getByRole("button", { name: "Publish proposal" }).click();
  // await page.getByRole("button", { name: "Approve transaction" }).click();
  // await page.waitForTimeout(10000);
  // await metamask.confirmTransaction();
  // await page.waitForTimeout(10000);
  // await page
  //   .getByRole("link", { name: "View proposal" })
  //   .click({ timeout: 10000 });
  // await page.waitForTimeout(10000);
});
