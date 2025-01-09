// import { defineWalletSetup } from "@synthetixio/synpress-cache";
// import { MetaMask } from "@synthetixio/synpress";

// // Define a test seed phrase and password
// export const SEED_PHRASE =
//   "test test test test test test test test test test test junk";
// export const PASSWORD = "Tester@1234";

// // Define the basic wallet setup
// export default defineWalletSetup(PASSWORD, async (context, walletPage) => {
//   // Create a new MetaMask instance
//   const metamask = new MetaMask(context, walletPage, PASSWORD);

//   // Import the wallet using the seed phrase
//   await metamask.importWallet(SEED_PHRASE);

//   // Additional setup steps can be added here, such as:
//   // - Adding custom networks
//   // - Importing tokens
//   // - Setting up specific account states
// });

// import { testWithSynpress } from '@synthetixio/synpress'
// import { MetaMask, metaMaskFixtures } from '@synthetixio/synpress/playwright'
// import basicSetup from './wallet-setup/basic.setup'

// const test = testWithSynpress(metaMaskFixtures(basicSetup))

// const { expect } = test

// test('should connect wallet to the MetaMask Test Dapp', async ({ context, page, metamaskPage, extensionId }) => {
//   const metamask = new MetaMask(context, metamaskPage, basicSetup.walletPassword, extensionId)

//   await page.goto('/')

//   await page.locator('#connectButton').click()
//   await metamask.connectToDapp()
//   await expect(page.locator('#accounts')).toHaveText('0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266')

//   await page.locator('#getAccounts').click()
//   await expect(page.locator('#getAccountsResult')).toHaveText('0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266')
// })

// import {
//   MetaMask,
//   defineWalletSetup,
//   getExtensionId,
// } from "@synthetixio/synpress";
// import "dotenv/config";

// export const LOCALHOST_URL = "http://localhost:3000";

// const SEED_PHRASE = process.env.METAMASK_SEED_PHRASE!;
// const PASSWORD = process.env.METAMASK_PASSWORD!;

// export default defineWalletSetup(PASSWORD, async (context, walletPage) => {
//   // This is a workaround for the fact that the MetaMask extension ID changes, and this ID is required to detect the pop-ups.
//   // It won't be needed in the near future! 😇
//   const extensionId = await getExtensionId(context, "MetaMask");

//   const metamask = new MetaMask(context, walletPage, PASSWORD, extensionId);

//   await metamask.importWallet(SEED_PHRASE);

//   await metamask.switchNetwork("Sepolia", true);
// });

import { defineWalletSetup } from "@synthetixio/synpress";
import { MetaMask } from "@synthetixio/synpress/playwright";
import "dotenv/config";

const SEED_PHRASE = process.env.METAMASK_SEED_PHRASE!;
const PASSWORD = process.env.METAMASK_PASSWORD!;

export default defineWalletSetup(PASSWORD, async (context, walletPage) => {
  const metamask = new MetaMask(context, walletPage, PASSWORD);

  await metamask.importWallet(SEED_PHRASE);

  // await metamask.addNetwork("Arbitrum");
  await metamask.addNetwork({
    name: "Arbitrum One",
    rpcUrl: "https://arb1.arbitrum.io/rpc",
    chainId: 42161,
    symbol: "ETH",
    blockExplorerUrl: "https://arbiscan.io",
  });

  await metamask.switchNetwork("Sepolia", true);
});
