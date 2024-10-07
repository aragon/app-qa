import { LOCALHOST_URL } from "../basic.setup";
import { testWithMetaMask as test } from "../testWithMetaMask";

// import { test, expect } from '@playwright/test';

// test("test", async ({ page }) => {
test("Publish signaling Proposal", async ({
  context,
  page,
  extensionId,
  metamask,
}) => {
  await page.goto(
    "http://localhost:3000/dao/ethereum-sepolia-0xAC592AbEEee8812C23375fff6621540e8b861328/dashboard"
    // "http://dev-app-next.vercel.app/dao/ethereum-sepolia-0xAC592AbEEee8812C23375fff6621540e8b861328/dashboard"
  );
  await page.getByRole("button", { name: "Connect" }).click();
  await page.getByRole("button", { name: "Connect" }).click();
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
  // await page.getByRole("button", { name: "View proposal" }).click();
  //add approve
});
