import { testWithSynpress } from '@synthetixio/synpress';
import { metaMaskFixtures } from '@synthetixio/synpress/playwright';
import basicSetup from '../../helpers/wallet.setup';
import { connectWallet } from '../../helpers/connectWallet';

const test = testWithSynpress(metaMaskFixtures(basicSetup));

test('Spp Plugin Test - Publish, Approve, and Execute Proposal', async ({ page, metamask }) => {
    await connectWallet(page, metamask);
    await page.goto(
        '/dao/ethereum-sepolia-0x3177D5C67D33897fDd8FeC0579f4139ebF043412/dashboard', //sppPlugin DAO
    );
    await page.getByRole('link', { name: 'Proposals' }).click();
    await page.waitForTimeout(3000);
    await page
        .getByRole('button', { name: 'Proposal', exact: true })
        .or(page.getByRole('link', { name: 'Proposal', exact: true }))
        .click();
    await page.waitForTimeout(3000);
    await page.getByRole('button', { name: 'End To End ETE' }).first().click();
    await page.getByRole('button', { name: 'Create' }).click();
    await page.getByLabel('Proposal title').fill('Publish, Approve, and Execute Proposal');
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByRole('button', { name: 'Action' }).click();
    await page.getByRole('option', { name: 'Transfer' }).click();
    await page.getByLabel('Recipient').fill('0x3177D5C67D33897fDd8FeC0579f4139ebF043412');
    await page.getByRole('button', { name: 'Select' }).click();
    await page.getByRole('button', { name: 'Select' }).click({ force: true });
    await page.getByRole('button', { name: /USDC/ }).click();
    await page.getByPlaceholder('0', { exact: true }).click();
    await page.getByPlaceholder('0', { exact: true }).fill('0.01234');
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByRole('button', { name: 'Publish proposal' }).click();
    await page.getByRole('button', { name: 'Approve transaction' }).click();
    await page.waitForTimeout(3000);
    await metamask.confirmTransaction();
    await page.waitForTimeout(3000);
    await page.getByRole('link', { name: 'View proposal' }).click();
    await page.waitForTimeout(10000);
    await page.getByRole('tab', { name: 'End To End' }).first().click();
    await page
        .getByRole('link', { name: /Publish, Approve, and Execute Proposal/ })
        .first()
        .click();
    await page.waitForTimeout(3000);
    await page.getByRole('button', { name: 'Approve proposal' }).click();
    await page.getByRole('button', { name: 'Approve transaction' }).click();
    await page.waitForTimeout(3000);
    await metamask.confirmTransaction();
    await page.getByRole('button', { name: 'View proposal' }).click();
    await page.waitForTimeout(5000);
    await page.getByRole('button', { name: 'Execute' }).click();
    await page.getByRole('button', { name: 'Approve transaction' }).click();
    await page.waitForTimeout(3000);
    await metamask.confirmTransaction();
    await page.getByRole('button', { name: 'View proposal' }).click();
});
