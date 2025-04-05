import { networkDefinitions } from '../../constants/networkDefinitions';
import type { IDao, Network } from '../../types';

export interface IGenerateTestDaoParams {
    id?: string;
    network: Network;
    includeTimestamp?: boolean;
}

class DaoUtils {
    generateTestDao = (params: IGenerateTestDaoParams): IDao => {
        const { id = '', network, includeTimestamp } = params;

        return {
            id,
            network,
            name: `E2E Test Dao (${networkDefinitions[network].name})`,
            description: this.getTestDaoDescription(network, includeTimestamp),
            resources: [
                { text: 'Twitter', url: `https://x.com/e2e-test-dao-${network}` },
                { text: 'Website', url: `https://e2e-test-dao.com/${network}` },
            ],
        };
    };

    private getTestDaoDescription = (network: Network, includeTimestamp = false): string => {
        const timestampPrefix = new Date().toLocaleString();
        const description = `A test Dao on ${networkDefinitions[network].name} chain used for E2E testing.`;

        return includeTimestamp ? `${timestampPrefix} - ${description}` : description;
    };
}

export const daoUtils = new DaoUtils();
