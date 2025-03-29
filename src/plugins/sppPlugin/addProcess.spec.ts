import { testWithSynpress } from '@synthetixio/synpress';
import { metaMaskFixtures } from '@synthetixio/synpress/playwright';
import basicSetup from '../../helpers/wallet.setup';
import { connectWallet } from '../../helpers/connectWallet';

const test = testWithSynpress(metaMaskFixtures(basicSetup));

test('Spp Plugin Test - Create Governance Process', async ({ page, metamask }) => {
    await connectWallet(page, metamask);
    await page.goto(
        '/dao/ethereum-sepolia-0x3177D5C67D33897fDd8FeC0579f4139ebF043412/dashboard', //spp dao
    );
    await page.getByRole('button', { name: 'Add Governance' }).click();
    await page.getByRole('link', { name: 'Get started' }).click();
    await page.getByLabel('Process name').fill('End To End');
    await page.getByLabel('Key').fill('ETE');
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByLabel('Stage name').fill('Stage one');
    await page.getByRole('button', { name: 'Add body', exact: true }).click();
    await page.getByLabel('Multisig').click();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByLabel('Body name', { exact: true }).fill('Multisig');
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByRole('button', { name: 'Save' }).click();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByRole('button', { name: 'Publish process' }).click();
    await page.getByRole('button', { name: 'Approve transaction' }).click();
    await page.waitForTimeout(3000);
    await metamask.confirmTransaction();
    await page.waitForTimeout(10000);
    await page.getByRole('button', { name: 'Finalize installation' }).click();
    await page.getByRole('button', { name: 'Approve transaction' }).click();
    await page.waitForTimeout(3000);
    await metamask.confirmTransaction();
    await page.waitForTimeout(3000);
    await page.getByRole('link', { name: 'View proposal' }).click();
});
