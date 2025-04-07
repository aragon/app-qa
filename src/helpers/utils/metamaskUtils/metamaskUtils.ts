/* eslint-disable playwright/no-wait-for-timeout */
import type { MetaMask } from '@synthetixio/synpress/playwright';
import { networkDefinitions } from '../../constants';
import type { Network } from '../../types';

class MetamaskUtils {
    private actionTimeout = 1_000;

    confirmTransaction = async (metamask: MetaMask, network: Network) => {
        const { needsSetup } = networkDefinitions[network];

        if (needsSetup) {
            await metamask.approveNewNetwork();
        }

        // Wait for a short timeout before switch-network and approve-transaction actions because Synpress does not
        // handle this properly
        await metamask.page.waitForTimeout(this.actionTimeout);
        await metamask.approveSwitchNetwork();

        await metamask.page.waitForTimeout(this.actionTimeout);
        await metamask.confirmTransaction();
    };
}

export const metamaskUtils = new MetamaskUtils();
