import { testWithSynpress } from "@synthetixio/synpress";
import { metaMaskFixtures } from "@synthetixio/synpress/playwright";
import basicSetup from "../helpers/wallet.setup";
import { expect } from "@playwright/test";

const test = testWithSynpress(metaMaskFixtures(basicSetup));

test("General Test - Check Data Presence Ethereum Sepolia", async ({
  page,
}) => {
  await page.goto(
    "/dao/ethereum-sepolia-0xdf52EFF5F79Fd476Acb255aD195D30D202A071De/dashboard" // ethereum-sepolia DAO using sppPlugin
  );
  // dashboard tab
  await expect(
    page.getByRole("button", { name: "ET E2E Test DAO (Ethereum Sepolia)" })
  ).toBeVisible();
  await expect(
    page.getByRole("banner").getByText("ET", { exact: true })
  ).toBeVisible();
  await expect(page.getByRole("banner").getByText("Proposals")).toBeVisible();
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^9Proposals$/ }) //bug, should be 5
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
  await expect(page.getByRole("banner").getByText("$")).toBeVisible();
  await expect(page.getByText("BlockchainEthereum Sepolia")).toBeVisible();
  await expect(page.getByText("Contract address0xdf…71De")).toBeVisible();
  await expect(page.getByText("Launched atFebruary")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Latest proposals" })
  ).toBeVisible();
  await page.getByRole("tab", { name: "Governance" }).click();
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
    page.getByRole("link", { name: /avatar Ether \$\d+\.\d{2} \d+\.\d{2} ETH/ })
  ).toBeVisible();
  await expect(
    page.getByRole("link", {
      name: /USDC \$\d+\.\d{2} \d+\.\d+ USDC/,
    })
  ).toBeVisible();
  await expect(
    page.getByRole("link", {
      name: /HIVE Token \$\d+\.\d{2} \d+ HIVE/,
    })
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Members" })).toBeVisible();
  await page.getByRole("tab", { name: "Token Voting" }).click();
  await expect(
    page.getByRole("link", { name: "avatar barukimang.eth 1M" })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "avatar cgero.eth 1 Voting" })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "avatar ea1.aragonx.eth 1" })
  ).toBeVisible();

  // proposals tab
  await page.getByRole("link", { name: "Proposals" }).click();
  await expect(page.getByRole("heading", { name: "Proposals" })).toBeVisible();
  await page.waitForTimeout(5000);
  await page.getByRole("tab", { name: "Governance" }).click();
  await expect(
    page.getByRole("link", { name: /Withdraw funds/i })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Edit settings/i })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Signalling proposal/i })
  ).toBeVisible();
  await expect(page.getByText("More3 of 3 Proposals")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Governance (GOV)" })
  ).toBeVisible();
  await expect(page.getByRole("tab", { name: "Contract" })).toBeVisible();
  await expect(page.getByText("PluginGovernance v1.80x25…5B22")).toBeVisible();
  await expect(page.getByText("LaunchedFebruary")).toBeVisible();
  await expect(page.getByRole("tab", { name: "Settings" })).toBeVisible();
  await page.getByRole("tab", { name: "Settings" }).click();
  await expect(page.getByText("Number of stages2")).toBeVisible();

  //proposal page
  await page.getByRole("link", { name: /Signalling proposal/i }).click();
  await expect(
    page.getByLabel("breadcrumbs").getByRole("link", { name: "Proposals" })
  ).toBeVisible();
  await expect(page.getByLabel("breadcrumbs").getByText("GOV-")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Signalling proposal" })
  ).toBeVisible();
  await expect(page.getByText("Signalling proposal").nth(1)).toBeVisible();
  await expect(page.getByRole("button", { name: "Share" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Details" })).toBeVisible();
  await expect(
    page
      .getByTestId("proposal-details-container")
      .locator("div")
      .filter({ hasText: "Onchain" })
  ).toBeVisible();
  await page.getByText("IDGOV-").click();
  await expect(page.getByText("February 19, 2025")).toBeVisible();
  await expect(page.getByText("Proposed bybarukimang.eth")).toBeVisible();
  await expect(page.getByText("StatusRejected")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Voting" })).toBeVisible();
  await expect(page.getByText("BreakdownVotesDetails")).toBeVisible();
  await expect(page.getByText("Yes0TVAbstain0TVNo0TV")).toBeVisible();
  await page.getByText("Support0%0of 0 TVMinimum").click();
  await page.getByRole("tab", { name: "Votes" }).click();
  await page.getByRole("tab", { name: "Details" }).click();
  await expect(page.getByText("Approval threshold> 50%")).toBeVisible();
  await expect(page.getByText("Minimum participation≥ 1")).toBeVisible();
  await expect(page.getByText("Minimum duration7 days 0")).toBeVisible();
  await expect(page.getByText("Early executionEnabled")).toBeVisible();
  await expect(page.getByText("Vote changeDisabled")).toBeVisible();
  await expect(page.getByText("Proposal thresholdMembers")).toBeVisible();
  await page
    .getByRole("button", { name: "Stage two Stage not reached Stage" })
    .click();
  await expect(page.getByText("No actions added")).toBeVisible();

  //members tab
  await page.getByRole("link", { name: "Members" }).click();
  await expect(page.getByRole("heading", { name: "Members" })).toBeVisible();
  await page.getByRole("tab", { name: "Multisig" }).click();
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
  await expect(page.getByText("PluginMultisig v1.50x43…")).toBeVisible();
  await expect(page.getByText("LaunchedFebruary")).toBeVisible();
  await page.getByRole("tab", { name: "Settings" }).click();
  await page.getByText("Eligible votersMultisig").click();
  await page.getByText("MembersSee 3 addressesView").click();

  //assets tab
  await page.getByRole("link", { name: "Assets" }).click();
  await expect(
    page.getByRole("link", { name: /avatar Ether \$\d+\.\d{2} \d+\.\d{2} ETH/ })
  ).toBeVisible();
  await expect(
    page.getByRole("link", {
      name: /USDC \$\d+\.\d{2} \d+\.\d+ USDC/,
    })
  ).toBeVisible();
  await expect(
    page.getByRole("link", {
      name: /HIVE Token \$\d+\.\d{2} \d+ HIVE/,
    })
  ).toBeVisible();
  await expect(page.getByText("More3 of 3 Assets")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Vault" })).toBeVisible();
  await expect(page.getByText("BlockchainEthereum Sepolia")).toBeVisible();
  await expect(page.getByText("Vault address0xdf…71De")).toBeVisible();

  //transactions tab
  await page.getByRole("link", { name: "Transactions" }).click();
  await expect(
    page.getByRole("link", {
      name: /Deposit February 19, 2025 at \d{2}:\d{2} 0\.12 ETH \$\d+\.\d{2}/,
    })
  ).toBeVisible();
  await expect(
    page.getByRole("link", {
      name: /Deposit February 19, 2025 at \d{2}:\d{2} 23 HIVE \$\d+\.\d{2}/,
    })
  ).toBeVisible();
  await expect(
    page.getByRole("link", {
      name: /Deposit February 19, 2025 at \d{2}:\d{2} 102\.3 USDC \$\d+\.\d{2}/,
    })
  ).toBeVisible();
  await expect(page.getByText("More3 of 3 Transactions")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Vault" })).toBeVisible();
  await expect(page.getByText("BlockchainEthereum Sepolia")).toBeVisible();
  await expect(page.getByText("Vault address0xdf…71De")).toBeVisible();

  //settings tab
  await page.getByRole("link", { name: "Settings", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Settings" })).toBeVisible();
  await expect(
    page.getByText("Proposal creationAdmin members").first()
  ).toBeVisible();
  await expect(
    page.getByText("Proposal executionAutomatic").first()
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "DAO" })).toBeVisible();
  await expect(
    page.getByText("NameE2E Test DAO (Ethereum Sepolia)ET")
  ).toBeVisible();
  await expect(page.getByText("BlockchainEthereum SepoliaNot")).toBeVisible();
  await expect(page.getByText("SummaryDAO generated for")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Governance" })).toBeVisible();
  await expect(
    page.getByText("Proposal creationAdmin members").nth(1)
  ).toBeVisible();
  await expect(
    page.getByText("Proposal executionAutomatic").nth(1)
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Members" })).toBeVisible();
  await page.getByRole("tab", { name: "Token Voting" }).click();
  await expect(page.getByText("Eligible votersToken holders")).toBeVisible();
  await expect(page.getByText("TokenToken Voting (TV)View")).toBeVisible();
  await expect(page.getByText("Distribution3 token")).toBeVisible();
  await expect(page.getByText("Supply1,000,002 TV")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Version Info" })
  ).toBeVisible();
  await expect(page.getByText(/Appv\d+\.\d+\.\d+/)).toBeVisible();
  await page.getByText("Operating systemAragon OSx v1").click();
  await expect(page.getByText("Operating systemAragon OSx v1")).toBeVisible();
  await expect(page.getByText("GovernanceAdmin v1.60x40…")).toBeVisible();
});
