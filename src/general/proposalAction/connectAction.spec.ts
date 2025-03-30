import { testWithSynpress } from '@synthetixio/synpress';
import { metaMaskFixtures } from '@synthetixio/synpress/playwright';
import basicSetup from '../../helpers/wallet.setup';
import { connectWallet } from '../../helpers/connectWallet';

const test = testWithSynpress(metaMaskFixtures(basicSetup));

test('General Test - Add Connect Proposal Action', async ({ page, context, metamask }) => {
    await connectWallet(page, metamask);
    await page.goto(
        '/dao/ethereum-sepolia-0x9ef1877684605b94c8c1fee6b7c2de0c9e0c6a27/dashboard', //multisigPlugin DAO
    );
    await page.getByRole('link', { name: 'Proposals' }).click();
    await page.waitForTimeout(3000);
    await page
        .getByRole('button', { name: 'Proposal', exact: true })
        .or(page.getByRole('link', { name: 'Proposal', exact: true }))
        .click();
    await page.getByLabel('Proposal title').fill('Create proposal with connect action');
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByRole('button', { name: 'Connect' }).click();

    await context.grantPermissions(['clipboard-read', 'clipboard-write'], {
        origin: 'https://swap.cow.fi',
    });
    const cowSwapPage = await context.newPage();
    await cowSwapPage.goto('https://swap.cow.fi/#/11155111/swap/ETH/0xbe72E441BF55620febc26715db68d3494213D8Cb');
    await cowSwapPage.getByRole('button', { name: 'Connect wallet' }).click();
    await cowSwapPage.getByRole('button', { name: 'Icon WalletConnect' }).click();
    await cowSwapPage.getByTitle('Connect your wallet').getByRole('button').click();
    await cowSwapPage.getByTitle('Connect your wallet').getByRole('button').click();
    const walletUri = await cowSwapPage.evaluate(() => navigator.clipboard.readText());
    await page.bringToFront();
    await page.getByPlaceholder('wc:…').focus();
    await page.getByPlaceholder('wc:…').fill(walletUri);
    await page.getByRole('button', { name: 'Connect dApp' }).click();
    if (!cowSwapPage.isClosed()) {
        await cowSwapPage.bringToFront();
        await cowSwapPage.locator('.styled__CloseButton-sc-szverx-1').click();
    }
    if (await cowSwapPage.getByRole('button', { name: 'Max' }).isVisible()) {
        await cowSwapPage.getByRole('button', { name: 'Max' }).click();
    } else {
        await cowSwapPage.locator('#input-currency-input').getByPlaceholder('0').click();
        await cowSwapPage.locator('#input-currency-input').getByPlaceholder('0').fill('0.1');
    }
    await cowSwapPage.getByRole('button', { name: 'Swap with WETH' }).click();
    if (await cowSwapPage.getByRole('button', { name: 'Swap' }).isVisible()) {
        await cowSwapPage.getByRole('button', { name: 'Swap' }).click();
        await page.waitForTimeout(3000);
        await cowSwapPage.getByRole('button', { name: 'Accept' }).click();
        await cowSwapPage.getByRole('button', { name: 'Confirm Swap' }).click();
    } else if (await cowSwapPage.getByRole('button', { name: 'Wrap ETH' }).isVisible()) {
        await cowSwapPage.getByRole('button', { name: 'Wrap ETH' }).click();
    }
    await page.bringToFront();
    await page.getByRole('button', { name: 'Add 1 actions' }).click();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByRole('button', { name: 'Publish proposal' }).click();
    await page.getByRole('button', { name: 'Approve transaction' }).click();
    await page.waitForTimeout(3000);
    await metamask.confirmTransaction();
    await page.waitForTimeout(3000);
    await page.getByRole('link', { name: 'View proposal' }).isVisible();
});
