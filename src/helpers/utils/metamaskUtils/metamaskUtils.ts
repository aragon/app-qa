import type { MetaMask } from '@synthetixio/synpress/playwright';
import { networkDefinitions } from '../../constants';
import type { Network } from '../../types';

class MetamaskUtils {
    confirmTransaction = async (metamask: MetaMask, network: Network) => {
        const { needsSetup } = networkDefinitions[network];

        if (needsSetup) {
            await metamask.approveNewNetwork();
        }

        await metamask.approveSwitchNetwork();

        // Wait for a short timeout before confirming the transaction because synpress does not handle this properly
        // eslint-disable-next-line playwright/no-wait-for-timeout
        await metamask.page.waitForTimeout(1_000);

        await metamask.confirmTransaction();
    };
}

export const metamaskUtils = new MetamaskUtils();
