import { defineWalletSetup } from '@synthetixio/synpress';
import { getExtensionId, MetaMask } from '@synthetixio/synpress/playwright';
import 'dotenv/config';
import { networkDefinitions } from '../helpers';

const SEED_PHRASE = process.env.METAMASK_SEED_PHRASE!;
const PASSWORD = process.env.METAMASK_PASSWORD!;

const walletSetup = defineWalletSetup(PASSWORD, async (context, walletPage) => {
    const extensionId = await getExtensionId(context, 'MetaMask');
    const metamask = new MetaMask(context, walletPage, PASSWORD, extensionId);
    await metamask.importWallet(SEED_PHRASE);

    const walletSetupList = Object.values(networkDefinitions).filter((network) => network.needsSetup);

    for (const walletDefinitions of walletSetupList) {
        const { name, id: chainId, nativeCurrency, rpcUrls, blockExplorers } = walletDefinitions;

        const { symbol } = nativeCurrency;
        const [rpcUrl] = rpcUrls.default.http;
        const { url: blockExplorerUrl } = blockExplorers!.default;

        await metamask.addNetwork({ name, chainId, symbol, rpcUrl, blockExplorerUrl });
    }
});

export default walletSetup;
