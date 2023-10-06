import '@/styles/globals.css';
import { appWithTranslation } from 'next-i18next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { SWRConfig } from 'swr';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import chains from '@/constants/chain';
import Layout from '@/templates/Layout';

const projectId = process.env.NEXT_PUBLIC_PROJECT_WALLET_CONNECT_ID ?? '';
const alchemyAPIKey = process.env.NEXT_PUBLIC_ALCHEMY_KEY ?? '';

const { publicClient, webSocketPublicClient } = configureChains(chains, [
  alchemyProvider({ apiKey: alchemyAPIKey }),
  publicProvider(),
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component }: AppProps) {
  return (
    <SWRConfig
      value={{
        revalidateOnMount: true,
      }}
    >
      <WagmiConfig config={wagmiConfig}>
        <Layout>
          <Head>
            <title>Next</title>
          </Head>
          <Component />
        </Layout>
      </WagmiConfig>
    </SWRConfig>
  );
}

export default appWithTranslation(MyApp);
