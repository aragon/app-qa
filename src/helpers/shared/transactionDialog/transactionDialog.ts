import { Dialog, type IDialogParams } from '../dialog';

export interface ITransactionDialogParams extends IDialogParams {
    successLabel: string;
}

export class TransactionDialog extends Dialog {
    private successLabel: string;

    constructor(params: ITransactionDialogParams) {
        const { successLabel, ...dialogParams } = params;
        super(dialogParams);

        this.successLabel = successLabel;
    }

    approveTransaction = () => this.page.getByRole('button', { name: 'Sign transaction' }).click();

    cancelTransaction = () => this.page.getByRole('button', { name: 'Cancel' }).click();

    navigateSuccessLink = () => this.page.getByRole('link', { name: this.successLabel }).click();
}
