import { testWithSynpress } from "@synthetixio/synpress";
import { metaMaskFixtures } from "@synthetixio/synpress/playwright";
import basicSetup from "../basic.setup";

const test = testWithSynpress(metaMaskFixtures(basicSetup));

const { expect } = test;

test("Create Governance Process", async ({ page, metamask }) => {
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
    "/dao/ethereum-sepolia-0x08c69bADB0E2A175CE1553133d293f07C60DD0E1/dashboard" //spp dao
  );
  await page.getByRole("button", { name: "Add Governance" }).click();
  await page.getByRole("button", { name: "Get Started" }).click();
  await page.getByPlaceholder("Type a name").click();
  await page.getByPlaceholder("Type a name").fill("End To End");
  await page.getByPlaceholder("Type an key").click();
  await page.getByPlaceholder("Type an key").fill("ETE");
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByPlaceholder("Type a name").click();
  await page.getByPlaceholder("Type a name").fill("process stage");
  await page.getByRole("button", { name: "Add", exact: true }).click();
  await page.getByLabel("Multisig").click();
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByLabel("Name", { exact: true }).click();
  await page.getByLabel("Name", { exact: true }).fill("Multisig");
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByRole("button", { name: "Save" }).click();
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByRole("button", { name: "Publish process" }).click();
  await page.getByRole("button", { name: "Approve transaction" }).click();
  await page.waitForTimeout(10000);
  await metamask.confirmTransaction();
  await page.waitForTimeout(10000);
  await page.getByRole("button", { name: "Finalize installation" }).click();
  await page.getByRole("button", { name: "Approve transaction" }).click();
  await page.waitForTimeout(10000);
  await metamask.confirmTransaction();
  await page.waitForTimeout(20000);
  await page
    .getByRole("link", { name: "View proposal" })
    .click({ timeout: 10000 });
  await page.waitForTimeout(10000);
});
