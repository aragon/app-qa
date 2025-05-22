import { invariant } from '../../utils';
import type { IPageParams } from '../page';
import { WalletConnectionPage } from '../walletConnectionPage';

export interface IDaoPageParams extends IPageParams {
    daoId?: string;
}

export class DaoPage extends WalletConnectionPage {
    private daoId;

    constructor(params: IDaoPageParams) {
        super(params);

        const { daoId } = params;
        this.daoId = daoId;
    }

    navigate = async () => {
        await this.page.goto(this.getDaoUrl());

        return this;
    };

    getDaoUrl = () => {
        invariant(this.daoId != null, 'DaoPage: DAO ID is required to navigate to the DAO page');
        const [network, networkType, address] = this.daoId.split('-');

        return `/dao/${network}-${networkType}/${address}/${this.path}`;
    };
}
