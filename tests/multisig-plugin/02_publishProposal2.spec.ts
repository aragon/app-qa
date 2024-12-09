import { testWithMetaMask as test } from "../testWithMetaMask";

test("Publish signaling Proposal", async ({ page, metamask }) => {
  // Use a relative URL. The baseURL will be automatically prepended.
  await page.goto(
    "/dao/ethereum-sepolia-0xAC592AbEEee8812C23375fff6621540e8b861328/dashboard"
  );

  await page.getByRole("button", { name: "Connect" }).click();
  await page.getByRole("button", { name: "Connect" }).click();
  await page.waitForTimeout(3000);
  await page.getByRole("button", { name: "MetaMask MetaMask" }).click();
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
