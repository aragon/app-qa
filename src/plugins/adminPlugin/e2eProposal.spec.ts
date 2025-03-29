import { testWithSynpress } from '@synthetixio/synpress';
import { metaMaskFixtures } from '@synthetixio/synpress/playwright';
import basicSetup from '../../helpers/wallet.setup';
import { connectWallet } from '../../helpers/connectWallet';

const test = testWithSynpress(metaMaskFixtures(basicSetup));

test('Admin Plugin Test - Publish, and Execute Proposal', async ({ page, metamask }) => {
    await connectWallet(page, metamask);
    await page.goto(
        '/dao/ethereum-sepolia-0x4Dff745Ea1Ba6021b166E3D77bE2714C8e2d4f10/dashboard', //adminPlugin DAO
    );
    await page.getByRole('link', { name: 'Proposals' }).click();
    await page.waitForTimeout(3000);
    await page
        .getByRole('button', { name: 'Proposal', exact: true })
        .or(page.getByRole('link', { name: 'Proposal', exact: true }))
        .click();
    await page.getByLabel('Proposal title').fill('Publish and Execute Proposal');
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByRole('button', { name: 'Action' }).click();
    await page.getByRole('option', { name: 'Transfer' }).click();
    await page.getByLabel('Recipient').fill('0x4Dff745Ea1Ba6021b166E3D77bE2714C8e2d4f10');
    await page.getByRole('button', { name: 'Select' }).click();
    await page.getByRole('button', { name: 'Select' }).click({ force: true });
    await page.getByRole('button', { name: /USDC/ }).click();
    await page.getByPlaceholder('0', { exact: true }).click();
    await page.getByPlaceholder('0', { exact: true }).fill('0.01234');
    await page.getByRole('button', { name: 'Publish proposal' }).click();
    await page.getByRole('button', { name: 'Approve transaction' }).click();
    await page.waitForTimeout(3000);
    await metamask.confirmTransaction();
    await page.getByRole('link', { name: 'View proposal' }).click();
});
