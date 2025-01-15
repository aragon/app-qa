// import { testWithMetaMask as test } from "../testWithMetaMask";
import { testWithSynpress } from "@synthetixio/synpress";
import { MetaMask, metaMaskFixtures } from "@synthetixio/synpress/playwright";
import basicSetup from "../basic.setup";

const test = testWithSynpress(metaMaskFixtures(basicSetup));

const { expect } = test;

test("Publish signaling Proposal", async ({ page, metamask }) => {
  // Use a relative URL. The baseURL will be automatically prepended.
  await page.goto(
    // "/dao/ethereum-sepolia-0xAC592AbEEee8812C23375fff6621540e8b861328/dashboard" //multisig dao
    "/dao/ethereum-sepolia-0xB161EA70583f066cA00f62E9A749a9eBC1c807A8/dashboard" //spp dao
  );

  await page.getByRole("button", { name: "Connect" }).click();
  await page.waitForTimeout(3000);
  await page.getByRole("button", { name: "Connect" }).click();
  //   .getByRole("button", { name: "MetaMask MetaMask" })
  //   .click({ timeout: 5000 });
  await page
    .locator("wui-text")
    .filter({ hasText: "MetaMask" })
    .locator("slot")
    .click();
  await metamask.connectToDapp();
  await metamask.approveNewNetwork();
  await metamask.approveSwitchNetwork();
  // await metamask.approveSwitchNetwork();
  await metamask.switchNetwork("Sepolia", true);

  await page.getByRole("link", { name: "Proposals" }).click();
  await page.getByRole("button", { name: "Proposal" }).click();
  await page.getByRole("button", { name: "Create" }).click();
  await page.getByPlaceholder("Type a title").click();
  await page.getByPlaceholder("Type a title").fill("Create proposal");
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByRole("button", { name: "Publish proposal" }).click();
  await page.getByRole("button", { name: "Approve transaction" }).click();
  await metamask.confirmTransaction();
  await page.waitForTimeout(30000);
  await page.getByRole("link", { name: "View proposal" }).click();
  // await page.waitForTimeout(3000);
  // await page
  //   .getByRole("link", { name: "View proposal" })
  //   .click({ timeout: 5000 });
});
