import { expect, test } from '@/setup';
import { CreateDaoPage, DaoDashboardPage, daoUtils, networkDefinitions, testUtils } from '../../helpers';

const networks = Object.values(networkDefinitions).filter(({ testConfig }) => testConfig.createDao);

networks.forEach(({ network }) => {
    test(`Creates a DAO on ${network}`, async ({ page, metamask }) => {
        const newDao = daoUtils.generateTestDao({ network, includeTimestamp: true });
        const createDaoPage = await new CreateDaoPage({ page }).navigate();

        await createDaoPage.connectWallet(metamask, network);
        await createDaoPage.selectNetwork(newDao.network);
        await createDaoPage.nextStep();
        await createDaoPage.insertMetadata(newDao);
        await createDaoPage.submit();
        await createDaoPage.transactionDialog.approveTransaction();
        await metamask.confirmTransaction();
        await createDaoPage.transactionDialog.navigateSuccessLink();

        const daoDashboardPage = new DaoDashboardPage({ page });
        await page.waitForURL('**/dashboard');
        await testUtils.refreshUntilVisible(page, daoDashboardPage.getDaoTitle(newDao.name));
        await expect(daoDashboardPage.getDaoTitle(newDao.name)).toBeVisible();
    });
});
