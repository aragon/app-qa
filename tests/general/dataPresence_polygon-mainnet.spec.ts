import { testWithSynpress } from "@synthetixio/synpress";
import { metaMaskFixtures } from "@synthetixio/synpress/playwright";
import basicSetup from "../helpers/wallet.setup";
import { expect } from "@playwright/test";

const test = testWithSynpress(metaMaskFixtures(basicSetup));

test("General Test - Check Data Presence Polygon Mainnet", async ({ page }) => {
  await page.goto(
    "/dao/polygon-mainnet-0x71a363934240841c0a0f467e2fa4187199adb4d3/dashboard" // poygon-mainnet DAO
  );
  // dashboard tab
  await expect(
    page.getByRole("button", { name: "ET E2E Test DAO (Polygon)" })
  ).toBeVisible();
  await expect(
    page.getByRole("banner").getByText("ET", { exact: true })
  ).toBeVisible();
  await expect(page.getByRole("banner").getByText("Proposals")).toBeVisible();
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^1Proposals$/ })
      .locator("div")
  ).toBeVisible();
  await expect(page.getByRole("banner").getByText("Members")).toBeVisible();
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^3Members$/ })
      .locator("div")
  ).toBeVisible();
  await expect(
    page.getByRole("banner").getByText("Treasury value")
  ).toBeVisible();
  await expect(page.locator("text=/\\$\\d+\\.\\d{2,}/")).toBeVisible();
  await expect(page.getByRole("button", { name: "0x71…B4D3" })).toBeVisible();
  await expect(page.getByText("BlockchainPolygon")).toBeVisible();
  await expect(page.getByText("Contract address0x71…B4D3")).toBeVisible();
  await expect(page.getByText("Launched atFebruary")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Latest proposals" })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Signalling proposal/i })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Edit settings/i })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Withdraw funds/i })
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Top assets" })).toBeVisible();
  await expect(
    page.getByRole("link", { name: /avatar USDC \$\d+\.\d{2} 1\.23 USDC/ })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Polygon Ecosystem Token \$\d+\.\d{2}/ })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /avatar SporkDAO \$\d+\.\d{2} 2 SPORK/ })
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Members" })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "avatar barukimang.eth" })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "avatar cgero.eth" })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "avatar ea1.aragonx.eth" })
  ).toBeVisible();

  // proposals tab
  await page.getByRole("link", { name: "Proposals" }).click();
  await expect(page.getByRole("heading", { name: "Proposals" })).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Signalling proposal/i })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Edit settings/i })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Withdraw funds/i })
  ).toBeVisible();
  await expect(page.getByText("More3 of 3 Proposals")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Multisig (MULTISIG)" })
  ).toBeVisible();
  await expect(page.getByRole("tab", { name: "Contract" })).toBeVisible();
  await expect(page.getByText("PluginMultisig v1.20x1E…")).toBeVisible();
  await expect(page.getByText("LaunchedFebruary")).toBeVisible();
  await expect(page.getByRole("tab", { name: "Settings" })).toBeVisible();
  await page.getByRole("tab", { name: "Settings" }).click();
  await page.getByText("Minimum approval1 of 3").click();
  await page.getByText("Proposal creationMultisig").click();

  //proposal page
  await page.getByRole("link", { name: /Signalling proposal/i }).click();
  await expect(
    page.getByLabel("breadcrumbs").getByRole("link", { name: "Proposals" })
  ).toBeVisible();
  await expect(
    page.getByLabel("breadcrumbs").getByText("MULTISIG-")
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Signalling proposal" })
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Share" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Details" })).toBeVisible();
  await expect(page.getByText("Onchain ID2")).toBeVisible();
  await page.getByText("IDMULTISIG-").click();
  // await expect(page.getByText("March 5, 2025")).toBeVisible();
  await expect(page.getByText("Proposed bybarukimang.eth")).toBeVisible();
  // await expect(page.getByText("StatusRejected")).toBeVisible();
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^Minimum Approval1of 1 members$/ })
      .first()
  ).toBeVisible();
  await page.getByRole("tab", { name: "Votes" }).click();
  await expect(
    page.getByRole("link", { name: "avatar barukimang.eth Voted" })
  ).toBeVisible();
  await expect(page.getByText("More1 of 1 Votes")).toBeVisible();
  await page.getByRole("tab", { name: "Details" }).click();
  await expect(page.getByLabel("Details")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Actions" })).toBeVisible();
  await expect(page.getByText("The following actions will")).toBeVisible();
  await expect(page.locator(".grid > div").first()).toBeVisible();

  //members tab
  await page.getByRole("link", { name: "Members" }).click();
  await expect(page.getByRole("heading", { name: "Members" })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "avatar barukimang.eth" })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "avatar cgero.eth" })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "avatar ea1.aragonx.eth" })
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Multisig" })).toBeVisible();
  await expect(page.getByRole("tab", { name: "Contract" })).toBeVisible();
  await expect(page.getByText("PluginMultisig v1.20x1E…")).toBeVisible();
  await expect(page.getByText("LaunchedFebruary")).toBeVisible();
  await page.getByRole("tab", { name: "Settings" }).click();
  await expect(page.getByText("Eligible votersMultisig members")).toBeVisible();
  await expect(page.getByText("MembersSee 3 addressesView")).toBeVisible();

  //assets tab
  await page.getByRole("link", { name: "Assets" }).click();
  await expect(
    page.getByRole("link", { name: /avatar USDC \$\d+\.\d{2} 1\.23 USDC/ })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Polygon Ecosystem Token \$\d+\.\d{2}/ })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /avatar SporkDAO \$\d+\.\d{2} 2 SPORK/ })
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Vault" })).toBeVisible();
  await expect(page.getByText("BlockchainPolygon")).toBeVisible();
  await expect(page.getByText("Vault address0x71…B4D3")).toBeVisible();

  //transactions tab
  await page.getByRole("link", { name: "Transactions" }).click();
  await expect(
    page.getByRole("link", {
      name: /Deposit February 19, 2025 at 14:43 2 SPORK \$\d+\.\d{2}/,
    })
  ).toBeVisible();

  await expect(
    page.getByRole("link", {
      name: /Deposit February 19, 2025 at 14:42 0\.25 POL \$\d+\.\d{2}/,
    })
  ).toBeVisible();

  await expect(
    page.getByRole("link", {
      name: /Deposit February 19, 2025 at 14:42 1\.23 USDC \$\d+\.\d{2}/,
    })
  ).toBeVisible();
  await expect(page.getByText("More3 of 3 Transactions")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Vault" })).toBeVisible();
  await expect(page.getByText("BlockchainPolygon")).toBeVisible();
  await expect(page.getByText("Vault address0x71…B4D3")).toBeVisible();

  //settings tab
  await page.getByRole("link", { name: "Settings", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Settings" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "DAO" })).toBeVisible();
  await expect(page.getByText("NameE2E Test DAO (Polygon)ET")).toBeVisible();
  await expect(page.getByText("BlockchainPolygonNot")).toBeVisible();
  await expect(page.getByText("SummaryDAO generated for")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Governance" })).toBeVisible();
  await expect(page.getByText("Minimum approval1 of 3")).toBeVisible();
  await expect(page.getByText("Proposal creationMultisig")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Members" })).toBeVisible();
  await expect(page.getByText("Eligible votersMultisig")).toBeVisible();
  await expect(page.getByText("MembersSee 3 addressesView")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Version Info" })
  ).toBeVisible();
  await expect(page.getByText(/Appv\d+\.\d+\.\d+ \(DEV\)/)).toBeVisible();
  await expect(page.getByText("Operating systemAragon OSx v1")).toBeVisible();
  await expect(page.getByText("GovernanceMultisig v1.20x1E…")).toBeVisible();
});
