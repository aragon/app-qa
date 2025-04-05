import type { Page as PlaywrightPage } from '@playwright/test';

export interface IDialogParams {
    page: PlaywrightPage;
}

export class Dialog {
    protected page: PlaywrightPage;

    constructor(params: IDialogParams) {
        const { page } = params;
        this.page = page;
    }
}
