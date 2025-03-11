import { testWithSynpress } from "@synthetixio/synpress";
import { metaMaskFixtures } from "@synthetixio/synpress/playwright";
import basicSetup from "../../helpers/wallet.setup";
import { connectWallet } from "../../helpers/connectWallet";

const test = testWithSynpress(metaMaskFixtures(basicSetup));

test("Token Plugin Test - Publish, Approve, and Execute Proposal", async ({
  page,
  metamask,
}) => {
  await connectWallet(page, metamask);
  await page.goto(
    "/dao/ethereum-sepolia-0x71f0d013564499431d3b58e6cc97d041a6e31595/dashboard" //tokenPlugin DAO
  );
  await page.getByRole("link", { name: "Proposals" }).click();
  await page.waitForTimeout(3000);
  await page
    .getByRole("button", { name: "Proposal", exact: true })
    .or(page.getByRole("link", { name: "Proposal", exact: true }))
    .click();
  await page
    .getByLabel("Summary")
    .fill("0xf2Fe4187dA24181C03CdB3cb59C52Cfc45AF8D9f");
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByRole("button", { name: "Action" }).click();
  await page.getByRole("option", { name: "Transfer" }).click();
  await page
    .getByLabel("Recipient")
    .fill("0xf2Fe4187dA24181C03CdB3cb59C52Cfc45AF8D9f");
  await page.getByRole("button", { name: "Select" }).click();
  await page.getByRole("button", { name: "Select" }).click({ force: true });
  await page.getByRole("button", { name: /ETH/ }).click();
  await page.getByPlaceholder("0", { exact: true }).click();
  await page.getByPlaceholder("0", { exact: true }).fill("0.01234");
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByRole("button", { name: "Publish proposal" }).click();
  await page.getByRole("button", { name: "Approve transaction" }).click();
  await page.waitForTimeout(3000);
  await metamask.confirmTransaction();
  await page.waitForTimeout(3000);
  await page.getByRole("link", { name: "View proposal" }).click();
  await page.waitForTimeout(10000);
  await page
    .getByRole("link", { name: /Publish, Approve, and Execute Proposal/ })
    .first()
    .click();
  await page.waitForTimeout(3000);
  await page.getByRole("button", { name: "Vote on proposal" }).click();
  await page.getByLabel("Yes").click();
  await page.getByRole("button", { name: "Submit vote" }).click();
  await page.getByRole("button", { name: "Approve transaction" }).click();
  await page.waitForTimeout(3000);
  await metamask.confirmTransaction();
  await page.getByRole("button", { name: "View proposal" }).click();
  await page.waitForTimeout(3000);
  await page.getByRole("button", { name: "Execute" }).click();
  await page.getByRole("button", { name: "Approve transaction" }).click();
  await page.waitForTimeout(3000);
  await metamask.confirmTransaction();
  await page.getByRole("button", { name: "View proposal" }).click();
});
