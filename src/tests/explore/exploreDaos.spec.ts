import { expect, test } from '@/setup';
import { ExplorePage } from '../../helpers';

test('Shows a list of DAOs', async ({ page }) => {
    const explorePage = await new ExplorePage(page).navigate();
    const daoList = await explorePage.getExploreDaoList();
    expect(daoList.length).toEqual(10);
});
