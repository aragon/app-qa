import { defineWalletSetup } from '@synthetixio/synpress';
import { getExtensionId, MetaMask } from '@synthetixio/synpress/playwright';
import 'dotenv/config';

const SEED_PHRASE = process.env.METAMASK_SEED_PHRASE!;
const PASSWORD = process.env.METAMASK_PASSWORD!;

const walletSetup = defineWalletSetup(PASSWORD, async (context, walletPage) => {
    const extensionId = await getExtensionId(context, 'MetaMask');
    const metamask = new MetaMask(context, walletPage, PASSWORD, extensionId);
    await metamask.importWallet(SEED_PHRASE);
});

export default walletSetup;
