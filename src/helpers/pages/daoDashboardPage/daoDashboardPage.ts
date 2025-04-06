import type { Expect } from '@playwright/test';
import { DaoPage, type IDaoPageParams } from '../../shared';
import type { IDao } from '../../types';

export interface IDaoDashboardPageParams extends Omit<IDaoPageParams, 'path'> {}

export class DaoDashboardPage extends DaoPage {
    constructor(params: IDaoDashboardPageParams) {
        const { page, daoId } = params;
        super({ page, daoId, path: '/' });
    }

    assertDaoMetadata = async (expect: Expect, dao: IDao): Promise<boolean> => {
        const { name, description, resources } = dao;

        await expect(this.getDaoTitle(name)).toBeVisible();
        await expect(this.getDaoDescription(description)).toBeVisible();
        await expect(this.getDaoLogo()).toBeVisible();

        const resourcesLink = this.getDaoResources(resources.map((resource) => resource.text));
        for (const [index, resource] of resourcesLink.entries()) {
            const { text, url } = resources[index];
            await expect(resource).toContainText(text);
            await expect(resource).toHaveAttribute('href', url);
        }

        return true;
    };

    getDaoTitle = (title: string) => this.getHeaderSection().getByRole('heading', { level: 1, name: title });

    getDaoDescription = (description: string) => this.getHeaderSection().getByText(description);

    getDaoLogo = () => this.getHeaderSection().getByAltText('avatar');

    getDaoResources = (names: string[]) => names.map(this.getDaoResource);

    getProposals = () => this.getSectionLinks('Latest proposals');

    getAssets = () => this.getSectionLinks('Assets');

    getMembers = () => this.getSectionLinks('Members');

    private getDaoResource = (name: string) => this.page.getByRole('link', { name });

    private getHeaderSection = () => this.page.getByRole('banner');

    private getSectionLinks = (title: string) => this.getSectionByTitle(title).getByRole('link');

    private getSectionByTitle = (title: string) => this.page.getByText(title).locator('xpath=..');
}
