import type { Page } from '@playwright/test';
import { WalletConnectionPage } from '../../shared';

export class ExplorePage extends WalletConnectionPage {
    constructor(page: Page) {
        super({ page, path: '/' });
    }

    getExploreDaoList = async () =>
        this.getExploreSection()
            .getByRole('link')
            .filter({ has: this.page.getByRole('heading') })
            .all();

    private getExploreSection = () => this.page.getByRole('main');
}
