import { Chain } from 'viem';
import { goerli, mainnet, polygon, polygonMumbai } from 'wagmi/chains';

const testnetChains = [goerli, polygonMumbai];
const mainnetChains = [mainnet, polygon];

const chains = (
  process.env.NEXT_PUBLIC_NETWORK_MODE &&
  process.env.NEXT_PUBLIC_NETWORK_MODE === 'mainnet'
    ? mainnetChains
    : testnetChains
) as Chain[];

export default chains;
