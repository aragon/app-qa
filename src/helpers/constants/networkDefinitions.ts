import type { Chain } from 'viem';
import { arbitrum, base, mainnet, peaq, polygon, sepolia, zksync, zksyncSepoliaTestnet } from 'viem/chains';
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
            testDaoId: 'ethereum-mainnet-0xA20FBC97b9F09D19a1ccF31ce3627dB44f6252bB',
        },
    },
    [Network.ETHEREUM_SEPOLIA]: {
        ...sepolia,
        name: 'Ethereum Sepolia',
        network: Network.ETHEREUM_SEPOLIA,
        metamaskName: 'Sepolia',
        needsSetup: false,
        testConfig: {
            createDao: false,
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
            testDaoId: 'polygon-mainnet-0x82B9A5f7283b6FC8668B8a1Fb7f3e4ea1B35E3a7',
        },
    },
    [Network.BASE_MAINNET]: {
        ...base,
        name: 'Base',
        network: Network.BASE_MAINNET,
        needsSetup: true,
        testConfig: {
            createDao: false,
            testDaoId: 'base-mainnet-0x8116711B74748672e7946befC14AD43Cf8F15ec4',
        },
    },
    [Network.ARBITRUM_MAINNET]: {
        ...arbitrum,
        name: 'Arbitrum',
        network: Network.ARBITRUM_MAINNET,
        needsSetup: true,
        testConfig: {
            createDao: false,
            testDaoId: 'arbitrum-mainnet-0x1b5B61f33e2d012A848C7E3c50d3238CA486e10e',
        },
    },
    [Network.ZKSYNC_MAINNET]: {
        ...zksync,
        name: 'zkSync',
        network: Network.ZKSYNC_MAINNET,
        needsSetup: true,
        testConfig: {
            createDao: false,
            testDaoId: 'zksync-mainnet-0x4890d3899c3E960B9e64d848FdEf503243F5B470',
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
    [Network.PEAQ_MAINNET]: {
        ...peaq,
        name: 'Peaq',
        network: Network.PEAQ_MAINNET,
        needsSetup: true,
        testConfig: {
            createDao: false,
            testDaoId: undefined,
        },
    },
};
