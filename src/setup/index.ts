import { testWithSynpress } from '@synthetixio/synpress';
import { metaMaskFixtures } from '@synthetixio/synpress/playwright';
import walletSetup from './wallet.setup';

const test = testWithSynpress(metaMaskFixtures(walletSetup));
const { expect } = test;

export { expect, test };
