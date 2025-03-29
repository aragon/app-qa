import { testWithSynpress } from '@synthetixio/synpress';
import { metaMaskFixtures } from '@synthetixio/synpress/playwright';
import basicSetup from '../../helpers/wallet.setup';
import { expect } from '@playwright/test';

const test = testWithSynpress(metaMaskFixtures(basicSetup));

test('General Test - Check Data Presence Ethereum Mainnet', async ({ page }) => {
    await page.goto(
        '/dao/ethereum-mainnet-0x18d5ea03c4a84F04aC9BabEeAC0DeF2a3362E92a/dashboard', // ethereum-mainnet DAO using tokenPlugin
    );
    // dashboard tab
    await expect(page.getByRole('button', { name: 'ET E2E Test DAO (Ethereum)' })).toBeVisible();
    await expect(page.getByRole('banner').getByText('ET', { exact: true })).toBeVisible();
    await expect(page.getByRole('banner').getByText('Proposals')).toBeVisible();
    await expect(
        page
            .locator('div')
            .filter({ hasText: /^3Proposals$/ })
            .locator('div'),
    ).toBeVisible();
    await expect(page.getByRole('banner').getByText('Members')).toBeVisible();
    await expect(
        page
            .locator('div')
            .filter({ hasText: /^3Members$/ })
            .locator('div'),
    ).toBeVisible();
    await expect(page.getByRole('banner').getByText('Treasury')).toBeVisible();
    await expect(page.locator('text=/\\$\\d+\\.\\d{2,}/')).toBeVisible();
    await expect(page.getByRole('button', { name: 'e2e-test.dao.eth' })).toBeVisible();
    await expect(page.getByText('ChainEthereum')).toBeVisible();
    await expect(page.getByText('DAO address0x18…E92a')).toBeVisible();
    await expect(page.getByText('ENSe2e-test.dao.eth')).toBeVisible();
    await expect(page.getByText('LaunchedFebruary')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Latest proposals' })).toBeVisible();
    await expect(page.getByRole('link', { name: /Signalling proposal/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Edit settings/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Withdraw funds/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Assets' })).toBeVisible();
    await expect(page.getByRole('link', { name: /avatar Ether \$\d+\.\d{2} \d+\.\d{2} ETH/ })).toBeVisible();
    await expect(
        page.getByRole('link', {
            name: /avatar Uniswap \$\d+\.\d{2} \d+\.\d{2} UNI/,
        }),
    ).toBeVisible();
    await expect(page.getByRole('link', { name: /avatar Rocket Pool ETH \$\d+\.\d{2}/ })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Members' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'avatar barukimang.eth 1M' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'avatar cgero.eth 1 Voting' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'avatar ea1.aragonx.eth 1' })).toBeVisible();

    // proposals tab
    await page.getByRole('link', { name: 'Proposals' }).click();
    await expect(page.getByRole('heading', { name: 'Proposals' })).toBeVisible();
    await expect(page.getByRole('link', { name: /Signalling proposal/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Edit settings/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Withdraw funds/i })).toBeVisible();
    await expect(page.getByText('More3 of 3 Proposals')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Token Voting (TOKENVOTING)' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Contract' })).toBeVisible();
    await expect(page.getByText('Plugin addressToken Voting v1')).toBeVisible();
    await expect(page.getByText('LaunchedFebruary')).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Settings' })).toBeVisible();
    await page.getByRole('tab', { name: 'Settings' }).click();
    await expect(page.getByText('Approval threshold> 50%')).toBeVisible();
    await expect(page.getByText('Minimum participation≥ 15')).toBeVisible();
    await expect(page.getByText('Minimum duration1 days 0')).toBeVisible();
    await expect(page.getByText('Early executionEnabled')).toBeVisible();
    await expect(page.getByText('Vote changeDisabled')).toBeVisible();
    await expect(page.getByText('Proposal thresholdMembers')).toBeVisible();

    //proposal page
    await page.getByRole('link', { name: /Signalling proposal/i }).click();
    await expect(page.getByLabel('breadcrumbs').getByRole('link', { name: 'Proposals' })).toBeVisible();
    await expect(page.getByLabel('breadcrumbs').getByText('TOKENVOTING-')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Signalling proposal' })).toBeVisible();
    await expect(page.getByText('Signalling proposal').nth(1)).toBeVisible();
    await expect(page.getByRole('button', { name: 'Share' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Details' })).toBeVisible();
    await expect(page.getByText('Onchain ID2')).toBeVisible();
    await expect(page.getByText('February 19, 2025')).toBeVisible();
    await expect(page.getByText('Proposed bybarukimang.eth')).toBeVisible();
    await expect(page.getByText('StatusRejected')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Voting' })).toBeVisible();
    await expect(page.getByText('BreakdownVotesDetails')).toBeVisible();
    await expect(page.getByText('Yes0E2ETTAbstain0E2ETTNo0E2ETT')).toBeVisible();
    await expect(page.getByText('Support0%0of 0 E2ETTMinimum')).toBeVisible();
    await page.getByRole('tab', { name: 'Votes' }).click();
    await page.getByRole('tab', { name: 'Details' }).click();
    await expect(page.getByText('Approval threshold> 50%')).toBeVisible();
    await expect(page.getByText('Minimum participation≥ 15')).toBeVisible();
    await expect(page.getByText('Minimum duration1 days 0')).toBeVisible();
    await expect(page.getByText('Early executionEnabled')).toBeVisible();
    await expect(page.getByText('Vote changeDisabled')).toBeVisible();
    await expect(page.getByText('Proposal thresholdMembers')).toBeVisible();
    await expect(page.getByText('No actions added')).toBeVisible();

    //members tab
    await page.getByRole('link', { name: 'Members' }).click();
    await expect(page.getByRole('heading', { name: 'Members' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'avatar barukimang.eth 1M' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'avatar cgero.eth 1 Voting' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'avatar ea1.aragonx.eth 1' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Token Voting' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Contract' })).toBeVisible();
    await expect(page.getByText('Plugin addressToken Voting v1')).toBeVisible();
    await expect(page.getByText('LaunchedFebruary')).toBeVisible();
    await page.getByRole('tab', { name: 'Settings' }).click();
    await expect(page.getByText('Eligible votersToken holders')).toBeVisible();
    await expect(page.getByText('TokenE2E Test Token (E2ETT)')).toBeVisible();
    await expect(page.getByText('Distribution3 token')).toBeVisible();
    await expect(page.getByText('Supply1,000,002 E2ETT')).toBeVisible();

    //assets tab
    await page.getByRole('link', { name: 'Assets' }).click();
    await expect(page.getByRole('link', { name: /avatar Ether \$\d+\.\d{2} \d+\.\d{2} ETH/ })).toBeVisible();
    await expect(
        page.getByRole('link', {
            name: /avatar Uniswap \$\d+\.\d{2} \d+\.\d{2} UNI/,
        }),
    ).toBeVisible();
    await expect(page.getByRole('link', { name: /avatar Rocket Pool ETH \$\d+\.\d{2}/ })).toBeVisible();
    await expect(page.getByText('More3 of 3 Assets')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Vault' })).toBeVisible();
    await expect(page.getByText('ChainEthereum')).toBeVisible();
    await expect(page.getByText('Vault address0x18…E92a')).toBeVisible();
    await expect(page.getByText('Vault ENSe2e-test.dao.eth')).toBeVisible();

    //transactions tab
    await page.getByRole('link', { name: 'Transactions' }).click();
    await expect(page.getByRole('link', { name: /Withdraw February 19, 2025 at/ })).toBeVisible();
    await expect(
        page.getByRole('link', {
            name: /Deposit February 19, 2025 at \d{2}:\d{2} 0\.00 RETH \$\d+\.\d{2}/,
        }),
    ).toBeVisible();
    await expect(
        page.getByRole('link', {
            name: /Deposit February 19, 2025 at \d{2}:\d{2} 0\.15 UNI \$\d+\.\d{2}/,
        }),
    ).toBeVisible();
    await expect(
        page.getByRole('link', {
            name: /Deposit February 19, 2025 at \d{2}:\d{2} 0\.00 ETH \$\d+\.\d{2}/,
        }),
    ).toBeVisible();
    await expect(page.getByText('More4 of 4 Transactions')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Vault' })).toBeVisible();
    await expect(page.getByText('ChainEthereum')).toBeVisible();
    await expect(page.getByText('Vault address0x18…E92a')).toBeVisible();
    await expect(page.getByText('Vault ENSe2e-test.dao.eth')).toBeVisible();

    //settings tab
    await page.getByRole('link', { name: 'Settings', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'DAO' })).toBeVisible();
    await expect(page.getByText('NameE2E Test DAO (Ethereum)ET')).toBeVisible();
    await expect(page.getByText('ChainEthereumNot')).toBeVisible();
    await expect(page.getByText('ENS namee2e-test.dao.eth0x18…')).toBeVisible();
    await expect(page.getByText('DescriptionDAO generated for')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Governance' })).toBeVisible();
    await expect(page.getByText('Approval threshold> 50%')).toBeVisible();
    await expect(page.getByText('Minimum participation≥ 15')).toBeVisible();
    await expect(page.getByText('Minimum duration1 days 0')).toBeVisible();
    await expect(page.getByText('Early executionEnabled')).toBeVisible();
    await expect(page.getByText('Vote changeDisabled')).toBeVisible();
    await expect(page.getByText('Proposal thresholdMembers')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Members' })).toBeVisible();
    await expect(page.getByText('Eligible votersToken holders')).toBeVisible();
    await expect(page.getByText('TokenE2E Test Token (E2ETT)')).toBeVisible();
    await expect(page.getByText('Distribution3 token')).toBeVisible();
    await expect(page.getByText('Supply1,000,002 E2ETT')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Version Info' })).toBeVisible();
    await page.getByText('Operating systemAragon OSx v1').click();
    await expect(page.getByText('Operating systemAragon OSx v1')).toBeVisible();
    await expect(page.getByText('GovernanceToken Voting v1.')).toBeVisible();
});
