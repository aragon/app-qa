import { DaoPage, type IDaoPageParams } from '../../shared';

export interface IDaoDashboardPageParams extends Omit<IDaoPageParams, 'path'> {}

export class DaoDashboardPage extends DaoPage {
    constructor(params: IDaoDashboardPageParams) {
        const { page, daoId } = params;
        super({ page, daoId, path: '/' });
    }

    getDaoTitle = (title: string) => this.getHeaderSection().getByRole('heading', { level: 1, name: title });

    getDaoDescription = (description: string) => this.getHeaderSection().getByText(description);

    getDaoLogo = () => this.getHeaderSection().getByAltText('avatar');

    getProposals = () => this.getSectionLinks('Latest proposals');

    getAssets = () => this.getSectionLinks('Assets');

    getMembers = () => this.getSectionLinks('Members');

    private getHeaderSection = () => this.page.getByRole('banner');

    private getSectionLinks = (title: string) => this.getSectionByTitle(title).getByRole('link');

    private getSectionByTitle = (title: string) => this.page.getByText(title).locator('xpath=..');
}
