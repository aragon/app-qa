import { testWithSynpress } from '@synthetixio/synpress';
import { metaMaskFixtures } from '@synthetixio/synpress/playwright';
import basicSetup from '../../helpers/wallet.setup';
import { connectWallet } from '../../helpers/connectWallet';

const test = testWithSynpress(metaMaskFixtures(basicSetup));

test('General Test - Add Custom Proposal Action', async ({ page, metamask }) => {
    await connectWallet(page, metamask);
    await page.goto(
        '/dao/ethereum-sepolia-0xb724AcB4e77313F138BD87Bc17f39efb92Cf5863/dashboard', //adminPlugin DAO
    );
    await page.getByRole('link', { name: 'Proposals' }).click();
    await page.waitForTimeout(3000);
    await page
        .getByRole('button', { name: 'Proposal', exact: true })
        .or(page.getByRole('link', { name: 'Proposal', exact: true }))
        .click();
    await page.getByLabel('Proposal title').fill('Create proposal with custom action');
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByRole('button', { name: 'Custom' }).click();
    await page.getByPlaceholder('ENS or 0x…').fill('0x0b0e0c2e07324fd29e9b21d48af43c9a30f4c5da');

    await page.getByRole('button', { name: 'Add contract' }).click();
    await page.getByRole('option', { name: 'approve' }).first().click();
    await page.getByPlaceholder('address', { exact: true }).click();
    await page.getByPlaceholder('address', { exact: true }).fill('0x0b0e0c2e07324fd29e9b21d48af43c9a30f4c5da');
    await page.getByPlaceholder('uint256').click();
    await page.getByPlaceholder('uint256').fill('1000');
    await page.getByRole('button', { name: 'Publish proposal' }).click();
    await page.getByRole('button', { name: 'Approve transaction' }).click();
    await page.waitForTimeout(3000);
    await metamask.confirmTransaction();
    await page.waitForTimeout(3000);
    await page.getByRole('link', { name: 'View proposal' });
});
