import { defineWalletSetup } from '@synthetixio/synpress';
import { getExtensionId, MetaMask } from '@synthetixio/synpress/playwright';
import 'dotenv/config';

const SEED_PHRASE = process.env.METAMASK_SEED_PHRASE!;
const PASSWORD = process.env.METAMASK_PASSWORD!;

if (!SEED_PHRASE || !PASSWORD) {
    throw new Error('METAMASK_SEED_PHRASE and METAMASK_PASSWORD must be set in .env file');
}

const walletSetup = defineWalletSetup(PASSWORD, async (context, walletPage) => {
    const extensionId = await getExtensionId(context, 'MetaMask');
    const metamask = new MetaMask(context, walletPage, PASSWORD, extensionId);
    
    try {
        await metamask.importWallet(SEED_PHRASE);
    } catch (error) {
        throw new Error(`Failed to import MetaMask wallet: ${String(error)}`);
    }
});

export default walletSetup;
