import type { IPageParams } from '../page';
import { TransactionDialog, type ITransactionDialogParams } from '../transactionDialog';
import { WalletConnectionPage } from '../walletConnectionPage';

export interface IWizardPageParams extends IPageParams, ITransactionDialogParams {
    sumbitLabel: string;
}

export class WizardPage extends WalletConnectionPage {
    private submitLabel: string;

    public transactionDialog: TransactionDialog;

    constructor(params: IWizardPageParams) {
        const { sumbitLabel, successLabel, ...pageParams } = params;
        super(pageParams);

        this.submitLabel = sumbitLabel;
        this.transactionDialog = new TransactionDialog({ page: this.page, successLabel });
    }

    nextStep = () => this.page.getByRole('button', { name: 'Next' }).click();

    submit = () => this.page.getByRole('button', { name: this.submitLabel }).click();
}
