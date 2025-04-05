import type { Page as PlaywrightPage } from '@playwright/test';

export interface IPageParams {
    page: PlaywrightPage;
    path: string;
}

export class Page {
    protected page: PlaywrightPage;
    protected path: string;

    constructor(params: IPageParams) {
        const { page, path } = params;

        this.page = page;
        this.path = path;
    }

    navigate = async () => {
        await this.page.goto(this.path);

        return this;
    };
}
