import type { MetaMask } from '@synthetixio/synpress/playwright';
import { networkDefinitions } from '../../constants';
import type { Network } from '../../types';
import { Page } from '../page';

export class WalletConnectionPage extends Page {
    connectWallet = async (metamask: MetaMask, network: Network) => {
        const { name, testnet, metamaskName } = networkDefinitions[network];
        const networkName = metamaskName ?? name;

        await this.openConnectDialog();
        await this.openWeb3ConnectDialog();
        await this.approveTemsOfCondition();

        await this.selectWallet('MetaMask');

        await metamask.connectToDapp();
        await metamask.approveSwitchNetwork();
        await metamask.switchNetwork(networkName, testnet);
    };

    private openConnectDialog = () => this.page.getByRole('button', { name: 'Connect' }).click();

    private openWeb3ConnectDialog = () =>
        this.page.getByRole('dialog').getByRole('button', { name: 'Connect' }).click();

    private approveTemsOfCondition = () => this.page.getByTestId('wui-checkbox').locator('span').click();

    private selectWallet = (wallet: string) =>
        this.page.locator('wui-text').filter({ hasText: wallet }).locator('slot').click();
}
