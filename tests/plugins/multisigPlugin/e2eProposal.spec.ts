import { testWithSynpress } from "@synthetixio/synpress";
import { metaMaskFixtures } from "@synthetixio/synpress/playwright";
import basicSetup from "../../helpers/wallet.setup";
import { connectWallet } from "../../helpers/connectWallet";

const test = testWithSynpress(metaMaskFixtures(basicSetup));

test("Multisig Plugin Test - Publish, Approve, and Execute Proposal", async ({
  page,
  metamask,
}) => {
  await connectWallet(page, metamask);
  await page.goto(
    "/dao/ethereum-sepolia-0x2dd2cbe4578186c4e94d631b93140b8d958859fe/dashboard" //multisigPlugin DAO
  );
  await page.getByRole("link", { name: "Proposals" }).click();
  await page.waitForTimeout(3000);
  await page
    .getByRole("button", { name: "Proposal", exact: true })
    .or(page.getByRole("link", { name: "Proposal", exact: true }))
    .click();
  await page.getByPlaceholder("Type a title").click();
  await page
    .getByPlaceholder("Type a title")
    .fill("Publish, Approve, and Execute Proposal");
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByRole("button", { name: "Action" }).click();
  await page.getByRole("option", { name: "Transfer" }).click();
  await page.getByPlaceholder("ENS or 0x …").click();
  await page
    .getByPlaceholder("ENS or 0x …")
    .fill("0x8D0FE64D5f18c99f6aa309d5e503dCc298784865");
  await page.getByRole("button", { name: "Select" }).click();
  await page.getByRole("button", { name: "Select" }).click({ force: true });
  await page.getByRole("button", { name: /USDC/ }).click();
  await page.getByPlaceholder("0", { exact: true }).click();
  await page.getByPlaceholder("0", { exact: true }).fill("1.234");
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
  await page.getByRole("button", { name: "Approve proposal" }).click();
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
