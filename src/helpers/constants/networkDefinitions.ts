import type { Chain } from 'viem';
import { mainnet, polygon, sepolia, zksync, zksyncSepoliaTestnet } from 'viem/chains';
import { Network } from '../types';

export interface INetworkTestConfig {
    /**
     * Enables the create-dao test for this network.
     */
    createDao: boolean;
    /**
     * ID of the DAO to run the default data-presence tests for.
     */
    testDaoId?: string;
}

export interface INetworkDefinition extends Chain {
    /**
     * Name of the network.
     */
    name: string;
    /**
     * Internal network ID.
     */
    network: Network;
    /**
     * Custom name set on Metamask for network selection.
     */
    metamaskName?: string;
    /**
     * Defines if the network must be added to the metamask network list or not.
     */
    needsSetup?: boolean;
    /**
     * Test configurations for the network.
     */
    testConfig: INetworkTestConfig;
}

export const networkDefinitions: Record<Network, INetworkDefinition> = {
    [Network.ETHEREUM_MAINNET]: {
        ...mainnet,
        name: 'Ethereum',
        network: Network.ETHEREUM_MAINNET,
        needsSetup: false,
        testConfig: {
            createDao: false,
            testDaoId: undefined,
        },
    },
    [Network.ETHEREUM_SEPOLIA]: {
        ...sepolia,
        name: 'Ethereum Sepolia',
        network: Network.ETHEREUM_SEPOLIA,
        metamaskName: 'Sepolia',
        needsSetup: false,
        testConfig: {
            createDao: true,
            testDaoId: 'ethereum-sepolia-0xcd197F9b9D9b5f9D7DB797cd3E4EC021669eEc81',
        },
    },
    [Network.POLYGON_MAINNET]: {
        ...polygon,
        name: 'Polygon',
        network: Network.POLYGON_MAINNET,
        needsSetup: true,
        testConfig: {
            createDao: false,
            testDaoId: undefined,
        },
    },
    [Network.ZKSYNC_MAINNET]: {
        ...zksync,
        name: 'zkSync',
        network: Network.ZKSYNC_MAINNET,
        needsSetup: true,
        testConfig: {
            createDao: false,
            testDaoId: undefined,
        },
    },
    [Network.ZKSYNC_SEPOLIA]: {
        ...zksyncSepoliaTestnet,
        name: 'zkSync Sepolia',
        network: Network.ZKSYNC_SEPOLIA,
        needsSetup: true,
        testConfig: {
            createDao: true,
            testDaoId: 'zksync-sepolia-0x553dE42f7A43cD3cED91CDf0069cfc5a08Cc42f0',
        },
    },
};
