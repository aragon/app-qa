// import { testWithMetaMask as test } from "../testWithMetaMask";
import { testWithSynpress } from "@synthetixio/synpress";
import { MetaMask, metaMaskFixtures } from "@synthetixio/synpress/playwright";
import basicSetup from "../basic.setup";

const test = testWithSynpress(metaMaskFixtures(basicSetup));

const { expect } = test;

// test("should connect wallet to the MetaMask Test Dapp", async ({
//   context,
//   page,
//   metamaskPage,
//   extensionId,
// }) => {
//   const metamask = new MetaMask(
//     context,
//     metamaskPage,
//     basicSetup.walletPassword,
//     extensionId
//   );

//   await page.goto("/");

//   await page.locator("#connectButton").click();
//   await metamask.connectToDapp();
//   await expect(page.locator("#accounts")).toHaveText(
//     "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"
//   );

//   await page.locator("#getAccounts").click();
//   await expect(page.locator("#getAccountsResult")).toHaveText(
//     "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"
//   );
// });

test("Publish signaling Proposal", async ({ page, metamask }) => {
  // Use a relative URL. The baseURL will be automatically prepended.
  await page.goto(
    "/dao/ethereum-sepolia-0xAC592AbEEee8812C23375fff6621540e8b861328/dashboard"
  );

  await page.getByRole("button", { name: "Connect" }).click();
  await page.waitForTimeout(3000);
  await page.getByRole("button", { name: "Connect" }).click();
  // await page.waitForTimeout(3000);
  // await page.getByRole("button", { name: "MetaMask MetaMask" }).click();
  // await page
  //   .getByRole("button", { name: "MetaMask MetaMask" })
  //   .click({ timeout: 5000 });
  await page
    .locator("wui-text")
    .filter({ hasText: "MetaMask" })
    .locator("slot")
    .click();
  await metamask.connectToDapp();

  await page.getByRole("link", { name: "Proposals" }).click();
  await page.getByRole("link", { name: "Proposal", exact: true }).click();
  await page.getByPlaceholder("Type a title").click();
  await page.getByPlaceholder("Type a title").fill("Create proposal");
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByRole("button", { name: "Publish proposal" }).click();
  await page.getByRole("button", { name: "Approve transaction" }).click();
  await metamask.confirmTransaction();
});
