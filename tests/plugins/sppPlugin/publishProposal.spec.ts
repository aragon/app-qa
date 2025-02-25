import { testWithSynpress } from "@synthetixio/synpress";
import { metaMaskFixtures } from "@synthetixio/synpress/playwright";
import basicSetup from "../../helpers/wallet.setup";
import { connectWallet } from "../../helpers/connectWallet";

const test = testWithSynpress(metaMaskFixtures(basicSetup));

test("Spp Plugin Test - Publish Proposal", async ({ page, metamask }) => {
  await connectWallet(page, metamask);
  await page.goto(
    "/dao/ethereum-sepolia-0x283f14c88d3b6eCab4903BE06AA18d7d2aDECD3a/dashboard" //sppPlugin DAO
  );
  await page.getByRole("link", { name: "Proposals" }).click();
  await page
    .getByRole("button", { name: "Proposal", exact: true })
    .or(page.getByRole("link", { name: "Proposal", exact: true }))
    .click();
  await page.waitForTimeout(10000);
  await page.getByRole("button", { name: "End To End ETE" }).click();
  await page.getByRole("button", { name: "Create" }).click();
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
