import { expect, test } from '@/setup';
import { DaoDashboardPage, daoUtils, networkDefinitions } from '../../../helpers';

const testDaos = Object.values(networkDefinitions)
    .filter(({ testConfig }) => testConfig.testDaoId != null)
    .map(({ testConfig, network }) => daoUtils.generateTestDao({ id: testConfig.testDaoId!, network }));

testDaos.forEach((testDao) => {
    test(`Shows the DAO metadata on ${testDao.network} chain`, async ({ page }) => {
        const dashboardPage = await new DaoDashboardPage({ page, daoId: testDao.id }).navigate();
        expect(await dashboardPage.assertDaoMetadata(expect, testDao)).toBeTruthy();
    });
});
