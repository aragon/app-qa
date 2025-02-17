import { testWithSynpress } from "@synthetixio/synpress";
import { metaMaskFixtures } from "@synthetixio/synpress/playwright";
import basicSetup from "../../helpers/helpers_wallet.setup";
import { connectWallet } from "../../helpers/helpers_connectWallet";

const test = testWithSynpress(metaMaskFixtures(basicSetup));

test("Token Plugin Test - Publish Proposal", async ({ page, metamask }) => {
  await connectWallet(page, metamask);
  await page.goto(
    "/dao/ethereum-sepolia-0x71f0d013564499431d3b58e6cc97d041a6e31595/dashboard" //tokenPlugin DAO
  );
  await page.getByRole("link", { name: "Proposals" }).click();
  await page.getByRole("link", { name: "Proposal", exact: true }).click();
  await page.getByPlaceholder("Type a title").click();
  await page.getByPlaceholder("Type a title").fill("Create proposal");
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByRole("button", { name: "Publish proposal" }).click();
  await page.getByRole("button", { name: "Approve transaction" }).click();
  await page.waitForTimeout(3000);
  await metamask.confirmTransaction();
  await page.waitForTimeout(3000);
  await page.getByRole("link", { name: "View proposal" });
});
